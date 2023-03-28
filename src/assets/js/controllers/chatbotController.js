import { Controller } from "./controller.js";

export class ChatbotController extends Controller {
    #chatboxView;

    constructor() {
        super();
        console.log("ChatbotController constructor");
        this.#setupView();
    }

    fetchAnswer = async (questionId) => {
        // Fetch the answer from the server
        const url = `/chatbot/answer/${questionId}`;
        try {
            const response = await fetch(url);
            console.log("Server response:", response);
            const answer = await response.json();
            return answer;
        } catch (error) {
            console.error(error);
        }
    };


    async #setupView() {
        // Load the chatbox view
        const view = (this.#chatboxView = await this.loadHtmlIntoCustomElement(
            "html_views/chatbot.html",
            document.querySelector(".chatbox")
        ));

        // Get the chatbot button and window elements
        const openForm = view.querySelector("#openForm");
        const closeChatButton = view.querySelector("#closeChatButton");
        const chatPopup = view.querySelector("#chatPopup");

        // Add an event listener to the chatbot button
        openForm.addEventListener("click", () => {
            chatPopup.style.display = "block";
        });

        // Add an event listener to the close button
        closeChatButton.addEventListener("click", () => {
            chatPopup.style.display = "none";
        });

        // Define the URL of the server endpoint that will return the chatbot questions
        let url = '/chatbot/questions';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('Questions data:', data);
                const list = document.querySelector('.chatbot-list');
                data.forEach(question => {
                    const listItem = document.createElement('li');
                    listItem.innerText = question.question;
                    listItem.dataset.questionId = question.id;
                    listItem.classList.add('question');

                    listItem.style.cursor = "pointer";

                    listItem.addEventListener("click", async () => {

                        const answer = await this.fetchAnswer(listItem.dataset.questionId);
                        const answerListItem = document.createElement("li");
                        answerListItem.innerText = answer.answer;
                        answerListItem.classList.add('answer'); // Add class name for answer
                        list.appendChild(answerListItem);
                    });
                    list.appendChild(listItem);
                });
            })
            .catch(error => console.error(error));
    }


}
