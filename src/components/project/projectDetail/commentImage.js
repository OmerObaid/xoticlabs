import viewAllIcon from "../../../assets/images/project-detail-page-icons/viewAll.png";
import viewDesIcon from "../../../assets/images/project-detail-page-icons/viewDes.png";
import revisionIcon from "../../../assets/images/project-detail-page-icons/Revisions.png";
import downloadIcon from "../../../assets/images/project-detail-page-icons/download.png";
import shareIcon from "../../../assets/images/project-detail-page-icons/share.png";
import { downloadFile } from "../../../helper/siteHelper";

const CommentImage = ({
  imageUrl,
  imageName,
  commentId,
  revisions,
  designCount,
  projectId,
  userType,
  props,
}) => {
  const goToAnnotationPage = () => {
    localStorage.setItem("commentId", commentId);
    localStorage.setItem("projectId", projectId);
    localStorage.setItem("imageUrl", imageUrl);
    localStorage.setItem("imageName", imageName);

    const from = props.location.state || {
      pathname: "/comments/annotation",
      // state: {
      //   commentId: commentId,
      //   projectId: projectId,
      //   imageUrl: imageUrl,
      //   imageName: imageName,
      // },
    };
    props.history.push(from);
  };
  return (
    <>
      <div className="msgSTUFF">
        <div className="msgSTUFF_imgBox">
          <img className="actImage" src={imageUrl} alt="" />
          <div className="msgSTUFF_overlay"></div>
          <button onClick={goToAnnotationPage} className="viewbtn viewbtnDes">
            <img src={viewDesIcon} alt="" />
            <span>View design</span>
          </button>
          <button className="viewbtn viewbtnAll">
            <img src={viewAllIcon} alt="" />
            <span>1</span>
          </button>
        </div>
        {userType == "designer" && (
          <div className="msgSTUFF_fileTitle msgSTUFF_fileDetails">
            <h3 className="fileName">{imageName}</h3>
            <p className="fileInfo">Design {designCount}</p>
            <p className="fileInfo">
              {revisions == "0" ? `0 Revisions` : `Revision ${revisions}`}
            </p>
          </div>
        )}
        <div className="msgSTUFF_fileAction msgSTUFF_fileDetails">
          {/* <div className="fileAction" style={{ cursor: "pointer" }}>
            <img src={revisionIcon} alt="" />
            <p>Revisions</p>
          </div> */}
          {/* <div className="fileAction">
            <img src={shareIcon} alt="" />
            <p>Share</p>
          </div> */}
          <div
            className="fileAction"
            style={{ cursor: "pointer" }}
            onClick={() => downloadFile(imageUrl, imageName)}
          >
            <img src={downloadIcon} alt="" />
            <p>Download</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentImage;
