const Utils = require("../utils.js");
const path = require("path");
const fs = require("fs");

/**
 * A Object item from a database
 */
class MeowObjectDB {
     /**
      * Creates a Object but with a method to save data
      * @param {string} dir The dir that stores all databases
      * @param {string} name The name of the database
      * @param {string} id The ID of the object in the database
      * @param {object} obj The object to parse into a ObjectDB
      */
    constructor(dir, name, id, obj) {
        Object.entries(obj).forEach((o) => this[o[0]] = o[1]);
        this._name = name;
        this._dir = dir;
        this._id = id;
    }

    /**
     * Save the information edited or no
     * @returns {undefined}
     */
    save() {
        let data = Utils.readAllData(path.join(this._dir, `${this._name}.json`))
        Object.entries(this).forEach((o) => {
            if (o[0].startsWith("_")) return;
            data[this._id][o[0]] = o[1];
        });
        Utils.saveData(path.join(this._dir, `${this._name}.json`), data);
    }
}

module.exports = MeowObjectDB;
