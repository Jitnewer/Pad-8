
class mapRoutes {
    #app;

    #databaseHelper = require("../framework/utils/databaseHelper.js");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");

    constructor(app) {
        this.#app = app;
        this.#saveMap();
    }

    #saveMap() {
        this.#app.post("/aMap", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "INSERT INTO map (floor, files, filename) VALUES(? , ? , ?)",
                    values: [req.body.floor, req.body.files, req.body.filename]
                });
                if (data.floor) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({id: data.floor});
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }
}

module.exports = mapRoutes;