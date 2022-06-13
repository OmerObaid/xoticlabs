import React, { useState } from "react";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { UPDATE_COMPANY_PAUSE_STATUS } from "../../jwt/_services/axiousURL";
import { GeneralServices } from "../../jwt/_services/General.services";
import swal from "sweetalert";

const ConfirmPauseAccount = ({ companyId, closePopup }) => {
  const [processing, setProcessing] = useState(false);
  const handlePauseAccount = () => {
    setProcessing(true);
    let helper = FormDataHelper();
    helper.append("client_id", companyId);
    helper.append("status", "Y");
    GeneralServices.postRequest(helper, UPDATE_COMPANY_PAUSE_STATUS).then(
      (resp) => {
        setProcessing(false);
        swal("Account Paused Successfully", {
          icon: "success",
        });
        closePopup();
      },
      (error) => {
        setProcessing(true);
      }
    );
  };

  return (
    <>
      <div id="myModal1" className="modal1" style={{ display: "block" }}>
        <div className="modal-content1">
          <span className="close1" onClick={closePopup}>
            &times;
          </span>
          <div className="center-text">
            <h3> Confirmation</h3>
          </div>
          <div className="container-fluid">
            <p className="put-pop-para">
              The cost for going on hold is $14.99 USD/month. You will still be
              able to access your design files while on hold. yoou may return
              here to re-active your account at any time. Are you sure you want
              to put your account on hold
            </p>
            <div className="put-pop-btn-p">
              <button onClick={handlePauseAccount} className="put-pop-btn">
                {processing ? "Please Wait..." : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmPauseAccount;
