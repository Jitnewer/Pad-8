import {ChatbotQARepository} from "../repositories/chatbotQARepository.js";

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
        this.updateRelatedQuestionsList();

    }

    async updateRelatedQuestionsList(parentVraagid = null) {
        const relatedQuestionsList = document.getElementById("related-questions-list");
        let relatedQuestions;

        if (parentVraagid) {
            relatedQuestions = await this.chatbotRepository.getRelatedQuestions(parentVraagid);
        } else {
            relatedQuestions = await this.chatbotRepository.getAllRelatedQuestions(); // Assuming you have this method
        }

        relatedQuestionsList.innerHTML = "";

        const table = document.createElement("table");
        table.classList.add("scrollable-table");
        for (const rq of relatedQuestions) {
            const item = document.createElement("tr");
            item.innerHTML = `
        <td>ID: ${rq.id}</td>
        <td>Parent Question ID: ${rq.parentVraagid}</td>
        <td>Related Question ID: ${rq.vraagid}</td>
        <td><button data-id="${rq.id}" class="delete-related-button">Delete</button></td>
    `;

            item.querySelector(".delete-related-button").addEventListener("click", async () => {
                await this.chatbotRepository.deleteRelatedQuestion(rq.id);
                if (parentVraagid) {
                    this.updateRelatedQuestionsList(parentVraagid);
                } else {
                    this.updateRelatedQuestionsList();
                }
            });

            table.appendChild(item);
        }
        relatedQuestionsList.appendChild(table);
    }


    // async updateRelatedQuestionsList(parentVraagid) {
    //     const relatedQuestionsList = document.getElementById("related-questions-list");
    //     const relatedQuestions = await this.chatbotRepository.getRelatedQuestions(parentVraagid);
    //
    //     relatedQuestionsList.innerHTML = "";
    //
    //     const table = document.createElement("table");
    //     table.classList.add("scrollable-table");
    //     for (const rq of relatedQuestions) {
    //         const item = document.createElement("tr");
    //         item.innerHTML = `
    //         <td>ID: ${rq.id}</td>
    //         <td>Parent Question ID: ${rq.parentVraagid}</td>
    //         <td>Related Question ID: ${rq.vraagid}</td>
    //         <td><button data-id="${rq.id}" class="delete-related-button">Delete</button></td>
    //     `;
    //
    //         item.querySelector(".delete-related-button").addEventListener("click", async () => {
    //             await this.chatbotRepository.deleteRelatedQuestion(rq.id);
    //             this.updateRelatedQuestionsList(parentVraagid);
    //         });
    //
    //         table.appendChild(item);
    //     }
    //     relatedQuestionsList.appendChild(table);
    // }


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
