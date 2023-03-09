/**
 *  Repository for entity adminDashboard - also interacts with networkmanager
 *  @author Chant Balci
 */
import {NetworkManager} from "../framework/utils/networkManager.js";

export class AdminDashboardRepository{
    #networkManager;
    #route;
constructor() {
    this.#route = "/adminDashboards";
    this.#networkManager = new NetworkManager();
}
    saveTestlesson(name, timeDuration, date, location, room, subject){
    return this.#networkManager.doRequest(this.#route, "POST",
        {name: name, timeDuration: timeDuration, date: date, location: location, room: room, subject: subject})
 }
}
