/**
 * @author Jit Newer
 */
class AdminLoginRoute {
    #app
    #databaseHelper = require("../framework/utils/databaseHelper.js");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");


    constructor(app) {
        this.#app = app;

        this.#validateLogin();
    }

    #validateLogin () {
        this.#app.post("/adminlogin", async (req, res) => {
            const username = req.body.username;
            const password = req.body.password;

           try {
               const data = await this.#databaseHelper.handleQuery({
                   query: "SELECT username, password FROM admin WHERE username = ? AND password = ?",
                   values: [username, password]
               });

               if (data.length === 1) {
                   res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({"username": data[0].username});
               } else {
                   res.status(this.#httpErrorCodes.AUTHORIZATION_ERROR_CODE).json({"reason": "Wrong username or password"});
               }
           } catch (e) {
               res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
           }
        });
    }
}

module.exports = AdminLoginRoute;