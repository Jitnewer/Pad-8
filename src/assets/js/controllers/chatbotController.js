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
        // chatboxDiv.appendChild(view.body.firstChild);

// Define the URL of the server endpoint that will return the chatbot questions
        const url = '/chatbot/questions';

// Fetch the questions from the server using the GET method
        // Fetch the questions from the server using the GET method
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const list = document.querySelector('.chatbot-list');
                data.forEach(question => {
                    const listItem = document.createElement('li');
                    listItem.innerText = question.question;
                    list.appendChild(listItem);
                    console.log(listItem);
                    console.log(list);

                });
            })
            .catch(error => console.error(error));






        // Add the new div element to the main content
        const mainContent = document.querySelector(".content");
        mainContent.appendChild(chatboxDiv);
    }
}



