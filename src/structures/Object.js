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
    if (typeof data === "string") return `"${data.replace(/\n/g, "\\n").replace(/"/g, "\\\"")}"`;
    if (typeof data === "number") return data.toString();
    if (typeof data === "object" && !(data instanceof Array)) return JSON.stringify(data);
    if (typeof data === "object" && (data instanceof Array)) return `[${data.map((e) => stringifyData(e)).join(",")}]`;
    if (typeof data === "boolean") return data ? "true" : "false";
    if (typeof data === "undefined") return "undefined";
    return "undefined";
}

let File, Id;

/** A Object from a database. */
class MeowDBObject {
    /**
     * Creates an Object but with a method to save data
     * @param {Object} object The object
     * @param {string} id The ID of the element
     * @param {string} file The path of the file
     */
    constructor(object, id, file) {
        if (id !== "/") Id = id;
        File = file;
        Object.assign(this, object);
    }

    /**
     * The ID of the object
     * @type {string}
     */
    get __id() {
        return Id;
    }

    /**
     * Saves the information of the object edited or no
     * @returns {Object} The data saved
     * @throws {MeowDBError} If any value is invalid
     */
    save() {
        let allData = JSON.parse(fs.readFileSync(File));
        let info = "";
        if (this.__id)
            this.__id.split(".").forEach((s) => {
                info += `["${s.replace(/\n/g, "\\n").replace(/"/g, "\\\"")}"]`;
            });
        Object.entries(this).forEach((i) => {
            if (i[0].startsWith("__")) return;
            if (!validValue(i[1])) throw new MeowDBError("One of the defined values aren't a string, number, object, array, undefined or a boolean");
            eval(`allData${info}["${i[0]}"] = ${stringifyData(i[1])};`);
        });
        fs.writeFileSync(File, JSON.stringify(allData));
        return eval(`allData${info}`);
    }
}

module.exports = MeowDBObject;