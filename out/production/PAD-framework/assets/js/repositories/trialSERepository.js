/**
 * @author Jit Newer
 */
import {NetworkManager} from "../framework/utils/networkManager.js";

export class TrialSERepository {
    #networkManager
    #route

    constructor() {
        this.#route = "/trialSELesson"
        this.#networkManager = new NetworkManager();
    }

    /**
     * Request to add input data of trial lesson participant
     */
    applyTrialLesson(firstname, lastname, prefix, email, id) {
        return this.#networkManager.doRequest(`${this.#route}`, "POST", {"firstname": firstname, "lastname": lastname, "prefix": prefix, "email": email, "id": id});
    }
}