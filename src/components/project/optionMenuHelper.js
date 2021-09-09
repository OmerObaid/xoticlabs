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
    },
    (errorResponse) => {
      console.log(errorResponse);
    }
  );
}

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
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
    } else {
      console.log("User oppted to not delete the project");
    }
  });
}
