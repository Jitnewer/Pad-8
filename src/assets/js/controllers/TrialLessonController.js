import {Controller} from "./controller.js";
import {TrialLessonRepository} from "../repositories/trialLessonRepository.js";
import {TrialSEController} from "./trialSEController.js";
import {AdminDashboardTrialLessonRepository} from "../repositories/adminDashboardTrialLessonRepository.js";

export class TrialLessonController extends Controller {
    #trialLessonView;
    #trialLessonRepository;
    #adminDashboardTrialLessonRepository;

    constructor() {
        super();
        this.#trialLessonRepository = new TrialLessonRepository();
        this.#adminDashboardTrialLessonRepository = new AdminDashboardTrialLessonRepository();
        this.#setupView();
    }

    async #setupView() {
        this.#trialLessonView = await super.loadHtmlIntoContent("html_views/triallesson.html");

        this.#createTrialLesson();
    }

    #applySE(data) {
        const buttons = this.#trialLessonView.querySelectorAll(".Apply");

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", () => {
                new TrialSEController(data[i].name, data[i].id);
            });
        }
    }

    /**
     * @author Jit Newer
     * Creates all trial lessons from database
     * @returns {Promise<void>}
     */
    async #createTrialLesson() {
        const CLASS_NAME_ITEM = "trialLi";
        let textNode;
        let elementLi;

        //Get trial lesson data
        const data = await this.#trialLessonRepository.getTrialLessons();
        console.log(data);

        //Trial lessons container
        const trialLessonContainer = this.#trialLessonView.querySelector(".Testlesson-position");
        const amount = this.#trialLessonView.querySelector(".amount");
        textNode = document.createTextNode("Er zijn in totaal " + data.length + " proeflesssen beschikbaar!");
        amount.appendChild(textNode);

        //Create trial lessons
        for (let i = 0; i < data.length; i++) {
            const trialLesson = document.createElement("div");
            trialLesson.classList.add("Testlesson-container");
            trialLessonContainer.appendChild(trialLesson);

            const nameContainer = document.createElement("div");
            nameContainer.classList.add("Testlesson-name");
            trialLesson.appendChild(nameContainer);

            //TrialLesson name
            const trialLessonName = document.createElement("h2");
            trialLessonName.classList.add("trialH2");
            textNode = document.createTextNode(data[i].name);
            trialLessonName.appendChild(textNode);
            nameContainer.appendChild(trialLessonName);

            //Trial lesson info
            const infoList = document.createElement("div");
            infoList.classList.add("Testlesson-content");
            trialLesson.appendChild(infoList);

            const ul = document.createElement("ul");
            ul.classList.add("trialUl");
            infoList.appendChild(ul);

            elementLi = document.createElement("li");
            elementLi.classList.add(CLASS_NAME_ITEM);
            textNode = document.createTextNode(data[i].timeDuration + " uur proefles");
            elementLi.appendChild(textNode);
            ul.appendChild(elementLi);

            elementLi = document.createElement("li");
            elementLi.classList.add(CLASS_NAME_ITEM);
            textNode = document.createTextNode(data[i].date.split("T")[0] + ", " + data[i].time.substring(0, 5));
            elementLi.appendChild(textNode);
            ul.appendChild(elementLi);

            elementLi = document.createElement("li");
            elementLi.classList.add(CLASS_NAME_ITEM);
            textNode = document.createTextNode(data[i].location + ", " + data[i].room);
            elementLi.appendChild(textNode);
            ul.appendChild(elementLi);

            elementLi = document.createElement("li");
            elementLi.classList.add(CLASS_NAME_ITEM);
            textNode = document.createTextNode(data[i].subject);
            elementLi.appendChild(textNode);
            ul.appendChild(elementLi);

            //Create apply button
            const applyButton = document.createElement("button");
            applyButton.classList.add("Apply");
            applyButton.id = data[i].name;
            infoList.appendChild(applyButton);

            const applyText = document.createElement("p");
            applyText.classList.add("Apply-text");
            textNode = document.createTextNode("Inschrijven");
            applyText.appendChild(textNode);
            applyButton.appendChild(applyText);

            /**
             * @author chant balci
             * this makes sure a user can apply for a trialleson when it's full
             * @type {HTMLParagraphElement}
             */
                // this the text thats been added to indicate how many spots are left for the specific triallesson
            const clickCount = document.createElement("p");
            const clickCountFull = document.createElement("p");
            clickCountFull.classList.add("countFull");
            clickCount.classList.add("countText");
            if (data[i].clicked > 30) {
                clickCountFull.textContent = "Proef les is vol"
                applyButton.remove();
                infoList.appendChild(clickCountFull)
            } else {
                clickCount.textContent = "nog " + (30 - data[i].clicked) + " plaatsen over"
                infoList.appendChild(clickCount);
            }

            this.#applySE(data);
        }
    }
}
