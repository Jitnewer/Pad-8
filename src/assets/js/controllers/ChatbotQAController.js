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
        const mainContent = document.querySelector("main.content");
        mainContent.innerHTML = html;

        // Wait for the browser to finish updating the main content.
        setTimeout(() => {
            // Now we can safely assume the new content has been loaded.
            this.updateQuestionsAnswersList();
            this.updateQuestionsDropDown();
            this.updateRelatedQuestionsList();
        }, 0);

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
        this.updateQuestionsDropDown();

        const relatedQuestionsForm = document.getElementById("create-related-question-form");
        relatedQuestionsForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const parentVraagid = relatedQuestionsForm.elements["parentVraagid"].options[relatedQuestionsForm.elements["parentVraagid"].selectedIndex].value;
            const vraagid = relatedQuestionsForm.elements["vraagid"].options[relatedQuestionsForm.elements["vraagid"].selectedIndex].value;

            await this.createRelatedQuestion(parentVraagid, vraagid);
            relatedQuestionsForm.elements["parentVraagid"].selectedIndex = 0;
            relatedQuestionsForm.elements["vraagid"].selectedIndex = 0;
        });

        this.updateRelatedQuestionsList();
    }

    async updateQuestionsDropDown() {
        const questionsAnswers = await this.chatbotRepository.getAllQuestionsAnswers();

        const parentVraagDropdown = document.getElementById("parentVraagid");
        const vraagDropdown = document.getElementById("vraagid");

        parentVraagDropdown.innerHTML = '';
        vraagDropdown.innerHTML = '';

        for (const qa of questionsAnswers) {
            let parentOption = document.createElement('option');
            parentOption.value = qa.id;
            parentOption.text = qa.question;

            let vraagOption = document.createElement('option');
            vraagOption.value = qa.id;
            vraagOption.text = qa.question;

            parentVraagDropdown.add(parentOption);
            vraagDropdown.add(vraagOption);
        }
    }

    async updateRelatedQuestionsList(parentVraagid = null) {
        const relatedQuestionsList = document.getElementById("related-questions-list");
        let relatedQuestions;

        if (parentVraagid) {
            relatedQuestions = await this.chatbotRepository.getRelatedQuestions(parentVraagid);
        } else {
            relatedQuestions = await this.chatbotRepository.getAllRelatedQuestions();
        }    relatedQuestionsList.innerHTML = "";

        const table = document.createElement("table");
        table.classList.add("scrollable-table");
        for (const rq of relatedQuestions) {
            const parentQuestionText = (await this.chatbotRepository.getQuestionAnswerById(rq.parentVraagid)).question;
            const relatedQuestionText = (await this.chatbotRepository.getQuestionAnswerById(rq.vraagid)).question;

            const item = document.createElement("tr");
            item.innerHTML = `
        <td>ID: ${rq.id}</td>
        <td>Parent Question: ${parentQuestionText}</td>
        <td>Related Question: ${relatedQuestionText}</td>
        <td><button data-id="${rq.id}" class="delete-related-button">Delete</button></td>
        `;

            item.querySelector(".delete-related-button").addEventListener("click", async () => {
                await this.deleteRelatedQuestion(rq.id, parentVraagid);
            });

            table.appendChild(item);
        }
        relatedQuestionsList.appendChild(table);
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
        <td>Nr: ${qa.id}</td>
        <td>Vraag: ${qa.question}</td>
        <td>Antwoord: ${qa.answer}</td>
        <td><button data-id="${qa.id}" class="delete-button">Verwijderen</button></td>
        <td><button data-id="${qa.id}" class="update-button">Aanpassen</button></td>
    `;

            item.querySelector(".delete-button").addEventListener("click", async () => {
                await this.chatbotRepository.deleteQuestionAnswer(qa.id);
                this.updateQuestionsAnswersList();
            });

            item.querySelector(".update-button").addEventListener("click", async () => {

                const updatedQuestion = prompt("Voer de bijgewerkte vraag in:", qa.question);
                const updatedAnswer = prompt("Voer het bijgewerkte antwoord in:", qa.answer);
                if (updatedQuestion && updatedAnswer) {
                    await this.updateQuestionAnswer(qa.id, updatedQuestion, updatedAnswer);
                }
            });

            table.appendChild(item);
        }
        questionsAnswersList.appendChild(table);
    }
}
