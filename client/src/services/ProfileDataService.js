import React from 'react'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'

class ProfileDataService extends React.Component {
    static getById(id, getByIdSuccess, getByIdError) {
        let url = `/api/profiledata/${id}`
        const config = {
            method: 'GET'
        }
        axios.defaults.withCredentials = true
        axios(url, config)
            .then(getByIdSuccess)
            .catch(getByIdError)
    }

    static updatePerson(id, data) {
        let url = `/api/profiledata/personupdate/${id}`
        const config = {
            data: data,
            method: 'PUT'
        }
        axios.defaults.withCredentials = true
        axios(url, config)
            .then(() => NotificationManager.success('Save Successful!', '', 3000))
            .catch(error => {
                console.log(error)
                NotificationManager.error('Save Not Successful', '', 3000)
            })
    }

    static updateProfile(id, data) {
        let url = `/api/profiledata/profileupdate/${id}`
        const config = {
            data: data,
            method: 'PUT'
        }
        axios.defaults.withCredentials = true
        axios(url, config)
            .then(() => NotificationManager.success('Save Successful!', '', 3000))
            .catch(error => {
                console.log(error)
                NotificationManager.error('Save Not Successful', '', 3000)
            })
    }

    static insertTelephone(data, insertTelephoneSuccess, insertTelephoneError) {
        let url = "/api/profiledata/telephone"
        const config = {
            method: "POST",
            data: data
        }
        axios.defaults.withCredentials = true
        axios(url, config)
            .then(insertTelephoneSuccess)
            .catch(insertTelephoneError)
    }

    static insertPersonPhone(data, insertPersonPhoneSuccess, insertPersonPhoneError) {
        let url = "/api/profiledata/personphone"
        const config = {
            method: "POST",
            data: data
        }
        axios.defaults.withCredentials = true
        axios(url, config)
            .then(insertPersonPhoneSuccess)
            .catch(insertPersonPhoneError)
    }

    static deletePersonPhone(id, deletePersonPhoneSuccess, deletePersonPhoneError) {
        let url = `/api/profiledata/deletepersonphone/${id}`
        const config = {
            method: "DELETE"
        }
        axios.defaults.withCredentials = true
        axios(url, config)
            .then(deletePersonPhoneSuccess)
            .catch(deletePersonPhoneError)
    }

    static insertProfileImage(data, insertProfileImageSuccess, insertProfileImageError) {
        let url = "/api/profiledata/profileimage"
        const config = {
            method: "POST",
            data: data
        }
        axios.defaults.withCredentials = true
        axios(url, config)
            .then(insertProfileImageSuccess)
            .catch(insertProfileImageError)
    }
}

export default ProfileDataService 