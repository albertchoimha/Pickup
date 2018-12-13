import React from "react";

const GalleryCard = (props) => {
    return (
        <div key={props.index} className="card border-dark m-5">
            <img className="card-img-top" src={props.item.link} alt="" />
            <div className="card-body">
                <h3 className="card-title lead font-weight-normal">{props.item.alt}</h3>
            </div>
        </div>
    )
}

export default GalleryCard;