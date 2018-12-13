import React from "react";
import LoginForm from "./LoginForm";
import "./Home.css";
import { connect } from "react-redux";
import { loginUser } from "../../redux/UserAction";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailValid: false,
      passwordValid: false,
      userAccountValid: false,
      showErrors: false,
      userAccountErrors: { email: "", password: "" }
    };
  }

  onChange = evt => {
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState({
      [key]: val
    }, () => {
      this.validateUserAccountField(key, val)
    });
  };

  loginClick = evt => {
    evt.preventDefault();
    if (this.state.userAccountValid) {
      this.props.setLoginUser(this.state.email, this.state.password);
    } else {
      this.setState({
        showErrors: true
      })
    }
  };

  validateUserAccountField = (fieldName, value) => {
    let fieldValidationErrors = this.state.userAccountErrors;
    let emailValid = this.state.email;
    let passwordValid = this.state.password;
    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid;
        break;
      case "password":
        passwordValid = value.length > 0;
        fieldValidationErrors.password = passwordValid;
        break;
      default:
        break;
    }
    this.setState(
      {
        userAccountErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid
      },
      this.validateUserAccountForm
    );
  };

  validateUserAccountForm = () => {
    this.setState({
      userAccountValid: this.state.emailValid && this.state.passwordValid
    });
  }

  render() {
    return (
      <React.Fragment>
        <LoginForm
          {...this.state}
          onChange={this.onChange}
          loginClick={this.loginClick}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.UserReducer }
}

const mapDispatchToProps = dispatch => {
  return { setLoginUser: (userName, password) => { dispatch(loginUser(userName, password)) } }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
