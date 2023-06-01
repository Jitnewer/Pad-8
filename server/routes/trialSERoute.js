/**
 * Routes file for trialSE
 * @author Jit Newer
 */

class trialSERoute {
    #app;
    #databaseHelper = require("../framework/utils/databaseHelper.js");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");
    sendTrialEmail = require("../trialSEEmail.js");

    constructor(app) {
        this.#app = app;
        this.#apply();
    }

    /**
     * Puts user info in to db
     */
    #apply() {
        this.#app.post("/trialSELesson", async (req, res) => {
            const email = req.body.email;
            const id = req.body.id;
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            const prefix = req.body.prefix;

            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "INSERT INTO participant (firstname, lastname, prefix, email, testlesson_id) value (?, ?, ?, ?, ?)",
                    values: [firstname, lastname, prefix, email, id]
                })
                // sends the email in which it thanks the applied user.
                await this.sendTrialEmail(firstname,lastname,prefix,email);
                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });

        this.#app.get("/trialSELesson/mail", async (req, res) => {

            res.status(200);
        });
    }
}
module.exports = trialSERoute;