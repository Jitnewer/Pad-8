/**
 * Controller for study screen and interaction
 *
 * @author Justin Chan & Phillipe Bekkers
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
            this.#createFilterButton().then(
            () => this.#loadContent())
        );
    }

    async #saveStudy(event) {
        event.preventDefault();

        let name = this.#adminDashboardStudyView.querySelector("#inputName").value;
        const information = this.#adminDashboardStudyView.querySelector("#inputInformation").value;
        const error = this.#adminDashboardStudyView.querySelector(".error-study")
        let type = this.#adminDashboardStudyView.querySelector("#inputType").value;

        if (name.endsWith(" ")) {
            for (let i = 0; i < name.length; i++) {
                name = name.trim();
            }
        }

        if (type.endsWith(" ")) {
            for (let i = 0; i < type.length; i++) {
                type = type.trim();
            }
        }

        if (name.length === 0 || information.length === 0 || type.length === 0) {
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

        /**
         * Study container
         */
        const adminStudyContainer = this.#adminDashboardStudyView.querySelector(".adminStudyPosition");
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

    async #createFilterButton() {
        /**
         * Get type data
         */
        const data = await this.#adminDashboardStudyRepository.getAdminDashboardStudyType();

        /**
         * Button container
         */
        const buttonContainer = this.#adminDashboardStudyView.querySelector(".adminContentSelector");

        // Create Show all button
        const showAllButton = document.createElement("button");
        showAllButton.classList.add("adminContentButton");
        showAllButton.textContent = "Alles";
        buttonContainer.appendChild(showAllButton);
        showAllButton.addEventListener("click", () => this.#handleFilterButton("all"));

        // Create filter type buttons
        for (let i = 0; i < data.length; i++) {
            const button = document.createElement("button");
            button.classList.add("adminContentButton");
            button.id = data[i].type;
            button.textContent = data[i].type;
            buttonContainer.appendChild(button);
            button.addEventListener("click", () => this.#handleFilterButton(data[i].type));
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

    async #handleFilterButton(type) {
        /**
         * Get data
         */
        const data = await this.#adminDashboardStudyRepository.getAdminDashboardStudyInformation();

        const content = this.#adminDashboardStudyView.querySelectorAll(".adminStudyContainer");

        /**
         * Filter function
         */
        for (let i = 0; i < content.length; i++) {
            if (type === "all" || data[i].type === type) {
                content[i].style.display = "flex";
            } else {
                content[i].style.display = "none";
            }
        }
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