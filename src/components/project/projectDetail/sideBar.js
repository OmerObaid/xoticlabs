import backIcon from "../../../assets/images/create-project/backSymbol.png";
import waitingIcon from "../../../assets/images/brand-page-icons/waiting.png";
import gearIcon from "../../../assets/images/gear.png";
import checkCircle from "../../../assets/images/check circle white.png";

import { useHistory } from "react-router";
import swal from "sweetalert";
import { useState } from "react";
import ProjectDetailTabView from "./projectDetailTabView";
import DesignTabView from "./designTabView";
import ActiveProjectOptionMenu from "../activeProjectOptionMenu";

import Dropdown from "react-dropdown";
// https://reactjsexample.com/a-dead-simple-dropdown-component-for-react/
import "react-dropdown/style.css";
import { useEffect } from "react";
import { FormDataHelper } from "../../../jwt/_helpers/FormDataHelper";
import { GeneralServices } from "../../../jwt/_services/General.services";
import {
  PROJECT_UPDATE_WORKING_STATUS,
  PROJECT_WORKING_STATUSES,
} from "../../../jwt/_services/axiousURL";
import { ProjectWorkingStatuses } from "../../../enums/projectWorkingStatusEnum";
import { useSelector } from "react-redux";

const SideBar = ({
  projectState,
  projectDesigns,
  projectId,
  updateProjectStatus,
  props,
}) => {
  let history = useHistory();
  const [showDesignTab, setShowDesignTab] = useState(false);
  const [projectStatuses, setProjectStatuses] = useState([]);
  const [workingStatusesArray, setWorkingStatusesArray] = useState([]);
  const headerSettings = useSelector((state) => state.headerSettings);
  const [accountPaused, setAccountPaused] = useState(
    headerSettings.accountPauseStatus == "Y" ? true : false
  );
  const [currentHex, setCurrentHex] = useState("000000");
  let defaultOption = projectState.project_working_status_title; //options[0];

  const handleMarkCompleteClick = () => {
    swal({
      title: "Are you sure?",
      text: "You want to mark project complete?",
      icon: "warning",
      buttons: true,
      dangerMode: false,
    }).then((markComplete) => {
      if (markComplete) {
        updateProjectStatus(projectId);
      } else {
        console.log("User oppted to not delete the attachment");
      }
    });
  };

  const getButtonText = () => {
    if (projectState.status == "Y") return "Completed";
    else return "Mark as Complete";
  };

  const handleTabClick = (tabName) => {
    if (tabName == "design") setShowDesignTab(true);
    else setShowDesignTab(false);
  };

  const handleProjectWorkingStatusChange = (data) => {
    // console.log(data);
    // return;
    let id;
    let selectedStatus = workingStatusesArray.find((element) => {
      return element.title == data.label;
    });

    if (selectedStatus) id = selectedStatus.id;
    else return;

    setCurrentHex(selectedStatus.hex_number);
    var helper = FormDataHelper();
    helper.append("project_id", projectId);
    helper.append("project_working_status_id", id);

    GeneralServices.postRequest(helper, PROJECT_UPDATE_WORKING_STATUS).then(
      (SR) => {
        // defaultOption = data.label;
        fetchProjectWorkingStatuses();
        // setDefaultOption(data.label);
      },
      (ER) => {
        console.log(ER);
      }
    );
  };

  const fetchProjectWorkingStatuses = () => {
    var helper = FormDataHelper();
    helper.append("project_id", projectId);
    GeneralServices.postRequest(helper, PROJECT_WORKING_STATUSES).then(
      (SR) => {
        let statusesString = [];
        setWorkingStatusesArray(SR.data);
        SR.data.forEach((element) => {
          let option = {
            value: element.title,
            label: element.title,
            className: getClassName(element.id),
          };
          statusesString.push(option);
        });
        setProjectStatuses(statusesString);
      },
      (ER) => {
        console.log(ER);
      }
    );
  };

  const getClassName = (status) => {
    if (ProjectWorkingStatuses.AssignedToTeamNotStarted == status)
      return "dropdown-option-color-not-started";
    else if (ProjectWorkingStatuses.AssetOnHold == status)
      return "dropdown-option-color-hold";
    else if (ProjectWorkingStatuses.FirstDraftInDesign == status)
      return "dropdown-option-color-draft";
    else if (ProjectWorkingStatuses.AssetRevisions == status)
      return "dropdown-option-color-revision";
    else if (ProjectWorkingStatuses.ReadyForReview == status)
      return "dropdown-option-color-review";
    else if (ProjectWorkingStatuses.RequestCompleted == status)
      return "dropdown-option-color-complete";
  };

  useEffect(() => {
    fetchProjectWorkingStatuses();
  }, [defaultOption]);

  useEffect(() => {
    setCurrentHex(projectState.hex_number);
  }, [projectState]);

  return (
    <>
      <div className="people">
        <div onClick={() => history.goBack()} className="backText">
          <img src={backIcon} alt="backSymbol" />
          <span>Back</span>
        </div>
        {/* <div style={{ textAlign: "center" }} className="rev">
          Revision
          <img src={waitingIcon} alt="waiting" />
        </div> */}
        <div
          className="new_class"
          style={{ backgroundColor: `#${currentHex}` }}
        >
          <Dropdown
            options={projectStatuses}
            onChange={handleProjectWorkingStatusChange}
            className="status_drop_down"
            value={defaultOption}
            placeholder="Select an option"
            menuClassName="drop_down_menu"
            disabled={accountPaused ? true : false}
          />
        </div>
        <div className="people_body">
          <div className="people_body_head">
            <h2>{projectState.title}</h2>
            {/* <button className="option">
              <img src={gearIcon} alt="gear" />
              <span>Options</span> */}
            {/* <ActiveProjectOptionMenu
                projectId={projectId}
                updateProjects={null}
                props={props}
              /> */}
            {/* </button> */}
          </div>

          {!accountPaused && (
            <button onClick={handleMarkCompleteClick} className="markComp">
              <img src={checkCircle} alt="" />
              <span>{getButtonText()}</span>
            </button>
          )}
          <button className="markComp showChat">
            <span>Show Chat</span>
          </button>
          <div className="people_body_body">
            <ul>
              <li
                onClick={() => handleTabClick("details")}
                style={{ cursor: "pointer" }}
                className={`${!showDesignTab ? "active" : ""}`}
              >
                Details
              </li>
              <li
                onClick={() => handleTabClick("design")}
                style={{ cursor: "pointer" }}
                className={`${showDesignTab ? "active" : ""}`}
              >
                Designs
              </li>
            </ul>
            {!showDesignTab && (
              <ProjectDetailTabView projectState={projectState} />
            )}
            {showDesignTab && <DesignTabView projectDesigns={projectDesigns} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
