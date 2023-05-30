class mapRoutes {
    #app;

    #databaseHelper = require("../framework/utils/databaseHelper.js");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");

    constructor(app) {
        this.#app = app;
        this.#saveMap();
    }

    #saveMap() {
        this.#app.post("/adminMap", async (req, res) => {
            try {
                const filePath = req.body.files;
                const fileUrl = convertToUrl(filePath);

                const data = await this.#databaseHelper.handleQuery({
                    query: "INSERT INTO map (floor, files, filename) VALUES(?, ?, ?)",
                    values: [req.body.floor, fileUrl, req.body.filename]
                });
                if (data.floor) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({ id: data.floor });
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({ reason: e });
            }
        });
    }

    #getMap() {
        this.#app.get("/adminMap", async (req, res)=> {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM map WHERE idMap"
                })

                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({ reason: "map does not exist"});
            }
        })
    }
}

function convertToUrl(filePath) {
    const baseUrl = 'https://example.com';
    const fileUrl = `${baseUrl}/${encodeURIComponent(filePath)}`;
    return fileUrl;
}

module.exports = mapRoutes;
