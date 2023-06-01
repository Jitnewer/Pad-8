class mapRoutes {
    #app;
    #databaseHelper = require("../framework/utils/databaseHelper.js");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");

    constructor(app) {
        this.#app = app;
        this.#saveMap();
        this.#getMaps();
        this.#deleteMap();
        this.#updateMap();
        this.#getImage();
    }

    #saveMap() {
        this.#app.post("/adminMap", async (req, res) => {
            try {
                const filePath = req.body.files;
                const fileUrl = convertToUrl(filePath);

                const data = await this.#databaseHelper.handleQuery({
                    query: "INSERT INTO map (floor, files, filename) VALUES(?, ?, ?)",
                    values: [req.body.floor, fileUrl, req.body.filename],
                });
                if (data.insertId) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({id: data.insertId});
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }

    #getMaps() {
        this.#app.get("/adminMap", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT idMap, floor, filename FROM map",
                });
                const response = data.map(({idMap, floor, filename}) => ({id: idMap, floor, filename}));

                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json(response);
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: "Map does not exist"});
            }
        });
    }

    #deleteMap() {
        this.#app.delete("/adminMap/:idMap", async (req, res) => {
            try {
                const idMap = req.params.idMap;
                const query = "DELETE FROM map WHERE idMap = ?";
                const values = [idMap];

                const result = await this.#databaseHelper.handleQuery({
                    query: query,
                    values: values,
                });

                if (result.affectedRows > 0) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({message: "Map deleted successfully"});
                } else {
                    res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({message: "Map not found"});
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }

    #updateMap() {
        this.#app.put("/adminMap/:idMap", async (req, res) => {
            try {
                const idMap = req.params.idMap;
                const {floor, filename} = req.body;

                const result = await this.#databaseHelper.handleQuery({
                    query: "UPDATE map SET floor = ?, filename = ? WHERE idMap = ?",
                    values: [floor, filename, idMap],
                });

                if (result.affectedRows > 0) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({message: "Map updated successfully"});
                } else {
                    res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({message: "Map not found"});
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }

    #getImage() {
        this.#app.get("/maps/:files", async (req, res) => {
            try {
                const files = req.params.files;

                // TODO: Fetch the image from the database based on the file path
                const image = await this.#fetchImageFromDatabase(files);

                if (image) {
                    res.sendFile(image);
                } else {
                    res.status(this.#httpErrorCodes.NOT_FOUND_CODE).json({message: "Image not found"});
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.INTERNAL_SERVER_ERROR_CODE).json({reason: e});
            }
        });
    }

    async #fetchImageFromDatabase(files) {
        const image = await database.query("SELECT files FROM map WHERE files = ?", [files]);

        if (image && image.length > 0) {
            return image[0].image;
        } else {
            return null;
        }
    }
}

function convertToUrl(filePath) {
    const baseUrl = "https://example.com";
    const fileUrl = `${baseUrl}/${encodeURIComponent(filePath)}`;
    return fileUrl;
}

module.exports = mapRoutes;
