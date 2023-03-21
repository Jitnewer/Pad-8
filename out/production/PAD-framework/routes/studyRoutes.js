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

        this.#createStudy();
    }

    #createStudy() {
        this.#app.get("/study", (req, res) => {
            res.send("API endpoint study gecalled")
        })
    }
}

module.exports = StudyRoutes;