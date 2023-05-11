
class mapRoutes {
    #app;

    #databaseHelper = require("../framework/utils/databaseHelper.js");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");

    constructor(app) {
        this.#app = app;
        this.#saveMap();

    }

    #saveMap() {
        this.#app.post("/adminDashboard", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "INSERT INTO map (idMap, floor, files, filename, Admin_idAdmin) VALUES(?, ?, ?, ?)",
                    values: [req.body.name, req.body.idMap, req.body.floor, req.body.files, req.body.filename, req.body.Admin_idAdmin]
                });
                if (data.idMap) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({id: data.idMap});
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }
}

module.exports = mapRoutes;