import profileImageIcon from "../../../assets/images/project-detail-page-icons/profile image.png";
import sendMessageIcon from "../../../assets/images/project-detail-page-icons/sendMsg.png";
import attachIcon from "../../../assets/images/project-detail-page-icons/attach file.png";
import { useRef, useState } from "react";
import {
  displayTime,
  getClientId,
  getClientName,
  getInitials,
} from "../../../helper/siteHelper";
import { FormDataHelper } from "../../../jwt/_helpers/FormDataHelper";
import { GeneralServices } from "../../../jwt/_services/General.services";
import {
  COMMENT_ADD,
  TEMP_IMAGE_UPLOAD,
} from "../../../jwt/_services/axiousURL";
import AttachedFile from "./attachedFile";
import Axios from "axios";
import swal from "sweetalert";

const SendMessage = ({ projectId, sendMessageHandler }) => {
  const [messageText, setMessageText] = useState("");
  const [attachedFile, setAttachedFile] = useState([]);
  const [progressValue, setProgressValue] = useState(0);
  const [axiosSource, setAxiosSource] = useState(() => {});
  const [tempImageData, setTempImageData] = useState({
    url: "",
    name: "",
  });

  const fileRef = useRef();

  /**
   *
   * FUNCTIONS
   */

  const fileAttached = (e) => {
    const fileSize = e.target.files[0].size / 1024 / 1024;
    if (fileSize > 100) {
      swal("Image size can not be greator than 100MB", {
        icon: "error",
      });
      fileRef.current.value = "";
      return;
    }
    setAttachedFile(e.target.files);
    uploadTempFileApi(e.target.files[0]);
  };

  const handleRemoveImage = () => {
    setAttachedFile([]);
    axiosSource.cancel();
    setTempImageData({});
    fileRef.current.value = "";
  };

  const handleMessageSendClick = () => {
    if (messageText || (tempImageData.url && tempImageData.name))
      sendMessageApi();
  };

  const handleKeyDown = (event) => {
    if (event.shiftKey) return;
    if (event.keyCode === 13 || event.key === "Enter") {
      event.preventDefault();
      handleMessageSendClick();
    }
  };

  const sendMessageApi = () => {
    var helper = FormDataHelper();
    helper.append("project_id", projectId);
    helper.append("client_id", getClientId());
    helper.append("parent_id", 0);
    helper.append("comment", messageText);

    if (tempImageData.url) helper.append("path", tempImageData.url);
    if (tempImageData.name) helper.append("file_name", tempImageData.name);

    GeneralServices.postRequest(helper, COMMENT_ADD).then(
      (successResponse) => {
        if (successResponse.data.length > 0) {
          const comment = successResponse.data[0];
          sendMessageHandler(comment);
          setMessageText("");
          setAttachedFile([]);
          setTempImageData({});
          fileRef.current.value = "";
        }
      },
      (errorResponse) => {
        console.log("send message error: ", errorResponse);
      }
    );
  };

  const uploadTempFileApi = (file) => {
    const CancelToken = Axios.CancelToken;
    const source = CancelToken.source();
    setAxiosSource(source);
    var helper = FormDataHelper();
    helper.append("image", file);
    GeneralServices.postRequest(
      helper,
      TEMP_IMAGE_UPLOAD,
      handleProgress,
      source.token
    ).then(
      (successResponse) => {
        const res = successResponse.data;
        setTempImageData({
          ...tempImageData,
          url: res.image,
          name: res.file_name,
        });
      },
      (errorResponse) => {
        console.log("error: ", errorResponse);
      }
    );
  };

  const handleProgress = (progressEvent) => {
    const totalLength = progressEvent.lengthComputable
      ? progressEvent.total
      : progressEvent.target.getResponseHeader("content-length") ||
        progressEvent.target.getResponseHeader("x-decompressed-content-length");
    // console.log("onUploadProgress", totalLength);
    if (totalLength !== null) {
      // console.log(Math.round((progressEvent.loaded * 100) / totalLength));
      setProgressValue(Math.round((progressEvent.loaded * 100) / totalLength));
    }
  };

  /**
   * RENDER
   */

  return (
    <>
      {attachedFile.length > 0 && (
        <AttachedFile
          fileName={attachedFile[0].name}
          handleRemoveImage={handleRemoveImage}
          progressValue={progressValue}
        />
      )}
      <div
        className="message_single message_msgMake"
        style={{ padding: "0px !important" }}
      >
        <div className="sender">
          {/* <img src={profileImageIcon} alt="" /> */}
          <p data-letters={getInitials(getClientName())} />
        </div>
        <div className="message_body">
          <textarea
            placeholder="Add comment..."
            type="text"
            className="msgInp scroll"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="icons">
            <img
              src={sendMessageIcon}
              onClick={handleMessageSendClick}
              alt=""
              style={{ cursor: "pointer" }}
            />
            <input
              type="file"
              hidden
              id="attachmennt"
              onChange={(e) => fileAttached(e)}
              accept=".png,.jpg,.jpeg"
              ref={fileRef}
            />
            <label htmlFor="attachmennt" style={{ cursor: "pointer" }}>
              <img src={attachIcon} alt="" />
            </label>
          </div>
        </div>
      </div>
      <button className="message_backButton">SHOW DETAILS</button>
    </>
  );
};

export default SendMessage;
