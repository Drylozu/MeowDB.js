declare module 'meowdb' {
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
     * Class representing an error from MeowDB
     */
    class MeowDBError extends Error { }

    /**
     * Class that contains every method to parse options or modify data
     */
    class MeowDBUtils {
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
         * @param {boolean} create If it's in creation mode
         * @returns {any} The new value
         */
        public set(id: string, data: any, create: boolean): any;

        /**
         * Checks if a value is valid to store
         * @param {any} value The value to check
         * @returns {boolean} If it's valid
         */
        static validValue(value: any): boolean;

        /**
         * Converts any valid data to string
         * @param {any} data The data to convert in a string
         * @returns {string} The data converted
         */
        static stringifyData(data: any): string;

        /**
         * Checks if an ID is valid
         * @param {string} id The ID to check
         * @returns {boolean} If it's valid
         */
        static validId(id: string): boolean;
    }

    /**
     * An Object from a database
     */
    class MeowDBObject {
        public readonly __id: string;
        public readonly __file: string;

        /**
         * A property of the object
         */
        [property: string]: any;

        /**
         * Saves the modified object
         */
        public save(): Record<string, any>;
    }

    /**
     * Class representing a database
     */
    export default class MeowDB {
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
         * @returns {(MeowDBObject|any)} All the data
         */
        public all(): MeowDBObject | any;

        /**
         * Creates an element in the database (only if it doesn't exists already)
         * @param {string} id The ID to create
         * @param {any} initialValue The initial value
         * @returns {any} The created element
         * @throws {MeowDBError} If the ID or initial value are invalid
         */
        public create(id: string, initialValue: any): any;

        /**
         * Deletes an element from the database
         * @param {string} id The ID of the element
         * @returns {any} The deleted element
         * @throws {MeowDBError} If the ID is invalid or the element doesn't exists
         */
        public delete(id: string): any;

        /**
         * Checks if an element exists in the database
         * @param {string} id The ID to check
         * @returns {boolean} If it exists
         * @throws {MeowDBError} If the ID is invalid
         */
        public exists(id: string): boolean;

        /**
         * Gets an element of the database
         * @param {string} id The ID of the element
         * @returns {(MeowDBObject|any)} The element
         * @throws {MeowDBError} If the ID is invalid
         */
        public get(id: string): MeowDBObject | any;

        /**
         * Sets the value of an element in the database
         * @param {string} id The ID of the element
         * @param {any} value The value to be setted
         * @returns {any} The value setted
         * @throws {MeowDBError} If the ID or value is invalid
         */
        public set(id: string, value: any): any;


        /**
         * Finds an element in the database
         * @param {Function} callback The function to check elements
         * @param {string} id The ID to start checking
         * @returns {(MeowDBObject|any)} The element
         * @throws {MeowDBError} If the ID or callback is invalid
         */
        public find(callback: (data: any) => boolean, id?: string): MeowDBObject | any;

        /**
         * Filters elements in the database
         * @param {Function} callback The function to filter the elements
         * @param {string} id The ID to start filtering
         * @returns {(MeowDBObject|any)[]} The elements (MeowDBObject[] if they're objects, array with ID and value if not)
         * @throws {MeowDBError} If the ID or callback is invalid
         */
        public filter(callback: (data: any) => boolean, id?: string): (MeowDBObject | any)[];
    }
}