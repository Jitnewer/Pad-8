/**
 * This class contains ExpressJS routes specific for the study entity
 * this file is automatically loaded in app.js
 *
 * @author Justin Chan
 */

class StudyRoutes {
    #app;
    #databaseHelper = require("../framework/utils/databaseHelper.js");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");


    constructor(app) {
        this.#app = app;

        this.#getStudy();
        this.#getType();
    }

    #getStudy() {
        this.#app.get("/study", async (req, res) => {
            try {
                const study = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM study"
                })
                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json(study);
            } catch (e) {
                console.log(e);
            }
        })
    }
    #getType() {
        this.#app.get("/study/:type", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT DISTINCT type FROM study"
                });
                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        })
    }
}

module.exports = StudyRoutes;