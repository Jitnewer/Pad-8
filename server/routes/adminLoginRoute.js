class AdminLoginRoute {
    #app
    #databaseHelper = require("../framework/utils/databaseHelper.js");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");

    constructor(app) {
        this.#app = app;

    }

    #validateLogin () {
        this.#app.get("/admin_login", async (req, res) => {
           try {
               const data = await this.#databaseHelper.handleQuery({
                   query: "SELECT * FROM admin WHERE username = ?",
                   value: [req.body.name]
               });
           } catch (e) {
               res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
           }
        });
    }
}

module.exports = AdminLoginRoute;