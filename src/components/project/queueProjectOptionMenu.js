import deleteIcon from "../../assets/images/brand-listing-icon/icon Delete project.png";
import editIcon from "../../assets/images/brand-listing-icon/icon Edit project.png";
import checkCircle from "../../assets/images/check circle.png";
import moveToActiveIcon from "../../assets/images/icon Move to active.png";
import duplicateProjectIcon from "../../assets/images/icon Duplicate project.png";
import { OptionMenuHelper } from "./optionMenuHelper";

const QueueProjectOptionMenu = ({
  projectId,
  showMoveToActive,
  updateProjects,
}) => {
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
        <li className="disabled-buttons">
          <img src={duplicateProjectIcon} alt="" />
          Duplicate project
        </li>
        <li onClick={() => showMoveToActive(projectId)} className="mta">
          <img src={moveToActiveIcon} alt="" />
          Move to active
        </li>
        <li className="disabled-buttons">
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

export default QueueProjectOptionMenu;
