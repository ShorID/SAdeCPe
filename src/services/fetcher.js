const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://be48-2803-2d60-1102-1dc2-fc0d-fc11-fb28-574a.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET"

export default fetcher;
