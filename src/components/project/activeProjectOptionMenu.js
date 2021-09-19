import deleteIcon from "../../assets/images/brand-listing-icon/icon Delete project.png";
import editIcon from "../../assets/images/brand-listing-icon/icon Edit project.png";
import checkCircle from "../../assets/images/check circle.png";
import duplicateProjectIcon from "../../assets/images/icon Duplicate project.png";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { PROJECT_STATUS_UPDATE } from "../../jwt/_services/axiousURL";
import { GeneralServices } from "../../jwt/_services/General.services";
import swal from "sweetalert";
import { PROJECT_MARKED_COMPLETED } from "../../views/constants";
import { OptionMenuHelper } from "./optionMenuHelper";

const ActiveProjectOptionMenu = ({ projectId, updateProjects, props }) => {
  const handleMarkAsCompleteClick = () => {
    var helper = FormDataHelper();
    helper.append("project_id", projectId);
    helper.append("status", "Y");

    GeneralServices.postRequest(helper, PROJECT_STATUS_UPDATE).then(
      (successResponse) => {
        swal(PROJECT_MARKED_COMPLETED, {
          icon: "success",
        });
        updateProjects();
      }
    );
  };

  const handleEditProjectClick = () => {
    const { from } = props.location.state || {
      from: { pathname: `/editProject/${projectId}` },
    };
    props.history.push(from);
  };

  return (
    <>
      <ul className="optionMenu">
        <h3>Options</h3>
        <li onClick={handleMarkAsCompleteClick}>
          <img src={checkCircle} alt="" />
          Mark as complete
        </li>
        <li className="disabled-buttons">
          <img src={duplicateProjectIcon} alt="" />
          Duplicate project
        </li>
        <li onClick={handleEditProjectClick}>
          <img src={editIcon} alt="" />
          Edit project
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

export default ActiveProjectOptionMenu;
