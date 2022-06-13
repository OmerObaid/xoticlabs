import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { GeneralServices } from "../../jwt/_services/General.services";
import { GET_PAYMENT_HISTORY } from "../../jwt/_services/axiousURL";
import { openInNewTab } from "../../helper/siteHelper";

const PaymentHistory = ({ companyId, closePopup }) => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [upcomingInvoice, setUpcomingInvoice] = useState([]);

  const fetchPaymentHistory = () => {
    let helper = FormDataHelper();
    helper.append("company_id", companyId);

    GeneralServices.postRequest(helper, GET_PAYMENT_HISTORY).then((resp) => {
      console.log(resp);
      let tmpPayments = resp.data["charges"];
      let tmpUpcomingInvoice = resp.data["upcoming_invoice"];

      console.log(upcomingInvoice.length);
      console.log(tmpUpcomingInvoice[0]["amount_due"]);

      setPaymentHistory(tmpPayments);
      setUpcomingInvoice(tmpUpcomingInvoice);
    });
  };

  useEffect(() => {
    console.log("upcomingInvoice", upcomingInvoice);
    fetchPaymentHistory();
  }, []);

  return (
    <>
      <div id="myModal2" className="modal2" style={{ display: "block" }}>
        <div className="modal-content2">
          <span onClick={closePopup} className="close2">
            &times;
          </span>
          <div className="center-text">Invoices</div>
          <div className="container-fluid">
            <div className="drafts">Drafts</div>
            <div className="hl-parent">
              <div className="hl">
                <h4>Scheduled for </h4>
              </div>
              <div className="hl">
                <h4>Description </h4>
              </div>
              <div className="hl">
                <h4>Status </h4>
              </div>
              <div className="hl">
                <h4>Amount Due</h4>
              </div>
            </div>
            <div className="b-line"></div>
            {upcomingInvoice.length > 0 && (
              <div className="hl-parent">
                <div className="hl">
                  <p>{upcomingInvoice[0]["period_end"]} </p>
                </div>
                <div className="hl">
                  <p>{upcomingInvoice[0]["description"]}</p>
                </div>
                <div className="hl">
                  <p>{upcomingInvoice[0]["status"]} </p>
                </div>
                <div className="hl">
                  <p>
                    {`$ ${upcomingInvoice[0]["amount_due"]} ${upcomingInvoice[0]["currency"]}`}
                  </p>
                </div>
              </div>
            )}
            <div className="drafts">Past</div>
            <div className="hl-parent">
              <div className="hl">
                <h4>Date </h4>
              </div>
              <div className="hl">
                <h4>Description </h4>
              </div>
              <div className="hl">
                <h4>Status </h4>
              </div>
              <div className="hl">
                <h4>Amount Paid</h4>
              </div>
            </div>
            <div className="b-line"></div>

            {paymentHistory.map((singleHistory, key) => {
              return (
                <div className="hl-parent" key={key}>
                  <div className="hl">
                    <p>
                      {singleHistory["created"]}
                      <i className="fa fa-eye eye" aria-hidden="true"></i>
                      <FontAwesomeIcon
                        onClick={() => {
                          openInNewTab(singleHistory["receipt_url"]);
                        }}
                        icon={faEye}
                      />
                      <i
                        className="fa fa-file-pdf-o eye"
                        aria-hidden="true"
                      ></i>
                    </p>
                  </div>
                  <div className="hl">
                    <p>{singleHistory["description"]}</p>
                  </div>
                  <div className="hl">
                    <p>{singleHistory["status"]} </p>
                  </div>
                  <div className="hl">
                    <p>{`$ ${singleHistory["amount"]} ${singleHistory["currency"]}`}</p>
                  </div>
                  <div className="bline-2"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
