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
        return this.#networkManager.doRequest(`${this.#trialLessonRoute}`, "POST", {
            "firstname": firstname,
            "lastname": lastname,
            "prefix": prefix,
            "email": email,
            "id": id
        });
    }
}
