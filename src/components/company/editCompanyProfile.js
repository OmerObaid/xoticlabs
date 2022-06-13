import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import BrandDefinition from "../brand/brandDefinition";
import {
  LIST_DESIGN_OPTIONS,
  LIST_INDUSTRY_OPTIONS,
  UPDATE_COMPANY,
} from "../../jwt/_services/axiousURL";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { GeneralServices } from "../../jwt/_services/General.services";
import swal from "sweetalert";

const EditCompanyProfile = ({ companyInfo, closePopup }) => {
  const [showBestContactPhone, setShowBestContactPhone] = useState(true);

  const handleBestContactChange = (e) => {
    if (e.target.value == 1) setShowBestContactPhone(true);
    else setShowBestContactPhone(false);
  };

  return (
    <>
      <div id="myModal" className="modal" style={{ display: "block" }}>
        <div className="modal-content">
          <span className="close" onClick={closePopup}>
            &times;
          </span>
          <div className="center-text">Update My Company Information</div>
          <Formik
            // enableReinitialize={true}
            initialValues={{
              companyName: companyInfo.company_name,
              email: companyInfo.email_address,
              teamSize: companyInfo.team_size_id
                ? companyInfo.team_size_id
                : "",
              website: companyInfo.website ? companyInfo.website : "",
              facebook: companyInfo.facebook ? companyInfo.facebook : "",
              twitter: companyInfo.twitter ? companyInfo.twitter : "",
              instagram: companyInfo.instagram ? companyInfo.instagram : "",
              bestContactEmail: companyInfo.best_contact_email
                ? companyInfo.best_contact_email
                : "",
              bestContactPhoneNumber: companyInfo.best_contact_phone_number
                ? companyInfo.best_contact_phone_number
                : "",
              defines: companyInfo.defines.length ? companyInfo.defines : [],
              requires: companyInfo.requires.length ? companyInfo.requires : [],
            }}
            validationSchema={Yup.object().shape({
              companyName: Yup.string().required(
                "Please enter the name of the company"
              ),
              email: Yup.string()
                .required("Please enter email address")
                .email("Please enter valid email addrress"),
            })}
            onSubmit={(values, actions) => {
              console.log(values);

              let helper = FormDataHelper();
              helper.append("client_id", companyInfo.id);
              helper.append("company_name", values.companyName);
              helper.append("email_address", values.email);
              helper.append("team_size_id", values.teamSize);
              helper.append("website", values.website);
              helper.append("facebook", values.facebook);
              helper.append("twitter", values.twitter);
              helper.append("instagram", values.instagram);
              helper.append("best_contact_email", values.bestContactEmail);
              helper.append(
                "best_contact_phone_number",
                values.bestContactPhoneNumber
              );
              helper.append("defines", JSON.stringify(values.defines));
              helper.append("requires", JSON.stringify(values.requires));
              helper.append("is_sharing_allowed", "Y");

              GeneralServices.postRequest(helper, UPDATE_COMPANY).then(
                (resp) => {
                  swal("Company profile updated!", {
                    icon: "success",
                  });
                  closePopup();
                },
                (error) => {
                  actions.setSubmitting(false);
                }
              );
            }}
          >
            {({ errors, status, touched, isSubmitting }) => (
              <Form>
                <div className="container-fluid">
                  <div className="comp">
                    <div className="label-space">
                      <label className="pop-label" htmlFor="name">
                        Company Name <span className="steric">*</span>
                      </label>
                    </div>
                    <Field
                      type="text"
                      placeholder="Enter Company Name"
                      name="companyName"
                      className="namep"
                    />
                    <ErrorMessage
                      name="companyName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="comp">
                    <div className="label-space">
                      <label className="pop-label" htmlFor="email">
                        Email<span className="steric">*</span>
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
                    <p className="pop-para2">Number of Employees</p>
                    <div>
                      <Field type="radio" name="teamSize" id="1" value="1" />
                      <label htmlFor="1" className="radio-label">
                        It's just me
                      </label>
                      {/* <span className="radio-label">Its Just Me</span> */}
                      <Field type="radio" name="teamSize" id="2" value="2" />
                      <label className="radio-label" htmlFor="2">
                        2-5
                      </label>
                      <Field type="radio" name="teamSize" id="3" value="3" />
                      <label className="radio-label" htmlFor="3">
                        6-20
                      </label>
                      <Field type="radio" name="teamSize" id="4" value="4" />
                      <label className="radio-label" htmlFor="4">
                        21-50
                      </label>
                      <Field type="radio" name="teamSize" id="5" value="5" />
                      <label className="radio-label" htmlFor="5">
                        51-100
                      </label>
                      <Field type="radio" name="teamSize" id="6" value="6" />
                      <label className="radio-label" htmlFor="6">
                        101-250
                      </label>
                      <Field type="radio" name="teamSize" id="7" value="7" />
                      <label className="radio-label" htmlFor="7">
                        250+
                      </label>
                    </div>
                  </div>
                  <div className="web-space">
                    <div className="url-p">
                      <label className="url-label" htmlFor="websiteName">
                        <span className="url-l"> Website URL</span>
                      </label>
                      <Field
                        type="text"
                        id="websiteName"
                        placeholder="Enter URL"
                        name="website"
                        className="namef"
                      />
                    </div>
                    <div className="url-p">
                      <label className="url-label" htmlFor="facebookUrl">
                        <span className="url-l"> Facebook.com</span>
                      </label>
                      <Field
                        type="text"
                        id="facebookUrl"
                        placeholder="Enter Facebook"
                        name="facebook"
                        className="namef"
                      />
                    </div>
                    <div className="url-p">
                      <label className="url-label" htmlFor="twitterUrl">
                        <span className="url-l"> Twitter</span>
                      </label>
                      <Field
                        type="text"
                        id="twitterUrl"
                        placeholder="Enter Twitter"
                        name="twitter"
                        className="namef"
                      />
                    </div>
                    <div className="url-p">
                      <label className="url-label" htmlFor="instagramUrl">
                        <span className="url-l"> Instagram</span>
                      </label>
                      <Field
                        type="text"
                        id="instagramUrl"
                        placeholder="Enter Instagaram"
                        name="instagram"
                        className="namef"
                      />
                    </div>
                  </div>
                  <div className="phone">
                    <div className="label-space">
                      <label className="pop-label" htmlFor="email">
                        What's the best way to contact you?
                      </label>
                    </div>
                    <div className="phone-f">
                      <div>
                        <Field
                          as="select"
                          className="name-picker"
                          name="contactType"
                          onChange={handleBestContactChange}
                        >
                          <option value="1">Phone</option>
                          <option value="2">Email</option>
                        </Field>
                      </div>

                      {showBestContactPhone && (
                        <div className="name-phonep">
                          <Field
                            type="text"
                            placeholder=" "
                            name="bestContactPhoneNumber"
                            className="name-phone"
                          />
                        </div>
                      )}
                      {!showBestContactPhone && (
                        <div className="name-phonep">
                          <Field
                            type="text"
                            placeholder=" "
                            name="bestContactEmail"
                            className="name-phone"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <div>
                    <div className="label-space">
                      <label className="pop-label" htmlFor="adress1">
                        What types of problems are you solving?
                      </label>
                    </div>
                    <Field
                      type="text"
                      placeholder=""
                      className="namep"
                      name="solvingProblem"
                    />
                  </div> */}

                  <div
                    className="cnp"
                    style={{ paddingTop: "2rem", paddingBottom: "0rem" }}
                  >
                    <div className="inputField">
                      <BrandDefinition
                        checkboxName={"defines"}
                        titleString="What best defines your industry?"
                        URL={LIST_INDUSTRY_OPTIONS}
                        checkBoxLabelClass={"label-check"}
                        checkBoxClass={"check-boxes-company"}
                      >
                        <ErrorMessage
                          name="defines"
                          component="div"
                          className="invalid-feedback"
                        />
                      </BrandDefinition>
                      <br />
                    </div>
                  </div>

                  <div className="inputField">
                    <BrandDefinition
                      checkboxName={"requires"}
                      titleString="What do you want to create?"
                      URL={LIST_DESIGN_OPTIONS}
                      checkBoxLabelClass={"label-check"}
                      checkBoxClass={"check-boxes-company"}
                    >
                      <ErrorMessage
                        name="requires"
                        component="div"
                        className="invalid-feedback"
                      />
                    </BrandDefinition>
                    <br />
                  </div>
                  <div className="last-btn-pp">
                    <button
                      type="button"
                      onClick={closePopup}
                      className="last-btn2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="last-btn"
                    >
                      Submit
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

export default EditCompanyProfile;
