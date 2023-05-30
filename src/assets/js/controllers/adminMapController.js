import {Controller} from "./controller.js";
import {adminMapRepository} from "../repositories/adminMapRepository.js";
import {NetworkManager} from "../framework/utils/networkManager.js";

export class adminMapController extends Controller {
    #adminMapView;
    #adminMapRepository;
    #networkManager

    constructor() {
        super();
        this.#adminMapRepository = new adminMapRepository();
        this.#networkManager = new NetworkManager();
        this.#setupView();
    }


    async #setupView() {
        this.#adminMapView = await super.loadHtmlIntoContent("html_views/admin_Map.html");
        let uploadButton = this.#adminMapView.querySelector(".upload");
        if (uploadButton) {
            uploadButton.addEventListener("click", (event) => this.#saveMap(event));
        }

        const floors = await this.#networkManager.doRequest("/adminMap", "GET");
        const listGroup = this.#adminMapView.querySelector(".list-group");
        for (const floor of floors) {
            const a = document.createElement("a");
            a.className = "list-group-item list-group-item-action";
            a.dataset.id = floor.id;
            a.dataset.floor = floor.floor;
            a.dataset.image = floor.image;
            listGroup.appendChild(a);
        }
    }


    async #saveMap(event) {
        event.preventDefault();

        const floor = this.#adminMapView.querySelector("#floor").value;
        const filename = this.#adminMapView.querySelector("#filename").value;
        const files = this.#adminMapView.querySelector('#file').value;


        try {
            if (floor == null || floor === "" || filename == null || filename == "") {
                alert("Opleiding en verdieping mag niet leeg zijn");
            } else if (filename.length > 35) {
                alert("Naam van de opleiding mag niet langer dan 35 karakters zijn")
            } else {
                if (confirm("weet u zeker dat u het wil toevoegen") === true) {
                    await this.#adminMapRepository.saveMap(floor, files, filename);
                    location.reload();
                }
            }
        } catch (e) {
            alert("er ging iets mis!");
        }
    }
}

