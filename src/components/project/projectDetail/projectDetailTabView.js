import brandGrayIcon from "../../../assets/images/project-detail-page-icons/brand-icon-gray.png";

const ProjectDetailTabView = ({ projectState }) => {
  return (
    <>
      <div className="inSider">
        <h3>Project Details</h3>
        <div className="inSider_details">
          <h4>Type</h4>
          <p>{projectState.subcategory_title}</p>
        </div>
        <div className="inSider_details">
          <h4>Brand</h4>
          <div className="inSider_brand">
            <img src={brandGrayIcon} alt="" />
            <p>{projectState.brand_title}</p>
          </div>
        </div>
        <div className="inSider_details">
          <h4>Description</h4>
          <div dangerouslySetInnerHTML={{ __html: projectState.description }} />
        </div>
        <div className="inSider_details">
          <h4>Files & attachments</h4>
          <div className="inSider_attach">
            {projectState.attachments.length > 0 &&
              projectState.attachments.map((singleAttachment) => {
                return (
                  <div
                    key={singleAttachment.id}
                    className="inSider_attach_single"
                  >
                    <img src={brandGrayIcon} alt="" />
                    <a
                      href={singleAttachment.attachment}
                      download
                      target="_blank"
                    >
                      <p>{singleAttachment.file_name}</p>
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailTabView;
