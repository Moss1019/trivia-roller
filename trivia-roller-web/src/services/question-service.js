import axios from "./axios.js";
import Service from "./service.js";

const ax = axios.create({
    baseURL: import.meta.env.VITE_TRIVIA_ROLLER_URL
});

class QuestionService extends Service {
    constructor(onError = null) {
        super(onError);
    }

    getCategories(onSuccess, onFailure = null) {
        const p = ax.get('/categories');
        return this._handlePromise(p, onSuccess, onFailure);
    }

    getDifficulties(onSuccess, onFailure = null) {
        const p = ax.get('/difficulty-levels');
        return this._handlePromise(p, onSuccess, onFailure);
    }

    getQuestions(amount, category, difficulty,
                 onSuccess, onFailure = null) {
        const url = `/questions?amount=${amount}&category=${category}&difficulty=${difficulty}`;
        const p = ax.get(url);
        return this._handlePromise(p, onSuccess, onFailure);
    }
}

export default QuestionService;
