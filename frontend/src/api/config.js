import axios from "axios";
const LOCAL = "LOCAL";

export function getEnvironment() {
  if (window.location.hostname === "localhost") {
    return LOCAL;
  }
}

export const getApiDomain = () => {
  /*
  Returns the current domain for backend server, based on environment
   */
  if (getEnvironment() === LOCAL) {
    return "http://localhost:8000";
  }
};

const getInitializedApi = () => {
  let headers = {
    "content-type": "application/json",
    Accept: "application/json"
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
  return getInitializedApi().post(url, data);
};

export const del = url => {
  /*
  DEL request with initialized axios client
  */
  return getInitializedApi().delete(url);
};
