import { BehaviorSubject } from "rxjs";
import { API_PASSWORD, API_USERNAME, CLIENT_LOGIN } from "./axiousURL";
import axios from "./axiosConfig";
import { FormDataHelper } from "../_helpers/FormDataHelper";

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
		redirect: 'follow'
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
	});/*.catch(function (catchError) {
		console.log('catch error', catchError);
		return Promise.reject(catchError.message);
	});*/
}


function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem("currentUser");
	currentUserSubject.next(null);
}
