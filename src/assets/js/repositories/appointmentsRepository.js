/**
 * Respository for Entity Appointments - interacts with netwerkmanager
 * @Author Kevin Isaza
 */
import {NetworkManager} from "../framework/utils/networkManager.js";

export  class AppointmentsRepository {
    #networkManager;
    #route;

    constructor() {
        this.#route = "/appointments"
        this.#networkManager = new NetworkManager();
    }
    createAppointment(name,email,date){
      return   this.#networkManager.doRequest(this.#route,"POST",
          {name: name, email: email,date: date})
    }
}
// dit is voor de tag
