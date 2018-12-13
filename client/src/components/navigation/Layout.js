import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import RegisterPage from "../homepage/RegisterPage";
import LoginPage from "../homepage/LoginPage";
import ContentRouter from "../navigation/ContentRouter";
import { connect } from "react-redux";
import Navbar from "../navigation/NavBar";

class Layout extends React.Component {
  componentDidUpdate() {
    if (
      this.props.user.isLoggedIn &&
      this.props.location.pathname === "/login"
    ) {
      this.props.history.push("/homepage")
    }
  }

  render() {
    return (
      <React.Fragment>
        {!this.props.user.isLoggedIn &&
          (<Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition key={location.key} timeout={300} classNames="fade">
                  <Switch location={location}>
                    <Route path="/login" component={LoginPage} />
                    <Route exact path="/" component={RegisterPage} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />)}


        {this.props.user.isLoggedIn &&
          (<div>
            <div className="layout-wrapper layout-1">
              <div className="layout-inner">
                <Navbar />
                <div className="layout-container">
                  <div className="layout-content">
                    <ContentRouter />
                  </div>
                </div>
              </div>
            </div>
          </div>)}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserReducer
  }
}

export default withRouter(connect(mapStateToProps)(Layout));
