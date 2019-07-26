const path = require("path");
const fs = require("fs");

/**
 * A Object item from a database
 */
class ObjectDB {
    /**
     * Creates a DBObject with a method to save data
     * @param {object} obj The object to parse into a DBObject
     */
    constructor(dir, group, id, obj) {
        Object.entries(obj).forEach((o) => this[o[0]] = o[1]);
        this._group = group;
        this._dir = dir;
        this._id = id;
    }

    /**
     * Save the information edited or no
     * @returns {void} Nothing
     */
    async save() {
        let data = await JSON.parse(fs.readFileSync(path.join(this._dir, `${this._group}.json`)));
        Object.entries(this).forEach((o) => {
            if (o[0].startsWith("_")) return;
            data[this._id][o[0]] = o[1];
        });
        await fs.writeFileSync(path.join(this._dir, `${this._group}.json`), data);
    }
}

module.exports = ObjectDB;