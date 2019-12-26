/**
 * Error to send from the MeowDB
 */
class MeowDBError extends Error {
    /**
     * @param {string} msg Descriptive message of the error
     */
    constructor(msg = "Unknow error") {
        super();
        this.name = "MeowDB";
        this.message = msg;
    }
}

module.exports = MeowDBError;
