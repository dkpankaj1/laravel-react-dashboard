import axios from "axios";

const apiRoute = {
    LOGIN:{
        METHOD : "post",
        URL : "/login"
    },
    LOGOUT:{
        METHOD : "post",
        URL : "/logout"
    }
}

const login = (credentials) => {
    return axios.post(apiRoute.LOGIN.URL, {
        email: credentials.email,
        password: credentials.password,
    });
};

const logout = () => {
    return axios.post(apiRoute.LOGOUT.URL);
};

export { login, logout };
