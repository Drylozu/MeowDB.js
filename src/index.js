const MeowDBObject = require('./structures/Object.js');
const MeowDBError = require('./structures/Error.js');
const MeowDBUtils = require('./Utils.js');
const path = require('path');
const fs = require('fs');

/**
 * MeowDB options object used to create the database
 * @typedef {Object} MeowDBOptions
 * @property {string} dir The directory path of the database
 * @property {string} name The name of the database
 * @property {boolean} raw Specifies if plain objects are returned instead of MeowDBObjects
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
    constructor(options = { raw: false }) {
        if (!options) throw new MeowDBError('The options are required');
        if (typeof options !== 'object') throw new MeowDBError('The options must be an object');
        if (!options.dir) throw new MeowDBError('The directory path is required');
        if (!options.name) throw new MeowDBError('The name of the database is required');
        if (typeof options.dir !== 'string') throw new MeowDBError('The directory path must be an string');
        if (typeof options.name !== 'string') throw new MeowDBError('The name of the database must be an string');
        if (!fs.existsSync(options.dir)) throw new MeowDBError('The directory must be valid');
        if (options.name.length < 1) throw new MeowDBError('The name must have more of one character');

        options.raw = !!options.raw;

        /**
         * The options of the database
         * @type {MeowDBPrivateOptions}
         * @private
         * @readonly
         */
        Object.defineProperty(this, '_options', {
            value: {
                ...options,
                file: path.join(options.dir, `${options.name}.json`)
            }
        });

        /**
         * The database utils
         * @type {MeowDBUtils}
         * @private
         * @readonly
         */
        Object.defineProperty(this, '_utils', {
            value: new MeowDBUtils(this._options.file)
        });

        if (!fs.existsSync(this._options.file)) fs.writeFileSync(this._options.file, '{}');
    }

    /**
     * Returns all data stored in the database
     * @returns {MeowDBObject} All data
     */
    all() {
        const data = this._utils.getAll();
        if (!this._options.raw && typeof data === 'object' && !(data instanceof Array))
            return new MeowDBObject(data, '/', this._options.file);
        else return data;
    }

    /**
     * Creates an element in the database (only if it doesn't exists already)
     * @param {string} id The ID to create
     * @param {any} initialValue The initial value
     * @returns {any} The created element
     * @throws {MeowDBError} If the ID or initial value is invalid
     */
    create(id, initialValue) {
        if (!MeowDBUtils.validId(id)) throw new MeowDBError('Invalid ID provided, it shouldn\'t contain blank properties');
        if (!MeowDBUtils.validValue(initialValue)) throw new MeowDBError('The value must be a string, number, boolean, undefined or an object');
        if (this._utils.get(id)) return this._utils.get(id);
        return this._utils.set(id, initialValue, true);
    }

    /**
     * Deletes an element from the database
     * @param {string} id The ID of the element
     * @returns {any} The deleted element
     * @throws {MeowDBError} If the ID is invalid or the element doesn't exists
     */
    delete(id) {
        if (!MeowDBUtils.validId(id)) throw new MeowDBError('Invalid ID provided, it shouldn\'t contain blank properties');
        const data = this._utils.get(id);
        if (!data) throw new MeowDBError('That element doesn\'t exists in the database');
        this._utils.set(id, undefined, false);
        return data;
    }

    /**
     * Checks if an element exists in the database
     * @param {string} id The ID to check
     * @returns {boolean} If it exists
     * @throws {MeowDBError} If the ID is invalid
     */
    exists(id) {
        if (!MeowDBUtils.validId(id)) throw new MeowDBError('Invalid ID provided, it shouldn\'t contain blank properties');
        return Boolean(this._utils.get(id));
    }

    /**
     * Gets an element of the database
     * @param {string} id The ID of the element
     * @returns {(MeowDBObject|any)} The element
     * @throws {MeowDBError} If the ID is invalid
     */
    get(id) {
        if (!MeowDBUtils.validId(id)) throw new MeowDBError('Invalid ID provided, it shouldn\'t contain blank properties');
        const data = this._utils.get(id);
        if (!this._options.raw && typeof data === 'object' && !(data instanceof Array)) return new MeowDBObject(data, id, this._options.file);
        else return data;
    }

    /**
     * Sets the value of an element in the database
     * @param {string} id The ID of the element
     * @param {any} value The value to be setted
     * @returns {any} The value setted
     * @throws {MeowDBError} If the ID or value is invalid
     */
    set(id, value) {
        if (!MeowDBUtils.validId(id)) throw new MeowDBError('Invalid ID provided, it shouldn\'t contain blank properties');
        if (!MeowDBUtils.validValue(value)) throw new MeowDBError('The value must be a string, number, boolean, undefined or an object');
        return this._utils.set(id, value, false);
    }

    /**
     * Finds an element in the database
     * @param {function} callback The function to check elements
     * @param {string} id The ID to start checking
     * @returns {(MeowDBObject|any)} The element
     * @throws {MeowDBError} If the ID or callback is invalid
     */
    find(callback, id = '/') {
        if (id !== '/' && !MeowDBUtils.validId(id)) throw new MeowDBError('Invalid ID provided, it shouldn\'t contain blank properties');
        if (typeof callback !== 'function') throw new MeowDBError('The callback must be a function');
        const data = id === '/' ? this._utils.getAll() : this._utils.get(id);
        if (!data) return undefined;
        const element = Object.entries(data).find(([, e]) => callback(e));
        if (!element || !element[0]) return undefined;
        if (!this._options.raw && typeof element[1] === 'object' && !(element[1] instanceof Array)) return new MeowDBObject(element[1], id === '/' ? element[0] : `${id}.${element[0]}`, this._options.file);
        else return element[1];
    }

    /**
     * Filters elements in the database
     * @param {function} callback The function to filter the elements
     * @param {string} id The ID to start filtering
     * @returns {(MeowDBObject|any)[]} The elements (MeowDBObject if they're objects, array with ID and value if not)
     * @throws {MeowDBError} If the ID or callback is invalid
     */
    filter(callback, id = '/') {
        if (id !== '/' && !MeowDBUtils.validId(id)) throw new MeowDBError('Invalid ID provided, it shouldn\'t contain blank properties');
        if (typeof callback !== 'function') throw new MeowDBError('The callback must be a function');
        const data = id === '/' ? this._utils.getAll() : this._utils.get(id);
        if (!data) return undefined;
        const elements = Object.entries(data).filter(([, e]) => callback(e));
        if (!elements) return undefined;
        if (!this._options.raw && elements.every((e) => typeof e[1] === 'object' && !(e[1] instanceof Array))) return elements.map((e) => new MeowDBObject(e[1], id === '/' ? e[0] : `${id}.${e[0]}`, this._options.file));
        else return elements;
    }
}

module.exports = MeowDB;