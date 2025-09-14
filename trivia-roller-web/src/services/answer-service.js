import Service from "./service.js";
import axios from "./axios.js";

class AnswerService extends Service {
    constructor(token, onError) {
        super(onError);
        this.ax = axios.create({
            baseURL: import.meta.env.VITE_TRIVIA_ROLLER_URL,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    checkAnswers(answerSubmissions,
                 onSuccess, onFailure = null) {
        const p = this.ax.post('/checkanswers', JSON.stringify(answerSubmissions));
        return this._handlePromise(p, onSuccess, onFailure);
    }
}

export default AnswerService;
