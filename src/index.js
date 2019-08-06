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
     * @return {object} The object you just created
     * @return {ObjectDB} If it's object it returns a ObjectDB
     * @throws {ErrorDB}
     */
    create(id, sValue = {}) {
        if (!(Utils.checkId(id))) throw new ErrorDB("Invalid ID to store data");
        var data = Utils.createData(id, path.join(dir, `${this._name}.json`), sValue);
        if (typeof data === "object" && !(data instanceof Array)) return new ObjectDB(dir, this._name, id, sValue);
        else return data;
    }

    /**
     * Get all data from database
     * @return {object} All data from database
     */
    all() {
        return Utils.readAllData(path.join(dir, `${this._name}.json`));
    }

    /**
     * Get data of an element in the database
     * @param {string} id The ID of element to get
     * @return {ObjectDB} If it's object it returns a ObjectDB
     * @return {any} The information
     * @throws {ErrorDb}
     */
    get(id) {
        if (!(Utils.checkId(id))) throw new ErrorDB("Invalid ID to get data");
        let data = Utils.getData(id, path.join(dir, `${this._name}.json`));
        if (typeof data === "object" && !(data instanceof Array)) return new ObjectDB(dir, this._name, id, data);
        else return data;
    }

    /**
     * Set data of an element in the database
     * @param {string} id The ID of element to edit
     * @param {any} value The value to set (if not defined, the element will be undefined)
     * @return {any} The object you just modified
     * @return {ObjectDB} If it's object it returns a ObjectDB
     * @throws {ErrorDB}
     */
    set(id, value) {
        if (!(Utils.checkId(id))) throw new ErrorDB("Invalid ID to set data");
        var data = Utils.setData(id, path.join(dir, `${this._name}.json`), value);
        if (typeof data === "object" && !(data instanceof Array)) return new ObjectDB(dir, this._name, id, value)
        else return data;
    }
    /**
     * Sort all entries from a ID in a respective element
     * @param {string} id The object ID to sort that element (* for all IDs)
     * @param {string} element The element (property) to check
     * @param {boolean} ascending If the data must be ascending (default: false)
     * @return {Array} An array with the data sorted
     * @throws {ErrorDb}
     */
    sort(id, element, ascending = false) {
        if (!(Utils.checkId(id, true))) throw new ErrorDB("Invalid ID to sort data");
        if (!(Utils.checkName(element))) throw new ErrorDB("Invalid element to sort data");
        let data = Utils.getData(id, path.join(dir, `${this._name}.json`), true);
        if (typeof data !== "object") throw new ErrorDB("Invalid ID to sort data");
        if (!data[Object.keys(data)[0]][element]) throw new ErrorDB("Invalid element to sort data");
        let dataSort = Object.entries(data).sort((a, b) => {
            if (ascending) return a[1][element] - b[1][element];
            return b[1][element] - a[1][element];
        });
        return dataSort;
    }
}

module.exports = (dbDir) => {
    if (typeof dbDir !== "string") dbDir = require.main ? path.join(require.main.dirname, "meow-databases") : path.join(__dirname, "meow-databases");
    if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir);
    if (!fs.statSync(dbDir).isDirectory()) fs.mkdirSync(dbDir);
    dir = dbDir;
    return MeowDB;
}
