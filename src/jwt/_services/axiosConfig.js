import axios from "axios";

// let url = "https://demo.conviersolutions.com/xoticlabs_apis/api/";
let url = "http://localhost/convier-git-repos/xoticlabs_apis/api/";
// let url = "https://api.xoticlabs.com/api/";

const instance = axios.create({
  baseURL: url,
});

export default instance;
