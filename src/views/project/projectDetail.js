import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { GeneralServices } from "../../jwt/_services/General.services";
import {
  COMMENT_LISTING,
  PROJECT_DESIGNS,
  PROJECT_LISTING,
  PROJECT_STATUS_UPDATE,
} from "../../jwt/_services/axiousURL";

import { useEffect, useState } from "react";
import SideBar from "../../components/project/projectDetail/sideBar";
import ChatHistory from "../../components/project/projectDetail/chatHistory";
import SendMessage from "../../components/project/projectDetail/sendMessage";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProjectDetail = (props) => {
  const { id } = useParams();
  const projectId = id;

  const [projectState, setProjectState] = useState({
    project_id: "",
    title: "",
    brand_title: "",
    description: "",
    subcategory_title: "",
    attachments: [],
    status: "",
  });

  const [projectDesigns, setProjectDesigns] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const headerSettings = useSelector((state) => state.headerSettings);
  let chatPadding = "54px 0 0";
  if (headerSettings.accountPauseStatus == "Y") chatPadding = "94px 0 0";

  /**
   *
   * FUNCTTIONS STARTTING
   */

  const updateProjectStatus = (projectId) => {
    var helper = FormDataHelper();
    helper.append("project_id", projectId);
    helper.append("status", "Y");

    GeneralServices.postRequest(helper, PROJECT_STATUS_UPDATE).then(
      (successResp) => {
        fetchProject(projectId);
      },
      (errorResponse) => {
        console.log("failed to update the status");
      }
    );
  };

  const fetchProject = (projectId) => {
    var helper = FormDataHelper();
    helper.append("project_id", projectId);

    GeneralServices.postRequest(helper, PROJECT_LISTING).then(
      (successResponse) => {
        var project = successResponse.data[0];
        setProjectState(project);
      },
      (errorResponse) => {}
    );
  };

  const fetchProjectComments = (projectId) => {
    var helper = FormDataHelper();
    helper.append("project_id", projectId);

    GeneralServices.postRequest(helper, COMMENT_LISTING).then(
      (successResponse) => {
        if (successResponse.data.length > 0) {
          setChatHistory([...chatHistory, ...successResponse.data]);
        }
      }
    );
  };

  const fetchProjectDesigns = (projectId) => {
    var helper = FormDataHelper();
    helper.append("project_id", projectId);

    GeneralServices.postRequest(helper, PROJECT_DESIGNS).then(
      (successResponse) => {
        if (successResponse.data.length > 0) {
          setProjectDesigns(successResponse.data);
        }
      }
    );
  };

  const sendMessageHandler = (message) => {
    setChatHistory([...chatHistory, message]);
  };

  useEffect(() => {
    fetchProject(projectId);
    fetchProjectDesigns(projectId);
    fetchProjectComments(projectId);
  }, [projectId]);

  return (
    <>
      <section className="chat" style={{ padding: chatPadding }}>
        <main className="cont">
          <div className="chatCont">
            <main>
              <SideBar
                projectState={projectState}
                projectDesigns={projectDesigns}
                projectId={projectId}
                updateProjectStatus={updateProjectStatus}
                props={props}
              />
              <div className="message">
                <ChatHistory
                  chatHistory={chatHistory}
                  projectId={projectId}
                  props={props}
                />
                <SendMessage
                  projectId={projectId}
                  sendMessageHandler={sendMessageHandler}
                />
              </div>
            </main>
          </div>
        </main>
      </section>
    </>
  );
};

export default ProjectDetail;
