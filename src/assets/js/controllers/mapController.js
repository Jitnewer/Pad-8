import { Controller } from "./controller.js";
import { mapRepository } from "../repositories/mapRepository.js";

export class mapController extends Controller {
    #mapRepository;
    #mapView;

    constructor() {
        super();
        this.#mapRepository = new mapRepository();
        this.#setupView();
    }

    async #setupView() {
        this.#mapView = await super.loadHtmlIntoContent("html_views/map.html");

        const data = await this.#mapRepository.getMaps();
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].files);
            this.#mapView.querySelector(".floorplan-img").src = data[i].files;
        }
        if (data.length === 0) {
            return;
        }

        // set the default image src to the first floor
        // this.#mapView.querySelector(".floorplan-img").src = `uploads/` + data.files;

        // add all the buttons for the different floors
        for (const floor of data) {
            const btn = document.createElement("button");
            btn.className = "btn floorplan-btn btn-outline-primary me-2 my-2";
            btn.innerHTML = floor.floor === 0 ? "Begane grond" : `Verdieping ${floor.floor}`;
            btn.dataset.id = floor.id;
            btn.dataset.floor = floor.floor;
            btn.dataset.filename = floor.files;
            this.#mapView.querySelector(".floorplan-btn-container").appendChild(btn);
        }

        // change the floorplan image when a button is clicked
        const floorBtns = this.#mapView.querySelectorAll(".floorplan-btn-container button");
        floorBtns[0].classList.add("active");
        floorBtns.forEach((btn) => {
            btn.addEventListener("click", async () => {
                this.#mapView.querySelectorAll(".floorplan-btn").forEach((btn) => {
                    btn.classList.remove("active");
                });
                btn.classList.add("active");
                const files = btn.dataset.files;
                // this.#mapView.querySelector(".floorplan-img").src = `uploads/` + files;
            });
        });
    }
}