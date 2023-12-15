import axios from "axios";

const apiRoute = {
    LOGIN : "/login",
    LOGOUT : "/logout"
}

const login = (credentials) => {
    return axios.post(apiRoute.LOGIN, {
        email: credentials.email,
        password: credentials.password,
    });
};

const logout = () => {
    return axios.post(apiRoute.LOGOUT);
};

export { login, logout };
