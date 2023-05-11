import {NetworkManager} from "../framework/utils/networkManager.js";

export class adminMapRepository {
    #networkManager;
    #route;

    constructor() {
        this.#route = "/map";
        this.#networkManager = new NetworkManager();
    }

    saveMap(idMap, floor, files, filename, Admin_idAdmin) {
        return this.#networkManager.doRequest(this.#route, "POST", {idMap: idMap, floor: floor, files: files, filename: filename, Admin_idAdmin: Admin_idAdmin})
    }
}