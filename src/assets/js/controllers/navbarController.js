/**
 * Responsible for handling the actions happening on the navigation
 *
 * @author Lennard Fonteijn & Pim Meijer
 */

import { App } from "../app.js";
import {Controller} from "./controller.js";

export class NavbarController extends Controller{
    #navbarView
    constructor() {
        super();
        this.#setupView();

        // Listen for the 'userLoggedIn' event
        document.addEventListener('userLoggedIn', () => this.#handleLoggedInState());

        // Listen for the 'userLoggedOut' event
        document.addEventListener('userLoggedOut', () => this.#handleLoggedInState());

    }
    /**
     * Loads contents of desired HTML file into the index.html .navigation div
     * @returns {Promise<void>}
     * @private
     */
    async #setupView() {
        this.#navbarView = await super.loadHtmlIntoNavigation("html_views/navbar.html");
        const anchors = this.#navbarView.querySelectorAll("a.nav-link");
        anchors.forEach(anchor => anchor.addEventListener("click", (event) => this.#handleClickNavigationItem(event)))

        const homeButton = document.querySelector(".homeButton");
        const mapButton = document.querySelector(".homeButton");
        const chatbotButton = document.querySelector(".homeButton");







        // Add code to conditionally show the extra navbar item
        this.#handleLoggedInState();
    }
    #handleLoggedInState() {
        const loginLink = this.#navbarView.querySelector('#admin-login-link');
        const logoutLink = this.#navbarView.querySelector('#admin-logout-link');
        const dashboardLink = this.#navbarView.querySelector('#admin-dashboard-link');
        if (App.sessionManager.get("username")) {
            // If user is logged in, hide the login link and show the logout and dashboard links
            loginLink.style.display = 'none';
            logoutLink.style.display = 'block';
            dashboardLink.style.display = 'block';
        } else {
            // If user is not logged in, show the login link and hide the logout and dashboard links
            loginLink.style.display = 'block';
            logoutLink.style.display = 'none';
            dashboardLink.style.display = 'none';
        }
    }



    /**
     * Reads data attribute on each .nav-link and then when clicked navigates to specific controller
     * @param event - clicked anchor event
     * @returns {boolean} - to prevent reloading
     * @private
     */
    #handleClickNavigationItem(event) {
        event.preventDefault();
        
        //Get the data-controller from the clicked element (this)
        const clickedAnchor = event.target;
        const controller = clickedAnchor.dataset.controller;

        if(typeof controller === "undefined") {
            console.error("No data-controller attribute defined in anchor HTML tag, don't know which controller to load!")
            return false;
        }

        //TODO: You should add highlighting of correct anchor when page is active :)

        //Pass the action to a new function for further processing
        App.loadController(controller);

        //Return false to prevent reloading the page
        return false;
    }
}
