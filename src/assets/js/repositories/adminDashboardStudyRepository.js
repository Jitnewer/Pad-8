/**
 * @author Justin Chan
 */

import {NetworkManager} from "../framework/utils/networkManager.js";

export class AdminDashboardStudyRepository {
    #networkManager;
    #route;

    constructor() {
        this.#route = "/adminDashboardStudy";
        this.#networkManager = new NetworkManager();
    }

    saveStudy(name, location){
        console.log(this.#route);
        return this.#networkManager.doRequest(this.#route, "POST",
            {name: name,location: location})
    }
    getAdminDashboardStudyInformation(nameStudy, information) {
        console.log(this.#route);
        return this.#networkManager.doRequest(this.#route, "GET"
            // , {nameStudy:nameStudy,Admin_idAdmin:1,information:information}
        );
    }

    sendAdminDashboardStudyInformation(nameStudy, information) {
        console.log(this.#route);
        return this.#networkManager.doRequest(this.#route, "POST");
    }

    deleteAdminDashboardStudyInformation(nameStudy) {
        console.log(this.#route);
        return this.#networkManager.doRequest(`${this.#route}/${nameStudy}`, "DELETE");
    }
}