import axios from "./axiosConfig";

export const GeneralServices = {
  postRequest,
};

function postRequest(formData, url, progressEvent = null, token = null) {
  return axios({
    method: "post",
    url: url,
    data: formData,
    headers: new Headers(),
    onUploadProgress: progressEvent,
    cancelToken: token,
  })
    .then(function (response) {
      if (response.data.status === 200) return response.data;
      else return Promise.reject(response.data.message);
    })
    .catch(function (catchError) {
      console.log("general services - catch error", catchError);
      return Promise.reject(catchError);
    });
}
