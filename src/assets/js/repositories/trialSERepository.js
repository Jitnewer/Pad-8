import { NetworkManager } from "../framework/utils/networkManager.js";

export class TrialSERepository {
    #networkManager;
    #trialLessonRoute;
    #participantRoute;
    #trialSEEmail;

    constructor() {
        this.#trialLessonRoute = "/trialSELesson";
        this.#participantRoute = "/trialLessonParticipant";
        this.#trialSEEmail = "https://api.hbo-ict.cloud/mail";
        this.#networkManager = new NetworkManager();
    }

    /**
     * Request to add input data of trial lesson participant
     * @returns
     */
    applyTrialLesson(firstname, lastname, prefix, email, id) {
        return this.#networkManager.doRequest(`${this.#trialLessonRoute}`, "POST", {"firstname": firstname, "lastname": lastname, "prefix": prefix, "email": email, "id": id});
    }
    /**
     * Send trial lesson email
     */
   sendTrialLessonEmail(email) {
        const emailData = {
            email: email,
        };

        return this.#networkManager.doRequest(`${this.#trialSEEmail}`, "POST", emailData);
    }

    /**
     * @returns A list of trial lesson participants
     */
    getParticipants() {
        return this.#networkManager.doRequest(`${this.#participantRoute}`, "GET");
    }
}
