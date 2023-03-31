class ChatboxRoutes {
    #app;
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");
    #databaseHelper = require("../framework/utils/databaseHelper.js");

    constructor(app) {
        this.#app = app;
        this.#createChat();
    }

    #createChat() {
        this.#app.get("/chatbot", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM chatbot",
                });
                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({ reason: e });
            }
        });
    }
}
//gains
module.exports = ChatboxRoutes;