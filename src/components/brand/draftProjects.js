import moveToActiveIcon from "../../assets/images/icon Move to active.png";
import gearIcon from "../../assets/images/gear.png";

import { useState, useEffect } from "react";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import {
  CLIENT_ALLOWED_PROJECTS,
  PROJECT_LISTING,
  PROJECT_STATUS_UPDATE,
} from "../../jwt/_services/axiousURL";
import { GeneralServices } from "../../jwt/_services/General.services";
import { useParams } from "react-router";
import { OptionMenuHelper } from "../project/optionMenuHelper";
import duplicateProjectIcon from "../../assets/images/icon Duplicate project.png";
import editIcon from "../../assets/images/brand-listing-icon/icon Edit project.png";
import deleteIcon from "../../assets/images/brand-listing-icon/icon Delete project.png";
import MoveProject from "./moveProject";
import { getClientId } from "../../helper/siteHelper";
import { isAccountPaused } from "../../helper/accountHelper";
import { useSelector } from "react-redux";

const DraftProjects = ({ filterText, props }) => {
  const { id } = useParams();

  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [showMoveToActiveOverlay, setShowMoveToActiveOverlay] = useState(false);
  const [projectIdToMoveActive, setProjectIdToMoveActive] = useState("");
  const headerSettings = useSelector((state) => state.headerSettings);

  const fetchProjects = (projectStatus) => {
    var helper = FormDataHelper();
    helper.append("brand_id", id);
    helper.append("status", projectStatus);

    GeneralServices.postRequest(helper, PROJECT_LISTING).then(
      (successResponse) => {
        const projects = successResponse.data;
        if (projectStatus === "D") {
          setProjects(projects);
          setAllProjects(projects);
        }
      },
      (errorResponse) => {
        setProjects([]);
      }
    );
  };

  const updateProjectsCallBack = () => {
    fetchProjects("D");
  };

  const closeMoveToActiveOverlayCallBack = (projectId = "") => {
    if (projectId !== "" && projectIdToMoveActive !== "" && projectId !== 0) {
      // update project status to active
      updateProjectStatus(projectId, "D");
      updateProjectStatus(projectIdToMoveActive, "I");
    }

    setShowMoveToActiveOverlay(false);
  };

  const handleProjectClick = (projectId) => {
    const { from } = props.location.state || {
      from: { pathname: `/projectDetail/${projectId}` },
    };
    props.history.push(from);
  };

  const updateProjectStatus = (projectId, status) => {
    var helper = FormDataHelper();
    helper.append("project_id", projectId);
    helper.append("status", status);

    GeneralServices.postRequest(helper, PROJECT_STATUS_UPDATE).then(
      (successResponse) => {
        fetchProjects("D");
      }
    );
  };

  const showMoveToActive = (projectId = "") => {
    setProjectIdToMoveActive(projectId);
    fetchUserAllowedProjects(projectId);
    // setShowMoveToActiveOverlay(true);
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
          let currentlyActiveProjects =
            successResponse.data[0].Current_projects_in_Queue;

          if (currentlyActiveProjects >= allowedProjects) {
            setShowMoveToActiveOverlay(true);
          } else if (currentlyActiveProjects < allowedProjects) {
            updateProjectStatus(projectIdToMove, "I");
          }
        }
      },
      (errorResponse) => {
        console.log("failed to move task");
      }
    );
  };

  useEffect(() => {
    fetchProjects("D");
  }, [id]);

  useEffect(() => {
    if (filterText === "") {
      setProjects(allProjects);
    }

    setProjects(
      allProjects.filter((project) => {
        return project.title.includes(filterText);
      })
    );
  }, [filterText]);

  return (
    <>
      <div className="brandsBody productsBody">
        <h4 className="productsBody_head">
          Drafts <span>({projects.length})</span>
        </h4>
        {projects.map((project) => {
          return (
            <div className="productList" key={project.project_id}>
              <div className="productList_single">
                <img className="productList_image" src={project.logo} alt="" />
                <div className="productList_details">
                  <div className="heading">
                    <h2
                      style={{ cursor: "pointer" }}
                      onClick={() => handleProjectClick(project.project_id)}
                    >
                      {project.title}
                    </h2>
                  </div>
                  <img
                    src="./images/project person.png"
                    alt=""
                    className="person"
                  />
                </div>
                {!isAccountPaused(headerSettings) && (
                  <button className="option">
                    <img src={gearIcon} alt="" /> <span>Options</span>
                    <ul className="optionMenu">
                      <h3>Options</h3>
                      <li
                        onClick={() => {
                          OptionMenuHelper.handleDuplicateProjectClick(
                            project.project_id,
                            props
                          );
                        }}
                      >
                        <img src={duplicateProjectIcon} alt="" />
                        Duplicate project
                      </li>
                      <li
                        onClick={() => {
                          OptionMenuHelper.handleEditProjectClick(
                            project.project_id,
                            props
                          );
                        }}
                      >
                        <img src={editIcon} alt="" />
                        Edit project
                      </li>
                      <li
                        onClick={() => showMoveToActive(project.project_id)}
                        className="mta"
                      >
                        <img src={moveToActiveIcon} alt="" />
                        Move to active
                      </li>
                      <li
                        onClick={() =>
                          OptionMenuHelper.updateProjectStatus(
                            project.project_id,
                            "Q",
                            "Project moved to Queue successfully",
                            () => fetchProjects("D")
                          )
                        }
                      >
                        <img src={moveToActiveIcon} alt="" />
                        Move to Queue
                      </li>
                      <li
                        onClick={() =>
                          OptionMenuHelper.deleteProject(
                            project.project_id,
                            updateProjectsCallBack
                          )
                        }
                      >
                        <img src={deleteIcon} alt="" />
                        Delete project
                      </li>
                    </ul>
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {showMoveToActiveOverlay && (
          <MoveProject closeOverlay={closeMoveToActiveOverlayCallBack} />
        )}
      </div>
    </>
  );
};

export default DraftProjects;
