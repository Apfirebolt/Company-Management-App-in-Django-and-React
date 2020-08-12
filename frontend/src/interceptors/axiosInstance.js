import axios from 'axios';

const authInstance = axios.create({
  baseURL: 'http://localhost:8000/'
});

authInstance.defaults.xsrfHeaderName = "X-CSRFToken";
authInstance.defaults.xsrfCookieName = 'csrftoken';


export default authInstance;