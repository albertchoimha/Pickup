import React from "react";
import RegisterForm from "./RegisterForm";
import "./Home.css";
import UserService from "../../services/UserService";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      userAccountErrors: { email: "", password: "", confirmPassword: "" },
      emailValid: false,
      passwordValid: false,
      confirmPasswordValid: false,
      userAccountValid: false,
      showErrors: false
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

  validateUserAccountField = (fieldName, value) => {
    let fieldValidationErrors = this.state.userAccountErrors
    let emailValid = this.state.emailValid
    let passwordValid = this.state.passwordValid
    let confirmPasswordValid = this.state.confirmPasswordValid
    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        fieldValidationErrors.email = emailValid
        break;
      case "password":
        passwordValid = value.length > 6 && value.match(/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/)
        fieldValidationErrors.password = passwordValid
        break;
      case "confirmPassword":
        confirmPasswordValid = value.match(this.state.password)
        fieldValidationErrors.confirmPassword = confirmPasswordValid
        break;
      default:
        break;
    }
    this.setState({
      userAccountErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid,
      confirmPasswordValid: confirmPasswordValid
    }, this.validateUserAccountForm)
  }

  validateUserAccountForm = () => {
    this.setState({
      userAccountValid: this.state.emailValid &&
        this.state.passwordValid &&
        this.state.confirmPasswordValid
    })
  }

  registerClick = evt => {
    evt.preventDefault();
    if (this.state.userAccountValid) {
      UserService.registerUser(this.state, this.registerUserSuccess, this.registerUserError)
    } else {
      this.setState({
        showErrors: true
      })
    }
  };

  registerUserSuccess = () => {
    this.props.history.push("/login")
  }

  registerUserError = err => console.log(err)

  render() {
    return (
      <React.Fragment>
        <RegisterForm
          {...this.state}
          onChange={this.onChange}
          registerClick={this.registerClick}
        />
      </React.Fragment>
    );
  }
}

export default RegisterPage;
