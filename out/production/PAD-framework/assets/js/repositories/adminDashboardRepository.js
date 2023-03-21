/**
 *  Repository for entity adminDashboard - also interacts with networkmanager
 *  @author Chant Balci
 */
import {NetworkManager} from "../framework/utils/networkManager.js";

export class AdminDashboardRepository{
    #networkManager;
    #route;
constructor() {
    this.#route = "/adminDashboard";
    this.#networkManager = new NetworkManager();
}
    saveTestlesson(name, timeDuration, date, location, room, subject){
        console.log(this.#route); // make sure this is set to the correct URL
        return this.#networkManager.doRequest(this.#route, "POST",
            {name: name,Admin_idAdmin:1, timeDuration: timeDuration, date: date, location: location, room: room, subject: subject})
 }
}
