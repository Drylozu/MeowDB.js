const ObjectDB = require("./structures/object.js");
const ErrorDB = require("./structures/error.js");
const Utils = require("./utils.js");
const path = require("path");
const fs = require("fs");

/**
 * Represents a group of data
 */
class MeowDB {
    /**
     * Creates a new database
     * @param {string} name The name of the database
     */
    constructor(name) {
        if (!(await Utils.checkName(name))) throw new ErrorDB("Invalid name of database");
        Utils.create(this._dir, name);
        this._dbs.push(name);
        this._name = name;
    }

    /**
     * Creates a new object in the database
     * @param {string} id The ID to get from data
     * @param {*} sValue The value to store by default in the database (default: "{}")
     * @returns {void} Nothing
     */
    async create(id, sValue = {}) {
        if (!(await Utils.checkId(id))) return Promise.reject(new ErrorDB("Invalid ID to store data"));
        await Utils.createData(id, path.join(this._dir, this._name), sValue);
    }

    /**
     * Get all data from database
     * @returns {promise} All data from database
     */
    async all() {
        return Promise.resolve(await Utils.readAllData(path.join(this._dir, this._name)));
    }

    /**
     * Get data of a element in the database
     * @param {string} id The ID of element to get
     * @returns {promise} The information (if it's object it be a ObjectDB) or an error
     */
    async get(id) {
        if (!(await Utils.checkId(id))) return Promise.reject(new ErrorDB("Invalid ID to store data"));
        let data = await Utils.getData(id, path.join(this._dir, this._name));
        
    }

    /**
     * Sort all entries from a ID in a respective element
     * @param {string} id The object ID to sort that element
     * @param {string} element The element (property) to check
     * @param {boolean} ascending If the data must be ascending (default: true)
     * @returns {promise} An array with the data sorted or an error
     */
    async sort(id, element, ascending = true) {
        if (!(await Utils.checkId(id))) return Promise.reject(new ErrorDB("Invalid ID to sort data"));
        if (!(await Utils.checkName(element))) return Promise.reject(new ErrorDB("Invalid element to sort data"));
        let data = await Utils.getData(id, path.join(this._dir, this._name));
        if (typeof obj !== "object") return Promise.reject(new ErrorDB("Invalid ID to sort data"));
        let dataSort = Object.entries(data).sort(async (a, b) => {
            if (ascending) return a[1][element] - b[1][element];
            else return b[1][element] - a[1][element];
        });
        return Promise.resolve(dataSort);
    }
}

module.exports = async (dbDir) => {
    if (typeof dbDir !== "string") this._dir = require.main ? path.join(require.main.dirname, "databases") : __dirname;
    if (!fs.existsSync(dbDir)) throw new ErrorDB("Invalid directory to store databases");
    if (!fs.statSync(dbDir).isDirectory()) throw new ErrorDB("Invalid directory to store databases");
    this._dir = dbDir;
    this._dbs = [];
    return MeowDB;
}