/**
 * @author Jit Newer
 */
import {NetworkManager} from "../framework/utils/networkManager.js";

export class TrialLessonRepository {
    #networkManager
    #route

    constructor() {
        this.#route = "/trialLesson"
        this.#networkManager = new NetworkManager();
    }

    /**
     * Request to DB to get all trial lessons
     * @returns {Promise<*>}
     */
    getTrialLessons() {
        return this.#networkManager.doRequest(`${this.#route}`, "GET");
    }

    applyTrialLesson() {
        return this.#networkManager.doRequest(`${this.#route}`, "POST");
    }
}