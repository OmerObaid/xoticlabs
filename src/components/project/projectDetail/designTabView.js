import brandGrayIcon from "../../../assets/images/project-detail-page-icons/brand-icon-gray.png";

const DesignTabView = ({ projectDesigns }) => {
  console.log(projectDesigns);
  return (
    <>
      <div className="inSider">
        <h3>Project Designs</h3>
        <div className="inSider_details">
          {/* <h4>Files & attachments</h4> */}
          <div className="inSider_attach">
            {projectDesigns.length > 0 &&
              projectDesigns.map((singleAttachment) => {
                return (
                  <div
                    key={singleAttachment.id}
                    className="inSider_attach_single"
                  >
                    <img src={brandGrayIcon} alt="" />
                    <a href={singleAttachment.image} download target="_blank">
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

export default DesignTabView;
