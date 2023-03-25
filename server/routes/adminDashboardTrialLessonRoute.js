/**
 * Routes file for adminDashboard entity
 * @author Chant Balci
 */

class adminDashboardTrialLessonRoute {
    #app;

    #databaseHelper = require("../framework/utils/databaseHelper.js");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");

    constructor(app) {
        this.#app = app;
        this.#saveTestlesson();
        this.#deleteTestlesson();
    }

    #saveTestlesson() {
        this.#app.post("/adminDashboard", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "INSERT INTO testlesson (name,Admin_idAdmin,timeDuration, date, location, room, subject,time) VALUES(?,1,?,?,?,?,?,?)",
                    values: [req.body.name, req.body.timeDuration, req.body.date, req.body.location, req.body.room, req.body.subject, req.body.time]
                });
                if (data.insertId) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({id: data.insertId});
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }

    #deleteTestlesson() {
        this.#app.delete("/adminDashboard/:id", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "DELETE FROM testlesson WHERE id = ?",
                    values: [req.params.id]
                });
                if (data.affectedRows > 0) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({message: "Testlesson deleted successfully."});
                } else {
                    res.status(this.#httpErrorCodes.NOT_FOUND_CODE).json({message: "Testlesson not found."});
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }
}
module.exports = adminDashboardTrialLessonRoute;
