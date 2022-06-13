import React, { useEffect, useMemo, useState } from "react";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import useResponsiveFontSize from "./useResponsiveFontSize";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { getClientId } from "../../helper/siteHelper";
import { GeneralServices } from "../../jwt/_services/General.services";
import { CLIENT_ADD_CARD_TOKEN } from "../../jwt/_services/axiousURL";
import swal from "sweetalert";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const StripeCreditCard = ({
  // getUserName,
  // getBillingAddress,
  callSubmit,
  setShouldCallSubmit,
  closeWindow,
  setErrorMessageCallBack,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const handleSubmit = async (event) => {
    // Stripe.js has not loaded yet. Make sure to disable
    // form submission until Stripe.js has loaded.
    if (!stripe || !elements) return;

    // let data = { name: getUserName(), address_line1: getBillingAddress() };
    stripe.createToken(elements.getElement(CardNumberElement)).then(
      (resp) => {
        if (resp.error) {
          setErrorMessageCallBack(true, resp.error.message);
          setShouldCallSubmit(false);
          return;
        }

        let helper = FormDataHelper();
        helper.append("client_id", getClientId());
        helper.append("token_id", resp.token["id"]);

        GeneralServices.postRequest(helper, CLIENT_ADD_CARD_TOKEN).then(
          (resp) => {
            swal("Card added successfully!", {
              icon: "success",
            });

            setShouldCallSubmit(false);
            closeWindow();
          },
          (error) => {
            swal("Failed to add card!", {
              icon: "success",
            });
            setShouldCallSubmit(false);
            closeWindow();
          }
        );
      },
      (error) => {
        setShouldCallSubmit(false);
      }
    );
  };

  useEffect(() => {
    if (callSubmit == true) {
      handleSubmit();
    }
  }, [callSubmit]);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card number
        <CardNumberElement options={options} />
      </label>
      <label>
        Expiration date
        <CardExpiryElement options={options} />
      </label>
      <label>
        CVC
        <CardCvcElement options={options} />
      </label>
    </form>
  );
};

export default StripeCreditCard;
