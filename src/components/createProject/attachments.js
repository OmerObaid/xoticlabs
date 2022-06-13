import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import { useState } from "react";
import uploadIcon from "../../assets/images/new-brand-icons/upload.png";
import AttachmentGuidlines from "../brand/attachmentGuidlines";

const Attachments = ({ setFieldValue, showGuideLines = false }) => {
  const [count, setCount] = useState(1);
  const [acceptedFilesState, setAcceptedFilesState] = useState([]);
  const handleFileUploadChange = (acceptedFiles) => {
    let tmp = [...acceptedFilesState];
    let pCount = count;
    acceptedFiles.forEach((element) => {
      let tmpObj = {
        id: pCount,
        file: element,
      };
      tmp.push(tmpObj);
      pCount++;
    });
    setCount(pCount);
    setAcceptedFilesState(tmp);
  };

  // const onDrop = handleChange;
  const onDrop = handleFileUploadChange;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleFileDelete = (fileId) => {
    let tmpArr = [...acceptedFilesState];
    tmpArr = tmpArr.filter((singleFile) => singleFile.id != fileId);
    setAcceptedFilesState(tmpArr);
  };

  useEffect(() => {
    let tmp = Array();
    acceptedFilesState.forEach((element) => tmp.push(element.file));
    setFieldValue("attachments", tmp);
  }, [acceptedFilesState]);

  return (
    <>
      <div className="inputField">
        <p className="inputLabel">Attachments</p>
        {showGuideLines && <AttachmentGuidlines />}
        <div {...getRootProps()}>
          <div className="attach-cont">
            <div>
              <input name="attachment" id="atch" hidden {...getInputProps()} />
            </div>
            <label>
              <img src={uploadIcon} alt="" /> Upload files
            </label>
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>
                Upload or drag & drop any images, files, or examples that may be
                helpful explaining your project here.
              </p>
            )}
          </div>
        </div>
        <div>
          <ul className="file-list">
            {acceptedFilesState.map((singleFile) => {
              return (
                <li key={singleFile.id}>
                  {singleFile.file.name}
                  <span
                    className="remove-list"
                    onClick={() => handleFileDelete(singleFile.id)}
                  >
                    X
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Attachments;
