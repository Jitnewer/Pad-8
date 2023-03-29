/**
 * @author Justin Chan
 */

import {NetworkManager} from "../framework/utils/networkManager.js";

export class AdminDashboardStudyRepository {
    #networkManager;
    #route;

    constructor() {
        this.#route = "/study";
        this.#networkManager = new NetworkManager();
    }

    getAdminDashboardStudyInformation(nameStudy, information) {
        console.log(this.#route);
        return this.#networkManager.doRequest(this.#route, "GET");
    }

    sendAdminDashboardStudyInformation(nameStudy, information) {
        console.log(this.#route);
        return this.#networkManager.doRequest(this.#route, "POST");
    }

    deleteAdminDashboardStudyInformation(nameStudy, information) {
        console.log(this.#route);
        return this.#networkManager.doRequest(this.#route, "POST");
    }
}