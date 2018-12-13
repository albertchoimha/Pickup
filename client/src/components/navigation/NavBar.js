import React from "react";
import { logOutUser } from "../../redux/UserAction";
import { connect } from "react-redux";

class Navbar extends React.Component {

    logOutClick = evt => {
        evt.preventDefault()
        const token = sessionStorage.getItem("token")
        this.props.logOutUser(token)
    }

    render() {
        return (
            <div className="mb-5">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <div className="navbar-brand">
                        <span style={{ fontFamily: "Great Vibes", fontSize: "30px" }}>Pickup</span>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/homepage">Home</a>
                            </li>
                            <li className="nav-item dropdown active">
                                <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown">Profile</a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/profilepage">My Profile</a>
                                    <a className="dropdown-item" href="/accountsettings">Account Settings</a>
                                </div>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/gallery">Gallery</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/locator">Locator</a>
                            </li>
                        </ul>
                        <button className="btn btn-outline-danger float-right" onClick={this.logOutClick}>Log Out</button>
                    </div>
                </nav>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return { user: state.UserReducer }
}

const mapDispatchToProps = dispatch => {
    return { logOutUser: (token) => { dispatch(logOutUser(token)) } }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);