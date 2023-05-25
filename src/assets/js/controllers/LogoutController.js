import { App } from "../app.js";
import { Controller } from "./controller.js";

export class LogoutController extends Controller {
    constructor() {
        super();
        console.log('userLoggedOut event dispatched');

        this.#handleLogout();
    }

    #handleLogout() {
        try {
            // Clear user session
            App.sessionManager.clear();

            // Dispatch the 'userLoggedOut' event
            document.dispatchEvent(new CustomEvent('userLoggedOut'));
        } catch (error) {
            console.error('An error occurred in handleLogout:', error);
        }

        console.log('userLoggedOut event dispatched');

        // Redirect user to the welcome or login page
        App.loadController(App.CONTROLLER_WELCOME);
    }

}
