/**
 * @author Justin Chan
 */

import {NetworkManager} from "../framework/utils/networkManager.js";

export class AdminDashboardStudyRepository {
    #networkManager;
    #route;

    constructor() {
        this.#route = "/study";
        this.#networkManager = new NetworkManager();
    }
}