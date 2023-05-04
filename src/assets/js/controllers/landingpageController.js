//gayl

import {Controller} from "./controller.js";
import {LandingpageRepository} from "../repositories/landingpageRepository.js";


export class LandingpageController extends Controller{
  #landingpageRepository
  #landingpageView

  constructor() {
    super();
     this.#landingpageRepository = new LandingpageRepository();

    this.#setupView();
  }

  async #setupView(){
    this.#landingpageView = await super.loadHtmlIntoContent("html_views/landingpage.html");

    await this.#set()
    console.log(this.#landingpageView)
  }

   async #set () {
    let data = await this.#landingpageRepository.getSubject();

     console.log(data)
   }
}


