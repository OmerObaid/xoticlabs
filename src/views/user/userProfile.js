import React, { useEffect, useState } from "react";
import "../../assets/css/profile1.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import EditUserProfile from "../../components/user/editUserProfile";
import UserFileTypes from "../../components/user/userFileTypes";
import { getClientId } from "../../helper/siteHelper";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { GeneralServices } from "../../jwt/_services/General.services";
import { CLIENT_BASIC_INFO } from "../../jwt/_services/axiousURL";

const UserProfile = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [clientBasicInfo, setClientBasicInfo] = useState({
    first_name: "",
    last_name: "",
    timezone_title: "",
    address1: "",
    email: "",
    password: "",
  });

  const closeEditProfileCallBack = () => {
    getUserInfo();
    setShowEditProfile(false);
  };
  const getUserInfo = () => {
    let clientId = getClientId();
    let helper = FormDataHelper();

    helper.append("client_id", clientId);
    GeneralServices.postRequest(helper, CLIENT_BASIC_INFO).then(
      (resp) => {
        let info = resp.data[0];
        if (!info.timezone_title) info.timezone_title = "";
        if (!info.state_id) info.state_id = "";
        // if (!info.timezone_title) info.timezone_title = "";
        setClientBasicInfo(info);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <div className="font">
        <div className="top profile-parent" style={{ paddingTop: "8rem " }}>
          <div className="profile" style={{ paddingLeft: "22px" }}>
            My Profile
            {showEditProfile && (
              <EditUserProfile
                user={clientBasicInfo}
                closePopup={closeEditProfileCallBack}
              />
            )}
          </div>
          <div className="invite" style={{ paddingRight: "22px" }}>
            <button className="invite-in">
              <i className="fa fa-plus"></i>
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              {` Invite`}
            </button>
          </div>
        </div>
        <div className="profile-parent">
          <div className="head1">
            <div className="head-text">
              <div className="person">Personal Information</div>
              <div className="icon" onClick={() => setShowEditProfile(true)}>
                <FontAwesomeIcon icon={faPencil} id="myBtn" />
              </div>
            </div>
            <div className="container-fluid">
              <div className="profile-first">
                <div>
                  <div>
                    <label htmlFor="name" className="first-label">
                      <b>Your Full Name</b>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Robert Kenny"
                    name="name"
                    className="name"
                    value={
                      clientBasicInfo.first_name +
                      " " +
                      clientBasicInfo.last_name
                    }
                    readOnly
                  />
                </div>
                <div>
                  <div>
                    <label htmlFor="email" className="first-label">
                      <b> Your Email</b>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="rkenny09@mail.com"
                    name="email"
                    className="name"
                    value={clientBasicInfo.email}
                    readOnly
                  />
                </div>
                <div>
                  <div>
                    <label htmlFor="name" className="first-label">
                      <b>Time Zone</b>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    timezone=""
                    className="name"
                    value={clientBasicInfo.timezone_title}
                    readOnly
                  />
                </div>
                <div>
                  <div>
                    <label htmlFor="adress" className="first-label">
                      <b>Mailing, Address</b>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    name="mailing Address"
                    className="name"
                    value={clientBasicInfo.address1}
                    readOnly
                  />
                </div>
                <div className="head-pass">
                  <div className="pass">
                    <div className="ps">
                      <label htmlFor="psw">
                        <b>Password</b>
                      </label>
                    </div>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      name="psw"
                      className="psw"
                      value={clientBasicInfo.password}
                      readOnly
                    />
                  </div>
                  <div className="change-btn">
                    <button
                      type="button"
                      onClick={() => setShowEditProfile(true)}
                      className="change-in"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserFileTypes profileId={getClientId()} />
      </div>
    </>
  );
};

export default UserProfile;
