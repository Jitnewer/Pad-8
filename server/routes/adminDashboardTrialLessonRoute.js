/**
 * Routes file for adminDashboard entity
 * @author Chant Balci & Jit Newer
 */

class adminDashboardTrialLessonRoute {
    #app;

    #databaseHelper = require("../framework/utils/databaseHelper.js");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");

    constructor(app) {
        this.#app = app;
        this.#saveTestlesson();
        this.#deleteTestlesson();
        this.#updateClickedCount();
    }
// this enables the admin to save the fild in form in order to make a triallesson
    #saveTestlesson() {
        this.#app.post("/adminDashboard", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "INSERT INTO testlesson (name,Admin_idAdmin,timeDuration, date, location, room, subject,time, clicked, capacity) VALUES(?,1,?,?,?,?,?,?,0,?)",
                    values: [req.body.name, req.body.timeDuration, req.body.date, req.body.location, req.body.room, req.body.subject, req.body.time, req.body.capacity]
                });
                if (data.insertId) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({id: data.insertId});
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }
//this enables the admin to delete a whole triallesson
    #deleteTestlesson() {
        this.#app.delete("/adminDashboard/:id", async (req, res) => {
            try {
                // Delete trial lesson
                const data = await this.#databaseHelper.handleQuery({
                    query: "DELETE FROM testlesson WHERE id = ?",
                    values: [req.params.id]
                });

                // Delete all participants from database table where id equals trial lesson id
                await this.#databaseHelper.handleQuery({
                    query: "DELETE FROM participant WHERE id = ?",
                    values: [req.params.id]
                });

                if (data.affectedRows > 0) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({message: "Testlesson deleted successfully."});
                } else {
                    res.status(this.#httpErrorCodes.ROUTE_NOT_FOUND_CODE).json({message: "Testlesson not found."});
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }

    // the function is meant to count the amount of sended triallessons in order to give the user an indication about how many spots are left
    #updateClickedCount() {
        this.#app.put("/adminDashboard/updateClicked/:id", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "UPDATE testlesson SET clicked = clicked + 1 WHERE id = ?;",
                    values: [req.params.id]
                });
                if (data.affectedRows > 0) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({message: "Clicked count updated successfully."});
                } else {
                    res.status(this.#httpErrorCodes.ROUTE_NOT_FOUND_CODE).json({message: "Testlesson not found."});
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }
}
module.exports = adminDashboardTrialLessonRoute;
