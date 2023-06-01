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

        const floors = await this.#mapRepository.getMaps();
        if (floors.length === 0) {
            return;
        }


        const defaultFloor = floors[0];
        await this.#loadFloorImage(defaultFloor.filename);


        for (const floor of floors) {
            const btn = document.createElement("button");
            btn.className = "btn floorplan-btn btn-outline-primary me-2 my-2";
            btn.innerHTML = floor.floor === 0 ? "Begane grond" : `Verdieping ${floor.floor} ${floor.filename}`;
            btn.dataset.id = floor.id;
            btn.dataset.floor = floor.floor;
            btn.dataset.filename = floor.filename;
            this.#mapView.querySelector(".floorplan-btn-container").appendChild(btn);
        }

        const floorBtns = this.#mapView.querySelectorAll(".floorplan-btn-container button");
        floorBtns[0].classList.add("active");
        floorBtns.forEach((btn) => {
            btn.addEventListener("click", async () => {
                this.#mapView.querySelectorAll(".floorplan-btn").forEach((btn) => {
                    btn.classList.remove("active");
                });
                btn.classList.add("active");
                const filename = btn.dataset.filename;
                await this.#loadFloorImage(filename);
            });
        });
    }

    async #loadFloorImage() {
        const imageElement = this.#mapView.querySelector(".floorplan-img");
        imageElement.src = `/assets/images/plattegrond-wibaut.jpg`;
    }
}
