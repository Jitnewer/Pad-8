/**
 * Controller for study screen and interaction
 *
 * @author Justin Chan
 */
import {Controller} from "./controller.js";
import {AdminDashboardStudyRepository} from "../repositories/adminDashboardStudyRepository.js";

export class AdminDashboardStudyController extends Controller {
    #adminDashboardStudyView;
    #adminDashboardStudyRepository;

    constructor() {
        super();
        this.#adminDashboardStudyRepository = new AdminDashboardStudyRepository();

        this.#setupView();
    }

    async #setupView() {
        this.#adminDashboardStudyView = await super.loadHtmlIntoContent("html_views/adminDashboardStudy.html");
        console.log(this.#adminDashboardStudyView);

        this.#adminDashboardStudyView.querySelector(".Toevoegen").addEventListener("click",
            (event) => this.#saveStudy(event));

        this.#createStudy().then(
            () => this.#loadContent().then(
                this.#handleFilterButton()
            )
        );
    }

    async #saveStudy(event) {
        event.preventDefault();

        const name = this.#adminDashboardStudyView.querySelector("#inputName").value;
        const information = this.#adminDashboardStudyView.querySelector("#inputInformation").value;
        const error = this.#adminDashboardStudyView.querySelector(".error-study")
        const type = this.#adminDashboardStudyView.querySelector("#inputType").value;

        if (name.endsWith(" ")) {
            for (let i = 0; i < name.length; i++) {
                name.trim();
            }
        }

        if (name.length === 0 || information.length === 0) {
            error.innerHTML = "Er kan alleen een nieuwe " +
                "studie toegevoegd worden als alle velden zijn ingevuld";
            return;
        }

        error.innerHTML = "";

        console.log(name + " " + information + " " + type)
        try {
            const data = await this.#adminDashboardStudyRepository.createStudy(name, information, type);
            console.log(data)
            location.reload();
        } catch (e) {
            error.innerHTML = "Er is iets fout gegaan bij het opslaan"
            console.log(e)
        }

    }

    async #createStudy() {
        /**
         * Get study data
         */
        let data = await this.#adminDashboardStudyRepository.getAdminDashboardStudyInformation();
        console.log(data);

        /**
         * Study container
         */
        const adminStudyContainer = this.#adminDashboardStudyView.querySelector(".adminStudyPosistion");
        let name;
        let type;

        /**
         * Create content container
         */
        for (let i = 0; i < data.length; i++) {
            //Create Content box
            const container = document.createElement("div");
            container.classList.add("adminStudyContainer", data[i].type);
            container.id = data[i].nameStudy;
            adminStudyContainer.appendChild(container);

            //Create Content type
            const contentType = document.createElement("p");
            contentType.classList.add("ContentType");
            type = document.createTextNode(data[i].type);
            container.appendChild(contentType);

            //Create Content name
            const studyName = document.createElement("p");
            studyName.classList.add("StudyName");
            studyName.id = data[i].nameStudy;
            name = document.createTextNode(data[i].nameStudy);
            container.appendChild(studyName);

            //Create button
            const button = document.createElement("button");
            button.classList.add("adminDashboardStudyButton");
            container.appendChild(button);
            button.addEventListener("click", () => this.#handleClickDeleteButton(data[i].nameStudy));

            const buttonImage = document.createElement("i");
            buttonImage.classList.add("fa-solid", "fa-trash", "trashcan-icon");
            button.appendChild(buttonImage);
        }
    }

    async #loadContent() {
        /**
         * Get data
         */
        const data = await this.#adminDashboardStudyRepository.getAdminDashboardStudyInformation();

        /**
         * Show content
         */
        const studyNames = this.#adminDashboardStudyView.querySelectorAll(".StudyName");
        for (let i = 0; i < data.length; i++) {
            studyNames[i].innerHTML = data[i].nameStudy;
        }
    }

    async #handleFilterButton() {
        /**
         * Get data
         */
        const data = await this.#adminDashboardStudyRepository.getAdminDashboardStudyInformation();

        let all = this.#adminDashboardStudyView.querySelector("#adminContentAllButton");
        let general = this.#adminDashboardStudyView.querySelector("#adminContentGeneralButton");
        let study = this.#adminDashboardStudyView.querySelector("#adminContentStudyButton");

        const generalData = this.#adminDashboardStudyView.querySelectorAll(".Algemeen");
        const studyData = this.#adminDashboardStudyView.querySelectorAll(".Opleiding");
        const content = this.#adminDashboardStudyView.querySelectorAll(".adminStudyContainer")
        all.addEventListener("click", () => {
            for (let i = 0; i < content.length; i++) {
                content[i].style.display = "flex";
            }
        });
        general.addEventListener("click", () => {
            for (let i = 0; i < generalData.length; i++) {
                const a = data[i].type;
                generalData[i].style.display = "flex";
                console.log(a);
            }
            for (let i = 0; i < studyData.length; i++) {
                studyData[i].style.display = "none";
            }
        });
        study.addEventListener("click", () => {
            for (let i = 0; i < studyData.length; i++) {
                const a = data[i].type;
                studyData[i].style.display = "flex";
                console.log(a);
            }
            for (let i = 0; i < generalData.length; i++) {
                generalData[i].style.display = "none";
            }
        });
    }

    async #handleClickDeleteButton(nameStudy) {
        /**
         * Delete a Study
         */
        try {
            if (confirm("Weet u zeker dat je het wilt verwijderen?") === true) {
                await this.#adminDashboardStudyRepository.deleteAdminDashboardStudyInformation(nameStudy);
                this.#loadContent(nameStudy);
                location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    }

}