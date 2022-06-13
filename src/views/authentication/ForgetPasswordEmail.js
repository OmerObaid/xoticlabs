import React from "react";
import logo from "../../assets/images/logo.png";
import confirmLogo from "../../assets/images/confirm_logo.jpg";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/common/errorMessage";
import "../../assets/css/forget_password.css";

const ForgetPasswordEmail = () => {
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
                className="back-a"
                to="/authentication/login"
                style={{ textDecoration: "underline" }}
              >
                {`<< Back to login`}
              </Link>
            </div>

            <div className="forgot-pas">
              <h4 className="forgot-txt">Check Your Email</h4>
            </div>

            <div className="para-p">
              <img className="confirm-logo" src={confirmLogo} alt="" />
            </div>

            <div className="para-p">
              <p className="para-confirm">
                If an account is associated with the email provided, you will
                receive the password recovery instructions to reset your
                password.
              </p>
            </div>
            <div className="para-p">
              <p className="para-confirm">
                Didn't recelve an email? Check your spam filter, or try another
                email address.
              </p>
            </div>

            <p className="last-para-cn">
              Copyright © {new Date().getFullYear()} Xotic Labs
            </p>
          </section>

          <section ction className="right-section-confirmation"></section>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordEmail;
