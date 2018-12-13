import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProfileDataService from "../../services/ProfileDataService";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            gender: "",
            playerComparison: "",
            shootingHand: "",
            bio: "",
            fqUrl: "",
            telephones: []
        }
    }

    componentDidMount() {
        ProfileDataService.getById(this.props.user.id, this.getByIdSuccess, this.getByIdError)
    }

    getByIdSuccess = resp => {
        console.log(resp)
        const profileDataArr = resp.data.item;
        this.setState({
            ...profileDataArr
        })
    }

    render() {
        return (
            <div style={{ backgroundImage: "url(assets/img/bg/jersey.jpg)", height: "100vh" }}>
                <div className="container flex-grow-1 container-p-y">
                    <div className="bg-white container-m--x container-m--y mb-4 border border-dark">
                        <div className="media col-md-10 col-lg-8 col-xl-7 py-5 mx-auto">
                            <img className="d-block w-25 rounded-circle" src={this.state.fqUrl} alt="" />
                            <div className="media-body">
                                <h1 className="mb-2" style={{ fontFamily: "Boogaloo", fontSize: "60px" }}>{this.state.firstName} {this.state.lastName}</h1>
                                <p className="mb-2" style={{ fontFamily: "Boogaloo", fontSize: "22px" }}>{this.state.bio}</p>
                            </div>
                        </div>
                        <div className="card border border-dark">
                            <div className="card-body">
                                <ul className="list-group list-group flush border border-dark">
                                    <li className="list-group-item"><span style={{ fontFamily: "Boogaloo", fontSize: "25px" }}>Shooting Hand: {this.state.shootingHand}</span></li>
                                    <li className="list-group-item"><span style={{ fontFamily: "Boogaloo", fontSize: "25px" }}>Player Comparison: {this.state.playerComparison}</span></li>
                                    {this.state.gender && <li className="list-group-item"><span style={{ fontFamily: "Boogaloo", fontSize: "25px" }}>Gender: {this.state.gender}</span></li>}
                                    <li className="list-group-item"><span style={{ fontFamily: "Boogaloo", fontSize: "25px" }}>Email: {this.props.user.userName}</span></li>
                                    <li className="list-group-item"><span style={{ fontFamily: "Boogaloo", fontSize: "25px" }}>Phone Number: {this.state.telephones.map((item, index) => <div key={index}>{item.phoneNumber}</div>)}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.UserReducer
    }
}

export default withRouter(connect(mapStateToProps)(ProfilePage));