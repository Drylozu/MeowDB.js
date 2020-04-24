const fs = require("fs");

class DBUtils {
    constructor(file) {
        this.file = file;
    }

    getAll() {
        return JSON.parse(fs.readFileSync(this.file));
    }

    get(id) {
        let allData = this.getAll();
        let info = "";
        id.split(".").forEach((s, i, a) => {
            info += `["${s}"]`;
            if (i === (a.length - 1)) return;
            if (!eval(`allData${info}`)) eval(`allData${info} = {};`);
        });
        return eval(`allData${info}`);
    }

    set(id, data, create = false) {
        let allData = this.getAll();
        let info = "";
        id.split(".").forEach((s, i, a) => {
            info += `["${s}"]`;
            if (i === (a.length - 1)) {
                let last = eval(`allData${info}`);
                if (last && create) return;
                let readableData = typeof data === "string" ? `"${data}"` : typeof data === "object" && !(data instanceof Array) ? `${JSON.stringify(data)}` : typeof data === "object" && (data instanceof Array) ? require("util").inspect(data, { depth: null }) : `${data}`;
                eval(`allData${info} = ${readableData}`);
            } else {
                if (!eval(`allData${info}`)) eval(`allData${info} = {};`);
            }
        });
        fs.writeFileSync(this.file, JSON.stringify(allData));
        return eval(`allData${info}`);
    }

    validId(id) {
        if (typeof id !== "string") return false;
        if (id.length < 1) return false;
        if (!/[a-zA-Z0-9.]+/g.test(id)) return false;
        if (id.split(".").includes("")) return false;
        if (id.endsWith(".")) return false;
        return true;
    }

    validValue(value) {
        if (typeof value === "string") return true;
        if (typeof value === "number") return true;
        if (typeof value === "object") return true;
        if (typeof value === "boolean") return true;
        return false;
    }
}

module.exports = DBUtils;
