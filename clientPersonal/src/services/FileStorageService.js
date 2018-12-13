import React from 'react';
import axios from 'axios';

class FileStorageService extends React.Component {
    static insertFileStorage(data, insertFileStorageSuccess, insertFileStorageError) {
        let url = '/api/filestorage'
        const config = {
            method: 'POST',
            data: data
        }
        axios.defaults.withCredentials = true
        axios(url, config)
            .then(insertFileStorageSuccess)
            .catch(insertFileStorageError)
    }

    static updateFileStorage(id, data, updateFileStorageSuccess, updateFileStorageError) {
        let url = `/api/filestorage/${id}`
        const config = {
            method: 'PUT',
            data: data
        }
        axios.defaults.withCredentials = true
        axios(url, config)
            .then(updateFileStorageSuccess)
            .catch(updateFileStorageError)
    }
}

export default FileStorageService;