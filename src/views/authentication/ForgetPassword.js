import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "../../assets/css/forget_password.css";
import ErrorMessageCustom from "../../components/common/errorMessageCustom";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { GeneratedIdentifierFlags } from "typescript";
import { GeneralServices } from "../../jwt/_services/General.services";
import { RESET_PASSWORD } from "../../jwt/_services/axiousURL";
const ForgetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitButtonStatus, setSubmitButtonStatus] = useState(false);

  const handleResetPassword = () => {
    setSubmitButtonStatus(true);
    if (email == "" || email == null) {
      setShowErrorMessage(true);
      setErrorMessage("Please enter a valid email address");
      setSubmitButtonStatus(false);
      return;
    }
    resetPasswordApi();
  };

  const resetPasswordApi = () => {
    let helper = FormDataHelper();
    helper.append("email", email);

    GeneralServices.postRequest(helper, RESET_PASSWORD).then(
      (successResponse) => {
        const { from } = props.location.state || {
          from: { pathname: "/forget-password-email" },
        };
        props.history.push(from);
      },
      (errorResponse) => {
        const { from } = props.location.state || {
          from: { pathname: "/forget-password-email" },
        };
        props.history.push(from);
      }
    );
  };

  return (
    <>
      <div className="container" style={{ backgroundColor: "black" }}>
        <div className="main">
          <section className="left-section">
            <div className="logo">
              <img className="logo-img" src={logo} />
            </div>

            <div className="back-login">
              <Link
                to="/authentication/login"
                className="back-a"
                style={{ textDecoration: "underline" }}
              >
                {` << Back to login`}
              </Link>
            </div>

            <div className="forgot-pas">
              <p className="forgot-txt montserra_font"> Forget password</p>
            </div>

            <div className="para-p">
              <p className="para montserra_font">
                Enter the email associated with your account and we'll send you
                an email with instructions on how to reset your password.
              </p>
            </div>

            <div className="email">
              {showErrorMessage && (
                <ErrorMessageCustom message={errorMessage} />
              )}
              <div className="labels">
                <label className="montserra_font" htmlFor="emails">
                  Email address
                </label>
              </div>

              <input
                className="input-field"
                type="email"
                placeholder="Email"
                id="emails"
                name="emails"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: "10px" }}
              />
            </div>

            <button
              onClick={handleResetPassword}
              className="button-e"
              disabled={submitButtonStatus}
            >
              Reset Password
            </button>
            <div className="b-bottom">
              Dont have an account yet?
              <span className="green">
                <Link
                  className="green montserra_font"
                  to="/authentication/login"
                >
                  {` Sign up`}
                </Link>
              </span>
            </div>

            <p className="last-para">
              Copyright © {new Date().getFullYear()} Xotic Labs
            </p>
          </section>

          <section className="right-section"> </section>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
