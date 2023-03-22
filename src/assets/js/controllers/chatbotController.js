/**
 * Responsible for handling the actions happening on the navigation
 *
 * @author Lennard Fonteijn
 */

import { Controller } from "./controller.js";

export class ChatbotController extends Controller {
    #chatboxView;

    constructor() {
        super();
        console.log("ChatbotController constructor");
        this.#setupView();
    }

    async #setupView() {
        // Load the chatbox view
        const view = (this.#chatboxView = await this.loadHtmlIntoCustomElement(
            "html_views/chatbot.html",
            document.querySelector(".chatbox")
        ));

        // Get the chatbot button and window elements
        const openForm = view.querySelector("#openForm");
        console.log("openForm:", openForm);
        const closeChatButton = view.querySelector("#closeChatButton");
        console.log("closeChatButton:", closeChatButton);
        const chatPopup = view.querySelector("#chatPopup");
        console.log("chatPopup:", chatPopup);
        const chatTextarea = view.querySelector("#chatTextarea");
        console.log("chatTextarea:", chatTextarea);

        // Add an event listener to the chatbot button
        openForm.addEventListener("click", () => {
            chatPopup.style.display = "block";
        });

        // Add an event listener to the close button
        closeChatButton.addEventListener("click", () => {
            chatPopup.style.display = "none";
        });

        // Create a new div element to hold the chatbot window
        const chatboxDiv = document.createElement("div");
        chatboxDiv.classList.add("chatbox");

        // Append the chatbot window to the new div element
        chatboxDiv.appendChild(view.body.firstChild);

        // Add the new div element to the main content
        const mainContent = document.querySelector(".content");
        mainContent.appendChild(chatboxDiv);
    }
}