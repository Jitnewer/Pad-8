/**
 * Controller for study screen and interaction
 *
 * @author Justin Chan
 */
import {Controller} from "./controller.js";
import {StudyRepository} from "../repositories/studyRepository.js";

export class StudyController extends Controller {
    #studyView;
    #studyRepository;

    constructor() {
        super();
        this.#studyRepository = new StudyRepository();

        this.#setupView();
    }

    async #setupView() {
        this.#studyView = await super.loadHtmlIntoContent("html_views/study.html");
        console.log(this.#studyView);

        this.#createStudyButton().then(this.#createFilterButton().then(
                () => {
                    let knop = this.#studyView.querySelectorAll(".StudyButton");
                    for (let i = 0; i < knop.length; i++) {
                        knop[i].addEventListener("click", (e) => this.#handleClickButton(e, i));
                    }
                }
            )
        );
    }

    async #createStudyButton() {
        /**
         * Get study data
         */
        const data = await this.#studyRepository.getStudyInformation();

        /**
         * Study container
         */
        const studyContainer = this.#studyView.querySelector(".button-list");
        let name;


        /**
         * Create study buttons
         */
        for (let i = 0; i < data.length; i++) {
            const studyButton = document.createElement("button");
            studyButton.classList.add("StudyButton", data[i].type);
            studyButton.id = data[i].nameStudy;
            name = document.createTextNode(data[i].nameStudy);
            studyButton.appendChild(name);

            studyContainer.appendChild(studyButton);
        }
    }

    async #createFilterButton() {
        const data = await this.#studyRepository.getType();

        const buttonContainer = this.#studyView.querySelector(".contentFilterContainer");

        const showAllButton = document.createElement("button");
        showAllButton.classList.add("FilterButton")
        showAllButton.textContent = "Alles";
        buttonContainer.appendChild(showAllButton);
        showAllButton.addEventListener("click", () => this.#handleFilterButton("all"));

        for (let i = 0; i < data.length; i++) {
            const button = document.createElement("button");
            button.classList.add("FilterButton");
            button.id = data[i].type;
            button.textContent = data[i].type;
            buttonContainer.appendChild(button);
            button.addEventListener("click", () => this.#handleFilterButton(data[i].type));
        }
    }

    async #handleClickButton(e, index) {
        e.preventDefault();

        /**
         * shifting the page to the right after clicking and back with the back button
         */
        const content = document.querySelector('.study-container');
        const backButton = document.querySelector('#back-button');
        const backButtonDiv = this.#studyView.querySelector("#back-div")

        content.classList.add('shift-left');

        backButton.addEventListener('click', () => {
            content.classList.remove('shift-left');
        })

        /**
         * Get data
         */
        const data = await this.#studyRepository.getStudyInformation();

        /**
         * Show study information
         */
        for (let i = 0; i < data.length; i++) {
            this.#studyView.querySelector(".study-title").innerHTML = data[index].nameStudy;
            this.#studyView.querySelector(".information-input").innerHTML = data[index].information;

        }
    }

    async #handleFilterButton(type) {
        const data = await this.#studyRepository.getStudyInformation();

        const content = this.#studyView.querySelectorAll(".StudyButton");

        for (let i = 0; i < content.length; i++) {
            if (type === "all" || data[i].type === type) {
                content[i].style.display = "block";
            } else {
                content[i].style.display = "none";
            }
        }
    }
}