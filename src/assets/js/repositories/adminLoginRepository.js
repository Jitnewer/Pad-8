/**
 * @author Jit Newer
 */
import {NetworkManager} from "../framework/utils/networkManager.js";

export class AdminLoginRepository {
    #networkManager
    #route

    constructor() {
        this.#route = "/adminlogin";
        this.#networkManager = new NetworkManager();
    }

    loginAdmin(username, password) {
        return this.#networkManager.doRequest(this.#route, "POST", {"username": username, "password": password});
    }
}