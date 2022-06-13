import React, { Component } from "react";
import styled from "styled-components";
// import { helper } from "../helper";
// import { ADD_COMMENT_TO_ANNOTATION } from "../_services/axiousURL";
// import { FormDataHelper } from "../_services/FormDataHelper";
// import { GeneralServices } from "../_services/General.services";
import TextEditor from "./TextEditor";
import "./css/annotationStyle.css";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { GeneralServices } from "../../jwt/_services/General.services";
import { ADD_COMMENT_TO_ANNOTATION } from "../../jwt/_services/axiousURL";
import {
  getClientFirstName,
  getClientId,
  getClientLastName,
  getInitials,
  getUserName,
} from "../../helper/siteHelper";

const Comment = styled.div`
  border-bottom: 1px solid whitesmoke;
  padding: 8px 16px;
`;

const CommentDescription = styled.div`
  margin: 10px 0;
`;

const UserPill = styled.span`
  background-color: #2fb3c6;
  border-radius: 4px;
  color: white;
  padding: 2px 4px;
  font-size: 13.5px;
`;

const Content = styled.div`
  background: white;
  border-radius: 2px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  margin: 8px 0;
`;

const ContentClearanceTop = styled.div`
  position: absolute;
  height: 8px;
  top: -8px;
  left: -17px;
  right: -17px;
`;

const ContentClearanceLeft = styled.div`
  position: absolute;
  height: 100%;
  left: -17px;
  width: 20px;
`;

const ContentClearanceRight = styled.div`
  position: absolute;
  height: 100%;
  right: 0px;
  width: 20px;
`;

class ThreadedContent extends Component {
  state = {
    editorText: "",
  };

  onUpdateEditorText = (e) => {
    this.setState({ editorText: e.target.value });
  };

  renderComment(comment, annotation, onDelete) {
    return (
      // <Comment key={comment.id}>
      //   {comment.text}
      //   <button onClick={() => onDelete(comment.id, annotation)}>X</button>
      //   <CommentDescription>
      //     <UserPill>{helper.getUserName(comment)}</UserPill>
      //   </CommentDescription>
      // </Comment>

      <div className="client-modal-box" key={comment.id}>
        <div className="image-holder">
          {getInitials(getUserName(comment))}
          {/* <p data-letters={getInitials(getUserName(comment))} /> */}
        </div>
        <div className="text-box">
          <h4>
            {getUserName(comment)}
            {/* <span>5 mint ago </span> */}
            {/* <button
              style={{ marginLeft: "30px", backgroundColor: "transparent" }}
              onClick={() => onDelete(comment.id, annotation)}
            >
              x
            </button> */}
          </h4>
          <p>{comment.text}</p>
        </div>
      </div>
    );
  }

  addAnnotationCommentAPI(commentText, annotation, comments) {
    var helper = FormDataHelper();
    helper.append("client_id", getClientId());
    helper.append("text", commentText);
    helper.append("annotation_id", annotation.data.id);
    GeneralServices.postRequest(helper, ADD_COMMENT_TO_ANNOTATION).then(
      (successResponse) => {
        let annotationCommentId = successResponse.data.annotation_comment_id;

        const annotationIndex = this.props.annotations.indexOf(annotation);
        const annotations = this.props.annotations.map((annotation, i) =>
          i === annotationIndex
            ? {
                ...annotation,
                data: {
                  ...annotation.data,
                  comments: [
                    ...comments,
                    {
                      id: annotationCommentId,
                      text: commentText,
                      client_id: getClientId(),
                      client_firstname: getClientFirstName(),
                      client_lastname: getClientLastName(),
                    },
                  ],
                },
              }
            : annotation
        );

        this.setState({ editorText: "" });
        this.props.setAnnotations(annotations);
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  render() {
    const { props } = this;
    const { annotation } = props;
    const { geometry } = annotation;
    const comments = annotation.data && annotation.data.comments;

    return (
      <React.Fragment>
        <div
          key={props.annotation.data.id}
          style={{
            position: "absolute",
            left: `${geometry.x}%`,
            top: `${geometry.y + geometry.height}%`,
            zIndex: "40001",
          }}
        >
          <div className="modal-content">
            <div className="modal-body">
              <div className="modal-body-inner">
                {/* <Content
          key={props.annotation.data.id}
          style={{
            position: "absolute",
            left: `${geometry.x}%`,
            top: `${geometry.y + geometry.height}%`,
          }}
        > */}
                {/* <ContentClearanceTop />
          <ContentClearanceLeft />
          <ContentClearanceRight /> */}
                {comments &&
                  comments.map((comment) =>
                    this.renderComment(comment, annotation, this.props.onDelete)
                  )}
                <TextEditor
                  value={this.state.editorText}
                  onChange={this.onUpdateEditorText}
                  onBlur={props.onBlur}
                  onFocus={props.onFocus}
                  onSubmit={(e) => {
                    console.log("i am called i think for adding comment");
                    this.addAnnotationCommentAPI(
                      this.state.editorText,
                      annotation,
                      comments
                    );
                  }}
                />
                {/* </Content> */}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ThreadedContent;
