import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { GeneralServices } from "../../jwt/_services/General.services";
import {
  LIST_COUNTRIES,
  LIST_STATES,
  UPDATE_CLIENT_BILLING_INFO,
} from "../../jwt/_services/axiousURL";
import { getClientId } from "../../helper/siteHelper";
import swal from "sweetalert";

const UpdateBillingInfo = ({ billingInfo, closePopup }) => {
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);

  const handleCountryChange = (e, handleChange) => {
    let tmpStates = allStates.filter((state) => {
      return state.country_id == e.target.value;
    });
    setFilteredStates(tmpStates);
    handleChange(e);
  };

  const fetchCountries = () => {
    let helper = FormDataHelper();
    GeneralServices.postRequest(helper, LIST_COUNTRIES).then((resp) => {
      let countries = resp.data;
      setAllCountries(countries);
      fetchStates();
    });
  };
  const fetchStates = () => {
    let helper = FormDataHelper();
    GeneralServices.postRequest(helper, LIST_STATES).then((resp) => {
      let states = resp.data;
      setAllStates(states);

      let tmpStates = states;
      //   tmpStates = states;
      if (billingInfo.country != null || billingInfo.state != "0") {
        tmpStates = states.filter((state) => {
          return state.country_id == billingInfo.country;
        });
      }

      setFilteredStates(tmpStates);
    });
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
      <div id="myModal3" className="modal3" style={{ display: "block" }}>
        <div className="modal-content3">
          <span className="close3" onClick={closePopup}>
            &times;
          </span>
          <div className="center-text">Update Billing Information</div>
          {/* {showErrorMessage && (
            <div className="invalid-feedback">
              <span>{errorMessage}</span>
            </div>
          )} */}
          <Formik
            enableReinitialize={true}
            initialValues={{
              cardHolderName: billingInfo.name ? billingInfo.name : "",
              primaryAddress: billingInfo.address1 ? billingInfo.address1 : "",
              secondaryAddress: billingInfo.address2
                ? billingInfo.address2
                : "",
              state: billingInfo.state ? billingInfo.state : "",
              country: billingInfo.country ? billingInfo.country : "",
              city: billingInfo.city ? billingInfo.city : "",
              postalCode: billingInfo.postal_code
                ? billingInfo.postal_code
                : "",
            }}
            validationSchema={Yup.object().shape({
              cardHolderName: Yup.string().required(
                "Card holder Name is required"
              ),
              primaryAddress: Yup.string().required("Address1 is required"),
            })}
            onSubmit={(values, actions) => {
              console.log(values, actions);

              let helper = FormDataHelper();
              helper.append("client_id", getClientId());
              helper.append("pm_id", billingInfo.pm_id);
              helper.append("name", values.cardHolderName);
              helper.append("address1", values.primaryAddress);
              helper.append("address2", values.secondaryAddress);
              helper.append("city", values.city);
              helper.append("country", values.country);
              helper.append("state", values.state);
              helper.append("postal_code", values.postalCode);

              GeneralServices.postRequest(
                helper,
                UPDATE_CLIENT_BILLING_INFO
              ).then(
                (successResponse) => {
                  swal("Billing Info updated successfully!", {
                    icon: "success",
                  });
                  closePopup();
                },
                (errorResponse) => {
                  closePopup();
                }
              );
            }}
          >
            {({ isSubmitting, handleChange }) => (
              <Form>
                <div className="container-fluid">
                  <div className="comp">
                    <div className="label-space">
                      <label className="pop-label" htmlFor="name">
                        Card Holders Name <span className="steric">*</span>
                      </label>
                    </div>
                    <Field
                      type="text"
                      placeholder="Card Holder Name"
                      name="cardHolderName"
                      className="namep"
                    />
                    <ErrorMessage
                      name="cardHolderName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div>
                    <div className="label-space">
                      <label className="pop-label" htmlFor="adress">
                        <b>Address1</b>
                      </label>
                    </div>
                    <Field
                      type="text"
                      placeholder="Address"
                      name="primaryAddress"
                      className="namep"
                    />
                    <ErrorMessage
                      name="primaryAddress"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div>
                    <div className="label-space">
                      <label className="pop-label" htmlFor="adress1">
                        <b> Address2 </b>
                      </label>
                    </div>
                    <Field
                      type="text"
                      placeholder="Address2"
                      name="secondaryAddress"
                      className="namep"
                    />
                  </div>
                  <div className="parent-select">
                    <div style={{ flex: 1 }}>
                      <div>
                        <div className="label-space">
                          <label className="pop-label" htmlFor="city">
                            <b>City </b>
                          </label>
                        </div>
                        <Field
                          type="text"
                          placeholder="Enter City"
                          name="city"
                          className="city"
                        />
                      </div>
                      <div>
                        <div className="label-space">
                          <label className="pop-label" htmlFor="postalCode">
                            <b>ZIP / postal code</b>
                          </label>
                        </div>
                        <Field
                          type="text"
                          placeholder="----"
                          name="postalCode"
                          className="city"
                        />
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div>
                        <div className="label-space">
                          <label className="state-label" htmlFor="country">
                            <b>State</b>
                          </label>
                        </div>
                        <Field
                          as="select"
                          className="country-state"
                          name="state"
                        >
                          {filteredStates &&
                            filteredStates.map((state) => {
                              return (
                                <option key={state.id} value={state.id}>
                                  {state.title}
                                </option>
                              );
                            })}
                        </Field>
                      </div>
                      <div>
                        <div className="label-space">
                          <label className="pop-label" htmlFor="state">
                            <b>Country</b>
                          </label>
                        </div>
                        <Field
                          as="select"
                          className="state-picker"
                          name="country"
                          onChange={(e) => handleCountryChange(e, handleChange)}
                        >
                          {allCountries &&
                            allCountries.map((country) => {
                              return (
                                <option key={country.id} value={country.id}>
                                  {country.title}
                                </option>
                              );
                            })}
                        </Field>
                      </div>
                    </div>
                  </div>

                  <div className="last-btn-pp">
                    <button onClick={closePopup} className="last-btn2">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="last-btn"
                      disabled={isSubmitting}
                    >
                      Update Billing Information
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default UpdateBillingInfo;
