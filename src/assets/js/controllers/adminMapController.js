import { Controller } from "./controller.js";
import { adminMapRepository } from "../repositories/adminMapRepository.js";

export class adminMapController extends Controller {
    #adminMapView;
    #adminMapRepository;

    constructor() {
        super();
        this.#adminMapRepository = new adminMapRepository();
        this.#setupView();
        this.#preView();
    }

    async #setupView() {
        this.#adminMapView = await super.loadHtmlIntoContent("html_views/admin_Map.html");
        let uploadButton = this.#adminMapView.querySelector(".upload");
        if (uploadButton) {
            uploadButton.addEventListener("click", (event) => this.#saveMap(event));
        }
    }

    async #preView() {
        const maps = await this.#adminMapRepository.getMap();
        const listGroup = this.#adminMapView.querySelector(".list-group");
        for (const { id, floor, filename } of maps) {
            const listItem = document.createElement("li");
            listItem.className =
                "list-group-item d-flex justify-content-between align-items-center";

            const fileNameElement = document.createElement("span");
            fileNameElement.innerText = filename;
            listItem.appendChild(fileNameElement);

            const floorElement = document.createElement("span");
            floorElement.innerText = floor;
            listItem.appendChild(floorElement);

            const editButton = document.createElement("button");
            editButton.innerText = "Edit";
            editButton.className = "btn btn-primary";
            editButton.addEventListener("click", () => this.#editMap(id));
            listItem.appendChild(editButton);

            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.className = "btn btn-danger";
            deleteButton.addEventListener("click", () => this.#deleteMap(id));
            listItem.appendChild(deleteButton);

            listGroup.appendChild(listItem);
        }
    }

    async #deleteMap(id) {
        try {
            if (confirm("Are you sure you want to delete this map?")) {
                await this.#adminMapRepository.deleteMap(id);
                location.reload();
            }
        } catch (e) {
            alert("An error occurred while deleting the map.");
        }
    }

    async #editMap(id) {
        const floor = prompt("Enter the new floor:");
        const filename = prompt("Enter the new filename:");

        if (floor !== null && filename !== null) {
            try {
                await this.#adminMapRepository.updateMap(id, floor, filename);
                location.reload();
            } catch (e) {
                alert("An error occurred while updating the map.");
            }
        }
    }

    async #saveMap(event) {
        event.preventDefault();

        const floor = this.#adminMapView.querySelector("#floor").value;
        const filename = this.#adminMapView.querySelector("#filename").value;
        const files = this.#adminMapView.querySelector("#file").value;

        try {
            if (!floor || !filename) {
                alert("Floor and filename cannot be empty.");
            } else if (filename.length > 35) {
                alert("Filename cannot exceed 35 characters.");
            } else {
                if (confirm("Are you sure you want to save this map?")) {
                    await this.#adminMapRepository.saveMap(floor, files, filename);
                    location.reload();
                }
            }
        } catch (e) {
            alert("An error occurred while saving the map.");
        }

    }
}
