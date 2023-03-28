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
    }

    /**
     * @author Jit Newer
     * Get all trial lessons that are created from Database
     */
    #getLessons() {
        this.#app.get("/trialLesson", async (req, res)=> {
            try {
                const test = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM testlesson WHERE Admin_idAdmin"
                })

                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json(test);
            } catch (e) {
                console.log(e);
            }
        })
    }
}
module.exports = trialLessonRoutes;