import { Controller } from "./controller.js";
import { ChatbotQARepository } from "../repositories/ChatbotQARepository.js";
export class ChatbotController extends Controller {
    chatboxView;
    #chatbotRepository;

    constructor() {
        super();
        console.log("ChatbotController constructor");
        this.#chatbotRepository = new ChatbotQARepository();
        this.#setupView();
    }

    fetchAnswer = async (questionId) => {
        const url = `http://localhost:3000/chatbot/answer/${questionId}`;
        try {
            const response = await fetch(url);
            console.log("Server response:", response);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    addRelatedQuestions = (relatedQuestions, listItem) => {
        relatedQuestions.forEach(question => {
            const relatedQuestionItem = document.createElement("li");
            relatedQuestionItem.innerText = question.question;
            relatedQuestionItem.dataset.questionId = question.id;
            relatedQuestionItem.classList.add('question');
            relatedQuestionItem.style.cursor = "pointer";

            relatedQuestionItem.addEventListener("click", async () => {
                // Show loading animation
                loading.style.display = "block";

                // Hide greeting message
                document.getElementById("greeting").style.display = "none";

                const data = await this.fetchAnswer(relatedQuestionItem.dataset.questionId);

                // Add a 3-second delay before showing the answer
                await new Promise(resolve => setTimeout(resolve, 2500));

                // Hide loading animation
                loading.style.display = "none";

                const answerListItem = document.createElement("li");
                answerListItem.innerText = data.answer;
                answerListItem.classList.add('answer');

                // Insert the answer after the clicked question
                relatedQuestionItem.insertAdjacentElement('afterend', answerListItem);

                // Add related questions underneath the answer
                this.addRelatedQuestions(data.relatedQuestions, answerListItem);
            });

            listItem.insertAdjacentElement('afterend', relatedQuestionItem);
        });
    };

    async #setupView() {
        const view = (this.chatboxView = await this.loadHtmlIntoCustomElement(
            "html_views/chatbot.html",
            document.querySelector(".chatbox")
        ));

        const openForm = view.querySelector("#openForm");
        const closeChatButton = view.querySelector("#closeChatButton");
        const chatPopup = view.querySelector("#chatPopup");
        const loading = view.querySelector("#loading"); // Get the loading element

        openForm.addEventListener("click", () => {
            chatPopup.style.display = "block";
        });

        closeChatButton.addEventListener("click", () => {
            chatPopup.style.display = "none";
        });

        const list = document.querySelector('.chatbot-list');

        // Use the repository method instead of native fetch
        const data = await this.#chatbotRepository.getQuestionLimt();

        // The rest of your code as it is...
        console.log(data);
        data.forEach(question => {
            const listItem = document.createElement('li');
            listItem.innerText = question.question;
            listItem.dataset.questionId = question.id;
            listItem.classList.add('question');
            listItem.style.cursor = "pointer";

            listItem.addEventListener("click", async () => {
                // Show loading animation
                loading.style.display = "block";

                // Hide greeting message
                document.getElementById("greeting").style.display = "none";

                const answerData = await this.fetchAnswer(listItem.dataset.questionId);

                // Add a 3-second delay before showing the answer
                await new Promise(resolve => setTimeout(resolve, 2500));

                // Hide loading animation
                loading.style.display = "none";

                const answerListItem = document.createElement("li");
                answerListItem.innerText = answerData.answer;
                answerListItem.classList.add('answer');

                // Insert the answer after the clicked question
                listItem.insertAdjacentElement('afterend', answerListItem);

                // Add related questions underneath the answer
                this.addRelatedQuestions(answerData.relatedQuestions, answerListItem);
            });

            list.appendChild(listItem);
        });
    }
}