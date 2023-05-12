import {NetworkManager} from "../framework/utils/networkManager.js";

export class adminMapRepository {
    #networkManager;
    #route;

    constructor() {
        this.#route = "/adminMap";
        this.#networkManager = new NetworkManager();
    }

    saveMap(floor, filename) {
        return this.#networkManager.doRequest(this.#route, "POST", {floor: floor, filename: filename})
    }
}