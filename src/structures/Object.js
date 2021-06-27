const { validValue, stringifyData } = require('../Utils.js');
const MeowDBError = require('./Error.js');
const fs = require('fs');

/** A Object from a database. */
class MeowDBObject {
    /**
     * Creates an Object but with a method to save data
     * @param {Object} object The object
     * @param {string} id The ID of the element
     * @param {string} file The path of the file
     */
    constructor(object, id, file) {
        Object.defineProperty(this, '__id', {
            value: id,
            configurable: false
        });

        Object.defineProperty(this, '__file', {
            value: file,
            configurable: false
        });

        Object.assign(this, object);
    }

    /**
     * Saves the information of the object edited or no
     * @returns {Object} The data saved
     * @throws {MeowDBError} If any value is invalid
     */
    save() {
        const allData = JSON.parse(fs.readFileSync(this.__file));
        let info = '';
        if (this.__id)
            this.__id.split('.').forEach((s) => {
                info += `[${JSON.stringify(s)}]`;
            });
        Object.entries(this).forEach((i) => {
            if (!validValue(i[1])) throw new MeowDBError('One of the defined values aren\'t a string, number, object, array, undefined or a boolean');
            eval(`allData${info}[${JSON.stringify(i[0])}] = ${stringifyData(i[1])};`);
        });
        fs.writeFileSync(this.__file, JSON.stringify(allData));
        return eval(`allData${info}`);
    }
}

module.exports = MeowDBObject;