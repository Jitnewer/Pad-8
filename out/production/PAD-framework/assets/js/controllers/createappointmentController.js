/**
 * Controller for create appointments screen and user interaction
 * @author: Kevin Isaza
 */
import{Controller} from "./controller.js";
import {AppointmentsRepository} from "../repositories/appointmentsRepository.js";
export class createappointmentController extends Controller{
    #createAppointmentView;
    #appointmentsRepository;

    constructor() {
        super();
        this.#setupView();
        this.#appointmentsRepository = new AppointmentsRepository();

    }

   async #setupView() {
       this.#createAppointmentView = await super.loadHtmlIntoContent("html_views/create_appointment.html");

       this.#createAppointmentView.querySelector("#search").addEventListener("click",
           (event) => this.#saveAppointment(event));

   }


          async  #saveAppointment(event) {
                event.preventDefault();
                const name = this.#createAppointmentView.querySelector("#inputName").value;
                const email = this.#createAppointmentView.querySelector("#inputEmail").value;
                const date = this.#createAppointmentView.querySelector("#inputDate").value;
                const selectedDate = new Date();
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const maxDate = new Date(today);
                maxDate.setDate(maxDate.getDate() + 7);
                const errorBox = this.#createAppointmentView.querySelector(".error");

                if (selectedDate < today) {
                    errorBox.innerHTML = "Datum moet in de toekomst liggen";
                } else if (selectedDate > maxDate) {
                    errorBox.innerHTML = "Datum moet binnen de komende 7 dagen vallen";}
                else if (name.length === 0 || name.length === 45) {
                        errorBox.innerHTML = "Naam kan niet leeg zijn of meer dan 45 karakters"
                    } else if (email.length === 0) {
                        errorBox.innerHTML = "email kan niet leeg zijn"
                    } else {
                    try{
                        errorBox.innerHTML = "";

                        console.log(name + " " + email + " " + date )

                     const data = await this.#appointmentsRepository.createAppointment(name,email,date);
                     console.log(data);

                }catch (e){

                        errorBox.innerHTML = "Er is iets fout gegaan";

                    }
                }



                }}
