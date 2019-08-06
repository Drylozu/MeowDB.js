const Path = require("path");
const fs = require("fs");

module.exports = {
    create: (path, name) => {
        if (!fs.existsSync(Path.join(path, `${name}.json`))) return fs.writeFileSync(Path.join(path, `${name}.json`), "{}");
    },
    checkName: (name) => {
        if (typeof name !== "string") return false;
        if (name.length < 1) return false;
        if (name.endsWith(".json")) return false;
        if (name.match(/[a-zA-Z]+/g).join("") !== name) return false;
        return true;
    },
    checkId: (id, acceptAll = false) => {
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
    createData: (id, path, sValue) => {
        let allData = JSON.parse(fs.readFileSync(path, 'UTF8'));
        id = id.split(".");
        let info = "";
        for (let i = 0; i < id.length; i++) {
            info += `["${id[i]}"]`;
            if (i === (id.length - 1)) {
                let last = eval(`allData${info}`);
                if (last) break;
                let readableData = typeof sValue === "string" ? `"${sValue}"` : typeof sValue === "object" && !(sValue instanceof Array) ? `${JSON.stringify(sValue)}` : typeof sValue === "object" && sValue instanceof Array ? `[${sValue}]` : `${sValue}`;
                eval(`allData${info} = ${readableData};`);
            } else {
                let out = eval(`allData${info}`);
                if (!out) eval(`allData${info} = {};`);
            }
        }
        fs.writeFileSync(path, JSON.stringify(allData));
        return allData;
    },
    readAllData: (path) => {
        return JSON.parse(fs.readFileSync(path, 'UTF8'));
    },
    getData: (id, path, all = false) => {
        let allData = JSON.parse(fs.readFileSync(path, 'UTF8'));
        if (id === "*" && all) return allData;
        id = id.split(".");
        let info = "";
        for (let i = 0; i < id.length; i++) {
            info += `["${id[i]}"]`;
            if (i === (id.length - 1)) break;
            let out = eval(`allData${info}`);
            if (!out) eval(`allData${info} = {};`);
        }
        return eval(`allData${info}`);
    },
    setData: (id, path, data) => {
        let allData = JSON.parse(fs.readFileSync(path, 'UTF8'));
        id = id.split(".");
        let info = "";
        for (let i = 0; i < id.length; i++) {
            info += `["${id[i]}"]`;
            if (i === (id.length - 1)) {
                let readableData = typeof data === "string" ? `"${data}"` : typeof data === "object" && !(data instanceof Array) ? `${JSON.stringify(data)}` : typeof data === "object" && data instanceof Array ? `[${data}]` : `${data}`;
                eval(`allData${info} = ${readableData};`);
            } else {
                let out = eval(`allData${info}`);
                if (!out) eval(`allData${info} = {};`);
            }
        }
        fs.writeFileSync(path, JSON.stringify(allData));
        return allData;
    },
    saveData: (path, data) => {
        fs.writeFileSync(path, JSON.stringify(data));
    }
}
