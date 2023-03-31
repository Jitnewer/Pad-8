/**
 * @author: Kevin Isaza Arias
 * Class representing Controller  for chatbox API
 */

import { Controller } from "./controller.js";

export class ChatbotController extends Controller {
    #chatboxView;

    constructor() {
        super();
        console.log("ChatbotController constructor");
        this.#setupView();
    }

    fetchAnswer = async (questionId) => {

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

        const view = (this.#chatboxView = await this.loadHtmlIntoCustomElement(
            "html_views/chatbot.html",
            document.querySelector(".chatbox")
        ));


        const openForm = view.querySelector("#openForm");
        const closeChatButton = view.querySelector("#closeChatButton");
        const chatPopup = view.querySelector("#chatPopup");


        openForm.addEventListener("click", () => {
            chatPopup.style.display = "block";
        });

        closeChatButton.addEventListener("click", () => {
            chatPopup.style.display = "none";
        });

        const addQuestions = (data) => {
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
                    answerListItem.classList.add('answer');
                    list.appendChild(answerListItem);


                    addQuestions(data);
                });

                list.appendChild(listItem);
            });
        };


        let url = '/chatbot/questions';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('Questions data:', data);
                addQuestions(data);
            })
            .catch(error => console.error(error));
    }

}
