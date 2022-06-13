import { BehaviorSubject } from "rxjs";
import { CLIENT_LOGIN } from "./axiousURL";
import axios from "./axiosConfig";
import { FormDataHelper } from "../_helpers/FormDataHelper";
import swal from "sweetalert";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const AuthenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

function login(username, password) {
  var bodyFormData = FormDataHelper();
  bodyFormData.append("email_address", username);
  bodyFormData.append("password", password);

  return axios({
    method: "post",
    url: CLIENT_LOGIN,
    data: bodyFormData,
    headers: new Headers(),
    redirect: "follow",
  }).then(function (response) {
    if (response.data.status === 200) {
      const user = response.data.data[0];
      localStorage.setItem("currentUser", JSON.stringify(user));
      currentUserSubject.next(user);
      return user;
    } else {
      const error = response.data.message;
      return Promise.reject(error);
    }
  });
}

function confirmLogout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
  localStorage.clear();
  window.location.href = "/";
}

function confirmationBeforeLogout() {
  swal({
    title: "Xotic-Labs",
    text: "Are you sure you want to logout?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((resp) => {
    if (resp) {
      confirmLogout();
    } else {
      console.log("User oppted not to logout");
    }
  });
}

function logout() {
  confirmationBeforeLogout();
}
