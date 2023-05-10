const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://6a47-2803-2d60-1102-1dc2-c521-81a6-5be6-19b7.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET";

export default fetcher;
