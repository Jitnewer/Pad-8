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
     * Request to database to get all trial lessons
     * @returns {Promise<*>}
     */
    getTrialLessons() {
        return this.#networkManager.doRequest(`${this.#route}`, "GET");
    }

    getCount(id) {
        const countRoute = `${this.#route}/${id}`;
        return this.#networkManager.doRequest(countRoute, "GET");
    }
}