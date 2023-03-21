import { Controller } from "./controller.js";
import {TrialLessonRepository} from "../repositories/trialLessonRepository.js";

export class TrialLessonController extends Controller {
    #trialLessonView;
    #trialLessonRepository

    constructor() {
        super();
        this.#trialLessonRepository = new TrialLessonRepository();
        this.#setupView();
    }

    async #setupView() {
       this.#trialLessonView = await super.loadHtmlIntoContent("html_views/triallesson.html");

       // this.#createTrialLesson();

        // this.#trialLessonView.querySelector(".Apply").addEventListener("click",
        //     (event) => this.#applySE(event));
        this.#createTrialLesson();
    }

    async #applySE(event) {
        event.preventDefault();
    }

    /**
     * @author Jit Newer
     * Creates all trial lessons from database
     * @returns {Promise<void>}
     */
    async #createTrialLesson () {
        const CLASS_NAME_ITEM = "item";
        let textNode;
        let elementLi;

        //Get trial lesson data
        const data = await this.#trialLessonRepository.getTrialLessons();

        //Trial lessons container
        const trialLessonContainer = this.#trialLessonView.querySelector(".trial-lessons-container");
        const amount = this.#trialLessonView.querySelector(".amount");
        textNode = document.createTextNode("Er zijn in totaal " + data.length + " proeflesssen beschikbaar!");
        amount.appendChild(textNode);

        //Create trial lessons
        for (let i = 0; i < data.length; i++) {
            //TrialLesson box
            const trialLesson = document.createElement("div");
            trialLesson.classList.add("trial-lessons");
            trialLessonContainer.appendChild(trialLesson);

            //TrialLesson name
            const trialLessonName = document.createElement("h2");
            trialLessonName.classList.add("name");
            textNode = document.createTextNode(data[i].name);
            trialLessonName.appendChild(textNode);
            trialLesson.appendChild(trialLessonName);

            //Trial lesson info
            const infoList = document.createElement("ul");
            infoList.classList.add("trial-lesson-info");
            trialLesson.appendChild(infoList);

            elementLi = document.createElement("li");
            elementLi.classList.add(CLASS_NAME_ITEM, "duration");
            textNode = document.createTextNode(data[i].duration);
            elementLi.appendChild(textNode);
            infoList.appendChild(elementLi);

            elementLi = document.createElement("li");
            elementLi.classList.add(CLASS_NAME_ITEM, "date");
            textNode = document.createTextNode(data[i].date);
            elementLi.appendChild(textNode);
            infoList.appendChild(elementLi);

            elementLi = document.createElement("li");
            elementLi.classList.add(CLASS_NAME_ITEM, "location");
            textNode = document.createTextNode(data[i].location);
            elementLi.appendChild(textNode);
            infoList.appendChild(elementLi);

            elementLi = document.createElement("li");
            elementLi.classList.add(CLASS_NAME_ITEM, "classroom");
            textNode = document.createTextNode(data[i].room);
            elementLi.appendChild(textNode);
            infoList.appendChild(elementLi);

            elementLi = document.createElement("li");
            elementLi.classList.add(CLASS_NAME_ITEM, "subject");
            textNode = document.createTextNode(data[i].subject);
            elementLi.appendChild(textNode);
            infoList.appendChild(elementLi);

            //Create apply button
            const applyButton = document.createElement("button");
            applyButton.classList.add("trial-lessons-apply");
            textNode = document.createTextNode("Inschrijven");
            applyButton.appendChild(textNode)
            trialLesson.appendChild(applyButton);
        }
    }
}
