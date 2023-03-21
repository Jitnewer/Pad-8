import { Controller } from "./controller.js";
import {TrialLessonRepository} from "../repositories/trialLessonRepository.js";

export class TrialLessonController extends Controller {
    #trialLessonView;
    #trialLessonRepository

    constructor() {
        super();
        this.#trialLessonRepository = new TrialLessonRepository();
        this.#setupView();
        this.#getTrialLessonData();
    }

    async #setupView() {
       this.#trialLessonView = await super.loadHtmlIntoContent("html_views/triallesson.html");

       // this.#createTrialLesson();

        this.#trialLessonView.querySelector(".Apply").addEventListener("click",
            (event) => this.#applySE(event));
    }

    async #applySE(event) {
        event.preventDefault();
    }

    async #getTrialLessonData() {
        const data = await this.#trialLessonRepository.getTrialLessons();
        console.log(data);
    }

    #createTrialLesson () {
        const testLessonContainerElement = document.createElement("div");
        testLessonContainerElement.classList.add("Testlesson-container");
    }
}
