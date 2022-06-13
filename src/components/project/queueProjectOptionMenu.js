import deleteIcon from "../../assets/images/brand-listing-icon/icon Delete project.png";
import editIcon from "../../assets/images/brand-listing-icon/icon Edit project.png";
import checkCircle from "../../assets/images/check circle.png";
import moveToActiveIcon from "../../assets/images/icon Move to active.png";
import duplicateProjectIcon from "../../assets/images/icon Duplicate project.png";
import { OptionMenuHelper } from "./optionMenuHelper";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { GeneralServices } from "../../jwt/_services/General.services";
import { PROJECT_STATUS_UPDATE } from "../../jwt/_services/axiousURL";
import swal from "sweetalert";

const QueueProjectOptionMenu = ({
  projectId,
  showMoveToActive,
  updateProjects,
  props,
}) => {
  const handleEditProjectClick = () => {
    const { from } = props.location.state || {
      from: { pathname: `/editProject/${projectId}` },
    };
    props.history.push(from);
  };

  const handleDuplicateProjectClick = () => {
    const { from } = props.location.state || {
      from: { pathname: `/duplicateProject/${projectId}` },
    };
    props.history.push(from);
  };

  const handleMoveToDraftsClick = () => {
    var helper = FormDataHelper();
    helper.append("project_id", projectId);
    helper.append("status", "D");

    GeneralServices.postRequest(helper, PROJECT_STATUS_UPDATE).then(
      (successResponse) => {
        swal("Project Moved to Drafts", {
          icon: "success",
        });
        updateProjects();
      }
    );
  };

  return (
    <>
      <ul className="optionMenu">
        <h3>Options</h3>
        <li
          onClick={() =>
            OptionMenuHelper.markProjectComplete(projectId, updateProjects)
          }
        >
          <img src={checkCircle} alt="" />
          Mark as complete
        </li>
        <li onClick={handleDuplicateProjectClick}>
          <img src={duplicateProjectIcon} alt="" />
          Duplicate project
        </li>
        <li onClick={() => showMoveToActive(projectId)} className="mta">
          <img src={moveToActiveIcon} alt="" />
          Move to active
        </li>
        <li onClick={handleEditProjectClick}>
          <img src={editIcon} alt="" />
          Edit project
        </li>
        <li onClick={handleMoveToDraftsClick}>
          <img src={moveToActiveIcon} alt="" />
          Move to Drafts
        </li>
        <li
          onClick={() =>
            OptionMenuHelper.deleteProject(projectId, updateProjects)
          }
        >
          <img src={deleteIcon} alt="" />
          Delete project
        </li>
      </ul>
    </>
  );
};

export default QueueProjectOptionMenu;
