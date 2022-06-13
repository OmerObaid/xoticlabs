import { AuthenticationService } from "../jwt/_services";

export function displayTime() {
  var str = "";

  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  str += hours + ":" + minutes + " ";
  if (hours > 11) {
    str += "PM";
  } else {
    str += "AM";
  }
  return str;
}

export function getClientId() {
  return AuthenticationService.currentUserValue.id;
}

export function getClientProfileId() {
  return AuthenticationService.currentUserValue.client_profile_id;
}

export function getClientName() {
  return (
    AuthenticationService.currentUserValue.first_name +
    " " +
    AuthenticationService.currentUserValue.last_name
  );
}

export function getClientFirstName() {
  return AuthenticationService.currentUserValue.first_name;
}

export function getClientLastName() {
  return AuthenticationService.currentUserValue.last_name;
}

/**
 *
 * @param {*} comment
 * @returns name of the commentor and userType i.e the commentor is admin, designer or the client
 */
export function getCommentInfo(comment) {
  let name = "";
  let userType = "";
  if (comment.admin_id && comment.admin_id != "" && comment.admin_id != "0") {
    name = comment.admin_name;
    userType = "admin";
  } else if (
    comment.designer_id &&
    comment.designer_id != "" &&
    comment.designer_id != "0"
  ) {
    name = comment.designer_name;
    userType = "designer";
  } else if (
    comment.client_id &&
    comment.client_id != "" &&
    comment.client_id != "0"
  ) {
    name = comment.client_name;
    userType = "client";
  }

  return { name, userType };
}

export function getInitials(string) {
  var names = string.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

export function downloadFile(fileUrl, fileName) {
  fetch(fileUrl, {
    method: "GET",
    headers: {},
  })
    .then((response) => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getUserName(data) {
  if (data.client_id) return data.client_firstname + " " + data.client_lastname;
  else if (data.designer_id)
    return data.designer_firstname + " " + data.designer_lastname;
}

export function openInNewTab(url) {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
}

export function getHeaderTagPrpos(headerSettings) {
  if (headerSettings.accountPauseStatus == "Y")
    return { title: "Account Paused", color: "#d5de16", opacity: "100%" };
  else if (headerSettings.accountSuspendedStatus == "Y")
    return { title: "Account Suspended", color: "#b41818", opacity: "100%" };
  else if (headerSettings.accountCancelStatus == "Y")
    return { title: "Account Cancelled", color: "#b41818", opacity: "100%" };
  else
    return {
      title: headerSettings.accountPlanTitle + " Plan",
      color: "white",
      opacity: "50%",
    };
}
