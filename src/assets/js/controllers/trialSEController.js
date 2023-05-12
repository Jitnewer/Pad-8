/**
 * @author Jit Newer
 */

import {Controller} from "./controller.js";
import {TrialSERepository} from "../repositories/trialSERepository.js";
import {AdminDashboardTrialLessonRepository} from "../repositories/adminDashboardTrialLessonRepository.js";

export class TrialSEController extends Controller {
    #trialSEView;
    #trialSERepository;
    #adminDashboardTrialLessonRepository;

    constructor(name, id) {
        super();
        this.#trialSERepository = new TrialSERepository();
        this.#adminDashboardTrialLessonRepository = new AdminDashboardTrialLessonRepository();
        this.#setupView(name, id);
    }

    async #setupView(name, id) {
        this.#trialSEView = await super.loadHtmlIntoContent("html_views/trialSE.html");

        let textNode = document.createTextNode(name + " proefles");
        this.#trialSEView.querySelector(".name").appendChild(textNode);

        this.#trialSEView.querySelector(".input-apply").addEventListener("click",
            (event) => this.#apply(event, id))
    }

    async #apply(event, id) {
        event.preventDefault();

        const regexName = /^[A-Za-z]{3,40}$/;
        const regexMail = /^(?=.{10,40}$).*@.*/;
        const borderErrorColor = "1px solid red";

        const errorMessage = this.#trialSEView.querySelector(".error-message");
        const firstname = this.#trialSEView.querySelector(".firstName");
        const prefix = this.#trialSEView.querySelector(".prefix");
        const lastname = this.#trialSEView.querySelector(".lastName");
        const mail = this.#trialSEView.querySelector(".mail");

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
                const data = await this.#trialSERepository.applyTrialLesson(firstname.value, lastname.value, prefix.value, mail.value, id);
                alert("u heeft zich ingeschreven");
                // adds +1 to the clicked column in the database
                await this.#adminDashboardTrialLessonRepository.updateClickedCount(id);
            } catch (e) {
                console.log(e);
            }
        }
    }
}
