import { Controller } from "./controller.js";

export class TrialSEController extends Controller {
    #trialSEView;

    constructor() {
        super();
        this.#setupView();
    }

    async #setupView() {
        return  this.#trialSEView = await super.loadHtmlIntoContent("html_views/trialSE.html");
    }

}