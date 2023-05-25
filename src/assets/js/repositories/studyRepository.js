/**
 * @author Justin Chan
 */

import {NetworkManager} from "../framework/utils/networkManager.js";

export class StudyRepository {
    #networkManager;
    #route;

    constructor() {
        this.#route = "/study";
        this.#networkManager = new NetworkManager();
    }

    getStudyInformation(nameStudy, information) {
        console.log(this.#route);
        return this.#networkManager.doRequest(this.#route, "GET");
    }
    getType() {
        console.log(this.#route);
        return this.#networkManager.doRequest("/study/:type", "GET");
    }
}
