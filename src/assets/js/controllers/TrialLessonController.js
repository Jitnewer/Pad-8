import { Controller } from "./controller.js";
import { TrialLessonRepository } from "../repositories/trialLessonRepository.js";
import { AdminDashboardTrialLessonRepository } from "../repositories/adminDashboardTrialLessonRepository.js";
import { TrialSERepository } from "../repositories/trialSERepository.js";

export class TrialLessonController extends Controller {
    #trialLessonView;
    #trialLessonRepository;
    #adminDashboardTrialLessonRepository;
    #trialSERepository;

    constructor() {
        super();
        this.#trialLessonRepository = new TrialLessonRepository();
        this.#adminDashboardTrialLessonRepository = new AdminDashboardTrialLessonRepository();
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
    #handleApplyBtn(data) {
        const buttons = this.#trialLessonView.querySelectorAll(".Apply");

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", () => {
                this.#openForm(data[i].name, data[i].id);
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
            nameContainer.classList.add("apply-Testlesson-name");
            trialLesson.appendChild(nameContainer);

            //TrialLesson name
            const trialLessonName = document.createElement("h2");
            trialLessonName.classList.add("trialLessonH2");
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
            textNode = document.createTextNode(data[i].timeDuration + " lesuren " + "(" + (data[i].timeDuration * 50) + "min)");
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
            clickCount.classList.add("trialCountText");
            if (data[i].clicked >= data[i].capacity) {
                clickCountFull.textContent = "Proefles is vol"
                applyButton.remove();
                infoList.appendChild(clickCountFull)
            } else {
                clickCount.textContent = "nog " + (data[i].capacity - data[i].clicked) + " plaatsen over";
                infoList.appendChild(clickCount);
            }

            this.#handleApplyBtn(data);
        }
    }

    /**
     * Create application form and gives it properties
     * @param name: the name of the triallesson
     * @param id: the id of the triallesson
     */
    async #openForm(name, id) {
        await super.loadHtmlIntoCustomElement("html_views/trialLessonForm.html", document.querySelector(".form")).then(
            () => {
                // Give form triallesson name
                const textNode = document.createTextNode(name + " proefles");
                document.querySelector(".name").appendChild(textNode);

                //Button to close apply form
                let xButton = document.querySelector(".x");
                xButton.addEventListener("click", () => {
                    document.querySelector(".applyFormContainer").remove();
                });

                document.querySelector(".input-apply").addEventListener("click", (event) => {
                    this.#validate(event, id);
                });
            }
        );
    }

    /**
     *  Checks if input fields are falid
     */
    async #validate(event, id) {
        event.preventDefault()
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
        const mailIsValid = !mailEmpty && regexMail.test(mail.value)

        firstname.style.border = (firstNameIsValid ? null : borderErrorColor);
        lastname.style.border = (lastNameIsValid ? null : borderErrorColor);
        mail.style.border = (mailIsValid ? null : borderErrorColor);

        if (firstNameEmpty && lastNameEmpty && mailEmpty) {
            errorMessage.innerHTML = "Vul alle velden in!";
            errorMessage.style.display = "block";
        } else if (!mailIsValid) {
            errorMessage.innerHTML = "Ongeldige email!";
            errorMessage.style.display = "block"
        } else if (!firstNameIsValid) {
            errorMessage.innerHTML = "Naam moet 3 tot 40 letters bevatten!";
            errorMessage.style.display = "block";
        } else if (!lastNameIsValid) {
            errorMessage.innerHTML = "Achternaam moet 3 tot 40 letters bevatten!";
            errorMessage.style.display = "block";
        } else {
            await this.#apply(firstname, lastname, prefix, mail, id, errorMessage);
        }
    }
    async #apply(firstname, lastname, prefix, mail, id, errorMessage) {
        try {
            await this.#trialSERepository.applyTrialLesson(firstname.value, lastname.value, prefix.value, mail.value, id).then(
                async () => {
                    // adds +1 to the clicked column in the database
                    await this.#adminDashboardTrialLessonRepository.updateClickedCount(id);

                }
            );

            alert("You have successfully applied!");
            window.location.reload();
            document.querySelector(".applyFormContainer").remove();
        } catch (e) {
            console.log(e);
            errorMessage.innerHTML = "Email has already been registered";
            errorMessage.style.display = "block";
            mail.style.border = "1px solid red";
        }
        // const subject = "Trial Lesson Application";
        // const question = "Thank you for applying to the trial lesson. We will get back to you soon.";
        await this.#trialSERepository.sendTrialLessonEmail(mail.value);
    }

}



