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

            const question = form.elements["question"].value;
            const answer = form.elements["answer"].value;

            await this.createQuestionAnswer(question, answer);
            // Clear input fields
            form.elements["question"].value = "";
            form.elements["answer"].value = "";

            // Update the list of questions and answers
            this.updateQuestionsAnswersList();
        });

        // Initial load of questions and answers
        this.updateQuestionsAnswersList();
        const relatedQuestionsForm = document.getElementById("create-related-question-form");
        relatedQuestionsForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const parentVraagid = relatedQuestionsForm.elements["parentVraagid"].value;
            const vraagid = relatedQuestionsForm.elements["vraagid"].value;

            await this.createRelatedQuestion(parentVraagid, vraagid);

            // Clear input fields
            relatedQuestionsForm.elements["parentVraagid"].value = "";
            relatedQuestionsForm.elements["vraagid"].value = "";

            // Update the list of related questions
            this.updateRelatedQuestionsList(parentVraagid);
        });

        // Initial load of related questions
        // Assuming you want to display related questions for a specific parentVraagid
    }

    // async getRelatedQuestions(parentVraagid) {
    //     const relatedQuestions = await this.chatbotRepository.getRelatedQuestions(parentVraagid);
    //     return relatedQuestions;
    // }

    async updateRelatedQuestionsList(parentVraagid) {
        const relatedQuestionsList = document.getElementById("related-questions-list");
        try {
            const relatedQuestions = await this.chatbotRepository.getRelatedQuestions(parentVraagid);

            // Check if relatedQuestions is an array
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
            <p>Parent Question: ${parentQuestion.question}</p>
            <p>Related Question: ${relatedQuestionDetails.question}</p>
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
                await this.chatbotRepository.deleteRelatedQuestion(relatedQuestion.id);
                this.updateRelatedQuestionsList(parentVraagid);
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

        for (const qa of questionsAnswers) {
            const item = document.createElement("div");
            item.innerHTML = `
            <p>referece ID: ${qa.id}</p>
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
    async createRelatedQuestion(parentVraagid, vraagid) {
        await this.chatbotRepository.createRelatedQuestion(parentVraagid, vraagid);
    }


    async deleteRelatedQuestion(id) {
        await this.chatbotRepository.deleteRelatedQuestion(id);
    }





}
