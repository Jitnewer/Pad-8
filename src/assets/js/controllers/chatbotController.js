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

//     async #setupView() {
//         // Load the chatbox view
//         const view = (this.#chatboxView = await this.loadHtmlIntoCustomElement(
//             "html_views/chatbot.html",
//             document.querySelector(".chatbox")
//         ));
//
//         // Get the chatbot button and window elements
//         const openForm = view.querySelector("#openForm");
//         console.log("openForm:", openForm);
//         const closeChatButton = view.querySelector("#closeChatButton");
//         console.log("closeChatButton:", closeChatButton);
//         const chatPopup = view.querySelector("#chatPopup");
//         console.log("chatPopup:", chatPopup);
//
//
//         // Add an event listener to the chatbot button
//         openForm.addEventListener("click", () => {
//             chatPopup.style.display = "block";
//         });
//
//         // Add an event listener to the close button
//         closeChatButton.addEventListener("click", () => {
//             chatPopup.style.display = "none";
//         });
//
//         // Create a new div element to hold the chatbot window
//         const chatboxDiv = document.createElement("div");
//         chatboxDiv.classList.add("chatbox");
//
//         // Append the chatbot window to the new div element
//         // chatboxDiv.appendChild(view.body.firstChild);
//
// // Define the URL of the server endpoint that will return the chatbot data
//         const url = '/chatbot';
//
// // Fetch the data from the server using the GET method
//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 const list = document.querySelector('.chatbot-list');
//
//                 data.forEach(chat => {
//                     const listItem = document.createElement('li');
//                     listItem.innerText = `id: ${chat.id}, Question: ${chat.question}, Answer: ${chat.answer}`;
//                     list.appendChild(listItem);
//                 });
//             })
//             .catch(error => console.error(error));
//
//
//
//         // Add the new div element to the main content
//         const mainContent = document.querySelector(".content");
//         mainContent.appendChild(chatboxDiv);
//     }
// }

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

        // Define the URL of the server endpoint that will return the chatbot data
        const url = "/chatbot";

        // Fetch the data from the server using the GET method
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // Loop through the chatbot data and append each question and answer to a list item
                const list = document.querySelector(".chatbot-list");

                data.forEach((chat) => {
                    const listItem = document.createElement("li");
                    listItem.innerText = `id: ${chat.id},Question: ${chat.question}, Answer: ${chat.answer}`;
                    list.appendChild(listItem);
                });
            })
            .catch((error) => console.error(error));

        // Add the new div element to the main content
        const mainContent = document.querySelector(".content");
        mainContent.appendChild(chatboxDiv);
    }


}