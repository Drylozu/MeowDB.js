const DBError = require("./Error.js");
const fs = require("fs");

function validValue(value) {
    if (typeof value === "string") return true;
    if (typeof value === "number") return true;
    if (typeof value === "object") return true;
    if (typeof value === "boolean") return true;
    return false;
}

let File;

/**
 * A Object item from a database
 */
class MeowDBObject {
    /**
     * Creates an Object but with a method to save data
     * @param {object} obj The object
     * @param {string} id The ID of the element
     * @param {string} file The path of the file
     */
    constructor(obj, id, file) {
        if (id !== "/") this.__id = id;
        File = file;
        Object.entries(obj).forEach((i) => this[i[0]] = i[1]);
    }

    /**
     * Saves the information of the object edited or no
     */
    save() {
        let allData = JSON.parse(fs.readFileSync(File));
        let info = "";
        if (this.__id) this.__id.split(".").forEach((s) => {
            info += `["${s}"]`;
        });
        Object.entries(this).forEach((i) => {
            if (i[0].startsWith("__")) return;
            if (!validValue(i[1])) return Promise.reject(new DBError("One of the defined values aren't a string, number or an object"));
            let readableData = typeof i[1] === "string" ? `"${i[1]}"` : typeof i[1] === "object" && !(i[1] instanceof Array) ? `${JSON.stringify(i[1])}` : typeof i[1] === "object" && (i[1] instanceof Array) ? `[${i[1]}]` : `${i[1]}`;
            eval(`allData${info}["${i[0]}"] = ${readableData};`);
        });
        fs.writeFileSync(File, JSON.stringify(allData));
        return Promise.resolve(Object.assign(eval(`allData${info}`), { __id: this.__id }));
    }
}

module.exports = MeowDBObject;