// import {RoomsExampleRepository} from "../repositories/roomsExampleRepository.js";
// import {App} from "../app.js";
// import {Controller} from "./controller.js";
// import {NetworkManager} from "../framework/utils/networkManager.js";
//
// export class adminMapController extends Controller{
//
//     #adminMapView
//     #networkManager
//
//     constructor() {
//         super();
//         this.#networkManager = new NetworkManager();
//         this.#setupView();
//     }
//
//     async #setupView() {
//
//         this.#adminMapView = await super.loadHtmlIntoContent("html_views/admin_Map.html")
//
//
//         const floors = await this.#networkManager.doFileRequest("/map", "GET");
//         const listGroup = this.#adminMapView.querySelector(".list-group");
//         for (const map of floors) {
//             const a = document.createElement("a");
//             a.className = "list-group-item list-group-item-action";
//             a.dataset.idMap = map.id;
//             a.dataset.floor = map.floor;
//             a.dataset.files = map.files;
//             a.innerHTML = map.floor === 0 ? "Begane grond" : `Verdieping ${map.floor}`;
//             listGroup.appendChild(a);
//         }
//
//         const mapBtns = this.#adminMapView.querySelectorAll(".list-group-item");
//         mapBtns.forEach((btn, i) => {
//             btn.addEventListener("click", async () => {
//                 this.#setActiveListItem(btn);
//                 if (i === 0) {
//                     this.#onItemClickCreate(btn);
//                 } else {
//                     this.#onItemClickFloorplan(btn);
//                 }
//             });
//         });
//
//         // add event listener to the file input field to show the preview image
//         this.#adminMapView.querySelector("#file").addEventListener("change", (event) => {
//             // set filename in input field
//             this.#adminMapView.querySelector("#filename").value = event.target.file[0].idMap;
//
//             // show preview image
//             this.#adminMapView.querySelector("#preview-image").style.display = "revert";
//
//             // set preview image
//             this.#adminMapView.querySelector("#preview-image").src = URL.createObjectURL(event.target.file[0]);
//         })
//
//         // add event listener to the upload button
//         this.#adminMapView.querySelector(".upload").addEventListener("click", async (event) => {
//             event.preventDefault()
//
//             const filename = this.#adminMapView.querySelector("#filename").value;
//             const floor = this.#adminMapView.querySelector("#floor").value;
//
//             // check if existing floorplan is selected, in that case we update the floorplan
//             const selectedFloorplan = this.#adminMapView.querySelector(".list-group-item.active");
//             const idMap = selectedFloorplan.dataset.idMap;
//             if (idMap) {
//                 // check if a new file has been uploaded in the file input field
//                 const fileInput = this.#adminMapView.querySelector("#file");
//                 if (fileInput.files.length !== 0) {
//                     if (!await this.#uploadFile(fileInput, filename)) {
//                         return;
//                     }
//                 }
//
//                 try {
//                     await this.#networkManager.doFileRequest("/map/update", "POST", {floor, filename, files});
//                     App.sessionManager.set("currentEditFloorplan", idMap);
//                     alert("Plattegrond bijgewerkt")
//                     this.#setupView();
//                 } catch (e) {
//                     console.error(e);
//                     alert("Fout bij bijwerken plattegrond")
//                 }
//
//                 return;
//             }
//
//             // else we create a new floorplan
//             const fileInput = this.#adminMapView.querySelector("#file");
//             if (!await this.#uploadFile(fileInput, filename)) {
//                 return;
//             }
//
//             try {
//                 const result = await this.#networkManager.doFileRequest("/map/upload", "POST", {floor, filename, files});
//                 App.sessionManager.set("currentEditFloorplan", result.idMap);
//                 alert("Plattegrond toegevoegd")
//                 this.#setupView();
//             } catch (e) {
//                 console.error(e);
//                 alert("Fout bij toevoegen plattegrond")
//                 return;
//             }
//         });
//     }
//
//     async #uploadFile(fileInput, filename) {
//         if (fileInput.files.length === 0) {
//             console.error("No file selected");
//             alert("Geen bestand geselecteerd", "Selecteer een bestand om te uploaden")
//             return false;
//         }
//
//         const file = fileInput.files[0];
//
//         // check if file is too large
//         if (!this.#validateFile(file)) {
//             return false;
//         }
//
//         // add file and filename to formdata
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("filename", filename);
//
//         try {
//             await this.#networkManager.doFileRequest("/upload", "POST", formData);
//             return true;
//         } catch (e) {
//             console.error(e);
//             alert("Fout bij uploaden bestand")
//             return false;
//         }
//     }
//
//     #validateFile(file) {
//         const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
//         if (file.size > MAX_FILE_SIZE) {
//             console.error("Filesize too large");
//             alert("Bestand te groot", "Het geselecteerde bestand is te groot, selecteer een bestand kleiner dan 10MB")
//             return false;
//         }
//         return true;
//     }
//
//     #setActiveListItem(selectedItem) {
//         const listItems = this.#adminMapView.querySelectorAll(".list-group-item");
//         listItems.forEach((item) => {
//             item.classList.toggle("active", item === selectedItem);
//         });
//     }
//
//     #onItemClickCreate(btn) {
//         this.#adminMapView.querySelector(".form-title").innerHTML = "Nieuwe plattegrond uploaden";
//         this.#adminMapView.querySelector(".hotspot").style.display = "none";
//         this.#adminMapView.querySelector(".delete").style.display = "none";
//         this.#adminMapView.querySelector("#file").value = "";
//         this.#adminMapView.querySelector("#floor").value = "";
//         this.#adminMapView.querySelector("#filename").value = "";
//         this.#adminMapView.querySelector("#preview-image").src = "";
//         this.#adminMapView.querySelector("#preview-image").style.display = "none";
//     }
//
//     #onItemClickFloorplan(btn) {
//         this.#adminMapView.querySelector(".form-title").innerHTML = `Verdieping ${btn.dataset.floor} bewerken`;
//         this.#adminMapView.querySelector(".hotspot").style.display = "revert";
//         this.#adminMapView.querySelector(".delete").style.display = "revert";
//         this.#adminMapView.querySelector("#floor").value = btn.dataset.floor;
//         this.#adminMapView.querySelector("#filename").value = btn.dataset.files;
//         this.#adminMapView.querySelector("#preview-image").src = `/uploads/${btn.dataset.files}`;
//         this.#adminMapView.querySelector("#preview-image").style.display = "revert";
//     }
// }
