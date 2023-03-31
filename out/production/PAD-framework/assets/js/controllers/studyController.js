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

        const homeIcon = this.#studyView.querySelector("#home");

        this.#createStudyButton().then(
            () => {
                let knop = this.#studyView.querySelectorAll(".StudyButton");
                for (let i = 0; i < knop.length; i++) {
                    knop[i].addEventListener("click", (e) => this.#handleClickButton(e, i));
                }
            }
        );

        // homeIcon.addEventListener("click", (e) => this.#handleClickHomeButton(e));
    }

    // /**
    //  * Return to homepage
    //  */
    // async #handleClickHomeButton(e) {
    //     e.preventDefault();
    //     window.location.href = "index.html"
    // }

    async #createStudyButton() {

        /**
         * Get study data
         */
        const data = await this.#studyRepository.getStudyInformation();
        console.log(data);

        /**
         * Study container
         */
        const studyContainer = this.#studyView.querySelector(".button-posistion");
        let name;

        /**
         * Create study buttons
         */
        for (let i = 0; i < data.length; i++) {
            const studyButton = document.createElement("button");
            studyButton.classList.add("StudyButton");
            studyButton.id = data[i].nameStudy;
            name = document.createTextNode(data[i].nameStudy);
            studyButton.appendChild(name);

            studyContainer.appendChild(studyButton);
        }
    }

    async #handleClickButton(e, index) {
        e.preventDefault();
        console.log("klik");

        /**
         * Removes title & text
         */
        let titel = this.#studyView.querySelector("#title");
        titel.style.display = "none";
        let tekst = this.#studyView.querySelector("#text");
        tekst.style.display = "none";

        /**
         * Moves button
         */
        let buttonContainer = this.#studyView.querySelector(".button-posistion");
        buttonContainer.style.left = "15%";

        /**
         * Get data
         */
        const data = await this.#studyRepository.getStudyInformation();
        console.log(data);

        /**
         * Show study information
         */
        for (let i = 0; i < data.length; i++) {
            this.#studyView.querySelector(".study-title").innerHTML = data[index].nameStudy;
            this.#studyView.querySelector(".information-input").innerHTML = data[index].information;

        }
    }

    // #applyTrialLesson() {
    //     let applyButton = document.querySelectorAll(".apply-triallesson");
    //     applyButton.addEventListener("click", () =>
    //         window.location.href = "./html_views/triallesson.html"
    //     );
    // }
}