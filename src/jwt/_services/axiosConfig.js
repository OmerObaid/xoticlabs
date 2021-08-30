import axios from "axios";

const instance = axios.create({
    baseURL: 'https://demo.conviersolutions.com/xoticlabs_apis/api/'
});

export default instance;