import { NetworkManager } from "../framework/utils/networkManager.js";

export class adminMapRepository {
    #networkManager;
    #route;

    constructor() {
        this.#route = "/adminMap";
        this.#networkManager = new NetworkManager();
    }

    saveMap(floor, files, filename) {
        return this.#networkManager.doRequest(this.#route, "POST", { floor, files, filename });
    }

    getMap() {
        return this.#networkManager.doRequest(this.#route, "GET");
    }

    deleteMap(idMap) {
        const deleteRoute = `${this.#route}/${idMap}`;
        return this.#networkManager.doRequest(deleteRoute, "DELETE");
    }
}
