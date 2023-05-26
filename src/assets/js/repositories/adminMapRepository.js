import {NetworkManager} from "../framework/utils/networkManager.js";

export class adminMapRepository {
    #networkManager;
    #route;

    constructor() {
        this.#route = "/adminMap";
        this.#networkManager = new NetworkManager();
    }

    saveMap(floor, files, filename) {
        return this.#networkManager.doRequest(this.#route, "POST", {floor: floor, files: files, filename: filename})
    }

    // getMap(floor, filename) {
    //     return this.#networkManager.doRequest(this.#route, "GET", {floor: floor, files: files, filename: filename})
    // }
}