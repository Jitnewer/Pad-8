class ChatbotQARoute {
    #app;

    #databaseHelper = require("../framework/utils/databaseHelper.js");
    #httpErrorCodes = require("../framework/utils/httpErrorCodes.js");

    constructor(app) {
        this.#app = app;
        this.#createQuestionAnswer();
        this.#deleteQuestionAnswer();
        this.#getAllQuestionsAnswers();
        this.#updateQuestionAnswer();
        this.#getRelatedQuestions();
        this.#createRelatedQuestion();
        this.#updateRelatedQuestion();
        this.#deleteRelatedQuestion();
        this.#getAllRelatedQuestions();

    }
    #createQuestionAnswer() {
        this.#app.post("/chatbot", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "INSERT INTO chatbot ( question, answer) VALUES( ?, ?)",
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
                    query: "DELETE FROM chatbot WHERE id = ?",
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
                    query: "SELECT * FROM chatbot"
                });
                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({data});
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }

    #updateQuestionAnswer() {
        this.#app.put("/chatbot/:id", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "UPDATE chatbot SET question = ?, answer = ? WHERE id = ?",
                    values: [req.body.question, req.body.answer, req.params.id]
                });
                if (data.affectedRows > 0) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({ message: "Question and answer updated successfully." });
                } else {
                    res.status(this.#httpErrorCodes.ROUTE_NOT_FOUND_CODE).json({ message: "Question and answer not found." });
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({ reason: e });
            }
        });
    }


    #createRelatedQuestion() {
    this.#app.post("/relatedquestions", async (req, res) => {
        try {
            const data = await this.#databaseHelper.handleQuery({
                query: "INSERT INTO relatedquestions (parentVraagid, vraagid) VALUES(?, ?)",
                values: [req.body.parentVraagid, req.body.vraagid]
            });
            if (data.insertId) {
                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({id: data.insertId});
            }
        } catch (e) {
            res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
        }
    });
}
    #getRelatedQuestions() {
        this.#app.get("/relatedquestions/:parentVraagid", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM relatedquestions WHERE parentVraagid = ?",
                    values: [req.params.parentVraagid]
                });
                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({data});
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }
    #updateRelatedQuestion() {
        this.#app.put("/relatedquestions/:id", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "UPDATE relatedquestions SET parentVraagid = ?, vraagid = ? WHERE id = ?",
                    values: [req.body.parentVraagid, req.body.vraagid, req.params.id]
                });
                if (data.affectedRows > 0) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({ message: "Related question updated successfully." });
                } else {
                    res.status(this.#httpErrorCodes.ROUTE_NOT_FOUND_CODE).json({ message: "Related question not found." });
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({ reason: e });
            }
        });
    }
    #getAllRelatedQuestions() {
        this.#app.get("/relatedquestions", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "SELECT * FROM relatedquestions"
                });
                res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({data});
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({reason: e});
            }
        });
    }



    #deleteRelatedQuestion() {
        this.#app.delete("/relatedquestions/:id", async (req, res) => {
            try {
                const data = await this.#databaseHelper.handleQuery({
                    query: "DELETE FROM relatedquestions WHERE id = ?",
                    values: [req.params.id]
                });
                if (data.affectedRows > 0) {
                    res.status(this.#httpErrorCodes.HTTP_OK_CODE).json({ message: "Related question deleted successfully." });
                } else {
                    res.status(this.#httpErrorCodes.ROUTE_NOT_FOUND_CODE).json({ message: "Related question not found." });
                }
            } catch (e) {
                res.status(this.#httpErrorCodes.BAD_REQUEST_CODE).json({ reason: e });
            }
        });
    }
}


module.exports = ChatbotQARoute;
