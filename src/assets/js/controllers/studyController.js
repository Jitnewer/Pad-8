/**
 * Controller for study screen and interaction
 *
 * @author Justin Chan
 */
import {Controller} from "./controller.js";
import {StudyRepository} from "../repositories/studyRepository.js";

export class StudyController extends Controller {
    #studyView;
    #buttonTemplate;
    #studyRepository;

    constructor() {
        super();
        this.#studyRepository = new StudyRepository();

        this.#setupView();
    }

    async #setupView() {
        this.#studyView = await super.loadHtmlIntoContent("html_views/study.html");
        // this.#buttonTemplate = await super.loadHtmlIntoContent("html_views/opleidingKnopTemplate.html");
        console.log(this.#studyView);

        const homeIcon = this.#studyView.querySelector("#home");

        this.#createStudyButton().then(
            () => {
                let knop = this.#studyView.querySelectorAll(".StudyButton");
                for (let i = 0; i < knop.length; i++) {
                    knop[i].addEventListener("click", (e) => this.#handleClickButton(e, i));
                }
            }
        // )
        //     .then(
        //     () => {
        //         this.#applyTrialLesson();
        //     }
        );
        // let knop = this.#studyView.querySelector(".StudyButton");
        // knop.addEventListener("click", (e) => this.#handleClickButton(e));
        homeIcon.addEventListener("click", (e) => this.#handleClickHomeButton(e));


    }

    /**
     * Return to homepage
     */
    async #handleClickHomeButton(e) {
        e.preventDefault();
        window.location.href = "index.html"
    }

    async #createStudyButton() {

        //Get study data
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

            // console.log(data[i].nameStudy);

            // try {
            //     console.log(name);
            //     await this.#studyRepository.getStudyInformation(name);
            //
            // } catch (e) {
            //     console.log(e);
            // }
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

        // let name = this.#studyView.querySelectorAll(".StudyButton");

        const informationContainer = this.#studyView.querySelector(".information-posistion");
        let studyButton = this.#studyView.querySelectorAll(".StudyButton").value;

        /**
         * Show study information
         */
        for (let i = 0; i < data.length; i++) {
            if (name[index] === data[i].nameStudy) {
                this.#studyView.querySelector(".study-title").innerHTML = "";
                this.#studyView.querySelector(".information-input").innerHTML = "";
                // let title = this.#studyView.querySelector(".study-title").innerHTML;
                this.#studyView.querySelector(".study-title").innerHTML = data[i].nameStudy;
                this.#studyView.querySelector(".information-input").innerHTML = data[i].information;

                // let title = document.createTextNode(data[i].nameStudy + "")
                // this.#studyView.querySelector(".study-title").appendChild(title);
                //
                // let info = document.createTextNode(data[i].information + "");
                // this.#studyView.querySelector(".information-input").appendChild(info);
            }

            // let title = document.createTextNode(data[i].nameStudy + "")
            // this.#studyView.querySelector(".study-title").appendChild(title);
            //
            // let info = document.createTextNode(data[i].information + "");
            // this.#studyView.querySelector(".information-input").appendChild(info);

        }


        let title = document.createTextNode(data.nameStudy + "")
        this.#studyView.querySelector(".study-title").appendChild(title);

        let info = document.createTextNode(data.information + "");
        this.#studyView.querySelector(".information-input").appendChild(info);

        /**
         * Delete any visible information
         */
        for (let j = o; j < studyButton.length; i++) {
            let title = this.#studyView.querySelector(".study-title");
            let info = this.#studyView.querySelector(".information-input");
            this.#studyView.querySelector(".study-title").removeChild(title);
            this.#studyView.querySelector(".information-input").removeChild(info);
        }
    }

    // #applyTrialLesson() {
    //     let applyButton = document.querySelectorAll(".apply-triallesson");
    //     applyButton.addEventListener("click", () =>
    //         window.location.href = "./html_views/triallesson.html"
    //     );
    // }
}