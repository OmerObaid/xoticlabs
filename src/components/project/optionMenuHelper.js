import swal from "sweetalert";
import { FormDataHelper } from "../../jwt/_helpers/FormDataHelper";
import { PROJECT_STATUS_UPDATE } from "../../jwt/_services/axiousURL";
import { GeneralServices } from "../../jwt/_services/General.services";
import {
  PROJECT_DELETED,
  PROJECT_MARKED_COMPLETED,
} from "../../views/constants";

export const OptionMenuHelper = {
  markProjectComplete,
  deleteProject,
  updateProjectStatus,
  handleDuplicateProjectClick,
  handleEditProjectClick,
};

function markProjectComplete(projectId, updateProjects) {
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
}

/**
 *
 * @param {String} projectId id of the project
 * @param {CallableFunction} updateProjects executes on success
 */

function deleteProject(projectId, updateProjects) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      var helper = FormDataHelper();
      helper.append("project_id", projectId);
      helper.append("status", "N");

      GeneralServices.postRequest(helper, PROJECT_STATUS_UPDATE).then(
        (successResponse) => {
          swal(PROJECT_DELETED, {
            icon: "success",
          });
          updateProjects();
        }
      );
    } else {
      console.log("User oppted to not delete the project");
    }
  });
}

/**
 * Updates the status of the project
 * @param {String} projectId Id of the project you want to update status
 * @param {String} status to which status you want to update
 * @param {String} successMessage the message when project status updated
 * @param {CallableFunction} updateProjects function executes when status updated successfully
 */

function updateProjectStatus(
  projectId,
  status,
  successMessage,
  updateProjects
) {
  var helper = FormDataHelper();
  helper.append("project_id", projectId);
  helper.append("status", status);

  GeneralServices.postRequest(helper, PROJECT_STATUS_UPDATE).then(
    (successResponse) => {
      swal(successMessage, {
        icon: "success",
      });
      updateProjects();
    }
  );
}

function handleDuplicateProjectClick(projectId, props) {
  const { from } = props.location.state || {
    from: { pathname: `/duplicateProject/${projectId}` },
  };
  props.history.push(from);
}

function handleEditProjectClick(projectId, props) {
  const { from } = props.location.state || {
    from: { pathname: `/editProject/${projectId}` },
  };
  props.history.push(from);
}
