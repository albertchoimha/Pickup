import React from "react";
import TextInput from "../../common/Textinput";
import { Link } from "react-router-dom";

const RegisterForm = props => {
  return (
    <div className="authentication-wrapper authentication-3 page">
      <div className="d-flex authentication-inner">
        <div
          className="background d-none d-lg-flex col-lg-8 align-items-center ui-bg-cover ui-bg-overlay-container p-5"
          style={{
            backgroundImage: "url(assets/img/bg/bballbackground.png)",
            height: "100vh"
          }}
        >
          <div className="w-100 text-white px-5">
            <h1 className="mb-4" style={{ fontFamily: "Titan One", fontSize: "83px" }}>
              Find your squad.
            </h1>
            <h1 className="mb-4" style={{ fontFamily: "Titan One", fontSize: "83px" }}>
              Play your game.
            </h1>
          </div>
        </div>

        <div className="d-flex col-lg-4 align-items-center bg-white p-5">
          <div className="d-flex col-sm-7 col-md-5 col-lg-12 px-0 px-xl-4 mx-auto">
            <div className="w-100">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src="assets/img/bg/basketballogo.jpg"
                  alt=""
                  style={{ height: "120px" }}
                />
              </div>
              <div style={{ fontFamily: "Great Vibes", fontSize: "35px" }}>Pickup</div>
              <h4 className="text-center text-lighter font-weight-normal mt-5 mb-0">
                Register Account
              </h4>
              <form className="my-5">
                <TextInput
                  name="email"
                  type="email"
                  label="Email:"
                  value={props.email}
                  onChange={props.onChange}
                  isValid={props.emailValid || !props.showErrors}
                  hintText="Please enter valid email"
                />
                <TextInput
                  name="password"
                  type="password"
                  label="Password:"
                  value={props.password}
                  onChange={props.onChange}
                  isValid={props.passwordValid || !props.showErrors}
                  hintText="Minimum 6 characters and include 1 number, 1 uppercase, and 1 special character"
                />
                <TextInput
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  value={props.userName}
                  onChange={props.onChange}
                  isValid={props.confirmPasswordValid || !props.showErrors}
                  hintText="Passwords need to match"
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={props.registerClick}
                >
                  Register
                </button>
              </form>
              <div className="text-center text-muted">
                Already have an account?
                <br />
                <Link to="/login">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
