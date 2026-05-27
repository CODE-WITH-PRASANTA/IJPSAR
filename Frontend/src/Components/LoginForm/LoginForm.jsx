import React, { useState } from "react";

import "./LoginForm.css";

import {
  FaUserPlus,
  FaSignInAlt,
  FaEnvelope,
  FaLock,
  FaUser,
  FaGlobe,
} from "react-icons/fa";

const LoginForm = () => {

  const [isSignup, setIsSignup] = useState(false);

  const handleToggle = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="loginFormPage">

      <div
        className={`loginFormContainer ${
          isSignup
            ? "loginFormContainerActive"
            : ""
        }`}
      >

        {/* IMAGE SECTION */}
        <div className="loginFormImageSection">

          <div className="loginFormOverlay"></div>

          {/* FLOATING SHAPES */}
          <div className="loginFormCircleOne"></div>
          <div className="loginFormCircleTwo"></div>
          <div className="loginFormCircleThree"></div>

          <div className="loginFormImageContent">

            <span className="loginFormTag">
              IJPASR Portal
            </span>

            <h1>
              {isSignup
                ? "Create Your Research Account"
                : "Welcome Back"}
            </h1>

            <p>
              {isSignup
                ? "Join IJPASR and publish your innovative research with global visibility and rapid publication support."
                : "Login to manage submissions, certificates, publication process and peer review activities."}
            </p>

            <button
              onClick={handleToggle}
              className="loginFormSwitchButton"
            >
              {isSignup
                ? "Sign In"
                : "Create Account"}
            </button>

          </div>

        </div>

        {/* FORM SECTION */}
        <div className="loginFormFormSection">

          {!isSignup ? (

            /* LOGIN */

            <div className="loginFormBox">

              <h2>
                Sign In
              </h2>

              <div className="loginFormInputGroup">

                <label>
                  Email Address
                </label>

                <div className="loginFormInputWrapper">

                  <FaEnvelope />

                  <input
                    type="email"
                    placeholder="Enter your email"
                  />

                </div>

              </div>

              <div className="loginFormInputGroup">

                <label>
                  Password
                </label>

                <div className="loginFormInputWrapper">

                  <FaLock />

                  <input
                    type="password"
                    placeholder="Enter your password"
                  />

                </div>

              </div>

              <div className="loginFormOptions">

                <div className="loginFormRemember">

                  <input type="checkbox" />

                  <span>
                    Remember Me
                  </span>

                </div>

                <span className="loginFormForgot">
                  Forgot Password?
                </span>

              </div>

              <button className="loginFormSubmitButton">

                <FaSignInAlt />

                Login

              </button>

            </div>

          ) : (

            /* SIGNUP */

            <div className="loginFormBox">

              <h2>
                Create Account
              </h2>

              <div className="loginFormDoubleInput">

                <div className="loginFormInputGroup">

                  <label>
                    First Name
                  </label>

                  <div className="loginFormInputWrapper">

                    <FaUser />

                    <input
                      type="text"
                      placeholder="First Name"
                    />

                  </div>

                </div>

                <div className="loginFormInputGroup">

                  <label>
                    Last Name
                  </label>

                  <div className="loginFormInputWrapper">

                    <FaUser />

                    <input
                      type="text"
                      placeholder="Last Name"
                    />

                  </div>

                </div>

              </div>

              <div className="loginFormInputGroup">

                <label>
                  Email Address
                </label>

                <div className="loginFormInputWrapper">

                  <FaEnvelope />

                  <input
                    type="email"
                    placeholder="Enter email"
                  />

                </div>

              </div>

              <div className="loginFormInputGroup">

                <label>
                  Country
                </label>

                <div className="loginFormInputWrapper">

                  <FaGlobe />

                  <input
                    type="text"
                    placeholder="Country"
                  />

                </div>

              </div>

              <div className="loginFormInputGroup">

                <label>
                  Password
                </label>

                <div className="loginFormInputWrapper">

                  <FaLock />

                  <input
                    type="password"
                    placeholder="Password"
                  />

                </div>

              </div>

              <button className="loginFormSubmitButton">

                <FaUserPlus />

                Register

              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default LoginForm;