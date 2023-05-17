import { NetworkManager } from "../framework/utils/networkManager.js";

export class mapRepository {
    #networkManager;
    #route;

    constructor() {
        this.#route = "/map"
        this.#networkManager = new NetworkManager();
    }

    async getFloors() {
        return await this.#networkManager.doRequest(this.#route, "GET");
    }

    async getFloor(floor) {
        return await this.#networkManager.doRequest(`${this.#route}/${floor}`, "GET");
    }
}