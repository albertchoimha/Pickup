import React from 'react';
import "./Home.css";

const HomePage = () => {
    return (
        <div style={{ backgroundImage: "url(assets/img/bg/skyhoop.jpg)" }} className="homepage">
            <div className="text-white mt-5 pt-5" style={{ fontFamily: "Great Vibes", fontSize: "210px" }}>Welcome to Pickup.</div>
        </div>
    )
}

export default HomePage;
