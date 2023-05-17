/**
 * Test suite for the ChatbotController.
 */
describe("ChatbotController", () => {
    beforeEach(() => {
        // Load the HTML view before each test
        cy.visit("http://localhost:8080");
    });

    it("should fetch an answer for a question", () => {
        // Spy on the fetch method to mock the server response
        cy.intercept("GET", "/chatbot/answer/*", {
            statusCode: 200,
            body: {
                answer: "Test answer",
                relatedQuestions: [],
            },
        }).as("fetchAnswer");

        // Click on a question
        cy.get(".question").first().click();

        // Verify that the fetch method was called with the correct URL
        cy.wait("@fetchAnswer").should("have.property", "url", "/chatbot/answer/*");

        // Verify that the answer is displayed
        cy.get(".answer").should("contain", "Test answer");
    });
});
