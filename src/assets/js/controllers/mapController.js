import {RoomsExampleRepository} from "../repositories/roomsExampleRepository.js";
import {App} from "../app.js";
import {mapRepository} from "../repositories/mapRepository.js";
import {Controller} from "./controller.js";

export class mapController extends Controller{
    #mapRepository
    #mapView

    constructor() {
        super();
        this.#mapRepository = new mapRepository();
        this.#setupView();
    }

    async #setupView() {

        this.#mapView = await super.loadHtmlIntoContent("html_views/map.html")

        const floors = await this.#mapRepository.getFloors();
        if (floors.length === 0) {
            return;
        }

        // set the default image src to the first floor
        this.#mapView.querySelector(".floorplan-img").src = `/img/Map.PAD.png`

        // add all the buttons for the different floors
        for (const floor of floors) {
            const btn = document.createElement("button");
            btn.className = "btn floorplan-btn btn-outline-primary me-2 my-2";
            btn.innerHTML = floor.floor === 0 ? "Begane grond" : `Verdieping ${floor.floor}`;
            btn.dataset.id = floor.id;
            btn.dataset.floor = floor.floor;
            btn.dataset.image = floor.image;
            this.#mapView.querySelector(".floorplan-btn-container").appendChild(btn);
        }

        // change the floorplan image when a button is clicked
        const mapBtns = this.#mapView.querySelectorAll(".floorplan-btn-container button");
        mapBtns[0].classList.add("active");
        mapBtns.forEach((btn) => {
            btn.addEventListener("click", async () => {
                this.#mapView.querySelectorAll(".floorplan-btn").forEach(btn => {
                    btn.classList.remove("active");
                })
                btn.classList.add("active");
                this.#mapView.querySelector(".floorplan-img").src = `/img/Map.PAD.png}`
            })
        })


        const mapImg = this.#mapView.querySelector(".floorplan-img");
        mapImg.addEventListener("load", () => {
        })
    }}