import { Controller } from "./controller.js";

export class TrialSEController extends Controller {
    #trialSEView;

    constructor(name) {
        super();
        this.#setupView(name);
    }

    async #setupView(name) {
        this.#trialSEView = await super.loadHtmlIntoContent("html_views/trialSE.html");

        let textNode = document.createTextNode(name + " proefles");
        this.#trialSEView.querySelector(".name").appendChild(textNode);

        this.#trialSEView.querySelector(".input-apply").addEventListener("click",
            (event) => this.#apply(event, name)
        )
    }

    #apply (event, name) {
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

            } catch (e) {
                console.log(e);
            }
        }
    }
}