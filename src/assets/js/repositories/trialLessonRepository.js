/**
 * @author Jit Newer
 */
import {NetworkManager} from "../framework/utils/networkManager.js";

export class TrialLessonRepository {
    #networkManager
    #route

    constructor() {
        this.#route = "/trialLesson";
        this.#networkManager = new NetworkManager();
    }

    /**
     * Get request to get all trial lessons
     * @returns {Promise<*>}
     */
    getTrialLessons() {
        return this.#networkManager.doRequest(`${this.#route}`, "GET");
    }
}