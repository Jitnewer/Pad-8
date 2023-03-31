/**
 * @author Jit Newer
 */
import {NetworkManager} from "../framework/utils/networkManager.js";

class SendMailRepository {
    #networkManager
    #route

    constructor() {
        this.#networkManager = new NetworkManager();
        this.#route = "/sendMail";
    }

    async sendMail() {
        return this.#networkManager.doRequest(`${this.#route}`, "POST");
    }
}