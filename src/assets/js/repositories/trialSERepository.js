/**
 * @author Jit Newer
 */
import {NetworkManager} from "../framework/utils/networkManager.js";

export class TrialSERepository {
    #networkManager
    #trialLessonRoute
    #participantRoute

    constructor() {
        this.#trialLessonRoute = "/trialSELesson";
        this.#participantRoute = "/trialLessonParticipant";
        this.#networkManager = new NetworkManager();
    }

    /**
     * Request to add input data of trial lesson participant
     * @returns
     */
    applyTrialLesson(firstname, lastname, prefix, email, id) {
        return this.#networkManager.doRequest(`${this.#trialLessonRoute}`, "POST", {"firstname": firstname, "lastname": lastname, "prefix": prefix, "email": email, "id": id});
    }

    /**
     * @returns A list of triallesson participants
     */
    getParticipants() {
        return this.#networkManager.doRequest(`${this.#participantRoute}`, "GET");
    }
}