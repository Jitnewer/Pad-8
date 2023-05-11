
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
        this.updateQuestionsAnswersList();
    }

    async createRelatedQuestion(parentVraagid, vraagid) {
        await this.chatbotRepository.createRelatedQuestion(parentVraagid, vraagid);
        this.updateRelatedQuestionsList(parentVraagid);
    }

    async deleteRelatedQuestion(id, parentVraagid) {
        await this.chatbotRepository.deleteRelatedQuestion(id);
        this.updateRelatedQuestionsList(parentVraagid);
    }

    async loadView() {
        const view = await fetch("html_views/ChatbotQA.html");
        const html = await view.text();
        document.querySelector("main.content").innerHTML = html;

        const form = document.getElementById("create-question-answer-form");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const question = form.elements["question"].value;
            const answer = form.elements["answer"].value;

            await this.createQuestionAnswer(question, answer);
            form.elements["question"].value = "";
            form.elements["answer"].value = "";
        });

        this.updateQuestionsAnswersList();

        const relatedQuestionsForm = document.getElementById("create-related-question-form");
        relatedQuestionsForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const parentVraagid = relatedQuestionsForm.elements["parentVraagid"].value;
            const vraagid = relatedQuestionsForm.elements["vraagid"].value;

            await this.createRelatedQuestion(parentVraagid, vraagid);
            relatedQuestionsForm.elements["parentVraagid"].value = "";
            relatedQuestionsForm.elements["vraagid"].value = "";
        });
    }

    async updateRelatedQuestionsList(parentVraagid) {
        const relatedQuestionsList = document.getElementById("related-questions-list");
        try {
            const relatedQuestions = await this.chatbotRepository.getRelatedQuestions(parentVraagid);

            if (!Array.isArray(relatedQuestions)) {
                console.error("Error: relatedQuestions is not an array.");
                return;
            }

            relatedQuestionsList.innerHTML = "";

            for (const relatedQuestion of relatedQuestions) {
                const parentQuestion = await this.chatbotRepository.getQuestionAnswerById(relatedQuestion.parentVraagid);
                const relatedQuestionDetails = await this.chatbotRepository.getQuestionAnswerById(relatedQuestion.vraagid);

                const item = document.createElement("div");
                item.innerHTML = `
            <p>ID: ${relatedQuestion.id}</p>
            <p>Parent Question ID: ${relatedQuestion.parentVraagid} - ${parentQuestion.question}</p>
            <p>Related Question ID: ${relatedQuestion.vraagid} - ${relatedQuestionDetails.question}</p>
            <button data-id="${relatedQuestion.id}" class="delete-related-question-button">Delete</button>
            <button data-id="${relatedQuestion.id}" class="update-related-question-button">Update</button>
        `;

                item.querySelector(".update-related-question-button").addEventListener("click", async () => {
                    const updatedParentVraagid = prompt("Enter the updated parent question ID:", relatedQuestion.parentVraagid);
                    const updatedVraagid = prompt("Enter the updated related question ID:", relatedQuestion.vraagid);
                    if (updatedParentVraagid && updatedVraagid) {
                        await this.chatbotRepository.updateRelatedQuestion(relatedQuestion.id, updatedParentVraagid, updatedVraagid);
                        this.updateRelatedQuestionsList(parentVraagid);
                    }
                });

                item.querySelector(".delete-related-question-button").addEventListener("click", async () => {
                    await this.deleteRelatedQuestion(relatedQuestion.id, parentVraagid);
                });

                relatedQuestionsList.appendChild(item);
            }
        } catch (error) {
            console.error("Error updating related questions list:", error);
        }
    }


    async updateQuestionsAnswersList() {
        const questionsAnswersList = document.getElementById("questions-answers-list");
        const questionsAnswers = await this.chatbotRepository.getAllQuestionsAnswers();

        questionsAnswersList.innerHTML = "";

        const table = document.createElement("table");
        table.classList.add("scrollable-table");
        for (const qa of questionsAnswers) {
            const item = document.createElement("tr");
            item.innerHTML = `
            <td>referece ID: ${qa.id}</td>
            <td>Question: ${qa.question}</td>
            <td>Answer: ${qa.answer}</td>
            <td><button data-id="${qa.id}" class="delete-button">Delete</button></td>
            <td><button data-id="${qa.id}" class="update-button">Update</button></td>
        `;

            item.querySelector(".delete-button").addEventListener("click", async () => {
                await this.chatbotRepository.deleteQuestionAnswer(qa.id);
                this.updateQuestionsAnswersList();
            });

            item.querySelector(".update-button").addEventListener("click", async () => {

                const updatedQuestion = prompt("Enter the updated question:", qa.question);
                const updatedAnswer = prompt("Enter the updated answer:", qa.answer);
                if (updatedQuestion && updatedAnswer) {
                    await this.updateQuestionAnswer(qa.id, updatedQuestion, updatedAnswer);
                }
            });

            table.appendChild(item);
        }
        questionsAnswersList.appendChild(table);
    }
}
