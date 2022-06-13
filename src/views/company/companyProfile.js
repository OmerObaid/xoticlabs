import React, { useEffect } from "react";
import "../../assets/css/profile1.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import EditCompanyProfile from "../../components/company/editCompanyProfile";
import { useState } from "react";
import ConfirmPauseAccount from "./confirmPauseAccount";
import PaymentHistory from "./paymentHistory";
import CreditCard from "./creditCard";
import PaymentPlans from "./paymentPlans";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { getClientId } from "../../helper/siteHelper";
import {
  CLIENT_PAYMENT_METHODS,
  LIST_COMPANY,
  UPDATE_CANCEL_STATUS,
  UPDATE_COMPANY_PAUSE_STATUS,
} from "../../jwt/_services/axiousURL";
import { GeneralServices } from "../../jwt/_services/General.services";
import { useDispatch } from "react-redux";
import {
  setAccountCancelStatus,
  setAccountPauseStatus,
  setAccountSuspendedStatus,
} from "../../redux/headerSettings/Action";
import swal from "sweetalert";
import UpdateBillingInfo from "./updateBillingInfo";

const CompanyProfile = () => {
  const [showEditCompanyProfile, setShowEditCompanyProfile] = useState(false);
  const [showPauseAccount, setShowPauseAccount] = useState(false);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);
  const [showCCPopup, setShowCCPopup] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({});
  const [paymentMethods, setPaymentMethods] = useState({
    name: "",
    brand: "",
    last4: "",
    billing_address: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  });
  const [showUpdateBillingDetailsPopup, setShowUpdateBillingDetailsPopup] =
    useState(false);

  const dispatch = useDispatch();

  const closeEditProfileCallBack = () => {
    getCompanyInformation();
    setShowEditCompanyProfile(false);
  };

  const closePauseAccountCallBack = () => {
    getCompanyInformation();
    setShowPauseAccount(false);
  };

  const closePaymentHistoryCallBack = () => {
    setShowPaymentHistory(false);
  };

  const closeCCPopupCallBack = () => {
    setShowCCPopup(false);
    getPaymentMethod();
  };

  const closeUpdateBillingInfoPopupCallBack = () => {
    setShowUpdateBillingDetailsPopup(false);
    getPaymentMethod();
  };

  const getPaymentMethod = () => {
    let helper = FormDataHelper();
    helper.append("client_id", getClientId());

    GeneralServices.postRequest(helper, CLIENT_PAYMENT_METHODS).then(
      (resp) => {
        let tmpPM = resp.data[0];
        setPaymentMethods(tmpPM);
      },
      (error) => {
        console.log("payment methods errror", error);
      }
    );
  };

  const getCompanyInformation = () => {
    let helper = FormDataHelper();
    helper.append("client_id", getClientId());

    GeneralServices.postRequest(helper, LIST_COMPANY).then((resp) => {
      let tmpCompanyData = resp.data[0];

      if (tmpCompanyData["requires"].length > 0) {
        var tmpRequires = Array();
        tmpCompanyData["requires"].forEach((element) => {
          tmpRequires.push(element.id);
        });

        tmpCompanyData["requires"] = tmpRequires;
      }

      if (tmpCompanyData["defines"].length > 0) {
        var tmpDefines = Array();
        tmpCompanyData["defines"].forEach((element) => {
          tmpDefines.push(element.id);
        });
        tmpCompanyData["defines"] = tmpDefines;
      }

      setCompanyInfo(tmpCompanyData);
      dispatch(setAccountPauseStatus(tmpCompanyData.is_pause));
      dispatch(setAccountCancelStatus(tmpCompanyData.is_canceled));
      dispatch(setAccountSuspendedStatus(tmpCompanyData.is_suspended));
    });
  };

  const handleReActivateAccount = () => {
    let helper = FormDataHelper();
    helper.append("client_id", companyInfo.id);
    helper.append("status", "N");

    GeneralServices.postRequest(helper, UPDATE_COMPANY_PAUSE_STATUS).then(
      (resp) => {
        swal("Account activated successfully !", {
          icon: "success",
        });
        getCompanyInformation();
      },
      (error) => {}
    );
  };

  const handleCancelAccount = () => {
    swal({
      title: "Xotic-Labs",
      text: "Are you sure you want to cancel account?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((resp) => {
      if (resp) {
        let helper = FormDataHelper();
        helper.append("client_id", companyInfo.id);
        helper.append("status", "Y");

        GeneralServices.postRequest(helper, UPDATE_CANCEL_STATUS).then(
          (resp) => {
            swal("Account status updated!", {
              icon: "success",
            });

            getCompanyInformation();
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log("User oppted not to cancel account");
      }
    });
  };

  useEffect(() => {
    getCompanyInformation();
    getPaymentMethod();
  }, []);

  return (
    <>
      <div className="font">
        <div className="top">
          <div className="profile">
            Company Settings
            {showEditCompanyProfile && (
              <EditCompanyProfile
                companyInfo={companyInfo}
                closePopup={closeEditProfileCallBack}
              />
            )}
          </div>
          <div className="invite">
            <button className="invite-in">
              <FontAwesomeIcon icon={faPlus} />
              Invite
            </button>
          </div>
        </div>
        {showPauseAccount && (
          <ConfirmPauseAccount
            companyId={companyInfo.id}
            closePopup={closePauseAccountCallBack}
          />
        )}
        {showPaymentHistory && (
          <PaymentHistory
            companyId={companyInfo.id}
            closePopup={closePaymentHistoryCallBack}
          />
        )}
        {showCCPopup && (
          <CreditCard
            userName={paymentMethods.name}
            userBillingAddress={paymentMethods.billing_address}
            closePopup={closeCCPopupCallBack}
          />
        )}
        {showUpdateBillingDetailsPopup && (
          <UpdateBillingInfo
            billingInfo={paymentMethods}
            closePopup={closeUpdateBillingInfoPopupCallBack}
          />
        )}
        <div className="main2">
          <div className="le">
            <div className="head1">
              <div className="head-text">
                <div className="person">Company Information</div>
                <div
                  className="icon"
                  onClick={() => {
                    setShowEditCompanyProfile(true);
                  }}
                >
                  <FontAwesomeIcon icon={faPencil} id="myBtn" size="xs" />
                </div>
              </div>
              <div className="container con-1">
                <div className="col-1">
                  <div>
                    <label htmlFor="Company Name" className="first-label">
                      <b>Company Name</b>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      name="Company Name"
                      className="name"
                      value={
                        companyInfo.company_name ? companyInfo.company_name : ""
                      }
                      readOnly
                    />
                  </div>
                  <div>
                    <div>
                      <label htmlFor="Team Size" className="first-label">
                        <b>Team Size</b>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder=""
                      name="Team Size"
                      className="name"
                      value={
                        companyInfo.team_size_title
                          ? companyInfo.team_size_title
                          : ""
                      }
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-1">
                  <div>
                    <label htmlFor="Administrator" className="first-label">
                      <b>Administrator</b>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      name="Administrator"
                      className="name"
                      value={`${companyInfo.first_name} ${companyInfo.last_name}`}
                      readOnly
                    />
                  </div>
                  <div>
                    <div>
                      <label htmlFor="Primary Email" className="first-label">
                        <b>Primary Email</b>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder=""
                      name="Primary Email"
                      className="name"
                      value={
                        companyInfo.email_address
                          ? companyInfo.email_address
                          : ""
                      }
                      readOnly
                    />
                  </div>
                  <div>
                    <div>
                      <label htmlFor="Phone" className="first-label">
                        <b>Phone</b>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder=""
                      name="Phone"
                      className="name"
                      value={
                        companyInfo.phone_number ? companyInfo.phone_number : ""
                      }
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="head-text">
              <div className="container secnd">
                <h4 className="billing">Billing Information</h4>
                <div className="main-bill">
                  <div className="left-bill">
                    <div className="label-space">
                      <div className="credit-p">
                        {`Credit Card `}
                        <span
                          className="credit-i"
                          onClick={() => {
                            setShowCCPopup(true);
                          }}
                        >
                          <i>
                            <FontAwesomeIcon icon={faPencil} size="xs" />
                          </i>
                        </span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="credit card">
                        {paymentMethods.brand}
                      </label>
                      <div>
                        <input
                          type="text"
                          placeholder={`*******${paymentMethods.last4}`}
                          name="credit card"
                          className="credit"
                          readOnly
                        />
                        <div>
                          <label htmlFor="" className="active-metod">
                            Active Payment Method
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right-bill">
                    <div>
                      <div className="label-space">
                        <div className="credit-p">
                          {`Billing Address `}
                          <span
                            className="credit-i"
                            onClick={() =>
                              setShowUpdateBillingDetailsPopup(
                                !showUpdateBillingDetailsPopup
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faPencil} size="xs" />
                          </span>
                          <div>
                            <input
                              type="text"
                              placeholder={paymentMethods.address1}
                              name="credit card"
                              className="credit"
                              readOnly
                            />
                            <div></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="comp2">
                          <div className="label-space">
                            <div className="credit-p">
                              Invoices
                              <div></div>
                              <div
                                className="label-space"
                                onClick={() => {
                                  setShowPaymentHistory(true);
                                }}
                              >
                                <label
                                  htmlFor=""
                                  className="billing-h"
                                  id="myBtn2"
                                >
                                  <span className="blue">
                                    View Billing History
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="le">
            <div className="head1">
              <div className="head-text">
                <div className="person">Subscription</div>
                <div className="icon-2"></div>
              </div>

              {companyInfo.is_canceled != "Y" && (
                <p className="trash ">
                  Manage your creative service subscription here.
                </p>
              )}

              {companyInfo.is_canceled != "Y" && (
                <div className="trash2">
                  <span
                    onClick={handleCancelAccount}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                    {` Cancel Account.`}
                  </span>
                  {companyInfo.is_pause == "N" &&
                    companyInfo.is_suspended == "N" && (
                      <span
                        className="blue1 "
                        id="myBtn1"
                        onClick={() => {
                          if (companyInfo.is_pause == "N")
                            setShowPauseAccount(true);
                          else handleReActivateAccount();
                        }}
                      >
                        {companyInfo.is_pause == "Y"
                          ? ` Re Activate Account`
                          : ` Put Account on Pause`}
                      </span>
                    )}
                </div>
              )}
              <hr />
              {companyInfo && (
                <PaymentPlans
                  companyInfo={companyInfo}
                  getCompanyInformationCallBack={getCompanyInformation}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
