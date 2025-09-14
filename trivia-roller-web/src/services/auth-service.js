import Service from "./service.js";
import axios from "./axios.js";

class AuthService extends Service {
    constructor(onError = null) {
        super(onError);
        this.ax = axios.create({
            baseURL: import.meta.env.VITE_TRIVIA_ROLLER_URL
        });
    }

    login(credentials, onSuccess, onFailure = null) {
        const p = this.ax.post('api/auth', JSON.stringify(credentials));
        return this._handlePromise(p, onSuccess, onFailure)
    }
}

export class Login {
    constructor(username,
                password) {
        this.username = username;
        this.password = password;
    }
}

export default AuthService;