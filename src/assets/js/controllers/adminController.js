// Gayl Reurslag


import {Controller} from "./controller.js";

export class AdminController extends Controller{
  #adminView

  constructor() {
    super();

    this.#setupView();
  }

  async #setupView(){
    this.#adminView = await super.loadHtmlIntoContent("html_views/admin.html");

    console.log(this.#adminView)
  }
}