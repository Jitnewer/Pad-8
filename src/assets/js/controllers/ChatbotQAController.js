import { ChatbotQARepository } from "../repositories/chatbotQARepository.js";

export class ChatbotQAController {
    constructor() {
        this.chatbotRepository = new ChatbotQARepository();
        this.loadView();
    }

    async loadView() {
        const view = await fetch("views/ChatbotQA.html");
        const html = await view.text();
        document.getElementById("content").innerHTML = html;

        const form = document.getElementById("create-question-answer-form");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const id = new Date().getTime();
            const question = form.elements["question"].value;
            const answer = form.elements["answer"].value;

            await this.createQuestionAnswer(id, question, answer);

            // Clear input fields
            form.elements["question"].value = "";
            form.elements["answer"].value = "";

            // Update the list of questions and answers
            this.updateQuestionsAnswersList();
        });

        // Initial load of questions and answers
         this.updateQuestionsAnswersList();
    }

    async updateQuestionsAnswersList() {
        const questionsAnswersList = document.getElementById("questions-answers-list");
        const questionsAnswers = await this.chatbotRepository.getAllQuestionsAnswers();

        questionsAnswersList.innerHTML = "";

        for (const qa of questionsAnswers) {
            const item = document.createElement("div");
            item.innerHTML = `
        <p>Question: ${qa.question}</p>
        <p>Answer: ${qa.answer}</p>
        <button data-id="${qa.id}">Delete</button>
      `;

            item.querySelector("button").addEventListener("click", async () => {
                await this.deleteQuestionAnswer(qa.id);
                this.updateQuestionsAnswersList();
            });

            questionsAnswersList.appendChild(item);
        }
    }
}
