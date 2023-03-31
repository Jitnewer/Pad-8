/**
 * @author Jit Newer
 * This routes sends a confirmation mail
 */
class SendMailRoutes {
    #app;
    #databaseHelper = require("../framework/utils/databaseHelper.js");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");

    constructor(app) {
        this.#app = app;
        this.#sendConfirmation();
    }

    #sendConfirmation () {

    }
}

module.exports = SendMailRoutes;