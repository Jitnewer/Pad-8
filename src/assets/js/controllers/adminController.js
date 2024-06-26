

import { Controller } from "./controller.js";
import { App } from "../app.js";

export class AdminController extends Controller {
  #adminView;

  constructor() {
    super();
    this.#setupView();
  }

  async #setupView() {
    this.#adminView = await super.loadHtmlIntoContent("html_views/admin.html");

    const editchatbotButton = this.#adminView.querySelector("#leftcolumn");
    editchatbotButton.addEventListener("click", () => {
      App.loadController(App.CONTROLLER_CHATBOT_QA);
    });

    const editplateButton = this.#adminView.querySelector("#content");
    editplateButton.addEventListener("click", () => {
      App.loadController(App.CONTROLLER_ADMINMAP);
    });


    const editproefButton = this.#adminView.querySelector("#rightcolumn");
    editproefButton.addEventListener("click", () => {
      App.loadController(App.CONTROLLER_ADMIN_DASHBOARD_TrialLesson);
    });

    const editstudieButton = this.#adminView.querySelector("#contentColumn");
    editstudieButton.addEventListener("click", () => {
      App.loadController(App.CONTROLLER_ADMIN_DASHBOARD_Study);
    });

    console.log(this.#adminView);

    document.getElementById("content").appendChild(this.#adminView);
  }
  // dit is voor de tag

}