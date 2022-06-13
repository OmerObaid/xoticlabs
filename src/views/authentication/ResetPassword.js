import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { GeneralServices } from "../../jwt/_services/General.services";
import swal from "sweetalert";
import ErrorMessageCustom from "../../components/common/errorMessageCustom";

import "../../assets/css/forget_password.css";
import {
  RESET_PASSWORD_TOKEN_VERIFICATION,
  UPDATE_USER_RESET_PASSWORD,
} from "../../jwt/_services/axiousURL";

const ResetPassword = (props) => {
  const { resetToken } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userId, setUserId] = useState("");

  const handleResetPassword = () => {
    if (password == "") {
      setShowError(true);
      setErrorMsg("Password can not be empty");
      return;
    } else if (confirmPassword == "" || confirmPassword != password) {
      setShowError(true);
      setErrorMsg("Password does not match confirm password");
      return;
    } else {
      setShowError(false);
      setErrorMsg("");
    }

    updatePassword();
  };

  const getTokenVerification = () => {
    let helper = FormDataHelper();
    helper.append("token", resetToken);

    GeneralServices.postRequest(helper, RESET_PASSWORD_TOKEN_VERIFICATION).then(
      (successResponse) => {
        let id = successResponse.data.id;
        setUserId(id);
      },
      (errorResponse) => {
        const { from } = props.location.state || {
          from: { pathname: "/authentication/login" },
        };
        props.history.push(from);
      }
    );
  };

  const updatePassword = () => {
    let helper = FormDataHelper();
    helper.append("id", userId);
    helper.append("password", password);

    GeneralServices.postRequest(helper, UPDATE_USER_RESET_PASSWORD).then(
      (successResponse) => {
        swal("Password updated successfullly", {
          icon: "success",
        });
        setPassword("");
        setConfirmPassword("");

        const { from } = props.location.state || {
          from: { pathname: "/authentication/login" },
        };
        props.history.push(from);
      },
      (errorResponse) => {
        setShowError(true);
        setErrorMsg("Failed to update the password");
      }
    );
  };

  useEffect(() => {
    if (resetToken) {
      getTokenVerification();
    }
  }, [resetToken]);

  return (
    <>
      <div style={{ backgroundColor: "black" }}>
        <div className="container">
          <div className="main">
            <section className="left-section">
              <div className="logo">
                <img className="logo-img" src={logo} />
              </div>

              <div className="forgot-pas-p">
                <h4 className="forgot-txt">Creat a New Password</h4>
              </div>

              <div className="para-p">
                <p className="para-pass">
                  Your new password must be different from your previous
                  password
                </p>
              </div>

              <div className="pass">
                {showError && <ErrorMessageCustom message={errorMsg} />}
                <div className="labels">
                  <label htmlFor="password">New Password:</label>
                </div>

                <input
                  className="input-field"
                  type="password"
                  placeholder="Enter New Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: "10px" }}
                />

                <div className="labels">
                  <label htmlFor="emails">Confirm Password:</label>
                </div>

                <input
                  className="input-field"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ paddingLeft: "10px" }}
                />
              </div>

              <button onClick={handleResetPassword} className="button">
                Reset Password
              </button>

              <p className="last-para-re">
                Copyright © {new Date().getFullYear()} Xotic Labs
              </p>
            </section>

            <section className="right-section-pass"> </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
