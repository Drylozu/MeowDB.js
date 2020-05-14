const MeowDBError = require("./Error.js");
const fs = require("fs");

function validValue(value) {
    if (typeof value === "string") return true;
    if (typeof value === "number") return true;
    if (typeof value === "object") return true;
    if (typeof value === "boolean") return true;
    if (typeof value === "undefined") return true;
    return false;
}

function stringifyData(data) {
    if (typeof data === "string") return `"${data}"`;
    if (typeof data === "number") return `${data}`;
    if (typeof data === "object" && !(data instanceof Array)) return `${JSON.stringify(data)}`;
    if (typeof data === "object" && (data instanceof Array)) return `[${data.map((e) => this.stringifyData(e)).join(",")}]`;
    return `${data}`;
}

let File, Id;

/** A Object from a database. */
class MeowDBObject {
    /**
     * Creates an Object but with a method to save data
     * @param {object} obj The object
     * @param {string} id The ID of the element
     * @param {string} file The path of the file
     */
    constructor(obj, id, file) {
        if (id !== "/") Id = id;
        File = file;
        Object.entries(obj).forEach((i) => this[i[0]] = i[1]);
    }

    get __id() {
        return Id;
    }

    /**
     * Saves the information of the object edited or no
     * @returns {Object} The data saved
     */
    save() {
        let allData = JSON.parse(fs.readFileSync(File));
        let info = "";
        if (this.__id)
            this.__id.split(".").forEach((s) => {
                info += `["${s}"]`;
            });
        Object.entries(this).forEach((i) => {
            if (i[0].startsWith("__")) return;
            if (!validValue(i[1])) return new MeowDBError("One of the defined values aren't a string, number, object, array, undefined or a boolean");
            eval(`allData${info}["${i[0]}"] = ${stringifyData(i[1])};`);
        });
        fs.writeFileSync(File, JSON.stringify(allData));
        return eval(`allData${info}`);
    }
}

module.exports = MeowDBObject;