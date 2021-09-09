import waitingIcon from "../../assets/images/brand-page-icons/waiting.png";
import gearIcon from "../../assets/images/gear.png";

import { useState, useEffect } from "react";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import {
  PROJECT_LISTING,
  PROJECT_STATUS_UPDATE,
} from "../../jwt/_services/axiousURL";
import { GeneralServices } from "../../jwt/_services/General.services";
import { useParams } from "react-router";
import ActiveProjectOptionMenu from "../project/activeProjectOptionMenu";
import QueueProjectOptionMenu from "../project/queueProjectOptionMenu";
import MoveProject from "./moveProject";

const ActiveProjects = ({ filterText, ...props }) => {
  const { id } = useParams();

  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);

  const [queueProjects, setQueueProjects] = useState([]);
  const [allQueueProjects, setAllQueueProjects] = useState([]);

  const [showMoveToActiveOverlay, setShowMoveToActiveOverlay] = useState(false);
  const [projectIdToMoveActive, setProjectIdToMoveActive] = useState("");

  const fetchProjects = (projectStatus) => {
    var helper = FormDataHelper();
    helper.append("brand_id", id);
    helper.append("status", projectStatus);

    GeneralServices.postRequest(helper, PROJECT_LISTING).then(
      (successResponse) => {
        const projects = successResponse.data;
        if (projectStatus === "I") {
          setProjects(projects);
          setAllProjects(projects);
        } else {
          setQueueProjects(projects);
          setAllQueueProjects(projects);
        }
      },
      (errorResponse) => {
        if (projectStatus === "I") setProjects([]);
        else setQueueProjects([]);
      }
    );
  };

  // Active Option Menu CallBack
  // This function call when user mark project as complete
  const updateProjectListingCallBack = () => {
    fetchProjects("I");
    fetchProjects("Q");
  };

  // Show Move and Switch overlay callback
  // we get project id, on which project user tapped
  // Queue ooption Menu
  const showMoveToActiveOverlayCallBack = (projectId = "") => {
    console.log("MOTHERFUCKER", projectId);
    setProjectIdToMoveActive(projectId);
    setShowMoveToActiveOverlay(true);
  };

  // CallBack to close the Switch And Move Overlay
  // Optional Param Projectid, If user select the project he wants to switch

  const closeMoveToActiveOverlayCallBack = (projectId = "") => {
    if (projectId !== "" && projectIdToMoveActive !== "") {
      // update project status to active
      updateProjectStatus(projectId, "Q");
      updateProjectStatus(projectIdToMoveActive, "I");
    }

    setShowMoveToActiveOverlay(false);
  };

  const updateProjectStatus = (projectId, status) => {
    var helper = FormDataHelper();
    helper.append("project_id", projectId);
    helper.append("status", status);

    GeneralServices.postRequest(helper, PROJECT_STATUS_UPDATE).then(
      (successResponse) => {
        fetchProjects("I");
        fetchProjects("Q");
      },
      (errorResponse) => {}
    );
  };

  useEffect(() => {
    fetchProjects("I");
    fetchProjects("Q");
  }, [id]);

  useEffect(() => {
    if (filterText == "") {
      setProjects(allProjects);
      setQueueProjects(allQueueProjects);
    }

    setProjects(
      allProjects.filter((project) => {
        return project.title.includes(filterText);
      })
    );
    setQueueProjects(
      allQueueProjects.filter((project) => {
        return project.title.includes(filterText);
      })
    );
  }, [filterText]);

  return (
    <>
      <div className="brandsBody productsBody">
        <h4 className="productsBody_head">
          Active <span>({projects.length})</span>
        </h4>
        {projects.map((project) => {
          return (
            <div className="productList" key={project.project_id}>
              <div className="productList_single">
                <img
                  className="productList_image"
                  src={project.project_logo}
                  alt=""
                />
                <div className="productList_details">
                  <div className="heading">
                    <h2>{project.title}</h2>
                    <div className="inProg">
                      <span>In Progress</span> <img src={waitingIcon} alt="" />
                    </div>
                  </div>
                  <img
                    src="./images/project person.png"
                    alt=""
                    className="person"
                  />
                </div>
                <button className="option">
                  <img src={gearIcon} alt="" /> <span>Options</span>
                  <ActiveProjectOptionMenu
                    projectId={project.project_id}
                    updateProjects={updateProjectListingCallBack}
                  />
                </button>
              </div>
            </div>
          );
        })}
        <h4 className="productsBody_head">
          Queue <span>({queueProjects.length})</span>
        </h4>
        {queueProjects.map((project) => {
          return (
            <div className="productList_single" key={project.project_id}>
              <div className="productList_details">
                <div className="heading">
                  <h2>{project.title}</h2>
                </div>
              </div>
              <button className="option">
                <img src={gearIcon} alt="" /> <span>Options</span>
                <QueueProjectOptionMenu
                  projectId={project.project_id}
                  showMoveToActive={showMoveToActiveOverlayCallBack}
                  updateProjects={updateProjectListingCallBack}
                />
              </button>
            </div>
          );
        })}
        {showMoveToActiveOverlay && (
          <MoveProject
            projects={allProjects}
            closeOverlay={closeMoveToActiveOverlayCallBack}
          />
        )}
      </div>
    </>
  );
};

export default ActiveProjects;
