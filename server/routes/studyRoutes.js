/**
 * This class contains ExpressJS routes specific for the study entity
 * this file is automatically loaded in app.js
 *
 * @author Justin Chan
 */

class StudyRoutes {
    #app;

    constructor(app) {
        this.#app = app;

        this.#getStudy();
    }

    #getStudy() {
        this.#app.get("/study", async (req, res) => {
            try {
                const study = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM study WHERE Admin_idAdmin"
                })
                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json(study);
            } catch (e) {
                console.log(e);
            }
        })
    }
}

module.exports = StudyRoutes;