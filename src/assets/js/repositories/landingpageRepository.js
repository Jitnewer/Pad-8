import {NetworkManager} from "../framework/utils/networkManager.js";


export class LandingpageRepository {

  #route
  #networkManager

  constructor() {
    this.#route = "/landingpage"
    this.#networkManager = new NetworkManager();
  }


async getSubject(){
  return await this.#networkManager.doRequest(this.#route, "GET");
}
}
// dit is voor de tag
