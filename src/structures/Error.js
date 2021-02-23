/** Class representing a error from MeowDB. */
class MeowDBError extends Error {
    /**
     * Creates an error.
     * @param {string} message Descriptive message of the error
     */
    constructor(message = "Unknown error") {
        super();
        /**
         * The name of the error
         * @type {string}
         */
        this.name = "MeowDB";

        /**
         * The message of the error
         * @type {string}
         */
        this.message = message;
    }
}

module.exports = MeowDBError;