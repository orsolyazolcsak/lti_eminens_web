import axios from 'axios'

const API_URL = 'http://localhost:8090';
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8090'
});
let token = null;
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

class LoginService {
    token = null;
    executeBasicAuthentication(username, password) {
        return axiosInstance.get(`${API_URL}/login`,
            { headers: { authorization: this.createBasicAuthToken(username, password) } })
    }

    createBasicAuthToken(username, password) {
        token = 'Basic ' + window.btoa(username + ":" + password);
        console.log("setting localstorage item asdf", token);
        localStorage.setItem("asdf", token);
        return token;
    }
    getToken() {
        console.log(token);
        return localStorage.getItem("asdf");
    }

    registerSuccessfulLogin(username) {
        console.log('registerSuccessfulLogin');
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return user !== null;
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) return '';
        return user
    }

    getAxiosInstance() {
        console.log('axiosInstance', axiosInstance);
        return axiosInstance;
    }

}

export default new LoginService();