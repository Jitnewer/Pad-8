import { ChatbotQARepository } from "../repositories/chatbotQARepository.js";

document.addEventListener("DOMContentLoaded", () => {
    const controller = new ChatbotQAController();
});
export class ChatbotQAController {
    constructor() {
        this.chatbotRepository = new ChatbotQARepository();
        this.loadView();
    }

    async updateQuestionAnswer(id, question, answer) {
        await this.chatbotRepository.updateQuestionAnswer(id, question, answer);
        this.updateQuestionsAnswersList();
    }
    async createQuestionAnswer(question, answer) {
        await this.chatbotRepository.createQuestionAnswer(question, answer);
    }

    async loadView() {
        const view = await fetch("html_views/ChatbotQA.html");
        const html = await view.text();
        document.querySelector("main.content").innerHTML = html;

        const form = document.getElementById("create-question-answer-form");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const id = new Date().getTime();
            const question = form.elements["question"].value;
            const answer = form.elements["answer"].value;

            await this.createQuestionAnswer( question, answer);
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
            <button data-id="${qa.id}" class="delete-button">Delete</button>
            <button data-id="${qa.id}" class="update-button">Update</button>
        `;

            item.querySelector(".delete-button").addEventListener("click", async () => {
                await this.chatbotRepository.deleteQuestionAnswer(qa.id);
                this.updateQuestionsAnswersList();
            });

            item.querySelector(".update-button").addEventListener("click", async () => {
                const updatedQuestion = prompt("Enter the updated question:", qa.question);
                const updatedAnswer = prompt("Enter the updated answer:", qa.answer);
                if (updatedQuestion && updatedAnswer) {
                    await this.chatbotRepository.updateQuestionAnswer(qa.id, updatedQuestion, updatedAnswer);
                    this.updateQuestionsAnswersList();
                }
            });

            questionsAnswersList.appendChild(item);
        }
    }

}
