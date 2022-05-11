const axios = require("axios");
const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const instanceConfig = {
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  httpsAgent: agent,
};
const Axios = axios.create(instanceConfig);

Axios.interceptors.request.use(
  function (config) {
    config.headers.Accept = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

Axios.interceptors.request.use(
  (req) => {
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = Axios;
