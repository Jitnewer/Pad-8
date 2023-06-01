/**
 * Controller for create testlesson and user interaction
 * @author Chant Balci
 */
import {Controller} from "./controller.js";
import {AdminDashboardTrialLessonRepository} from "../repositories/adminDashboardTrialLessonRepository.js";
import {TrialLessonRepository} from "../repositories/trialLessonRepository.js";



export class AdminDashboardTrialLessonController extends Controller {
    #adminDashboardTrialLessonView;
    #adminDashboardTrialLessonRepository;
    #trialLessonView;
    #trialLessonRepository;

    constructor() {
        super();
        this.#adminDashboardTrialLessonRepository = new AdminDashboardTrialLessonRepository();
        this.#trialLessonRepository = new TrialLessonRepository();
        this.#setupView();
    }

    async #setupView() {
        this.#createTrialLesson();

        this.#adminDashboardTrialLessonView = await super.loadHtmlIntoContent("html_views/adminDashboardTrialLesson.html");
        this.#adminDashboardTrialLessonView.querySelector(".adminDashboard-Apply").addEventListener("click",
            (event) => this.#saveTestlesson(event));
    }

    async #saveTestlesson(event) {
        event.preventDefault();

        const name = this.#adminDashboardTrialLessonView.querySelector("#adminDashboard_Testlesson_Name").value;
        const duration = this.#adminDashboardTrialLessonView.querySelector("#adminDashboard_Testlesson_duration").value;
        const date = this.#adminDashboardTrialLessonView.querySelector("#adminDashboard_Testlesson_dateTime").value;
        const lessonLocation = this.#adminDashboardTrialLessonView.querySelector("#adminDashboard_Testlesson_Location").value;
        const room = this.#adminDashboardTrialLessonView.querySelector("#adminDashboard_Testlesson_Room").value;
        const subject = this.#adminDashboardTrialLessonView.querySelector("#adminDashboard_Testlesson_Subject").value;
        const time = this.#adminDashboardTrialLessonView.querySelector("#adminDashboard_Testlesson_time").value;
        const capacity = this.#adminDashboardTrialLessonView.querySelector("#adminDashboard_Capacity").value;

        const durationMax = /^[0-5](\.\d+)?$/

        try {
            if (name == null || name === "") {
                alert("Opleiding mag niet leeg zijn");
            }
            else if (name.length > 30) {
                alert("Naam van de opleiding mag niet langer dan 30 karakters zijn")
            }
            else if (duration == null || duration === "") {
                alert("Duur mag niet leeg zijn of letters bevatten");
            }
            else if (!duration.match(durationMax)){
                alert("Duur mag niet langer dan 5 uur duren")
            }
            else if (date == null || date === "") {
                alert("Datum mag niet leeg zijn");
            }
            else if (lessonLocation === null || lessonLocation === "") {
                alert("Locatie mag niet leeg zijn");
            }
            else if (lessonLocation.length > 30){
                alert("Locatie mag niet langer zijn dan 30 characters")
            }
            else if (room === null || room === "") {
                alert("Lokaal mag niet leeg zijn");
            }
            else if (room.length > 30){
                alert("Lokaal mag niet langer zijn dan 30 characters")
            }
            else if (subject === null || subject === "") {
                alert("Vak mag niet leeg zijn");
            }
            else if (subject.length > 15){
                alert("Vak mag niet langer zijn dan 15 characters")
            }
            else if (time === null || time === "") {
                alert("de tijd mag niet leeg zijn");
            }
            else{
                if (confirm("weet u zeker dat u het wil toevoegen") === true) {
                    await this.#adminDashboardTrialLessonRepository.saveTestlesson(name, duration, date, lessonLocation, room, subject, time, capacity);
                    location.reload();
                }
            }
        } catch (e) {
            alert("er ging iets mis!");
        }
    }

    async #createTrialLesson () {
        const CLASS_NAME_ITEM = "trialLLi";
        let textNode;
        let elementLi;

        //Get trial lesson data
        const data = await this.#trialLessonRepository.getTrialLessons();
        console.log(data);

        //Trial lessons container
        const trialLessonContainer = this.#adminDashboardTrialLessonView.querySelector(".adminDashboard-position");

        //Create trial lessons
        for (let i = 0; i < data.length; i++) {
            //TrialLesson box
            const trialLesson = document.createElement("div");
            trialLesson.classList.add("admin-Testlesson-container");
            trialLessonContainer.appendChild(trialLesson);

            const nameContainer = document.createElement("div");
            nameContainer.classList.add("Testlesson-name");
            trialLesson.appendChild(nameContainer);

            //TrialLesson name
            const trialLessonName = document.createElement("h2");
            trialLessonName.classList.add("trialH2");
            textNode = document.createTextNode(data[i].name);
            trialLessonName.appendChild(textNode);
            nameContainer.appendChild(trialLessonName);

            //Trial lesson info
            const infoList = document.createElement("div");
            infoList.classList.add("Testlesson-content");
            trialLesson.appendChild(infoList);

            const ul = document.createElement("ul");
            ul.classList.add("trialUl");
            infoList.appendChild(ul);

            elementLi = document.createElement("li");
            elementLi.classList.add(CLASS_NAME_ITEM);
            textNode = document.createTextNode(data[i].timeDuration + " lesuren " + "("+(data[i].timeDuration * 50) + "min)");
            elementLi.appendChild(textNode);
            ul.appendChild(elementLi);

            elementLi = document.createElement("li");
            elementLi.classList.add(CLASS_NAME_ITEM);
            textNode = document.createTextNode(data[i].date.split("T")[0] + ", " + data[i].time.substring(0, 5));
            elementLi.appendChild(textNode);
            ul.appendChild(elementLi);

            elementLi = document.createElement("li");
            elementLi.classList.add(CLASS_NAME_ITEM);
            textNode = document.createTextNode(data[i].location + ", " + data[i].room);
            elementLi.appendChild(textNode);
            ul.appendChild(elementLi);

            elementLi = document.createElement("li");
            elementLi.classList.add(CLASS_NAME_ITEM);
            textNode = document.createTextNode(data[i].timeDuration + " uur proefles");
            elementLi.appendChild(textNode);
            ul.appendChild(elementLi);

            elementLi = document.createElement("li");
            elementLi.classList.add(CLASS_NAME_ITEM);
            textNode = document.createTextNode(data[i].subject);
            elementLi.appendChild(textNode);
            ul.appendChild(elementLi);

            elementLi = document.createElement("li");
            elementLi.classList.add(CLASS_NAME_ITEM);
            textNode = document.createTextNode("Max " + data[i].capacity + " participanten");
            elementLi.appendChild(textNode);
            ul.appendChild(elementLi);

            //Create apply button
            const applyButton = document.createElement("button");
            applyButton.classList.add("trash_Button_position");
            infoList.appendChild(applyButton);
            // giving the delete button a function that deletes the selected triallesson
            applyButton.addEventListener("click", () => this.#deleteTestlesson(data[i].id));

            const applyText = document.createElement("i");
            applyText.classList.add("fa-solid", "fa-trash", "trashcan-icon");
            // const applyText = document.createElement("img");
            // applyText.classList.add("trash_png");
            // applyText.src = "src/assets/img/Trashcan.png";
            // applyText.alt = "Trashcan";
            applyButton.appendChild(applyText);
        }
    }

    // hier maak ik de delete functie werkend
    async #deleteTestlesson(id){
        try {
            if(confirm("weet u zeker dat je het wilt verwijderen?") === true) {
                await this.#adminDashboardTrialLessonRepository.deleteTestlesson(id);
                await this.#adminDashboardTrialLessonRepository.deleteParticipants(id);
            }
        }
        catch(e){
            console.log(e)
        }
        window.location.reload();
    }
}
