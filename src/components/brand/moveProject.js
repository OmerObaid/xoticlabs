import crossIcon from "../../assets/images/new-brand-icons/cross-sign.png";
import moveAndSwitchIcon from "../../assets/images/move-project-icons/icon Move and switch projects.png";
import checkCircleIcon from "../../assets/images/check circle.png";
import { useEffect, useState } from "react";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { GeneralServices } from "../../jwt/_services/General.services";
import {
  CLIENT_ALLOWED_PROJECTS,
  PROJECT_LISTING,
} from "../../jwt/_services/axiousURL";
import { getClientId } from "../../helper/siteHelper";
import { Link } from "react-router-dom";

const MoveProject = ({ closeOverlay }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [showSelectProjectError, setShowSelectProjectError] = useState(false);
  const [allActiveProjects, setAllActiveProjects] = useState([]);
  const [allowedProjectsCount, setAllowedProjectsCount] = useState(0);

  const handleSwitchClick = () => {
    if (selectedProjectId === 0) {
      setShowSelectProjectError(true);
      return;
    }
    closeOverlay(selectedProjectId);
  };

  const handleRadioButtonSelect = (event) => {
    setSelectedProjectId(event.target.value);
  };

  const fetchAllActiveProjects = () => {
    var helper = FormDataHelper();
    helper.append("status", "I");
    helper.append("client_id", getClientId());

    GeneralServices.postRequest(helper, PROJECT_LISTING).then(
      (successResponse) => {
        let allActiveProjects = successResponse.data;
        setAllActiveProjects(allActiveProjects);
      },
      (errorResponse) => {
        setAllActiveProjects([]);
      }
    );
  };

  const fetchUserAllowedProjects = (projectIdToMove) => {
    var helper = FormDataHelper();
    helper.append("client_id", getClientId());

    GeneralServices.postRequest(helper, CLIENT_ALLOWED_PROJECTS).then(
      (successResponse) => {
        if (
          successResponse.message_key == "successful_request" &&
          successResponse.data.length > 0
        ) {
          let allowedProjects = successResponse.data[0].active_task_allowed;
          setAllowedProjectsCount(allowedProjects);
        }
      },
      (errorResponse) => {
        console.log("failed to move task");
      }
    );
  };

  useEffect(() => {
    fetchAllActiveProjects();
    fetchUserAllowedProjects();
  }, []);

  return (
    <>
      <div className="moveOverLay active">
        <div className="move-switch">
          <img
            src={crossIcon}
            alt=""
            className="move-cross"
            onClick={() => closeOverlay(0)}
          />
          <div className="head">
            <img src={moveAndSwitchIcon} alt="" />
            <h2>Move and switch projects</h2>
          </div>
          <div className="body">
            {showSelectProjectError && (
              <div className={"alert alert-danger"}>
                {"Please select the project to switch with"}
              </div>
            )}
            <p>
              Your plan allows <span>{allowedProjectsCount}</span> active
              project(s). Choose an active project to switch with or{" "}
              <Link to="/company">
                <span>upgrade</span>
              </Link>{" "}
              to get higher output.
            </p>
            <p>Switch with this project:</p>

            {allActiveProjects.map((project) => {
              return (
                <div className="activeProject" key={project.project_id}>
                  <input
                    type="radio"
                    name="actProj"
                    id={`actProj${project.project_id}`}
                    value={project.project_id}
                    hidden
                    onClick={handleRadioButtonSelect}
                  />
                  <label htmlFor={`actProj${project.project_id}`}>
                    <img src={checkCircleIcon} alt="" />
                  </label>
                  <h3>{project.title}</h3>
                </div>
              );
            })}
            <p className="note">
              <span>Alert</span> : Only Active projects will be worked on. No
              designs or revisions will be submitted for projects in Queue.
            </p>
          </div>
          <div className="foot">
            <button type="button" onClick={() => closeOverlay(0)}>
              Cancel
            </button>

            {/* <button type="button" onClick={() => closeOverlay(0)}>
              Upgrade
            </button> */}
            <Link to="/company">Upgrade</Link>
            <button type="button" onClick={handleSwitchClick}>
              Switch
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoveProject;
