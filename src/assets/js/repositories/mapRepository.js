import { NetworkManager } from "../framework/utils/networkManager.js";

export class mapRepository {
    #networkManager;
    #route;

    constructor() {
        this.#networkManager = new NetworkManager();
        this.#route = "/adminMap";
    }

    async getMaps() {
        return await this.#networkManager.doRequest(this.#route, "GET");
    }
}
