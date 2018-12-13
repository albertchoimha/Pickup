import React from "react";
import GalleryService from "../../services/GalleryService";
import GalleryCard from "./GalleryCard";
import LoadingAnimation from "./LoadingAnimation";

class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            galleryArr: [],
            isLoading: true
        }
    }

    componentDidMount() {
        GalleryService.getAllImages(this.getAllImagesSuccess, this.getAllImagesError)
    }

    getAllImagesSuccess = resp => {
        console.log(resp)
        this.setState({
            galleryArr: resp.data.items,
            isLoading: false
        })
    }

    getAllImagesError = err => console.log(err)

    render() {
        return (
            <React.Fragment>
                {this.state.isLoading ? <LoadingAnimation {...this.state} /> :
                    <div>
                        <div className="jumbotron jumbotron-fluid">
                            <div className="container">
                                <h1 style={{ fontFamily: "Bungee Inline", fontSize: "85px" }}>Stuntin' is a habit ...</h1>
                            </div>
                        </div>
                        <div>
                            {this.state.galleryArr.map((item, index) =>
                                <GalleryCard key={index} item={item} />
                            )}
                        </div>
                    </div>}
            </React.Fragment>
        )
    }
}

export default Gallery