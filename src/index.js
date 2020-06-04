const MeowDBObject = require("./structures/Object.js");
const MeowDBError = require("./structures/Error.js");
const MeowDBUtils = require("./Utils.js");
const path = require("path");
const fs = require("fs");

/**
 * MeowDB options object used to create the database
 * @typedef {Object} MeowDBOptions
 * @property {string} dir The directory path of the database
 * @property {string} name The name of the database
 */

/**
 * Private MeowDB options inside the MeowDB class
 * @typedef {MeowDBOptions} MeowDBPrivateOptions
 * @property {string} file The absolute path of the database file
 */

/** Class representing a database. */
class MeowDB {
    /**
     * Create or get a database.
     * @param {MeowDBOptions} options MeowDB options object
     * @throws {MeowDBError} If any value is invalid
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
         * @type {MeowDBPrivateOptions}
         * @private
         */
        Object.defineProperty(this, "_options", { value: { ...options, file: path.join(options.dir, `${options.name}.json`) } });

        /**
         * The database utils
         * @type {MeowDBUtils}
         * @private
         */
        Object.defineProperty(this, "_utils", { value: new MeowDBUtils(this._options.file) });

        if (!fs.existsSync(this._options.file)) fs.writeFileSync(this._options.file, "{}");
    }

    /**
     * Returns all data stored in the database
     * @returns {MeowDBObject} All data
     */
    all() {
        return new MeowDBObject(this._utils.getAll(), "/", this._options.file);
    }

    /**
     * Creates an element in the database (only if it doesn't exists already)
     * @param {string} id The ID to create
     * @param {*} initialValue The initial value
     * @returns {Object} The created element
     * @throws {MeowDBError} If the ID or initial value is invalid
     */
    create(id, initialValue) {
        if (!this._utils.validId(id)) throw new MeowDBError("The ID must only include letters, numbers, underscores and dots");
        if (!this._utils.validValue(initialValue)) throw new MeowDBError("The value must be a string, number or an object");
        if (this._utils.get(id)) return this._utils.get(id);
        return this._utils.set(id, initialValue, true);
    }

    /**
     * Deletes an element from the database
     * @param {string} id The ID of the element
     * @returns {Object} The deleted object
     * @throws {MeowDBError} If the ID is invalid or the element doesn't exists
     */
    delete(id) {
        if (!this._utils.validId(id)) throw new MeowDBError("The ID must only include letters, numbers, underscores and dots");
        let data = this._utils.get(id);
        if (!data) throw new MeowDBError("That element doesn't exists in the database");
        this._utils.set(id, undefined, false);
        return data;
    }

    /**
     * Checks if an element exists in the database
     * @param {string} id The ID to check
     * @returns {Boolean} If it exists
     * @throws {MeowDBError} If the ID is invalid
     */
    exists(id) {
        if (!this._utils.validId(id)) throw new MeowDBError("The ID must only include letters, numbers, underscores and dots");
        return Boolean(this._utils.get(id));
    }

    /**
     * Gets an element of the database
     * @param {string} id The ID of the element
     * @returns {*} The element
     * @throws {MeowDBError} If the ID is invalid
     */
    get(id) {
        if (!this._utils.validId(id)) throw new MeowDBError("The ID must only include letters, numbers, underscores and dots");
        let data = this._utils.get(id);
        if (typeof data === "object" && !(data instanceof Array)) return new MeowDBObject(data, id, this._options.file);
        else return data;
    }

    /**
     * Sets the value of an element in the database
     * @param {string} id The ID of the element
     * @param {*} value The value to be setted
     * @returns {*} The value setted
     * @throws {MeowDBError} If the ID or value is invalid
     */
    set(id, value) {
        if (!this._utils.validId(id)) throw new MeowDBError("The ID must only include letters, numbers, underscores and dots");
        if (!this._utils.validValue(value)) throw new MeowDBError("The value must be a string, number or an object");
        return this._utils.set(id, value, false);
    }

    /**
     * Finds an element in the database
     * @param {function} callback The function to check elements
     * @param {string} id The ID to start checking
     * @returns {*} The element
     * @throws {MeowDBError} If the ID or callback is invalid
     */
    find(callback, id = "/") {
        if (id !== "/" && !this._utils.validId(id)) throw new MeowDBError("The ID must only include letters, numbers, underscores and dots");
        if (typeof callback !== "function") throw new MeowDBError("The find function must have a function as first parameter");
        let data = id === "/" ? this._utils.getAll() : this._utils.get(id);
        if (!data) throw new MeowDBError("That element specified by ID doesn't exists in the database");
        let element = Object.entries(data).find(([_, e]) => callback(e));
        if (!element || !element[0]) return undefined;
        if (typeof element[1] === "object" && !(element[1] instanceof Array)) return new MeowDBObject(element[1], element[0], this._options.file);
        else return element[1];
    }

    /**
     * Filters elements in the database
     * @param {function} callback The function to filter the elements
     * @param {string} id The ID to start filtering
     * @returns {any[]} The elements (MeowDBObject if they're objects, array with ID and value if not)
     * @throws {MeowDBError} If the ID or callback is invalid
     */
    filter(callback, id = "/") {
        if (id !== "/" && !this._utils.validId(id)) throw new MeowDBError("The ID must only include letters, numbers, underscores and dots");
        if (typeof callback !== "function") throw new MeowDBError("The find function must have a function as first parameter");
        let data = id === "/" ? this._utils.getAll() : this._utils.get(id);
        if (!data) throw new MeowDBError("That element specified by ID doesn't exists in the database");
        let elements = Object.entries(data).filter(([_, e]) => callback(e));
        if (!elements) return undefined;
        if (elements.every((e) => typeof e[1] === "object")) return elements.map((e) => new MeowDBObject(e[1], e[0], this._options.file))
        else return elements;
    }
}

module.exports = MeowDB;