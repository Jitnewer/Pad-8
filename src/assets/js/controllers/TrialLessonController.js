import { Controller } from "./controller.js";

export class TrialLessonController extends Controller {
    #trialLessonView;

    constructor() {
        super();
        this.#setupView();
    }

    async #setupView() {
       this.#trialLessonView = await super.loadHtmlIntoContent("html_views/triallesson.html");

        this.#trialLessonView.querySelector(".Apply").addEventListener("click",
            (event) => this.#applySE(event));
}
    async #applySE(event){
        event.preventDefault();
        window.location.replace("html_views/trialSE.html");
    }
}
