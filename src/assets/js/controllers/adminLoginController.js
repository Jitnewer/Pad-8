/**
 * Controller to get view and set button events
 * @Author: Jit Newer
 */
import {Controller} from "./controller.js";
import {AdminLoginRepository} from "../repositories/adminLoginRepository.js";
import {App} from "../app.js";

export class AdminLoginController extends Controller {
    #adminLoginView;
    #adminLoginRepository;

    constructor() {
        super();
        this.#adminLoginRepository = new AdminLoginRepository();

        this.#setupView();
    }

    async #setupView() {
        this.#adminLoginView = await super.loadHtmlIntoContent("html_views/adminLogin.html");
        this.#adminLoginView.querySelector(".form-button").addEventListener("click",
            (event) => this.#handleLoginClick(event));
    }

    async #handleLoginClick(event) {
        event.preventDefault();

        const email = this.#adminLoginView.querySelector(".email").value;
        const password = this.#adminLoginView.querySelector(".password").value;

        const emailErrorElement = this.#adminLoginView.querySelector(".email-error");
        const passwordErrorElement = this.#adminLoginView.querySelector(".password-error");
        const errorMessageElement = this.#adminLoginView.querySelector(".form-message");

        emailErrorElement.innerHTML = "";
        passwordErrorElement.innerHTML = "";
        errorMessageElement.innerHTML = "";


        if (email.length === 0 && password.length === 0) {
            this.#errorMessage(emailErrorElement, passwordErrorElement);
            this.#adminLoginView.querySelector(".email").focus();
            this.#adminLoginView.querySelector(".email").style.border = "1px solid red";
            this.#adminLoginView.querySelector(".password").style.border = "1px solid red";
            return;
        } else if (email.length === 0) {
            this.#errorMessage(emailErrorElement);
            this.#adminLoginView.querySelector(".email").focus();
            this.#adminLoginView.querySelector(".username").style.border = "1px solid red";
            return;
        } else if (password.length === 0) {
            this.#errorMessage(passwordErrorElement);
            this.#adminLoginView.querySelector(".password").focus();
            this.#adminLoginView.querySelector(".password").style.border = "1px solid red";
            return;
        }

        try {
            const user = await this.#adminLoginRepository.loginAdmin(email, password);
            App.sessionManager.set("username", user.username);
            App.loadController(App.CONTROLLER_ADMIN_DASHBOARD_TrialLesson);
        } catch (e) {
            errorMessageElement.innerHTML = e.reason;
            this.#adminLoginView.querySelector(".email").style.border = "1px solid red";
            this.#adminLoginView.querySelector(".password").style.border = "1px solid red";
        }
    }

    #errorMessage(element1, element2) {
        const errorMessage = "Vul dit veld in!";
        element1.innerHTML = errorMessage;

        if (element2 !== null) {
            element2.innerHTML = errorMessage;
        }
    }

}