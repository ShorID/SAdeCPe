const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://6a5b-2803-2d60-1102-1dc2-3413-ae67-cc9f-3f4d.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET";

export default fetcher;
