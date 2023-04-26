/**
 * Routes file for trial lesson
 * @author Chant & Kevin
 */
class trialLessonRoutes{
    #app;
    #databaseHelper = require("../framework/utils/databaseHelper.js");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");

    constructor(app) {
        this.#app = app;
        this.#getLessons();
        this.#getOldCount();
    }

    /**
     * @author Jit Newer
     * Get all trial lessons from Database
     */
    #getLessons() {
        this.#app.get("/trialLesson", async (req, res)=> {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM testlesson WHERE Admin_idAdmin"
                })

                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({ reason: e });
            }
        })
    }

    #getOldCount() {
        this.#app.get("/trialLesson/:id", async (req, res)=> {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT clicked, capacity FROM testlesson WHERE id = ?",
                    values: [res.params.id]
                });

                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({data});
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        })
    }
}
module.exports = trialLessonRoutes;