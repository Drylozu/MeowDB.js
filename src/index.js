const DBObject = require("./structures/Object.js");
const DBError = require("./structures/Error.js");
const Utils = require("./Utils.js");
const path = require("path");
const fs = require("fs");

/**
 * Class used to create or get databases
 */
class MeowDB {
    /**
     * Creates or gets a database
     * @param {object} options The options of the database
     * @param {string} options.dir The directory path of the database
     * @param {string} options.name The name of the database
     */
    constructor(options = {}) {
        if (!options) throw new DBError("The options are required");
        if (typeof options !== "object") throw new DBError("The options must be an object");
        if (!options.dir) throw new DBError("The directory path is required");
        if (!options.name) throw new DBError("The name of the database is required");
        if (typeof options.dir !== "string") throw new DBError("The directory path must be an string");
        if (typeof options.name !== "string") throw new DBError("The name of the database must be an string");
        if (!fs.existsSync(options.dir)) throw new DBError("The directory must be valid");
        if (options.name.length < 1) throw new DBError("The name must have more of one character");
        if (!/[a-zA-Z0-9_]+/g.test(options.name)) throw new DBError("The name must only include letters, numbers and underscores");
        if (!fs.existsSync(path.join(options.dir, `${options.name}.json`))) fs.writeFileSync(path.join(options.dir, `${options.name}.json`), "{}");
        options.file = path.join(options.dir, `${options.name}.json`);
        /**
         * The options of the database
         * @type {object}
         * @private
         */
        Object.defineProperty(this, "_options", { value: options });
        /**
         * The database utils
         * @type {Utils}
         * @private
         */
        Object.defineProperty(this, "_utils", { value: new Utils(path.join(options.dir, `${options.name}.json`)) });
    }

    /**
     * Returns all data stored in the database
     * @returns {Promise<DBObject>}
     */
    all() {
        return Promise.resolve(new DBObject(this._utils.getAll(), "/", path.join(this._options.dir, `${this._options.name}.json`)));
    }

    /**
     * Creates an element in the database
     * @param {string} id The ID to create
     * @param {*} value The initial value
     * @returns {Promise<Object>} The created element
     */
    create(id, sValue) {
        if (!this._utils.validId(id)) return Promise.reject(new DBError("The ID must only include letters, numbers, underscores and dots"));
        if (!this._utils.validValue(sValue)) return Promise.reject(new DBError("The value must be a string, number or an object"));
        if (this._utils.get(id)) return Promise.resolve(this._utils.get(id));
        else return Promise.resolve(Object.assign(this._utils.set(id, sValue, true), { __id: id }));
    }

    /**
     * Deletes an element from the database
     * @param {string} id The ID of the element
     * @returns {Promise<Object>} The deleted element
     */
    delete(id) {
        if (!this._utils.validId(id)) return Promise.reject(new DBError("The ID must only include letters, numbers, underscores and dots"));
        let tmpData = this._utils.get(id);
        if (!tmpData) return Promise.reject(new DBError("That element doesn't exists in the database"));
        this._utils.set(id, undefined);
        return Promise.resolve(Object.assign(tmpData, { __id: id }));
    }

    /**
     * Checks if an element exists in the database
     * @param {string} id The ID to check
     * @returns {Boolean} If exists
     */
    exists(id) {
        if (!this._utils.validId(id)) return Promise.reject(new DBError("The ID must only include letters, numbers, underscores and dots"));
        if (this._utils.get(id)) return true;
        else return false;
    }

    /**
     * Gets an element of the database
     * @param {string} id The ID of the element
     * @returns {any} if it's a object returns DBObject, if not it returns the value
     */
    get(id) {
        if (!this._utils.validId(id)) return Promise.reject(new DBError("The ID must only include letters, numbers, underscores and dots"));
        let data = this._utils.get(id);
        if (typeof data === "object" && !(data instanceof Array)) return Promise.resolve(new DBObject(data, id, path.join(this._options.dir, `${this._options.name}.json`)));
        else return data;
    }

    /**
     * Sets the value of an element in the database
     * @param {string} id The ID of the element
     * @param {*} value The value to be setted
     * @returns {Object} The value setted
     */
    set(id, value) {
        if (!this._utils.validId(id)) return Promise.reject(new DBError("The ID must only include letters, numbers, underscores and dots"));
        if (!this._utils.validValue(value)) return Promise.reject(new DBError("The value must be a string, number or an object"));
        return Promise.resolve(this._utils.set(id, value, false));
    }
}

module.exports = MeowDB;