/**
 *  Repository for entity adminDashboard - also interacts with networkmanager
 *  @author Chant Balci
 */
import {NetworkManager} from "../framework/utils/networkManager.js";

export class AdminDashboardTrialLessonRepository {
    #networkManager;
    #route;
    constructor() {
        this.#route = "/adminDashboard";
        this.#networkManager = new NetworkManager();
    }
    saveTestlesson(name, timeDuration, date, location, room, subject, time){
        console.log(this.#route);
        return this.#networkManager.doRequest(this.#route, "POST",
            {name: name,Admin_idAdmin:1, timeDuration: timeDuration, date: date, location: location, room: room, subject: subject, time: time, clicked:0})
    }
    deleteTestlesson(id) {
        return this.#networkManager.doRequest(`${this.#route}/${id}`, "DELETE");
    }
    updateClickedCount(id) {
        const route = `${this.#route}/updateClicked/${id}`;
        return this.#networkManager.doRequest(route, "PUT");
    }
}
