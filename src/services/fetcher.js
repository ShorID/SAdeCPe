const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://5cbc-2803-2d60-1102-1dc2-7474-3871-a89c-98e5.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET";

export default fetcher;
