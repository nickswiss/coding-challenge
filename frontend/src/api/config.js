import axios from "axios";
const LOCAL = "LOCAL";
const PROD = "PROD";

export function getEnvironment() {
  /*
  Returns the environment, based on the value of window.location.hostname
   */
  const hostname = window.location.hostname;
  if (hostname === "localhost") {
    return LOCAL;
  } else if (
    hostname === "challenge-backend-prod.us-east-2.elasticbeanstalk.com"
  ) {
    return PROD;
  }
}

export const getApiDomain = () => {
  /*
  Returns the current domain for backend server, based on environment
   */
  const env = getEnvironment();
  if (env === LOCAL) {
    return "http://localhost:8000";
  } else if (env === PROD) {
    return "http://challenge-backend-prod.us-east-2.elasticbeanstalk.com";
  }
};

const getInitializedApi = () => {
  /*
  Returns an axios client initialized with default values
  Erroring on >500 status so that we can handle our own validation from server
   */
  let headers = {
    "content-type": "application/json",
    Accept: "application/json",
    "Cache-Control": "no-cache"
  };
  return axios.create({
    baseURL: getApiDomain(),
    responseType: "json",
    withCredentials: false,
    validateStatus: status => {
      // handling our own errors
      return status < 501;
    },
    headers: headers
  });
};

export const get = function(url) {
  /*
  GET request with initialized axios client
  */
  return getInitializedApi().get(url);
};

export const post = (url, data) => {
  /*
  POST request with initialized axios client
  */
  return getInitializedApi().post(url, data);
};

export const put = (url, data) => {
  /*
  PUT request with initialized axios client
  */
  return getInitializedApi().put(url, data);
};

export const patch = (url, data) => {
  /*
  PATH request with initialized axios client
  */
  return getInitializedApi().patch(url, data);
};

export const del = url => {
  /*
  DEL request with initialized axios client
  */
  return getInitializedApi().delete(url);
};
