/**
 * MeowDB options object used to create the database
 */
interface MeowDBOptions {
    /**
     * The directory absolute path of the database
     */
    dir: string;

    /**
     * The name of the database
     */
    name: string;
}

/**
 * Private MeowDB options inside the MeowDB class
 */
interface MeowDBPrivateOptions extends MeowDBOptions {
    /**
     * The file of the database
     */
    file: string;
}

/**
 * Class representing a error from MeowDB
 */
declare class MeowDBError extends Error { }

/**
 * Class that contains every method to parse options or modify data
 */
declare class MeowDBUtils {
    /**
     * The file that contains the data
     */
    public file: string;

    /**
     * MeowDBUtils class
     * @param {string} file The file that contains the data
     */
    constructor(file: string);

    /**
     * Checks if an ID is valid
     * @param {string} id The ID to check
     * @returns {Boolean} If it's valid
     */
    public validId(id: string): Boolean;

    /**
     * Checks if a value is valid to store
     * @param {any} value The value to check
     * @returns {Boolean} If it's valid
     */
    public validValue(value: any): Boolean;

    /**
     * Converts any valid data to string
     * @param {any} data The data to convert in a string
     * @returns {string} The data converted
     */
    public stringifyData(data: any): string;

    /**
     * Returns all the data stored
     * @returns {Object} The data
     */
    public getAll(): Object;

    /**
     * Gets an element stored
     * @param {string} id The ID of the element to get
     * @returns {any} The element
     */
    public get(id: string): any;

    /**
     * Sets an element and stores it
     * @param {string} id The ID of the element to set
     * @param {any} data The value of the element
     * @param {Boolean} create If it's in creation mode
     * @returns {Object} The new value
     */
    public set(id: string, data: any, create: Boolean): Object;
}

/**
 * A Object from a database
 */
declare interface MeowDBObject {
    /**
     * A property of the object
     */
    [property: string]: any;

    /**
     * Saves the modified object
     */
    save(): Object;
}

/**
 * Class representing a database
 */
declare class MeowDB {
    /**
     * The MeowDB private options
     */
    private _options: MeowDBPrivateOptions;

    /**
     * The MeowDB private utils
     */
    private _utils: MeowDBUtils;

    /**
     * Create or get a database.
     * @param {MeowDBOptions} options MeowDB options object
     * @throws {MeowDBError} If any value is invalid
     */
    constructor(options: MeowDBOptions);

    /**
     * Returns all data stored in the database
     * @returns {MeowDBObject} All the data
     */
    public all(): MeowDBObject;

    /**
     * Creates an element in the database (only if it doesn't exists already)
     * @param {string} id The ID to create
     * @param {*} initialValue The initial value
     * @returns {MeowDBError|Object} The created element
     */
    public create(id: string, initialValue: any): MeowDBError | Object;

    /**
     * Deletes an element from the database
     * @param {string} id The ID of the element
     * @returns {MeowDBError|Object} The deleted object
     */
    public delete(id: string): MeowDBError | Object;

    /**
     * Checks if an element exists in the database
     * @param {string} id The ID to check
     * @returns {MeowDBError|Boolean} If it exists
     */
    public exists(id: string): MeowDBError | Boolean;

    /**
     * Gets an element of the database
     * @param {string} id The ID of the element
     * @returns {*} The element
     */
    public get(id: string): any;

    /**
     * Sets the value of an element in the database
     * @param {string} id The ID of the element
     * @param {*} value The value to be setted
     * @returns {MeowDBError|Object} The value setted
     */
    public set(id: string, value: any): MeowDBError | Object;
}

export = MeowDB;