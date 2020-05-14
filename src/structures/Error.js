/** Class representing a error from MeowDB. */
class MeowDBError extends Error {
    /**
     * Creates an error.
     * @param {string} msg Descriptive message of the error
     */
    constructor(msg = "Unknown error") {
        super();
        this.name = "MeowDB";
        this.message = msg;
    }
}

module.exports = MeowDBError;