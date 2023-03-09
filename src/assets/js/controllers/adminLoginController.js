import { Controller } from "./controller.js";
import {AdminLoginRepository} from "../repositories/adminLoginRepository.js";

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

        const username = this.#adminLoginView.querySelector(".username").value;
        const password = this.#adminLoginView.querySelector(".password").value;

        this.#adminLoginView.querySelector(".username-error").style.display = "none";
        this.#adminLoginView.querySelector(".password-error").style.display = "none";

        if (username.length === 0 && password.length === 0) {
            this.#adminLoginView.querySelector(".username-error").style.display = "block";
            this.#adminLoginView.querySelector(".username").focus();
            return;
        } else if (username.length === 0 && password.length !== 0) {
            this.#adminLoginView.querySelector(".username-error").style.display = "block";
            this.#adminLoginView.querySelector(".username").focus();
            return;
        } else if (password.length === 0 && username.length !== 0) {
            this.#adminLoginView.querySelector(".password-error").style.display = "block";
            this.#adminLoginView.querySelector(".password").focus();
            return;
        }

        try {
            const user = await this.#adminLoginRepository.loginAdmin(username, password);
            location.href = "index.html";
        }
         catch (e) {
            console.log(e);
        }
    }

}