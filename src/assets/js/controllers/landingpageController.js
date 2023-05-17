import { Controller } from "./controller.js";
import { LandingpageRepository } from "../repositories/landingpageRepository.js";
import { App } from "../app.js";

export class LandingpageController extends Controller {
    #landingpageView;

    constructor() {
        super();
        this.#setupView();
    }

    async #setupView() {
        this.#landingpageView = await super.loadHtmlIntoContent("html_views/landingpage.html");

        const editproefButton = this.#landingpageView.querySelector(".editproef");
        editproefButton.addEventListener("click", () => {
            App.loadController(App.CONTROLLER_TRIALLESSON);
        });

        const editstudieButton = this.#landingpageView.querySelector(".editstudie");
        editstudieButton.addEventListener("click", () => {
            App.loadController(App.CONTROLLER_ADMIN_DASHBOARD_Study);
        });

        console.log(this.#landingpageView);

        document.getElementById("content").appendChild(this.#landingpageView);
    }
}// dit is voor de tag

