import { useEffect, useState } from "react";
import React from "react";
import Annotation from "react-image-annotation";
// import {  } from "react-image-annotation";
import img from "./images/p1.jpeg";
// import {
//   ADD_ANNOTATION,
//   ANNOTATION_COMMENT_DELETE,
// } from "../_services/axiousURL";
import ThreadedEditor from "./ThreadedEditor";
import ThreadedContent from "./ThreadedContent";
import BottomOptionsBar from "./bottomOptionsBar";

import clossIcon from "./images/close-icon.png";
import dotsIcon from "./images/dots-icon.png";
import downloadIcon from "./images/download-icon.png";
import editIcon from "./images/edit-icon.png";
import clockIcon from "./images/clock-icon.png";
import linkIcon from "./images/link-icon.png";
import { GeneralServices } from "../../jwt/_services/General.services";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import {
  ADD_ANNOTATION,
  ANNOTATION_COMMENT_DELETE,
  ANNOTATION_LISTING,
} from "../../jwt/_services/axiousURL";
import { useHistory } from "react-router-dom";
import {
  getClientFirstName,
  getClientId,
  getClientLastName,
} from "../../helper/siteHelper";

const ProjectImageAnnotation = (props) => {
  //   mainCommentId = 107;
  // const mainCommentId = props.history.location.state?.commentId;
  // const projectId = props.history.location.state?.projectId;
  // const imageUrl = props.history.location.state?.imageUrl;
  // const imageName = props.history.location.state?.imageName;

  const mainCommentId = localStorage.getItem("commentId");
  const projectId = localStorage.getItem("projectId");
  const imageUrl = localStorage.getItem("imageUrl");
  const imageName = localStorage.getItem("imageName");

  const [activeAnnotations, setActiveAnnotations] = useState([]);
  const [allAnnotations, setAllAnnotations] = useState([]);
  const [singleAnnotation, setSingleAnnotation] = useState({});
  const [selectorType, setSelectorType] = useState("RECTANGLE");
  const [hideAnnotations, setHideAnnotations] = useState(false);
  const [fakeAnnotations, setFakeAnnotations] = useState([]);
  const history = useHistory();

  const onChange = (annotation) => setSingleAnnotation(annotation);
  const onSubmit = (annotation) => addAnnotationApi(annotation);

  const addAnnotationApi = (annotation) => {
    let helper = FormDataHelper();
    helper.append("client_id", getClientId());
    helper.append("comment_id", mainCommentId);
    helper.append("geometry", JSON.stringify(annotation.geometry));
    helper.append("text", annotation.data.comments[0].text);

    GeneralServices.postRequest(helper, ADD_ANNOTATION).then(
      (successResponse) => {
        let data = successResponse.data;
        let commentId = data["annotation_comment_id"];
        let annotationId = data["annotation_id"];

        addAnnotation(annotation, commentId, annotationId);
      },
      (errorResponse) => {
        console.log("failed to add annotation.");
      }
    );
  };

  const addAnnotation = (annotation, commentId, annotationId) => {
    const { geometry, data } = annotation;
    annotation.data.comments[0].id = commentId;
    annotation.data.comments[0].client_firstname = getClientFirstName();
    annotation.data.comments[0].client_lastname = getClientLastName();
    annotation.data.comments[0].client_id = getClientId();
    setSingleAnnotation({});
    setAllAnnotations(
      allAnnotations.concat({ geometry, data: { ...data, id: annotationId } })
    );
  };

  const renderEditor = (props) => {
    const { geometry } = props.annotation;
    if (!geometry) return null;

    return <ThreadedEditor {...props} />;
  };

  const renderContent = ({ key, annotation }) => {
    return (
      <ThreadedContent
        key={key}
        annotation={annotation}
        annotations={allAnnotations}
        setAnnotations={(annotations) => setAllAnnotations(annotations)}
        onFocus={onFocus(key)}
        onBlur={onBlur(key)}
        onDelete={onDelete}
      />
    );
  };

  const onFocus = (id) => (e) => {
    setActiveAnnotations([...activeAnnotations, id]);
  };
  const onBlur = (id) => (e) => {
    const index = activeAnnotations.indexOf(id);
    setActiveAnnotations([
      ...activeAnnotations.slice(0, index),
      ...activeAnnotations.slice(index + 1),
    ]);
  };

  const onDelete = (annotationCommentId, annotation) =>
    onDeleteApi(annotationCommentId, annotation);

  const onDeleteApi = (annotationCommentId, annotation) => {
    let helper = FormDataHelper();
    helper.append("annotation_comment_id", annotationCommentId);

    GeneralServices.postRequest(helper, ANNOTATION_COMMENT_DELETE).then(
      (successResponse) => {
        let tmpAllAnnotations = [...allAnnotations];
        let allComments =
          tmpAllAnnotations[tmpAllAnnotations.indexOf(annotation)].data
            .comments;

        let tmpComment = allComments.filter((comment) => {
          return comment.id != annotationCommentId;
        });

        tmpAllAnnotations[tmpAllAnnotations.indexOf(annotation)].data.comments =
          tmpComment;

        setAllAnnotations(tmpAllAnnotations);
      },
      (errorResponse) => {}
    );
  };

  const activeAnnotationComparator = (a, b) => {
    return a.data.id === b;
  };

  const getAnnotations = () => {
    var helper = FormDataHelper();
    helper.append("comment_id", mainCommentId);
    GeneralServices.postRequest(helper, ANNOTATION_LISTING).then(
      (successResp) => {
        console.log("wow", successResp);
        let annotation;
        successResp.data.forEach((singleAnnotation) => {
          let geometry = JSON.parse(singleAnnotation.geometry);
          let id = singleAnnotation.id;
          let comments = singleAnnotation.annotation_comments;
          let data = { comments, id };
          annotation = { data: data, geometry };
          setAllAnnotations((prevState) => [...prevState, annotation]);
        });
      },
      (errResp) => {
        console.log(errResp);
      }
    );
  };

  useEffect(() => {
    getAnnotations();
  }, []);

  return (
    <>
      <div className="wrapper">
        <BottomOptionsBar
          handleRectangleClick={() => setSelectorType("RECTANGLE")}
          handleOvalClick={() => setSelectorType("OVAL")}
          handlePointClick={() => setSelectorType("POINT")}
          handleHideClick={() => {
            setHideAnnotations(!hideAnnotations);
          }}
        />

        {/* HEADER START */}
        <div className="header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="media">
                  <div className="header-left">
                    <div className="heading">
                      <h2>{imageName}</h2>
                      {/* <p>Deleting brand popup window is wrong</p> */}
                    </div>
                  </div>
                  <div className="header-right">
                    <ul>
                      <li
                        onClick={() => history.goBack()}
                        style={{ cursor: "pointer" }}
                      >
                        <img src={clossIcon} alt="" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* HEADER END */}
        <div className="brand-inner">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="image-holder">
                  <Annotation
                    src={imageUrl}
                    alt="Two pebbles anthropomorphized holding hands"
                    activeAnnotationComparator={activeAnnotationComparator}
                    activeAnnotations={activeAnnotations}
                    annotations={
                      hideAnnotations ? fakeAnnotations : allAnnotations
                    }
                    type={selectorType}
                    value={singleAnnotation}
                    renderEditor={renderEditor}
                    renderContent={renderContent}
                    onChange={onChange}
                    onSubmit={onSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectImageAnnotation;
