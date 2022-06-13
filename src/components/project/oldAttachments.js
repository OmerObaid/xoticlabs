import crossSignIcon from "../../assets/images/new-brand-icons/cross-sign.png";
import fileAttachmentIcon from "../../assets/images/create-project/attach file.png";
import { PROJECT_ATTACHMENT_DELETE } from "../../jwt/_services/axiousURL";
import swal from "sweetalert";
import { GeneralServices } from "../../jwt/_services/General.services";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { useState } from "react";

const OldAttachments = ({
  attachmentsParam,
  deleteURL = PROJECT_ATTACHMENT_DELETE,
}) => {
  const [attachments, setAttachments] = useState(attachmentsParam);
  const handleDeleteClick = (attachmentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        var helper = FormDataHelper();
        if (deleteURL == PROJECT_ATTACHMENT_DELETE)
          helper.append("attachment_id", attachmentId);
        else helper.append("id", attachmentId);

        GeneralServices.postRequest(helper, deleteURL).then(
          (successResponse) => {
            swal(successResponse.message, {
              icon: "success",
            });
            updateAttachments(attachmentId);
          }
        );
      } else {
        console.log("User oppted to not delete the attachment");
      }
    });
  };

  const updateAttachments = (attachmentId) => {
    var newAttachments = attachments.filter((singleAttachment) => {
      return singleAttachment.id != attachmentId;
    });

    setAttachments([...newAttachments]);
  };

  if (attachments.length > 0) {
    return (
      <>
        <div className="old-attachmennt-cnt">
          {attachments.map((singleAttachment) => {
            return (
              <div className="item" key={singleAttachment.id}>
                <img src={fileAttachmentIcon} className="attachment-img"></img>
                <a
                  className="attachment-link"
                  href={
                    deleteURL == PROJECT_ATTACHMENT_DELETE
                      ? singleAttachment.attachment
                      : singleAttachment.url
                  }
                  download
                  target="_blank"
                >
                  {singleAttachment.file_name
                    ? singleAttachment.file_name
                    : "Attachment"}
                </a>
                <img
                  src={crossSignIcon}
                  onClick={() => handleDeleteClick(singleAttachment.id)}
                  className="attachment-img last pointer"
                ></img>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default OldAttachments;
