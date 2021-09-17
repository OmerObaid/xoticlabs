import crossSignIcon from "../../assets/images/new-brand-icons/cross-sign.png";
import uploadIcon from "../../assets/images/new-brand-icons/upload.png";
import addNewColorIcon from "../../assets/images/new-brand-icons/add new color.png";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import * as Yup from "yup";
import ColorBox from "../colorBox";
import { useState, useEffect } from "react";
import AttachmentGuidlines from "./attachmentGuidlines";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { AuthenticationService } from "../../jwt/_services";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { GeneralServices } from "../../jwt/_services/General.services";
import { BRAND_ADD, INDUSTRIES_LISTING } from "../../jwt/_services/axiousURL";
import swal from "sweetalert";

const CreateNewBrand = ({ crossButtonCallBack }) => {
  const clientId = AuthenticationService.currentUserValue.id;

  const [colors, setColors] = useState([]);
  const [showColorBox, setShowColorBox] = useState(false);
  const [sohwLogoFileSelected, setSohwLogoFileSelected] = useState(false);
  const [showGuideFileSelected, setShowGuideFileSelected] = useState(false);
  const [showAttachmentFileSelected, setShowAttachmentFileSelected] =
    useState(false);
  const [attachmentCount, setAttachmentCount] = useState(0);
  const [industries, setIndustries] = useState([]);

  const closeColorBoxCallBack = ({ color }) => {
    setShowColorBox(false);
    if (!color) return;
    setColors([...colors, color.hex]);
  };

  const removeColor = (index) => {
    colors.splice(index, 1);
    setColors([...colors]);
  };

  const fetchIndustries = () => {
    var helper = FormDataHelper();
    GeneralServices.postRequest(helper, INDUSTRIES_LISTING).then(
      (successResponse) => {
        setIndustries(successResponse.data);
      },
      (errorResponse) => {
        console.log("Failed to log industries");
      }
    );
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  return (
    <>
      <div className="cnp createNew-overLay active">
        <main>
          <img
            onClick={crossButtonCallBack}
            src={crossSignIcon}
            alt="cross"
            className="cross"
          />
          <h1 className="cnp-head">Create a brand</h1>
          <p className="cnp-para">
            A brands is a folder containing information and assets for anyone or
            anything that you need designs for regularly. Create a brand for
            clients, products, or use it to categorize and organize your design
            projects.
          </p>

          <Formik
            initialValues={{
              brandName: "",
              industry: "",
              description: "",
              website: "",
              logo: "",
            }}
            validationSchema={Yup.object().shape({
              brandName: Yup.string().required("Brand name is required"),
              industry: Yup.number().required("Industry is required"),
              description: Yup.string().min(1).max(150).required(),
              logo: Yup.mixed().required("logo is required"),
            })}
            onSubmit={(values, actions) => {
              console.log(values);
              actions.setStatus();
              var helper = FormDataHelper();

              helper.append("client_id", clientId);
              helper.append("title", values.brandName);
              helper.append("industry_id", values.industry);
              helper.append("description", values.description);
              helper.append("website", values.website);
              if (colors.length > 0) {
                helper.append("colors", JSON.stringify(colors));
              }

              helper.append("logo", values.logo);
              helper.append("guidelines", values.guidelines);

              if (
                values.hasOwnProperty("attachments") != "" &&
                values.attachments.length > 0
              ) {
                for (var imageFile of values.attachments) {
                  helper.append("attachments[]", imageFile);
                }
              }

              GeneralServices.postRequest(helper, BRAND_ADD).then(
                (successResponse) => {
                  swal("Brand has created!", {
                    icon: "success",
                  });
                  crossButtonCallBack(true);
                },
                (error) => {
                  actions.setSubmitting(false);
                  actions.setStatus(error);
                }
              );
            }}
          >
            {({ errors, status, touched, isSubmitting, setFieldValue }) => (
              <Form>
                <div className="inputField">
                  <label className="inputLabel required" htmlFor="brandName">
                    Brand name
                  </label>
                  <br />
                  <div className="inputDiv input">
                    <Field type="text" id="brandName" name="brandName" />
                  </div>
                  <ErrorMessage
                    name="logo"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="inputField">
                  <label className="inputLabel required" htmlFor="industry">
                    Industry
                  </label>
                  <br />
                  <div className="inputDiv">
                    <Field
                      as="select"
                      className="input"
                      id="industry"
                      name="industry"
                    >
                      <option value="">Select a Industry</option>
                      {industries.map((industry) => {
                        return (
                          <option key={industry.id} value={industry.id}>
                            {industry.title}
                          </option>
                        );
                      })}
                    </Field>
                  </div>
                  <ErrorMessage
                    name="industry"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="inputField description">
                  <label htmlFor="#desc" className="inputLabel required">
                    Description
                  </label>

                  <p className="format-inst">
                    Tell us about this brand. What product/service does it
                    provide? What’s special about it?
                  </p>
                  <CKEditor
                    editor={ClassicEditor}
                    config={{
                      removePlugins: [
                        "ImageUpload",
                        "EasyImage",
                        "MediaEmbed",
                        "Link",
                        "CKFinder",
                      ],
                    }}
                    data="<p>Insert your text here</p>"
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      setFieldValue("description", editor.getData());
                    }}
                  />

                  <ErrorMessage
                    name="description"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="inputField">
                  <h3 className="inputLabel brandGuide-head required">
                    Brand Logo
                  </h3>
                  <p className="format-inst">Upload your brand logo.</p>
                  <input
                    type="file"
                    name="logo"
                    id="logo"
                    hidden
                    onChange={(event) => {
                      setFieldValue("logo", event.currentTarget.files[0]);
                      setSohwLogoFileSelected(true);
                    }}
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <label htmlFor="logo">
                    <img src={uploadIcon} alt="upload" />
                    <span>Upload logo</span>
                    {sohwLogoFileSelected && (
                      <span style={{ color: "#4ba893" }}>
                        {" "}
                        1 file selected{" "}
                      </span>
                    )}
                  </label>
                  <ErrorMessage
                    name="logo"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="inputField">
                  <label className="inputLabel" htmlFor="website">
                    Website
                  </label>
                  <br />
                  <div className="inputDiv">
                    <Field
                      type="text"
                      name="website"
                      className="input"
                      id="industry"
                    />
                  </div>
                </div>
                <div className="inputField">
                  <h3 className="inputLabel brandGuide-head">
                    Brand guideline
                  </h3>
                  <p className="format-inst">
                    Upload your existing brand guideline if you have one.
                  </p>
                  <input
                    type="file"
                    name="guidelines"
                    id="brandGuide"
                    hidden
                    onChange={(event) => {
                      setFieldValue("guidelines", event.currentTarget.files[0]);
                      setShowGuideFileSelected(true);
                    }}
                  />
                  <label htmlFor="brandGuide">
                    <img src={uploadIcon} alt="upload" />
                    <span>Upload guideline</span>
                    {showGuideFileSelected && (
                      <span style={{ color: "#4ba893" }}>
                        {" "}
                        1 file selected{" "}
                      </span>
                    )}
                  </label>
                </div>
                <div className="inputField">
                  <h3 className="inputLabel">Brand Colors</h3>
                  <div className="brandColors">
                    <div
                      onClick={() => setShowColorBox(!showColorBox)}
                      className="brandColors_single createColor"
                    >
                      <img src={addNewColorIcon} alt="add new color" />
                    </div>
                    {colors.map((color, key) => {
                      const hStyle = { background: color };
                      return (
                        <div className="brandColors_single" key={key}>
                          <div className="color" style={hStyle}></div>
                          <span className="hex">{color}</span>
                          <button
                            onClick={() => removeColor(key)}
                            type="button"
                            className="remove"
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {showColorBox && (
                  <ColorBox closeCallBack={closeColorBoxCallBack} />
                )}
                <div className="inputField">
                  <p className="inputLabel">Attachments</p>
                  <AttachmentGuidlines />
                  <div className="attach-cont">
                    <input
                      type="file"
                      name="attachments"
                      id="atch"
                      hidden
                      onChange={(event) => {
                        setFieldValue("attachments", event.target.files);
                        setAttachmentCount(event.target.files.length);
                        setShowAttachmentFileSelected(true);
                      }}
                      multiple
                    />
                    <label htmlFor="atch">
                      <img src={uploadIcon} alt="upload icon" /> Upload files
                    </label>
                    <p>
                      Upload or drag & drop any images, files, or examples that
                      may be helpful explaining your project here.
                      {showAttachmentFileSelected && (
                        <span style={{ color: "#4ba893" }}>
                          {" "}
                          {`${attachmentCount} file(s) selected`}{" "}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="createBrandBtn"
                  disabled={isSubmitting}
                >
                  Create brand
                </button>
              </Form>
            )}
          </Formik>
        </main>
      </div>
    </>
  );
};

export default CreateNewBrand;
