import checkCircle from "../../assets/images/check circle white.png";
import smileIcon from "../../assets/images/smile.png";

import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { PROJECT_LISTING } from "../../jwt/_services/axiousURL";
import { GeneralServices } from "../../jwt/_services/General.services";

const CompletedProjects = ({ filterText, props }) => {
  const { id } = useParams();

  const [completedProjects, setCompletedProjects] = useState([]);
  const [allCompletedProjects, setAllCompletedProjects] = useState([]);

  const handleProjectClick = (projectId) => {
    // const from = props.location.state || {
    //   pathname: "/project",
    //   state: {
    //     projectId: projectId,
    //   },
    // };
    // props.history.push(from);

    const { from } = props.location.state || {
      from: { pathname: `/projectDetail/${projectId}` },
    };
    props.history.push(from);
  };

  const fetchCompletedProjects = () => {
    var helper = FormDataHelper();
    helper.append("brand_id", id);
    helper.append("status", "Y");

    GeneralServices.postRequest(helper, PROJECT_LISTING).then(
      (successResponse) => {
        const projects = successResponse.data;
        setCompletedProjects(projects);
        setAllCompletedProjects(projects);
      },
      (errorResponse) => {
        setCompletedProjects([]);
        setAllCompletedProjects([]);
      }
    );
  };

  useEffect(() => {
    fetchCompletedProjects();
  }, [id]);

  useEffect(() => {
    if (filterText === "") {
      setCompletedProjects(allCompletedProjects);
    }

    setCompletedProjects(
      allCompletedProjects.filter((project) => {
        return project.title.includes(filterText);
      })
    );
  }, [filterText]);

  return (
    <>
      <div className="brandsBody productsBodyComplete">
        <div className="productList">
          {completedProjects.map((project) => {
            return (
              <div className="productList_single" key={project.project_id}>
                <div className="head">
                  <img
                    className="productList_image"
                    src={project.logo}
                    alt=""
                  />
                  <div className="productList_details">
                    <div className="heading">
                      <h2
                        style={{ cursor: "pointer" }}
                        onClick={() => handleProjectClick(project.project_id)}
                      >
                        {project.title}
                      </h2>
                      <div className="inProg">
                        <span>Completed</span> <img src={checkCircle} alt="" />
                      </div>
                    </div>
                  </div>
                  <button className="smile">
                    <img src={smileIcon} alt="" />
                  </button>
                </div>
                <div className="foot">
                  <div className="foot_single">
                    <h3>Created</h3>
                    <p>{project.created_datetime}</p>
                  </div>
                  <div className="foot_single">
                    <h3>Started</h3>
                    <p>{project.start_date}</p>
                  </div>
                  <div className="foot_single">
                    <h3>Completed</h3>
                    <p>{project.completion_date}</p>
                  </div>
                  <div className="foot_single">
                    <h3>Design Recieved</h3>
                    <p>{project.design_received}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CompletedProjects;
