import { NetworkManager } from "../framework/utils/networkManager.js";

export class ChatbotQARepository {
    #networkManager;
    #route;

    constructor() {
        this.#route = "/chatbot";
        this.#networkManager = new NetworkManager();
    }

    async getAllQuestionsAnswers() {
        const response = await this.#networkManager.doRequest(this.#route, "GET");
        return response.data;
    }

    updateQuestionAnswer(id, question, answer) {
        return this.#networkManager.doRequest(`${this.#route}/${id}`, "PUT", { question, answer });
    }

    createQuestionAnswer(id, question, answer) {
        return this.#networkManager.doRequest(this.#route, "POST", { id, question, answer });
    }

    deleteQuestionAnswer(id) {
        return this.#networkManager.doRequest(`${this.#route}/${id}`, "DELETE");
    }
}
