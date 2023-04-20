/**
 * @author Kevin Isaza
 * Class representing routes for chatbox API
 */

class ChatboxRoutes {
    #app;
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");
    #databaseHelper = require("../framework/utils/databaseHelper.js");

    constructor(app) {
        this.#app = app;
        this.#createChat();
        this.#getQuestions();
        this.#getAnswer();
    }


    #createChat() {
        this.#app.get("/chatbot", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM chatbot",
                });
                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res
                    .status(this.#httpErrorCodes.BAD_REQUEST_CODE)
                    .json({ reason: e });
            }
        });
    }

    #getQuestions() {
        this.#app.get("/chatbot/questions", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    // Include 'id' field in the SELECT query
                    query: "SELECT id, question FROM chatbot LIMIT 3",
                });
                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res
                    .status(this.#httpErrorCodes.BAD_REQUEST_CODE)
                    .json({ reason: e });
            }
        });
    }
    #getAnswer() {
        this.#app.get("/chatbot/answer/:id", async (req, res) => {
            try {
                const questionId = req.params.id;
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT answer FROM chatbot WHERE id = ?",
                    values: [questionId],
                });
                console.log("Answer data:", data);
                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json(data[0]);
            } catch (e) {
                res
                    .status(this.#httpErrorCodes.BAD_REQUEST_CODE)
                    .json({ reason: e });
            }
        });
    }


}

module.exports = ChatboxRoutes;
