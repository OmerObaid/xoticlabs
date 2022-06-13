import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useState, useEffect } from "react";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { getClientId } from "../../helper/siteHelper";
import { GeneralServices } from "../../jwt/_services/General.services";
import {
  CLIENT_UPDATE_INFO,
  LIST_COUNTRIES,
  LIST_STATES,
} from "../../jwt/_services/axiousURL";
import swal from "sweetalert";

const EditUserProfile = ({ user, closePopup }) => {
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

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

      let tmpStates;
      console.log("asdsadd", user);
      if (user.country_id != null || user.state_id != "0") {
        tmpStates = states.filter((state) => {
          return state.country_id == user.country_id;
        });
      } else {
        tmpStates = states;
      }

      setFilteredStates(tmpStates);
    });
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  //   const [user, setUser] = useState({});

  return (
    <>
      <div id="myModal" className="modal" style={{ display: "block" }}>
        <div className="modal-content">
          <span onClick={closePopup} className="close">
            &times;
          </span>
          <div className="center-text">Update personal info</div>
          <Formik
            enableReinitialize={true}
            initialValues={{
              firstName: user.first_name,
              lastName: user.last_name,
              email: user.email,
              timeZone: user.timezone_id,
              primaryAddress: user.address1,
              secondaryAddress: user.address2,
              city: user.city,
              stateId: user.state_id,
              postalCode: user.zip_code,
              countryId: user.country_id ? user.country_id : "",
              newPassword: "",
              currentPassword: "",
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().required("First Name is required"),
              lastName: Yup.string().required("Last Name is required"),
              email: Yup.string().required("Email is required"),
              newPassword: Yup.string().matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
              ),
              currentPassword: Yup.string()
                .required("Please enter current password")
                .oneOf([user.password, null], "Invalid current password"),
            })}
            onSubmit={(values, actions) => {
              console.log(values);

              let helper = FormDataHelper();
              helper.append("client_id", getClientId());
              helper.append("first_name", values.firstName);
              helper.append("last_name", values.lastName);
              helper.append("email", values.email);
              helper.append("timezone_id", values.timeZone);
              helper.append("address1", values.primaryAddress);
              helper.append("address2", values.secondaryAddress);
              helper.append("city", values.city);
              helper.append("state_id", values.stateId);
              helper.append("zip_code", values.postalCode);
              helper.append("state_id", values.stateId);
              if (values.newPassword)
                helper.append("password", values.newPassword);
              else helper.append("password", user.password);

              GeneralServices.postRequest(helper, CLIENT_UPDATE_INFO).then(
                (resp) => {
                  swal("Updated successfully", {
                    icon: "success",
                  });
                  closePopup();
                },
                (error) => {}
              );
            }}
          >
            {({ isSubmitting, setFieldValue, values, handleChange }) => (
              <Form>
                <div className="container">
                  <div>
                    <div className="label-space">
                      <label className="pop-label" htmlFor="name">
                        <b>
                          First name <span className="steric">*</span>
                        </b>
                      </label>
                    </div>
                    <Field
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      className="namep"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div>
                    <div className="label-space">
                      <label className="pop-label" htmlFor="name">
                        <b>
                          Last name<span className="steric">*</span>
                        </b>
                      </label>
                    </div>
                    <Field
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      className="namep"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div>
                    <div className="label-space">
                      <label className="pop-label" htmlFor="email">
                        <b>
                          Email<span className="steric">*</span>
                        </b>
                      </label>
                    </div>
                    <Field
                      type="text"
                      placeholder="Enter Email"
                      name="email"
                      className="namep"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div>
                    <div className="label-space">
                      <label className="pop-label" htmlFor="name">
                        <b>
                          Time Zone <span className="steric">*</span>
                        </b>
                      </label>
                    </div>
                    <Field as="select" className="time-zone2" name="timeZone">
                      <option value="1">
                        Pacific Standard Time - PST (UTC-8)
                      </option>
                      <option value="2">
                        Mountain Standard Time - MST (UTC-7)
                      </option>
                      <option value="3">
                        Central Standard Time - CST (UTC-6)
                      </option>
                      <option value="4">
                        Eastern Standard Time - EST (UTC-5)
                      </option>
                    </Field>
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
                          <label className="pop-label" htmlFor="address">
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
                          <label className="pop-label" htmlFor="address1">
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
                          <label className="state-label" htmlFor="adress1">
                            <b>State</b>
                          </label>
                        </div>
                        <Field
                          as="select"
                          className="country-state"
                          name="stateId"
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
                          <label className="pop-label" htmlFor="adress1">
                            <b>Country</b>
                          </label>
                        </div>
                        <Field
                          as="select"
                          className="state-picker"
                          name="countryId"
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
                  <div>
                    <div>
                      <div className="label-space">
                        <label className="state-label" htmlFor="adress1">
                          <b>New password</b>
                        </label>
                      </div>
                      <Field
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter New Password"
                        className="namep"
                        name="newPassword"
                      />
                      <ErrorMessage
                        name="newPassword"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div>
                      <p className="pas-para">
                        leave blank if you dont want to change password.
                      </p>
                      <input
                        type="checkbox"
                        className="show-p"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                      <label htmlFor="show-p" className="show-p">
                        Show Password
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="label-space">
                      <label className="state-label" htmlFor="adress1">
                        <b>
                          Current password <span className="steric">*</span>
                        </b>
                      </label>
                    </div>
                    <Field
                      type="password"
                      placeholder="Enter Password"
                      className="namep"
                      name="currentPassword"
                    />
                    <p className="pas-para">
                      We need your current password to confirm your changes.
                    </p>
                    <ErrorMessage
                      name="currentPassword"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="last-btn-pp">
                    <button className="last-btn" type="submit">
                      Save Changes
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

export default EditUserProfile;
