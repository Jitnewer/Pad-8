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
        this.#buttonTemplate = await super.loadHtmlIntoContent("html_views/opleidingKnopTemplate.html");
        console.log(this.#studyView);

        const homeIcon = this.#studyView.querySelector("#home");

        let knop = this.#studyView.querySelector(".studyButton");
        knop.addEventListener("click", (e) => this.#handleClickButton(e) + this.#handleLoadData(e));
        homeIcon.addEventListener("click", (e) => this.#handleClickHomeButton(e));
    }

    async #handleClickHomeButton(e) {
        e.preventDefault();
        window.location.href = "index.html"
    }

    async #handleLoadData(e) {
        e.preventDefault();

        const studyName = this.#studyView.querySelector(".studyButton").value;
        // const studyInformation = this.#studyView.querySelector(".opleidingText").value;

        console.log(studyName + " ");

        try {
            console.log(name);
            await this.#studyRepository.#handleLoadData(name);

        }
        catch (e) {
            console.log(e);
        }
    }

    async #handleClickButton(e) {
        e.preventDefault();
        console.log("klik");
        let titel = this.#studyView.querySelector("#title");
        titel.style.display = "none";
        let tekst = this.#studyView.querySelector("#text");
        tekst.style.display = "none";
        let buttonContainer = this.#studyView.querySelector(".button-posistion");
        buttonContainer.style.left = "15%";
    }
}