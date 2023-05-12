/**
 * Responsible for handling the actions happening on welcome view
 * For now it uses the roomExampleRepository to get some example data from server
 *
 * @author Lennard Fonteijn & Pim Meijer
 */

import {RoomsExampleRepository} from "../repositories/roomsExampleRepository.js";
import {App} from "../app.js";
import {Controller} from "./controller.js";

export class WelcomeController extends Controller{

    #welcomeView

    constructor() {
        super();


        this.#setupView();
    }

    /**
     * Loads contents of desired HTML file into the index.html .content div
     * @returns {Promise<>}
     * @private
     */
    async #setupView() {
        //await for when HTML is loaded
        this.#welcomeView = await super.loadHtmlIntoContent("html_views/welcome.html")

        const editplateb = this.#welcomeView.querySelector(".editplate");
        editplateb.addEventListener("click", () => {
            App.loadController(App.CONTROLLER_CREATE_APPOINTMENT);
        });

        const editmap = this.#welcomeView.querySelector(".editmap");
        editmap.addEventListener("click", () => {
            App.loadController(App.CONTROLLER_MAP);
        });

        const editproefButton = this.#welcomeView.querySelector(".editproef");
        editproefButton.addEventListener("click", () => {
            App.loadController(App.CONTROLLER_TRIALLESSON);
        });

        const editstudieButton = this.#welcomeView.querySelector(".editstudie");
        editstudieButton.addEventListener("click", () => {
            App.loadController(App.CONTROLLER_STUDY);
        });

        console.log(this.#welcomeView);

        document.getElementById("content").appendChild(this.#welcomeView);

    }
}