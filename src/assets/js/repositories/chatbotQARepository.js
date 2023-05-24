import { NetworkManager } from "../framework/utils/networkManager.js";

export class ChatbotQARepository {
    #networkManager;
    #route;

    constructor() {
        this.#route = "/chatbot ";
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

    async createRelatedQuestion(parentVraagid, vraagid) {
        return this.#networkManager.doRequest("/relatedquestions", "POST", { parentVraagid, vraagid });
    }

    async deleteRelatedQuestion(id) {
        return this.#networkManager.doRequest(`/relatedquestions/${id}`, "DELETE");
    }


    updateRelatedQuestion(id, parentVraagid, vraagid) {
        return this.#networkManager.doRequest(`/relatedquestions/${id}`, "PUT", { parentVraagid, vraagid });
    }


    async getQuestionAnswerById(id) {
        const response = await this.#networkManager.doRequest(`${this.#route}/${id}`, "GET");
        return response.data;
    }

    async getAllRelatedQuestions() {
        const response = await this.#networkManager.doRequest(`/relatedquestions`, "GET");
        return response.data || [];
    }

    async getRelatedQuestions(parentVraagid) {
        const allRelatedQuestions = await this.getAllRelatedQuestions();
        return allRelatedQuestions.filter(rq => rq.parentVraagid === parentVraagid);
    }


// dit is voor de tag

}
