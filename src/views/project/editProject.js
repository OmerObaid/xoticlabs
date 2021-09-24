import backIcon from "../../assets/images/create-project/backSymbol.png";

import SideNotes from "../../components/createProject/sideNotes";

import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CategorySearch from "../../components/createProject/categorySearch";
import {
  IMAGE_SPECIFICATIONS_LISTING,
  PROJECT_ADD,
  PROJECT_LISTING,
} from "../../jwt/_services/axiousURL";
import { useEffect, useState, useRef } from "react";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { GeneralServices } from "../../jwt/_services/General.services";
import FileDeliverables from "../../components/createProject/fileDeliverables";
import AssociatedBrand from "../../components/createProject/associatedBrand";
import Attachments from "../../components/createProject/attachments";
import CreateNewBrand from "../../components/brand/createNewBrand";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { setActiveBrandId } from "../../redux/headerSettings/Action";
import { useParams } from "react-router";

const EditProject = (props) => {
  let history = useHistory();
  const { id } = useParams();
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const [allImageSpecifications, setAllImageSpecifications] = useState([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const [filteredImgSpecs, setFilteredImgSpecs] = useState([]);
  const [showCreateBrand, setShowCreateBrand] = useState(false);
  const [shouldUpdateBrand, setShouldUpdateBrand] = useState(false);
  const [project, setProject] = useState({ title: "", description: "" });

  const fetchImageSpecificatins = () => {
    var helper = FormDataHelper();
    GeneralServices.postRequest(helper, IMAGE_SPECIFICATIONS_LISTING).then(
      (successResponse) => {
        var imageSpecs = successResponse.data;
        setAllImageSpecifications(imageSpecs);
      }
    );
  };

  /**
   *
   * @param {*} subCategoryId
   * Callback from Category Search component
   * Selected SubCategory ID is received
   */
  const setSelectedSubCategoryCallBack = (subCategoryId) => {
    setSelectedSubCategoryId(subCategoryId);
  };

  /**
   *
   * Callback from associated brand component
   * Create brand overlay show and scroll to create brand
   *
   */
  const showCreateBrandOverlayCallBack = () => {
    setShowCreateBrand(true);
    executeScroll();
  };

  /**
   * Scrolls to the view
   * @returns
   */
  const executeScroll = () =>
    scrollRef.current.scrollIntoView({ behavior: "smooth" });

  /**
   *
   * @param callFetchBrands
   * Callback from CreateBrandOverlay
   * if brand iis added callFetchBrands will be true
   * if brand is added notify associated brands to update their brands
   *
   */
  const closeCreateNewBrandOverlay = (callFetchBrands = false) => {
    setShowCreateBrand(false);
    if (callFetchBrands) setShouldUpdateBrand(true);
  };

  const fetchProject = () => {
    var helper = FormDataHelper();
    helper.append("project_id", id);

    GeneralServices.postRequest(helper, PROJECT_LISTING).then(
      (successResponse) => {
        var project = successResponse.data;
        if (project.length > 0) setProject(project[0]);
        console.log("edit project - ", project);
      }
    );
  };

  useEffect(() => {
    fetchImageSpecificatins();
  }, []);

  /**
   *
   * Use Effect for showing Image Specification Drop Down
   * This will call when user select the sub category
   *
   */
  useEffect(() => {
    if (selectedSubCategoryId === 0 || selectedSubCategoryId === "") {
      setFilteredImgSpecs([]);
      return;
    }

    if (allImageSpecifications.length < 1) {
      setFilteredImgSpecs([]);
      return;
    }

    var imgSpecs = allImageSpecifications.filter((singleImgSpec) =>
      singleImgSpec.sub_category_id == selectedSubCategoryId ? true : false
    );
    setFilteredImgSpecs(imgSpecs);
  }, [selectedSubCategoryId]);

  /**
   * USE EFFECT FOR FETCHING PROJECT DETAILS
   */

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <>
      <section className="cnp" ref={scrollRef}>
        {showCreateBrand && (
          <CreateNewBrand crossButtonCallBack={closeCreateNewBrandOverlay} />
        )}
        <div className="bg-black"></div>
        <main className="cont">
          <main className="inCont">
            <div onClick={() => history.goBack()} className="backText">
              <img src={backIcon} alt="backSymbol" />
              <span>Back</span>
            </div>
            <h1 className="cnp-head">Edit project</h1>

            <Formik
              enableReinitialize={true}
              initialValues={{
                title: project.title,
                subCategoryId: "",
                imageSpecification: "",
                description: project.description,
                deliverable: "",
                associatedBrand: project.brand_id,
                attachments: "",
              }}
              validationSchema={Yup.object().shape({
                title: Yup.string().required("Project title is required"),
                subCategoryId: Yup.number().required("Please select category"),
                imageSpecification: Yup.string(),
                description: Yup.string().min(1).max(150).required(),
                deliverable: Yup.string().required(
                  "Please Select File deliverables type "
                ),
                associatedBrand: Yup.string().required(
                  "Please Select brand of the project "
                ),
              })}
              onSubmit={(values, actions) => {
                var helper = FormDataHelper();

                helper.append("title", values.title);
                helper.append("sub_category_id", values.subCategoryId);
                helper.append(
                  "image_specfication_id",
                  values.imageSpecification
                );
                helper.append("description", values.description);
                helper.append("file_deliverable_id", values.deliverable);
                helper.append("brand_id", values.associatedBrand);

                if (
                  values.hasOwnProperty("attachments") != "" &&
                  values.attachments.length > 0
                ) {
                  for (var imageFile of values.attachments) {
                    helper.append("attachments[]", imageFile);
                  }
                }

                GeneralServices.postRequest(helper, PROJECT_ADD).then(
                  (successResponse) => {
                    swal("Project has created!", {
                      icon: "success",
                    });

                    dispatch(setActiveBrandId(values.associatedBrand));
                    const { from } = props.location.state || {
                      from: { pathname: `/brand/${values.associatedBrand}` },
                    };
                    props.history.push(from);
                  },
                  (error) => {
                    actions.setSubmitting(false);
                    actions.setStatus(error);
                  }
                );
                // return;
              }}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form name="parentForm">
                  <div className="inputField">
                    <label className="inputLabel" htmlFor="projTitle">
                      Project title
                    </label>
                    <br />
                    <Field
                      type="text"
                      className="input"
                      name="title"
                      id="projTitle"
                      placeholder="Roller Blading Monkey"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <CategorySearch
                    getSelectedSubCategoryId={setSelectedSubCategoryCallBack}
                    setFieldValue={setFieldValue}
                  >
                    <ErrorMessage
                      name="subCategoryId"
                      component="div"
                      className="invalid-feedback"
                    />
                  </CategorySearch>

                  {filteredImgSpecs.length > 0 && (
                    <div className="inputField">
                      <label className="inputLabel required" htmlFor="industry">
                        Image Specification
                      </label>
                      <br />
                      <div className="inputDiv">
                        <Field
                          as="select"
                          className="input"
                          name="imageSpecification"
                        >
                          <option value="">Select image specification</option>
                          {allImageSpecifications.map((imgSpec) => {
                            return (
                              <option key={imgSpec.id} value={imgSpec.id}>
                                {imgSpec.title}
                              </option>
                            );
                          })}
                        </Field>
                      </div>
                    </div>
                  )}

                  <div className="inputField description">
                    <label htmlFor="desc" className="inputLabel">
                      Description
                    </label>
                    <SideNotes />
                    <p className="format-inst">
                      Format your paragraphs and create checklists to make your
                      description easy to read and follow. Well written
                      instructions = better designs.
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
                  <Attachments setFieldValue={setFieldValue} />

                  <FileDeliverables>
                    <ErrorMessage
                      name="deliverable"
                      component="div"
                      className="invalid-feedback"
                    />
                  </FileDeliverables>
                  <AssociatedBrand
                    shouldUpdateBrand={shouldUpdateBrand}
                    showCreateBrandOverLay={showCreateBrandOverlayCallBack}
                    brand={values.associatedBrand}
                    setFieldValue={setFieldValue}
                  >
                    <ErrorMessage
                      name="associatedBrand"
                      component="div"
                      className="invalid-feedback"
                    />
                  </AssociatedBrand>
                  <button
                    className="createBrandBtn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Create Project
                  </button>
                </Form>
              )}
            </Formik>
          </main>
        </main>
      </section>
    </>
  );
};

export default EditProject;
