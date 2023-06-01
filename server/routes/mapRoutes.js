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
        this.#uploadFile();
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
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({ id: data.insertId });
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({ reason: e });
            }
        });
    }

    #getMaps() {
        this.#app.get("/adminMap", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT idMap, floor, filename FROM map",
                });
                const response = data.map(({ idMap, floor, filename }) => ({ id: idMap, floor, filename }));

                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json(response);
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({ reason: "Map does not exist" });
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
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({ message: "Map deleted successfully" });
                } else {
                    res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({ message: "Map not found" });
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({ reason: e });
            }
        });
    }

    #updateMap() {
        this.#app.put("/adminMap/:idMap", async (req, res) => {
            try {
                const idMap = req.params.idMap;
                const { floor, filename } = req.body;

                const result = await this.#databaseHelper.handleQuery({
                    query: "UPDATE map SET floor = ?, filename = ? WHERE idMap = ?",
                    values: [floor, filename, idMap],
                });

                if (result.affectedRows > 0) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({ message: "Map updated successfully" });
                } else {
                    res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({ message: "Map not found" });
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({ reason: e });
            }
        });
    }

    #uploadFile() {
        this.#app.post("/upload", async (req, res) => {
            try {
                // Handle the file upload logic here
                // Save the file to the appropriate directory
                // Generate a unique file path or filename for it
                // Respond with the file path or any relevant information about the uploaded file in the server's response
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({ reason: e });
            }
        });
    }

    #getImage() {
        this.#app.get("/maps/:filename/upload", async (req, res) => {
            try {
                const filename = req.params.filename;

                // TODO: Fetch the image from the database based on the filename
                const image = await this.#fetchImageFromDatabase(filename);

                if (image) {
                    res.setHeader("Content-Type", "image/jpg"); //
                    res.send(image);
                } else {
                    res.status(this.#httpErrorCodes.NOT_FOUND_CODE).json({ message: "Image not found" });
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.INTERNAL_SERVER_ERROR_CODE).json({ reason: e });
            }
        });
    }

    async #fetchImageFromDatabase(filename) {
        const data = await this.#databaseHelper.handleQuery({
            query: "SELECT files FROM map WHERE filename = ?",
            values: [filename],
        });

        if (data && data.length > 0) {
            return data[0].files;
        } else {
            return null;
        }
    }
}

function convertToUrl(filePath) {
    const baseUrl = "http://localhost:3000/";
    const fileUrl = `${baseUrl}/${encodeURIComponent(filePath)}`;
    return fileUrl;
}

module.exports = mapRoutes;
