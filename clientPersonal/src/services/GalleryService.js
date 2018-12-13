import React from "react";
import axios from "axios";

class GalleryService extends React.Component {
    static getAllImages(getAllImagesSuccess, getAllImagesError) {
        let url = "/api/gallery"
        const config = {
            method: 'GET'
        }
        axios.defaults.withCredentials = true
        axios(url, config)
            .then(getAllImagesSuccess)
            .catch(getAllImagesError)
    }
}

export default GalleryService