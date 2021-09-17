import { useState } from "react";
import uploadIcon from "../../assets/images/new-brand-icons/upload.png";

const Attachments = ({ setFieldValue }) => {
  const [showAttachmentFileSelected, setShowAttachmentFileSelected] =
    useState(false);
  const [attachmentCount, setAttachmentCount] = useState(0);

  return (
    <>
      <div className="inputField">
        <p className="inputLabel">Attachments</p>
        <div className="attach-cont">
          <input
            type="file"
            name="attachment"
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
            <img src={uploadIcon} alt="" /> Upload files
          </label>
          <p>
            Upload or drag & drop any images, files, or examples that may be
            helpful explaining your project here.
            {showAttachmentFileSelected && (
              <span style={{ color: "#4ba893" }}>
                {" "}
                {`${attachmentCount} file(s) selected`}{" "}
              </span>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Attachments;
