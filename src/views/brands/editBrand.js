import crossSignIcon from "../../assets/images/new-brand-icons/cross-sign.png";
import uploadIcon from "../../assets/images/new-brand-icons/upload.png";
import addNewColorIcon from "../../assets/images/new-brand-icons/add new color.png";
import fileAttachmentIcon from "../../assets/images/create-project/attach file.png";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import * as Yup from "yup";
// import ColorBox from "../colorBox";
import { useState, useEffect } from "react";
// import AttachmentGuidlines from "./attachmentGuidlines";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { AuthenticationService } from "../../jwt/_services";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { GeneralServices } from "../../jwt/_services/General.services";
import {
  BRANDS_LISTING,
  BRAND_DELETE_ATTACHMENT,
  BRAND_DELETE_GUIDELINE,
  BRAND_DELETE_LOGO,
  BRAND_UPDATE,
  COLOR_DELETE,
  INDUSTRIES_LISTING,
  LIST_DESIGN_OPTIONS,
  LIST_INDUSTRY_OPTIONS,
} from "../../jwt/_services/axiousURL";
import swal from "sweetalert";
import ColorBox from "../../components/colorBox";
import AttachmentGuidlines from "../../components/brand/attachmentGuidlines";
import OldAttachments from "../../components/project/oldAttachments";
import Attachments from "../../components/createProject/attachments";
import BrandDefinition from "../../components/brand/brandDefinition";

