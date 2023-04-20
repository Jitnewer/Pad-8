import {Controller} from "./controller.js";
import {TrialLessonRepository} from "../repositories/trialLessonRepository.js";
// import {TrialSEController} from "./trialSEController.js";
import {AdminDashboardTrialLessonRepository} from "../repositories/adminDashboardTrialLessonRepository.js";
import {TrialSERepository} from "../repositories/trialSERepository.js";

export class TrialLessonController extends Controller {
    #trialLessonView;
    #trialLessonRepository;
    #adminDashboardTrialLessonRepository;

    //test
    #trialSERepository

    constructor() {
        super();
        this.#trialLessonRepository = new TrialLessonRepository();
        this.#adminDashboardTrialLessonRepository = new AdminDashboardTrialLessonRepository();
        //test
        this.#trialSERepository = new TrialSERepository();
        this.#setupView();
    }

    async #setupView() {
        this.#trialLessonView = await super.loadHtmlIntoContent("html_views/triallesson.html");

        this.#createTrialLesson();
    }

    /**
     * Gives all the buttons a eventlisteren that opens application form
     * @param data: the list of triallessons
     */
    #applySE(data) {
        const buttons = this.#trialLessonView.querySelectorAll(".Apply");

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", () => {
                // new TrialSEController(data[i].name, data[i].id);
                this.#applyForm(data[i].name, data[i].id);
            });
        }
    }

    /**
     * @author Jit Newer
     * Creates all trial lessons from database
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
             * this makes sure a user can't apply for a trialleson when it's full
             * @type {HTMLParagraphElement}
             */
                // this the text thats been added to indicate how many spots are left for the specific triallesson
            const clickCount = document.createElement("p");
            const clickCountFull = document.createElement("p");
            clickCountFull.classList.add("countFull");
            clickCount.classList.add("countText");
            if (data[i].clicked > 29) {
                clickCountFull.textContent = "Proefles is vol"
                applyButton.remove();
                infoList.appendChild(clickCountFull)
            } else {
                clickCount.textContent = "nog " + (30 - data[i].clicked) + " plaatsen over"
                infoList.appendChild(clickCount);
            }

            this.#applySE(data);
        }
    }

    /**
     * Create application form and gives it properties
     * @param name: the name of the triallesson
     * @param id: the id of the triallesson
     */
    async #applyForm(name, id) {
        await super.loadHtmlIntoCustomElement("html_views/test.html", document.querySelector(".form")).then(
             () => {
                 // Give form triallesson name
                 const textNode = document.createTextNode(name + " proefles");
                 document.querySelector(".name").appendChild(textNode);

                 //Button to close apply form
                 let xButton = document.querySelector(".x");
                 xButton.addEventListener("click", () => {
                     document.querySelector(".applyFormContainer").remove();
                 });

                 document.querySelector(".input-apply").addEventListener("click", () => {
                     this.#validate(id);
                 });
            }
        );
    }

    /**
     *  Checks if input fields are falid
     */
    async #validate(id) {
        const regexName = /^[A-Za-z]{3,40}$/;
        const regexMail = /^(?=.{10,40}$).*@.*/;
        const borderErrorColor = "1px solid red";

        const errorMessage = document.querySelector(".error-message");
        const firstname = document.querySelector(".firstName");
        const prefix = document.querySelector(".prefix");
        const lastname = document.querySelector(".lastName");
        const mail = document.querySelector(".mail");

        errorMessage.innerHTML = "";
        errorMessage.style.display = "none";

        const firstNameEmpty = firstname.value.length === 0;
        const lastNameEmpty = lastname.value.length === 0;
        const mailEmpty = mail.value.length === 0;

        const firstNameIsValid = !firstNameEmpty && regexName.test(firstname.value);
        const lastNameIsValid = !lastNameEmpty && regexName.test(lastname.value);
        const mailIsValid = !mailEmpty && regexMail.test(mail.value);

        firstname.style.border = (firstNameIsValid ? null : borderErrorColor);
        lastname.style.border = (lastNameIsValid ? null : borderErrorColor);
        mail.style.border = (mailIsValid ? null : borderErrorColor);

        if (!firstNameIsValid || !lastNameIsValid || !mailIsValid) {
            errorMessage.innerHTML = "Vul alle velden in!";
            errorMessage.style.display = "block";
        } else {
            try {
                document.querySelector(".applyFormContainer").remove();
                const data = await this.#trialSERepository.applyTrialLesson(firstname.value, lastname.value, prefix.value, mail.value, id);
                alert("u heeft zich ingeschreven");
                // adds +1 to the clicked column in the database
                await this.#adminDashboardTrialLessonRepository.updateClickedCount(id);
                // window.location.replace("index.html");
            } catch (e) {
                console.log(e);
            }
        }
    }
}
