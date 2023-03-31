class ChatbotQARoute {
    #app;

    #databaseHelper = require("../framework/utils/databaseHelper.js");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");

    constructor(app) {
        this.#app = app;
        this.#createQuestionAnswer();
        this.#deleteQuestionAnswer();
        this.#getAllQuestionsAnswers();
    }

    #createQuestionAnswer() {
        this.#app.post("/chatbot", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "INSERT INTO chatbotqa (id, question, answer) VALUES(?, ?, ?)",
                    values: [req.body.id, req.body.question, req.body.answer]
                });
                if (data.insertId) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({id: data.insertId});
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }

    #deleteQuestionAnswer() {
        this.#app.delete("/chatbot/:id", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "DELETE FROM chatbotqa WHERE id = ?",
                    values: [req.params.id]
                });
                if (data.affectedRows > 0) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({message: "Question and answer deleted successfully."});
                } else {
                    res.status(this.#httpErrorCodes.ROUTE_NOT_FOUND_CODE).json({message: "Question and answer not found."});
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }

    #getAllQuestionsAnswers() {
        this.#app.get("/chatbot", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM chatbotqa"
                });
                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({data});
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }
}

module.exports = ChatbotQARoute;
