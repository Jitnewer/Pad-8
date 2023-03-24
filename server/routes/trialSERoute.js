/**
 * Routes file for trialSE
 * @author Chant & Jit Newer
 */
class trialSERoute{
    #app;
    #databaseHelper = require("../framework/utils/databaseHelper.js");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");
    #cryptoHelper = require("../framework/utils/cryptoHelper");

    constructor(app) {
        this.#app = app;
        this.#createTrialSE();
    }
    #createTrialSE(){
        this.#app.get("/trialSE", async (req,res)=> {
            const firstName = req.body.firstname;
            const lastname = req.body.lastname;
            const prefix = req.body.prefix;
            const mail = req.body.mail;
            const lessonName = req.body.lessonName;

            try {
                await this.#databaseHelper.handleQuery({
                    query: "CREATE TABLE ? (firstname VARCHAR(40) NOT NULL, lastname VARCHAR(40) NOT NULL, prefix VARCHAR(40), mail VARCHAR(40) NOT NULL, primary key (mail))",
                    value: [lessonName]
                });
            } catch (e) {
                console.log(e);
            }
        })
    }
}
module.exports = trialSERoute;