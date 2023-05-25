/**
 * Entry point front end application - there is also an app.js for the backend (server folder)!
 *
 * All methods are static in this class because we only want one instance of this class
 * Available via a static reference(no object): `App.sessionManager.<..>` or `App.networkManager.<..>` or `App.loadController(..)`
 *
 * @author Lennard Fonteijn & Pim Meijer
 */

import {SessionManager} from "./framework/utils/sessionManager.js"
import {NavbarController} from "./controllers/navbarController.js"
import {UploadController} from "./controllers/uploadController.js"
import {WelcomeController} from "./controllers/welcomeController.js"
import {createappointmentController} from "./controllers/createappointmentController.js";
import {AdminLoginController} from "./controllers/adminLoginController.js";
import {LogoutController} from "./controllers/LogoutController.js";
import {TrialLessonController} from "./controllers/TrialLessonController.js";
import {StudyController} from "./controllers/studyController.js";
import {AdminDashboardTrialLessonController} from "./controllers/adminDashboardTrialLessonController.js";
import {TrialSEController} from "./controllers/trialSEController.js";
import {ChatbotController} from "./controllers/chatbotController.js";
import {AdminDashboardStudyController} from "./controllers/adminDashboardStudyController.js";
import {ChatbotQAController} from "./controllers/ChatbotQAController.js";
import {LandingpageController} from "./controllers/landingpageController.js";
import {AdminController} from "./controllers/adminController.js";
import {mapController} from "./controllers/mapController.js";
import {adminMapController} from "./controllers/adminMapController.js";


export class App {
//we only need one instance of the sessionManager, thus static use here
// all classes should use this instance of sessionManager
    static sessionManager = new SessionManager();

//controller identifiers, add new controllers here
    static CONTROLLER_NAVBAR = "navbar";
    static CONTROLLER_LOGOUT = "logout";

    static CONTROLLER_WELCOME = "welcome";
    static CONTROLLER_UPLOAD = "upload";
    static CONTROLLER_CREATE_APPOINTMENT = "appointments";
    static CONTROLLER_ADMIN_LOGIN = "admin-login"
    static CONTROLLER_ADMIN_DASHBOARD_TrialLesson = "adminDashboard";
    static CONTROLLER_STUDY = "study";
    static CONTROLLER_TRIALLESSON = "trialLesson";
    static CONTROLLER_CHATBOT = "chatbot";
    static CONTROLLER_ADMIN_DASHBOARD_Study = "adminDashboardStudy";
    static CONTROLLER_CHATBOT_QA = "ChatbotQA";
    static CONTROLLER_ADMIN = "admin";
    static CONTROLLER_LANDINGPAGE = "landingpage";
    static CONTROLLER_MAP = "map";
    static CONTROLLER_ADMINMAP = "adminMap";



    constructor() {
// Always load the navigation
        App.loadController(App.CONTROLLER_NAVBAR);

        if (App.shouldLoadChatbot()) {
            App.loadController(App.CONTROLLER_CHATBOT);
        }

// Attempt to load the controller from the URL, if it fails, fall back to the welcome controller.
        App.loadControllerFromUrl(App.CONTROLLER_WELCOME);
    }

    /**
     * Loads a controller
     * @param name - name of controller - see static attributes for all the controller names
     * @param controllerData - data to pass from on controller to another - default empty object
     * @returns {boolean} - successful controller change
     */

    static loadChatbot() {
        new ChatbotController();
    }

    static unloadChatbot() {
        const chatboxElement = document.querySelector(".chatbox");
        if (chatboxElement) {
            chatboxElement.innerHTML = "";
        }
    }

    static shouldLoadChatbot() {
        const currentControllerName = App.getCurrentController()?.name;
        return currentControllerName !== App.CONTROLLER_ADMIN_DASHBOARD_TrialLesson &&
            currentControllerName !== App.CONTROLLER_ADMIN_DASHBOARD_Study;
    }

