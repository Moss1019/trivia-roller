import Service from "./service.js";
import axios from "./axios.js";

const ax = axios.create({
    baseURL: import.meta.env.VITE_TRIVIA_ROLLER_URL
})

class AnswerService extends Service {
    constructor(onError) {
        super(onError);
    }

    checkAnswers(answerSubmissions,
                 onSuccess, onFailure = null) {
        const p = ax.post('/checkanswers', JSON.stringify(answerSubmissions));
        return this._handlePromise(p, onSuccess, onFailure);
    }
}

export class AnswerSubmission {
    constructor(questionId,
                selectedAnswer) {
        this.questionId = questionId;
        this.selectedAnswer = selectedAnswer;
    }
}

export default AnswerService;
