/**
 * Controller for create testlesson and user interaction
 * @author Chant Balci
 */
import {Controller} from "./controller.js";
import {AdminDashboardRepository} from "../repositories/adminDashboardRepository.js";
// import {TrialLessonRepository} from "../repositories/trialLessonRepository";

export class AdminDashboardController extends Controller {
    #adminDashboardView;
    #adminDashboardRepository;
    // #trialLessonRepository;
    // #triallessonView;

    constructor() {
        super();
        this.#adminDashboardRepository = new AdminDashboardRepository();
        // this.#trialLessonRepository = new TrialLessonRepository();
        this.#setupView();
    }

    async #setupView() {
        this.#adminDashboardView = await super.loadHtmlIntoContent("html_views/adminDashboard.html");
        this.#adminDashboardView.querySelector(".adminDashboard-Apply").addEventListener("click",
            (event) => this.#saveTestlesson(event));
        // window.addEventListener("DOMContentLoaded", this.#getTestlesson());
    }

    async #saveTestlesson(event) {
        event.preventDefault();

        const name = this.#adminDashboardView.querySelector("#adminDashboard_Testlesson_Name").value;
        const duration = this.#adminDashboardView.querySelector("#adminDashboard_Testlesson_duration").value;
        const date = this.#adminDashboardView.querySelector("#adminDashboard_Testlesson_dateTime").value;
        const location = this.#adminDashboardView.querySelector("#adminDashboard_Testlesson_Location").value;
        const room = this.#adminDashboardView.querySelector("#adminDashboard_Testlesson_Room").value;
        const subject = this.#adminDashboardView.querySelector("#adminDashboard_Testlesson_Subject").value;
        const time = this.#adminDashboardView.querySelector("#adminDashboard_Testlesson_time").value;

        console.log(name + " " + duration + " " + date + " " + location + " " + room + " " + subject + " " + time);

        try {
            console.log(name, duration, date, location, room, subject, time);
            await this.#adminDashboardRepository.saveTestlesson(name, duration, date, location, room, subject, time);

        } catch (e) {
            console.log(e);
        }
    }

//     async #getTestlesson(){
//         const name = this.#triallessonView.querySelector("#Testlesson-name");
//             name.innerHTML = data[0].name;
//
//     }
// }
}