import { Controller } from "./controller.js";

export class TrialSEController extends Controller {
    #trialSEView;

    constructor(name) {
        super();
        this.#setupView(name);
    }

    async #setupView(name) {
        this.#trialSEView = await super.loadHtmlIntoContent("html_views/trialSE.html");

        let textNode = document.createTextNode(name + " proefles");
        this.#trialSEView.querySelector(".name").appendChild(textNode);

        this.#trialSEView.querySelector(".input-apply").addEventListener("click",
            (event) => this.#apply(event, name)
        )
    }

    #apply (event, name) {
        event.preventDefault();
    }
}