/**
 * @author Justin Chan & Phillipe Bekkers
 */

import {NetworkManager} from "../framework/utils/networkManager.js";

export class AdminDashboardStudyRepository {
    #networkManager;
    #route;

    constructor() {
        this.#route = "/adminDashboardStudy";
        this.#networkManager = new NetworkManager();
    }

    createStudy(nameStudy, information, type) {
        return this.#networkManager.doRequest(this.#route,
            "POST", {nameStudy: nameStudy,information: information,type: type})
    }
    getAdminDashboardStudyInformation() {
        console.log(this.#route);
        return this.#networkManager.doRequest(this.#route, "GET");
    }

    getAdminDashboardStudyType() {
        console.log(this.#route);
        return this.#networkManager.doRequest("/adminDashboardStudy/:type", "GET");
    }

    deleteAdminDashboardStudyInformation(nameStudy) {
        console.log(this.#route);
        return this.#networkManager.doRequest(`${this.#route}/${nameStudy}`, "DELETE");
    }
}