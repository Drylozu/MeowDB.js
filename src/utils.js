const Path = require("path");
const fs = require("fs");

module.exports = {
    create: async (path, name) => {
        if (!fs.existsSync(Path.join(path, `${name}.json`))) return await fs.writeFileSync(Path.join(path, `${name}.json`), "{}");
    },
    checkName: async (name) => {
        if (typeof name !== "string") return false;
        if (name.length < 1) return false;
        if (name.endsWith(".json")) return false;
        if (name.match(/[a-zA-Z]+/g).join("") !== name) return false;
        return true;
    },
    checkId: async (id, acceptAll = false) => {
        if (typeof id !== "string") return false;
        if (id.length < 1) return false;
        if (acceptAll && id === "*") return true;
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
    createData: async (id, path, sValue) => {
        let allData = await JSON.parse(await fs.readFileSync(path));
        id = id.split(".");
        let info = "";
        for (let i = 0; i < id.length; i++) {
            info += `["${id[i]}"]`;
            if (i === (id.length - 1)) {
                let last = await eval(`allData${info}`);
                if (last) break;
                let readableData = typeof sValue === "string" ? `"${sValue}"` : typeof sValue === "object" && !(sValue instanceof Array) ? `${JSON.stringify(sValue)}` : typeof sValue === "object" && sValue instanceof Array ? `[${sValue}]` : `${sValue}`;
                await eval(`allData${info} = ${readableData};`);
            } else {
                let out = await eval(`allData${info}`);
                if (!out) await eval(`allData${info} = {};`);
            }
        }
        await fs.writeFileSync(path, JSON.stringify(allData));
    },
    readAllData: async (path) => {
        return await JSON.parse(await fs.readFileSync(path));
    },
    getData: async (id, path, all = false) => {
        let allData = await JSON.parse(await fs.readFileSync(path));
        if (id === "*" && all) return allData;
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
        let allData = await JSON.parse(await fs.readFileSync(path));
        id = id.split(".");
        let info = "";
        for (let i = 0; i < id.length; i++) {
            info += `["${id[i]}"]`;
            if (i === (id.length - 1)) {
                let readableData = typeof sValue === "string" ? `"${sValue}"` : typeof sValue === "object" && !(sValue instanceof Array) ? `${JSON.stringify(sValue)}` : typeof sValue === "object" && sValue instanceof Array ? `[${sValue}]` : `${sValue}`;
                await eval(`allData${info} = ${readableData};`);
            } else {
                let out = await eval(`allData${info}`);
                if (!out) await eval(`allData${info} = {};`);
            }
        }
        await fs.writeFileSync(path, JSON.stringify(allData));
    },
    saveData: async (path, data) => {
        await fs.writeFileSync(path, JSON.stringify(data));
    }
}