    static loadController(name, controllerData) {
        console.log("loadController: " + name);

//log the data if data is being passed via controllers
        if (controllerData && Object.entries(controllerData).length !== 0) {
            console.log(controllerData);
        }


//Check for a special controller that shouldn't modify the URL
// Check for a special controller that shouldn't modify the URL
        switch (name) {
            case App.CONTROLLER_NAVBAR:
                new NavbarController();
                return true;

            case App.CONTROLLER_CHATBOT:
                if (App.shouldLoadChatbot()) {
                    new ChatbotController();
                }
                return true;

            case App.CONTROLLER_LOGOUT:
                App.handleLogout();
                return true;
        }


//Otherwise, load any of the other controllers
        App.setCurrentController(name, controllerData);

        switch (name) {


            case App.CONTROLLER_WELCOME:
                new WelcomeController();
                break;
            case App.CONTROLLER_CREATE_APPOINTMENT:
                App.setCurrentController(name);
                new createappointmentController();
                break;
                case App.CONTROLLER_MAP:
                App.setCurrentController(name);
                new mapController();
                break;
            case App.CONTROLLER_CHATBOT_QA:
// App.setCurrentController(name);
                new ChatbotQAController();
                break;
            case App.CONTROLLER_ADMIN_LOGIN:
                App.setCurrentController(name);
                App.isLoggedIn(() => new AdminLoginController(), () => new AdminLoginController());
                break;
            case App.CONTROLLER_ADMIN:
                App.setCurrentController(name);
                App.isLoggedIn(() => new AdminController(), () => new AdminLoginController());
                App.unloadChatbot();
                break;
            case App.CONTROLLER_ADMIN_DASHBOARD_TrialLesson:
                App.setCurrentController(name);
                App.isLoggedIn(() => new AdminDashboardTrialLessonController(), () => new AdminLoginController());
                App.unloadChatbot();
                break;

            case App.CONTROLLER_ADMIN_DASHBOARD_Study:
                App.setCurrentController(name);
                App.isLoggedIn(() => new AdminDashboardStudyController(), () => new AdminLoginController());
                App.unloadChatbot();
                break;

            case App.CONTROLLER_STUDY:
                new StudyController();
                break;
            case App.CONTROLLER_UPLOAD:
// App.isLoggedIn(() => new UploadController(), () => new LoginController());
                App.isLoggedIn(() => new UploadController(), () => new AdminLoginController());
                break;
            case App.CONTROLLER_TRIALLESSON:
                App.setCurrentController(name);
                new TrialLessonController();
                break;
            case App.CONTROLLER_TRIALSE:
                App.setCurrentController(name);
                new TrialSEController();
                break;
            case App.CONTROLLER_LANDINGPAGE:
                App.setCurrentController(name);
                new LandingpageController();
                break;
            case App.CONTROLLER_ADMINMAP:
                App.setCurrentController(name);
                App.isLoggedIn(() => new adminMapController(), () => new AdminLoginController());
                App.unloadChatbot();
                break;

            default:
                return false;
        }

        return true;
    }

    /**
     * Alternative way of loading controller by url
     * @param fallbackController
     */
    static loadControllerFromUrl(fallbackController) {
        const currentController = App.getCurrentController();

        if (currentController) {
            if (!App.loadController(currentController.name, currentController.data)) {
                App.loadController(fallbackController);
            }
        } else {
            App.loadController(fallbackController);
        }
    }

    /**
     * Looks at current URL in the browser to get current controller name
     * @returns {string}
     */
    static getCurrentController() {
        const fullPath = location.hash.slice(1);

        if (!fullPath) {
            return undefined;
        }

        const queryStringIndex = fullPath.indexOf("?");

        let path;
        let queryString;

        if (queryStringIndex >= 0) {
            path = fullPath.substring(0, queryStringIndex);
            queryString = Object.fromEntries(new URLSearchParams(fullPath.substring(queryStringIndex + 1)));
        } else {
            path = fullPath;
            queryString = undefined
        }

        return {
            name: path,
            data: queryString
        };
    }

    /**
     * Sets current controller name in URL of the browser
     * @param name
     */
    static setCurrentController(name, controllerData) {
        if (App.dontSetCurrentController) {
            return;
        }

        if (controllerData) {
            history.pushState(undefined, undefined, `#${name}?${new URLSearchParams(controllerData)}`);
        } else {
            history.pushState(undefined, undefined, `#${name}`);
        }
    }

    /**
     * Convenience functions to handle logged-in states
     * @param whenYes - function to execute when user is logged in
     * @param whenNo - function to execute when user is logged in
     */
    static isLoggedIn(whenYes, whenNo) {
        if (App.sessionManager.get("username")) {
            whenYes();
        } else {
            whenNo();
        }
    }

    /**
     * Removes username via sessionManager and loads the login screen
     */
    static handleLogout() {
        App.sessionManager.remove("username");

        App.loadChatbot();
//go to login screen
        App.loadController(App.CONTROLLER_ADMIN_LOGIN);
    }
}

window.addEventListener("hashchange", function () {
    App.dontSetCurrentController = true;
    App.loadControllerFromUrl(App.CONTROLLER_WELCOME);
    App.dontSetCurrentController = false;
});

//When the DOM is ready, kick off our application.
window.addEventListener("DOMContentLoaded", _ => {
    new App();
});