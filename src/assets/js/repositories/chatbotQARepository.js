/**
 * @author: Kevin Isaza Arias
 * Class representing Repository  for chatbox API
 */

import { NetworkManager } from "../framework/utils/networkManager.js";

export class ChatbotQARepository {
    #networkManager;
    #route;

    constructor() {
        this.#route = "/chatbot";
        this.#networkManager = new NetworkManager();
    }

    createQuestionAnswer(id, question, answer) {
        return this.#networkManager.doRequest(this.#route, "POST", { id, question, answer });
    }

    deleteQuestionAnswer(id) {
        return this.#networkManager.doRequest(`${this.#route}/${id}`, "DELETE");
    }

    async getAllQuestionsAnswers() {
        const response = await this.#networkManager.doRequest(this.#route, "GET");
        return response.data;
    }
}
