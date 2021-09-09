import crossIcon from "../../assets/images/new-brand-icons/cross-sign.png";
import moveAndSwitchIcon from "../../assets/images/move-project-icons/icon Move and switch projects.png";
import checkCircleIcon from "../../assets/images/check circle.png";
import { useState } from "react";

const MoveProject = ({ projects, closeOverlay }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [showSelectProjectError, setShowSelectProjectError] = useState(false);

  const handleSwitchClick = () => {
    if (selectedProjectId === 0) {
      setShowSelectProjectError(true);
      return;
    }
    closeOverlay(selectedProjectId);
  };

  const handleRadioButtonSelect = (event) => {
    setSelectedProjectId(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <div className="moveOverLay active">
        <div className="move-switch">
          <img
            src={crossIcon}
            alt=""
            className="move-cross"
            onClick={closeOverlay}
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
              Your plan allows <span>1</span> active project(s). Choose an
              active project to switch with or <span>upgrade</span> to get
              higher output.
            </p>
            <p>Switch with this project:</p>

            {projects.map((project) => {
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
            <button type="button" onClick={closeOverlay}>
              Cancel
            </button>
            <button type="button" onClick={closeOverlay}>
              Upgrade
            </button>
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
