const Path = require("path");
const fs = require("fs");

module.exports = {
    create: async (path, name) => {
        await fs.writeFileSync(Path.join(path, `${name}.json`), "{}");
    },
    checkName: async (name) => {
        if (typeof name !== "string") return false;
        if (name.length < 1) return false;
        if (name.endsWith(".json")) return false;
        if (name.match(/[a-zA-Z]+/g).join("") !== name) return false;
        return true;
    },
    checkId: async (id) => {
        if (typeof id !== "string") return false;
        if (id.length < 1) return false;
        if (id.endsWith(".")) return false;
        if (id.split(".").includes("")) return false;
        if (id.match(/[a-zA-Z0-9.]+/g).join("") !== id) return false;
        let twoDots = false;
        id.split("").forEach((c, i, a) => {
            if (c === "." && a[i + 1] === ".") twoDots = true;
            if (c === "." && a[i - 1] === ".") twoDots = true;
        });
        if (twoDots) return false;
        return true;
    },
    createData: async (id, path, sValue = {}) => {
        let allData = await this.readAllData(path);
        id = id.split(".");
        let info = "";
        for (let i = 0; i < id.length; i++) {
            info += `["${id[i]}"]`;
            if (i === (id.length - 1)) return await eval(`allData${info} = ${typeof sValue === "string" ? `"${sValue}"` : sValue};`);
            let out = await eval(`allData${info}`);
            if (!out) await eval(`allData${info} = {};`);
        }
        await this.saveData(path, allData);
    },
    readAllData: async (path) => {
        return await JSON.parse(await fs.readFileSync(path));
    },
    getData: async (id, path) => {
        let allData = await this.readAllData(path);
        id = id.split(".");
        let info = "";
        for (let i = 0; i < id.length; i++) {
            info += `["${id[i]}"]`;
            if (i === (id.length - 1)) break;
            let out = await eval(`allData${info}`);
            if (!out) await eval(`allData${info} = {};`);
        }
        return await eval(`allData${info}`);
    },
    setData: async (id, path, data) => {
        let allData = await this.readAllData(path);
        id = id.split(".");
        let info = "";
        for (let i = 0; i < id.length; i++) {
            info += `["${id[i]}"]`;
            if (i === (id.length - 1)) return await eval(`allData${info} = ${typeof data === "string" ? `"${data}"` : data};`);
            let out = await eval(`allData${info}`);
            if (!out) await eval(`allData${info} = {};`);
        }
        await this.saveData(path, allData);
    },
    saveData: async (path, data) => {
        await fs.writeFileSync(path, data);
    }
}