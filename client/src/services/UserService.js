import React from "react";
import axios from "axios";

class UserService extends React.Component {
    static registerUser(data, registerUserSuccess, registerUserError) {
        let url = "/api/account/register"
        const config = {
            method: 'POST',
            data: data
        }
        axios.defaults.withCredentials = true
        axios(url, config)
            .then(registerUserSuccess)
            .catch(registerUserError)
    }

    static logOutUser(token, logOutUserSuccess, logOutUserError) {
        let url = "/api/account/logout"
        const config = {
            method: 'POST'
        }
        axios.defaults.withCredentials = true
        axios.defaults.headers["Authorization"] = `Bearer ${token}`
        axios(url, config)
            .then(logOutUserSuccess)
            .catch(logOutUserError)
    }
}

export default UserService