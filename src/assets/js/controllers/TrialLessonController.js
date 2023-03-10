import { Controller } from "./controller.js";

export class TrialLessonController extends Controller {
    #trialLessonView;

    constructor() {
        super();
        this.#setupView();
    }

    async #setupView() {
       return  this.#trialLessonView = await super.loadHtmlIntoContent("html_views/triallesson.html");
        document.querySelector("#trialBody").innerHTML = this.#trialLessonView;
    }

}
