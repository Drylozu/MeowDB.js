const MeowDBObject = require("./structures/Object.js");
const MeowDBError = require("./structures/Error.js");
const Utils = require("./Utils.js");
const path = require("path");
const fs = require("fs");

/** Class representing a database. */
class MeowDB {
    /**
     * Create or get a database.
     * @param {object} options - The options of the database
     * @param {string} options.dir - The directory path of the database
     * @param {string} options.name - The name of the database
     */
    constructor(options = {}) {
        if (!options) throw new MeowDBError("The options are required");
        if (typeof options !== "object") throw new MeowDBError("The options must be an object");
        if (!options.dir) throw new MeowDBError("The directory path is required");
        if (!options.name) throw new MeowDBError("The name of the database is required");
        if (typeof options.dir !== "string") throw new MeowDBError("The directory path must be an string");
        if (typeof options.name !== "string") throw new MeowDBError("The name of the database must be an string");
        if (!fs.existsSync(options.dir)) throw new MeowDBError("The directory must be valid");
        if (options.name.length < 1) throw new MeowDBError("The name must have more of one character");
        if (!/[a-zA-Z0-9_]+/g.test(options.name)) throw new MeowDBError("The name must only include letters, numbers and underscores");

        /**
         * The options of the database
         * @type {Object}
         * @private
         */
        Object.defineProperty(this, "_options", { value: { ...options, file: path.join(options.dir, `${options.name}.json`) } });

        /**
         * The database utils
         * @type {Utils}
         * @private
         */
        Object.defineProperty(this, "_utils", { value: new Utils(this._options.file) });

        if (!fs.existsSync(this._options.file)) fs.writeFileSync(this._options.file, "{}");
    }

    /**
     * Returns all data stored in the database
     * @returns {MeowDBObject}
     */
    all() {
        return new MeowDBObject(this._utils.getAll(), "/", this._options.file);
    }

    /**
     * Creates an element in the database (only if it doesn't exists already)
     * @param {string} id The ID to create
     * @param {*} initialValue The initial value
     * @returns {Object} The created element
     */
    create(id, initialValue) {
        if (!this._utils.validId(id)) return new MeowDBError("The ID must only include letters, numbers, underscores and dots");
        if (!this._utils.validValue(initialValue)) return new MeowDBError("The value must be a string, number or an object");
        if (this._utils.get(id)) return this._utils.get(id);
        return Object.assign(this._utils.set(id, initialValue, true), { __id: id });
    }

    /**
     * Deletes an element from the database
     * @param {string} id The ID of the element
     * @returns {Object} The deleted object
     */
    delete(id) {
        if (!this._utils.validId(id)) return new MeowDBError("The ID must only include letters, numbers, underscores and dots");
        let tmpData = this._utils.get(id);
        if (!tmpData) return new MeowDBError("That element doesn't exists in the database");
        this._utils.set(id, undefined, false);
        return Object.assign(tmpData, { __id: id });
    }

    /**
     * Checks if an element exists in the database
     * @param {string} id The ID to check
     * @returns {Boolean} If exists
     */
    exists(id) {
        if (!this._utils.validId(id)) return new MeowDBError("The ID must only include letters, numbers, underscores and dots");
        return Boolean(this._utils.get(id));
    }

    /**
     * Gets an element of the database
     * @param {string} id The ID of the element
     * @returns {any} The element
     */
    get(id) {
        if (!this._utils.validId(id)) return new MeowDBError("The ID must only include letters, numbers, underscores and dots");
        let data = this._utils.get(id);
        if (typeof data === "object" && !(data instanceof Array)) return new MeowDBObject(data, id, this._options.file);
        else return data;
    }

    /**
     * Sets the value of an element in the database
     * @param {string} id The ID of the element
     * @param {*} value The value to be setted
     * @returns {Object} The value setted
     */
    set(id, value) {
        if (!this._utils.validId(id)) return new MeowDBError("The ID must only include letters, numbers, underscores and dots");
        if (!this._utils.validValue(value)) return new MeowDBError("The value must be a string, number or an object");
        return this._utils.set(id, value, false);
    }
}

module.exports = MeowDB;