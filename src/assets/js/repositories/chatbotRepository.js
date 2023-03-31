/**
 * @author Kevin Isaza
 */

import {NetworkManager} from "../framework/utils/networkManager.js";

export class chatbotRepository {
    #networkManager;
    #route;

    constructor() {
        this.#route = "/chatbot";
        this.#networkManager = new NetworkManager();
    }

    getStudyInformation(id = null) {
        let query = "SELECT * FROM chatbot";
        if (id !== null) {
            query += ` WHERE id = ${id}`;
        }
        return this.#networkManager.doRequest(this.#route, "GET", { query });
    }


}
