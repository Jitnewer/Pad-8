/**
 * This class contains ExpressJS routes specific for the study entity
 * this file is automatically loaded in app.js
 *
 * @author Justin Chan
 */

class AdminDashboardStudyRoutes {
    #app;
    #databaseHelper = require("../framework/utils/databaseHelper.js");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");


    constructor(app) {
        this.#app = app;

        this.#getStudy();
        this.#deleteStudy();
        this.#postStudy();
    }

    #getStudy() {
        this.#app.get("/adminDashboardStudy", async (req, res) => {
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
    #postStudy() {
        this.#app.post("/adminDashboardstudy", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "INSERT INTO study (nameStudy, Admin_idAdmin, information, type) VALUES (?,1,?,?)",
                    values: [req.body.nameStudy, req.body.information,req.body.type]
                });
                if (data.affectedRows > 0) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({message: "Study sent successfully."});
                } else {
                    res.status(this.#httpErrorCodes.ROUTE_NOT_FOUND_CODE).json({message: "Study did not send"});
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        })
    }

    /**
     * Delete query for study
     */
    #deleteStudy() {
        this.#app.delete("/adminDashboardStudy/:nameStudy", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "DELETE FROM study WHERE nameStudy = ?",
                    values: [req.params.nameStudy]
                });
                if (data.affectedRows > 0) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({message: "Study deleted successfully."})
                } else {
                    res.status(this.#httpErrorCodes.ROUTE_NOT_FOUND_CODE).json({message: "Study not found."})
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        })
    }
}

module.exports = AdminDashboardStudyRoutes;