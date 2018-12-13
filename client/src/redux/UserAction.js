import axios from "axios";

export function loginStatus(token) {
    const config = {
        Authorization: `Bearer ${token}`
    }
    return {
        type: "CHECK_LOGIN_STATE",
        payload: axios
            .get("/api/account/userinfo", { headers: config })
            .then(resp => {
                if (sessionStorage.getItem("token") !== null) {
                    return resp.data
                } else {
                    return false
                }
            })
            .catch(err => {
                console.log("no user logged in", err);
                return false;
            })
    };
}

export function loginUser(userName, password) {
    const data = `grant_type=password&username=${userName}&password=${password}`;
    const headers = { "Content-Type": "application/x-www-form-urlencoded" };
    return {
        type: "LOGIN_USER",
        payload: axios
            .post("/token", data, { headers: headers, withCredentials: true })
            .then(resp => {
                sessionStorage.setItem("token", resp.data.access_token)
                return resp.data;
            })
            .catch(err => console.error(err))
    };
}

export function logOutUser(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    return {
        type: "LOGOUT_USER",
        payload: axios
            .post("/api/account/logout")
            .then(resp => {
                console.log(resp)
                sessionStorage.removeItem("token")
                window.location.replace("/login")
            })
            .catch(err => console.log(err))
    }
}

