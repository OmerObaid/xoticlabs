import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_KEY } from "../constants";
import StripeCreditCard from "./stripeCreditCard";

const CreditCard = ({ userName, userBillingAddress, closePopup }) => {
  const stripePromise = loadStripe(STRIPE_KEY);
  // const [name, setName] = useState(userName);
  // const [billingAddress, setBillingAddress] = useState(userBillingAddress);

  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const setErrorMessageCallBack = (showMessage, message) => {
    setShowErrorMessage(showMessage);
    if (showMessage) setErrorMessage(message);
  };

  // const getName = () => name;
  const callSubmit = () => setShouldSubmit(true);
  // const getBillingAddress = () => billingAddress;

  if (false) {
    return (
      <>
        <div id="myModal3" className="modal3" style={{ display: "block" }}>
          <div className="modal-content3">
            <span className="close3" onClick={closePopup}>
              &times;
            </span>
            <div className="center-text">Update Credit Card Information</div>
            <form>
              <div className="container-fluid">
                <div className="comp">
                  <div className="label-space">
                    <label className="pop-label" htmlFor="name">
                      Card Holders Name <span className="steric">*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Holder Name"
                    name="Company name"
                    className="namep"
                  />
                </div>
                <div className="comp">
                  <div className="label-space">
                    <label className="pop-label" htmlFor="name">
                      Card Number <span className="steric">*</span>
                    </label>
                  </div>
                  <input
                    type="password"
                    placeholder="Enter Card Number"
                    name="Company name"
                    className="namep"
                  />
                </div>
                <div className="comp">
                  <div className="label-space">
                    <label className="pop-label" htmlFor="name">
                      Expiration<span className="steric">*</span>
                    </label>
                  </div>
                  <input
                    type="number"
                    placeholder="MM"
                    className="month"
                    maxLength={2}
                  />
                  <input
                    type="number"
                    placeholder="YYYY"
                    className="month"
                    maxLength={4}
                  />
                </div>
                <div className="comp">
                  <div className="label-space">
                    <label className="pop-label" htmlFor="name">
                      CVC <span className="steric">*</span>
                    </label>
                  </div>
                  <input
                    type="password"
                    placeholder="Enter CVC"
                    className="namep"
                  />
                </div>
                <div className="comp">
                  <p className="lock">
                    <i className="fa fa-lock" aria-hidden="true"></i> 256-bit
                    SSL Secured - Powerd by Stripe
                  </p>
                  <div>
                    <div className="comp">
                      <label htmlFor="" className="active-metod">
                        Active Payment Method
                      </label>
                    </div>
                  </div>
                </div>
                <div className="last-btn-pp">
                  <button className="last-btn2">Cancel</button>
                  <button className="last-btn">
                    Update Credit Card Information
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id="myModal3" className="modal3" style={{ display: "block" }}>
          <div className="modal-content3">
            <span className="close3" onClick={closePopup}>
              &times;
            </span>
            <div className="center-text">Update Credit Card Information</div>
            {showErrorMessage && (
              <div className="invalid-feedback">
                <span>{errorMessage}</span>
              </div>
            )}
            <div className="container-fluid">
              {/* <div className="comp">
                <div className="label-space">
                  <label className="pop-label" htmlFor="name">
                    Card Holders Name <span className="steric">*</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Holder Name"
                  name="Company name"
                  className="namep"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div> */}

              <Elements stripe={stripePromise}>
                <StripeCreditCard
                  // getUserName={getName}
                  // getBillingAddress={getBillingAddress}
                  callSubmit={shouldSubmit}
                  setShouldCallSubmit={setShouldSubmit}
                  closeWindow={closePopup}
                  setErrorMessageCallBack={setErrorMessageCallBack}
                />
              </Elements>

              {/* <div className="comp">
                <div className="label-space">
                  <label className="pop-label" htmlFor="name">
                    Billing Address <span className="steric">*</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Billing Address"
                  className="namep"
                  value={billingAddress}
                  onChange={(e) => {
                    setBillingAddress(e.target.value);
                  }}
                />
              </div> */}

              <div className="comp">
                <p className="lock">
                  <i className="fa fa-lock" aria-hidden="true"></i> 256-bit SSL
                  Secured - Powerd by Stripe
                </p>
                <div>
                  <div className="comp">
                    <label htmlFor="" className="active-metod">
                      Active Payment Method
                    </label>
                  </div>
                </div>
              </div>
              <div className="last-btn-pp">
                <button onClick={closePopup} className="last-btn2">
                  Cancel
                </button>
                <button
                  className="last-btn"
                  onClick={callSubmit}
                  disabled={false}
                >
                  Update Credit Card Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default CreditCard;