const EditBrand = ({ brandId, crossButtonCallBack }) => {
  const clientId = AuthenticationService.currentUserValue.id;

  const [colors, setColors] = useState([]);
  const [showColorBox, setShowColorBox] = useState(false);
  const [sohwLogoFileSelected, setSohwLogoFileSelected] = useState(false);
  const [showGuideFileSelected, setShowGuideFileSelected] = useState(false);
  const [showAttachmentFileSelected, setShowAttachmentFileSelected] =
    useState(false);
  const [attachmentCount, setAttachmentCount] = useState(0);
  const [industries, setIndustries] = useState([]);
  const [brandDetail, setBrandDetail] = useState({
    title: "",
    industry_id: 0,
    description: "",
    website: "",
    logo: "",
    colors: [],
    guidelines: "",
    attachments: [],
  });

  const [showBrandDetail, setShowBrandDetail] = useState(false);

  const closeColorBoxCallBack = ({ color }) => {
    setShowColorBox(false);
    if (!color) return;
    setColors([...colors, color.hex]);
  };

  const removeColor = (index) => {
    var colorId = getColorIdFromBrandData(colors[index]);

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteColorApi(colorId, index);
      } else {
        console.log("User oppted to not delete the color");
      }
    });
  };

  const getColorIdFromBrandData = (colorHex) => {
    const element = brandDetail.colors.find((element) => {
      return element.hex_code == colorHex;
    });
    if (element) return element.id;
    else return 0;
  };

  const deleteColorApi = (colorId, index) => {
    if (colorId == 0) {
      removeColorFromArrays(index, colorId);
      return;
    }
    var helper = FormDataHelper();
    helper.append("brand_color_id", colorId);
    GeneralServices.postRequest(helper, COLOR_DELETE).then(
      (successResponse) => {
        removeColorFromArrays(index);
      },
      (errorResponse) => {
        console.log("failed to delete the color:", errorResponse);
      }
    );
  };

  const removeColorFromArrays = (index, colorId) => {
    colors.splice(index, 1);
    setColors([...colors]);

    if (colorId != 0) {
      brandDetail.colors.forEach((singleColor, counter) => {
        if (singleColor.id == colorId) brandDetail.colors.splice(counter, 1);
      });
    }
  };

  const fetchIndustries = () => {
    var helper = FormDataHelper();
    GeneralServices.postRequest(helper, INDUSTRIES_LISTING).then(
      (successResponse) => {
        setIndustries(successResponse.data);
      }
    );
  };

  const fetchBrand = () => {
    var helper = FormDataHelper();
    helper.append("brand_id", brandId);

    GeneralServices.postRequest(helper, BRANDS_LISTING).then(
      (successResponse) => {
        var brand = successResponse.data;
        if (brand.length > 0) {
          if (brand[0]["requires"].length > 0) {
            var tmpRequires = Array();
            brand[0]["requires"].forEach((element) => {
              tmpRequires.push(element.id);
            });

            brand[0]["requires"] = tmpRequires;
          }

          if (brand[0]["defines"].length > 0) {
            var tmpDefines = Array();
            brand[0]["defines"].forEach((element) => {
              tmpDefines.push(element.id);
            });
            brand[0]["defines"] = tmpDefines;
          }

          setBrandDetail(brand[0]);
          setShowBrandDetail(true);
          brand[0].colors.forEach((mycolor) => {
            setColors((colors) => {
              return [...colors, mycolor.hex_code];
            });
          });
        }
      }
    );
  };

  const handleLogoDeletClick = (vlaues) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        vlaues.logo = "";
        deleteLogoApi();
      } else {
        console.log("User oppted to not delete the logo");
      }
    });
  };

  const deleteLogoApi = () => {
    var helper = FormDataHelper();
    helper.append("brand_id", brandId);

    GeneralServices.postRequest(helper, BRAND_DELETE_LOGO).then(
      (successResponse) => {
        setBrandDetail({ ...brandDetail, logo: "" });
      },
      (errorResponse) => {
        console.log("failed to delete logo in edit brand");
      }
    );
  };

  const handleGuidelineDeleteClick = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteGuidelineApi();
      } else {
        console.log("User oppted to not delete the logo");
      }
    });
  };

  const deleteGuidelineApi = () => {
    var helper = FormDataHelper();
    helper.append("brand_id", brandId);

    GeneralServices.postRequest(helper, BRAND_DELETE_GUIDELINE).then(
      (successResponse) => {
        setBrandDetail({ ...brandDetail, guidelines: "" });
      },
      (errorResponse) => {
        console.log("failed to delete logo in edit brand");
      }
    );
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  useEffect(() => {
    fetchBrand();
  }, [brandId]);

  if (showBrandDetail) {
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
            <h1 className="cnp-head">Edit brand</h1>
            <p className="cnp-para">
              A brands is a folder containing information and assets for anyone
              or anything that you need designs for regularly. Create a brand
              for clients, products, or use it to categorize and organize your
              design projects.
            </p>

            <Formik
              // enableReinitialize={true}
              initialValues={{
                brandName: brandDetail.title,
                // industry: brandDetail.industry_id,
                description: brandDetail.description,
                website: brandDetail.website,
                logo: brandDetail.logo,
                defines: brandDetail.defines,
                requires: brandDetail.requires,
              }}
              validationSchema={Yup.object().shape({
                brandName: Yup.string().required("Brand name is required"),
                // industry: Yup.number().required("Industry is required"),
                requires: Yup.array().min(
                  1,
                  "Please select at least one check box"
                ),
                defines: Yup.array().min(
                  1,
                  "Please select at least one check box"
                ),
                description: Yup.string().required(),
                logo: Yup.mixed().required("logo is required"),
              })}
              onSubmit={(values, actions) => {
                actions.setStatus();

                var helper = FormDataHelper();

                helper.append("client_id", clientId);
                helper.append("brand_id", brandId);
                helper.append("title", values.brandName);
                helper.append("defines", JSON.stringify(values.defines));
                helper.append("requires", JSON.stringify(values.requires));
                // helper.append("industry_id", values.industry);
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

                GeneralServices.postRequest(helper, BRAND_UPDATE).then(
                  (successResponse) => {
                    swal("Brand has updated!", {
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
              {({ isSubmitting, values, setFieldValue }) => (
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
                      name="brandName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  {/* <div className="inputField">
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
                  </div> */}

                  <div className="inputField">
                    <BrandDefinition
                      checkboxName={"defines"}
                      titleString="What best defines your industry?"
                      URL={LIST_INDUSTRY_OPTIONS}
                    >
                      <ErrorMessage
                        name="defines"
                        component="div"
                        className="invalid-feedback"
                      />
                    </BrandDefinition>
                    <br />
                  </div>

                  <div className="inputField">
                    <BrandDefinition
                      checkboxName={"requires"}
                      titleString="What do you want to create?"
                      URL={LIST_DESIGN_OPTIONS}
                    >
                      <ErrorMessage
                        name="requires"
                        component="div"
                        className="invalid-feedback"
                      />
                    </BrandDefinition>
                    <br />
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
                      data={values.description}
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
                    {brandDetail.logo != "" && (
                      <div
                        className="brand-logo-container"
                        style={{ textAlign: "center" }}
                      >
                        <img
                          className="brand-logo-img"
                          src={brandDetail.logo}
                        />
                        <img
                          onClick={() => handleLogoDeletClick(values)}
                          src={crossSignIcon}
                          className="brand-logo-cross-img"
                        />
                      </div>
                    )}
                    {brandDetail.logo == "" && (
                      <>
                        <p className="format-inst">Upload your brand logo.</p>
                        <input
                          type="file"
                          name="logo"
                          id="logo"
                          value={""}
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
                      </>
                    )}
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
                    {brandDetail.guidelines != "" && (
                      <div className="brandColors_single">
                        <div>
                          <img
                            src={fileAttachmentIcon}
                            className="attachment-img"
                          ></img>
                        </div>
                        <span className="hex">
                          <a
                            className="attachment-link"
                            href={brandDetail.guidelines}
                            download
                            target="_blank"
                          >
                            Brand guideline
                          </a>
                        </span>
                        <button
                          onClick={handleGuidelineDeleteClick}
                          type="button"
                          className="remove"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                    {brandDetail.guidelines == "" && (
                      <>
                        <p className="format-inst">
                          Upload your existing brand guideline if you have one.
                        </p>
                        <input
                          type="file"
                          name="guidelines"
                          id="brandGuide"
                          hidden
                          onChange={(event) => {
                            setFieldValue(
                              "guidelines",
                              event.currentTarget.files[0]
                            );
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
                      </>
                    )}
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
                  {/* <div className="inputField">
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
                </div> */}

                  <Attachments
                    setFieldValue={setFieldValue}
                    showGuideLines={true}
                  />

                  {brandDetail.attachments.length > 0 && (
                    <OldAttachments
                      attachmentsParam={brandDetail.attachments}
                      deleteURL={BRAND_DELETE_ATTACHMENT}
                    />
                  )}

                  <button
                    type="submit"
                    className="createBrandBtn"
                    disabled={isSubmitting}
                  >
                    Update brand
                  </button>
                </Form>
              )}
            </Formik>
          </main>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default EditBrand;
