/**
 * Routes file for trialSE
 * @author Chant & Jit Newer
 */
class trialSERoute{
    #app;
    #databaseHelper = require("../framework/utils/databaseHelper.js");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");

    constructor(app) {
        this.#app = app;
        this.#apply();
        this.#getTriallessonParticipant();
    }

    #apply() {
        this.#app.post("/trialSELesson", async (req, res) => {
            const email = req.body.email;
            const id = req.body.id;
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            const prefix = req.body.prefix;

            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "INSERT INTO participant (firstname, lastname, prefix, email, id) value (?, ?, ?, ?, ?)",
                    values: [firstname, lastname, prefix, email, id]
                })

                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({ reason: e });
            }
        })
    }

    #getTriallessonParticipant() {
        this.#app.get("/trialLessonParticipant", async (req, res)=> {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM participant",
                });

                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        })
    }
}
module.exports = trialSERoute;