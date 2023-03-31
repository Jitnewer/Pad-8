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
            () => this.#loadContent()
        );
        // this.#createStudy()
        //     .then(
        //     () => this.#loadContent().then(
        //         () => {
        //             let content = this.#adminDashboardStudyView.querySelectorAll(".adminStudyContainer");
        //             for (let i = 0; i < content.length; i++) {
        //                 content[i].addEventListener("click", () => this.#handleClickDeleteButton(i));
        //             }
        //         }
        //     )
        // );
    }
    async #saveStudy(event) {
        event.preventDefault();

        const name = this.#adminDashboardStudyView.querySelector("#inputName").value;
        const information = this.#adminDashboardStudyView.querySelector("#inputInformation").value;
        const error = this.#adminDashboardStudyView.querySelector(".error-study")

        if (name.length === 0 || information.length === 0 ) {
            error.innerHTML = "Er kan alleen een nieuwe " +
                "studie toegevoegd worden als beide velden zijn ingevuld";
            return;
        }
        error.innerHTML = "";

        console.log(name + " " + information)
        try {
            const data = await this.#adminDashboardStudyRepository.createStudy(name, information);
            console.log(data)
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
        let info;

        /**
         * Create content container
         */
        for (let i = 0; i < data.length; i++) {
            //Create Study box
            const container = document.createElement("div");
            container.classList.add("adminStudyContainer");
            container.id = data[i].nameStudy;
            adminStudyContainer.appendChild(container);

            //Create Study name
            const studyName = document.createElement("p");
            studyName.classList.add("StudyName");
            studyName.id = data[i].nameStudy;
            name = document.createTextNode(data[i].nameStudy);
            container.appendChild(studyName);
            // console.log(nameStudy);

            // //Create informtion
            // const information = document.createElement("p");
            // information.classList.add("StudyInfo");
            // info = document.createTextNode(data[i].information);
            // container.appendChild(information);

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

    async #loadContent(nameStudy) {
        /**
         * Get data
         */
        const data = await this.#adminDashboardStudyRepository.getAdminDashboardStudyInformation();
        console.log(data);

        /**
         * Show study
         */
        const studyNames = this.#adminDashboardStudyView.querySelectorAll(".StudyName");
        for (let i = 0; i < data.length; i++) {
            studyNames[i].innerHTML = data[i].nameStudy;
        }
        // const study = data.find(s => s.nameStudy === nameStudy)
        // if (study) {
        //     const studyNameElement = this.#adminDashboardStudyView.querySelectorAll(`#${nameStudy} .StudyName`).innerHTML = data[i].nameStudy;
        //     studyNameElement.innerHTML = study.nameStudy;
        // }

        // for (let i = 0; i < data.length; i++) {
        //     const study = data.find(s => s.nameStudy === nameStudy)
        //     this.#adminDashboardStudyView.querySelector(`#${nameStudy} .StudyName`).innerHTML = data[i].nameStudy;
        //     // this.#adminDashboardStudyView.querySelector(".StudyInfo").innerHTML = data[i].information;
        // }
    }

    async #handleClickDeleteButton(nameStudy) {
        console.log("klik");

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