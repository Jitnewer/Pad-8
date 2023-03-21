/**
 * Controller for study screen and interaction
 *
 * @author Justin Chan
 */
import {Controller} from "./controller.js";

export class StudyController extends Controller {
    #studyView;

    constructor() {
        super();

        this.#setupView();
    }

    async #setupView() {
        this.#studyView = await super.loadHtmlIntoContent("html_views/study.html");
        console.log(this.#studyView);

        const homeIcon = this.#studyView.querySelector("#home");

        homeIcon.addEventListener("click", (e) => this.#handleClickStudyButton(e))
    }

    #handleClickStudyButton(e) {
        e.preventDefault();

        const homeIcon = this.#studyView.querySelector("#home").addEventListener("click", async (e) => {
            e.preventDefault();
            window.location.href = "index.html"
        })
    }
}