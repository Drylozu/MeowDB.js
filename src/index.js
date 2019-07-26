const ObjectDB = require("./structures/object.js");
const ErrorDB = require("./structures/error.js");
const Utils = require("./utils.js");
const path = require("path");
const fs = require("fs");
let dir = "";
let dbs = [];

/**
 * Represents a group of data
 */
class MeowDB {
    /**
     * Creates a new database
     * @param {string} name The name of the database
     */
    constructor(name) {
        if (!(Utils.checkName(name))) throw new ErrorDB("Invalid name of database");
        Utils.create(dir, name);
        dbs.push(name);
        this._name = name;
    }

    /**
     * Creates a new object in the database, if already exists it don't creates or modify anything
     * @param {string} id The ID to create and store data
     * @param {*} sValue The value to store by default in the database (default: "{}")
     * @returns {void} Nothing
     */
    async create(id, sValue = {}) {
        if (!(await Utils.checkId(id))) return Promise.reject(new ErrorDB("Invalid ID to store data"));
        await Utils.createData(id, path.join(dir, `${this._name}.json`), sValue);
    }

    /**
     * Get all data from database
     * @returns {promise} All data from database
     */
    async all() {
        return Promise.resolve(await Utils.readAllData(path.join(dir, `${this._name}.json`)));
    }

    /**
     * Get data of an element in the database
     * @param {string} id The ID of element to get
     * @returns {promise} The information (if it's object it be a ObjectDB) or an error
     */
    async get(id) {
        if (!(await Utils.checkId(id))) return Promise.reject(new ErrorDB("Invalid ID to get data"));
        let data = await Utils.getData(id, path.join(dir, `${this._name}.json`));
        if (typeof data === "object" && !(data instanceof Array)) return Promise.resolve(new ObjectDB(dir, this._name, id, data));
        else return Promise.resolve(data);
    }

    /**
     * Set data of an element in the database
     * @param {string} id The ID of element to edit
     * @param {*} value The value to set (if not defined, the element will be undefined)
     * @returns {void} Nothing
     */
    async set(id, value) {
        if (!(Utils.checkId(id))) return Promise.reject(new ErrorDB("Invalid ID to set data"));
        await Utils.setData(id, path.join(dir, `${this._name}.json`), value);
    }

    /**
     * Sort all entries from a ID in a respective element
     * @param {string} id The object ID to sort that element (* for all IDs)
     * @param {string} element The element (property) to check
     * @param {boolean} ascending If the data must be ascending (default: false)
     * @returns {promise} An array with the data sorted or an error
     */
    async sort(id, element, ascending = false) {
        if (!(await Utils.checkId(id, true))) return Promise.reject(new ErrorDB("Invalid ID to sort data"));
        if (!(await Utils.checkName(element))) return Promise.reject(new ErrorDB("Invalid element to sort data"));
        let data = await Utils.getData(id, path.join(dir, `${this._name}.json`), true);
        if (typeof data !== "object") return Promise.reject(new ErrorDB("Invalid ID to sort data"));
        if (!data[Object.keys(data)[0]][element]) return Promise.reject(new ErrorDB("Invalid element to sort data"));
        let dataSort = Object.entries(data).sort(async (a, b) => {
            if (ascending) return a[1][element] - b[1][element];
            return b[1][element] - a[1][element];
        });
        return Promise.resolve(dataSort);
    }
}

module.exports = async (dbDir) => {
    if (typeof dbDir !== "string") dir = require.main ? path.join(require.main.dirname, "databases") : __dirname;
    if (!fs.existsSync(dbDir)) throw new ErrorDB("Invalid directory to store databases");
    if (!fs.statSync(dbDir).isDirectory()) throw new ErrorDB("Invalid directory to store databases");
    dir = dbDir;
    return MeowDB;
}