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

    StudyInformation(nameStudy, information) {
        console.log(this.#route);
        return this.#networkManager.doRequest(this.#route, "POST",
            {nameStudy:nameStudy, Admin_IdAdmin:1, information:information}
            )
    }
}
