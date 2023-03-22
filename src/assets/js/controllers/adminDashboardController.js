/**
 * Controller for create testlesson and user interaction
 * @author Chant Balci
 */
import {Controller} from "./controller.js";
import {AdminDashboardRepository} from "../repositories/adminDashboardRepository.js";
import {TrialLessonRepository} from "../repositories/trialLessonRepository.js";



export class AdminDashboardController extends Controller {
    #adminDashboardView;
    #adminDashboardRepository;
    #trialLessonView;
    #trialLessonRepository;

    constructor() {
        super();
        this.#adminDashboardRepository = new AdminDashboardRepository();
        this.#trialLessonRepository = new TrialLessonRepository();
        this.#setupView();
    }

    async #setupView() {
        this.#createTrialLesson();
        this.#adminDashboardView = await super.loadHtmlIntoContent("html_views/adminDashboard.html");
        this.#adminDashboardView.querySelector(".adminDashboard-Apply").addEventListener("click",
            (event) => this.#saveTestlesson(event));


    }

    async #saveTestlesson(event) {
        event.preventDefault();

        const name = this.#adminDashboardView.querySelector("#adminDashboard_Testlesson_Name").value;
        const duration = this.#adminDashboardView.querySelector("#adminDashboard_Testlesson_duration").value;
        const date = this.#adminDashboardView.querySelector("#adminDashboard_Testlesson_dateTime").value;
        const location = this.#adminDashboardView.querySelector("#adminDashboard_Testlesson_Location").value;
        const room = this.#adminDashboardView.querySelector("#adminDashboard_Testlesson_Room").value;
        const subject = this.#adminDashboardView.querySelector("#adminDashboard_Testlesson_Subject").value;
        const time = this.#adminDashboardView.querySelector("#adminDashboard_Testlesson_time").value;

        console.log(name + " " + duration + " " + date + " " + location + " " + room + " " + subject + " " + time);

        try {
            console.log(name, duration, date, location, room, subject, time);
            await this.#adminDashboardRepository.saveTestlesson(name, duration, date, location, room, subject, time);
        } catch (e) {
            console.log(e);
        }
    }

    async #createTrialLesson () {
        const CLASS_NAME_ITEM = "trialLi";
        let textNode;
        let elementLi;

        //Get trial lesson data
        const data = await this.#trialLessonRepository.getTrialLessons();
        console.log(data);

        //Trial lessons container
        const trialLessonContainer = this.#adminDashboardView.querySelector(".adminDashboard-position");

        //Create trial lessons
        for (let i = 0; i < data.length; i++) {
            //TrialLesson box
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
            infoList.appendChild(applyButton);

            const applyText = document.createElement("p");
            applyText.classList.add("Apply-text");
            textNode = document.createTextNode("Inschrijven");
            applyText.appendChild(textNode);
            applyButton.appendChild(applyText);
        }
        // let container = this.#trialLessonView.querySelector("Testlesson-container");
        //
        // let i;
        //
        // for(i = 0; i <container.length; i++){
        //     container[i].onclick = function () {
        //         let cbarry = document.querySelector(".Testlesson-container");
        //         for(i=0; i < cbarry.length; i++){
        //             cbarry[i].style.background = 'none'
        //         }
        //         this.style.background = "rgba(0,0,0,0.2)";
        //     }
        //     console.log(container);
        // }
    }
}