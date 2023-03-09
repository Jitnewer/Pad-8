/**
 * Controller for create testlesson and user interaction
 * @author Chant Balci
 */
import {Controller} from "./controller.js";
import {AdminDashboardRepository} from "../repositories/adminDashboardRepository.js";

export class AdminDashboardController extends Controller{
    #adminDashboardView;
    #adminDashboardRepository;

    constructor() {
        super();
        this.#adminDashboardRepository = new AdminDashboardRepository();
        this.#setupView();
    }
    async #setupView(){
        this.#adminDashboardView = await super.loadHtmlIntoContent("html_views/adminDashboard.html");

        this.#adminDashboardView.querySelector("#Submit_Testlesson").addEventListener("click",
            (event) => this.#saveTestlesson(event))
    }
   async #saveTestlesson(event){
        event.preventDefault();

        const name = this.#adminDashboardView.querySelector("#Testlesson_Name").value;
        const duration = this.#adminDashboardView.querySelector("#Testlesson_duration").value;
        const date = this.#adminDashboardView.querySelector("#Testlesson_dateTime").value;
        const location = this.#adminDashboardView.querySelector("#Testlesson_Location").value;
        const room = this.#adminDashboardView.querySelector("#Testlesson_Room").value;
        const subject = this.#adminDashboardView.querySelector("#Testlesson_Subject").value;

        console.log(name + " " + duration + " " + date + " " + location + " " + room + " " + subject);
        try{
            await this.#adminDashboardRepository.saveTestlesson(name,duration,date,location,room,subject);
     
        }
        catch (e) {
            console.log(e);
        }
    }
    }