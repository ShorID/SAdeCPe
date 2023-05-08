const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://44a7-2803-2d60-1102-1dc2-11b1-2d1-a6d7-6ea3.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET";

export default fetcher;
