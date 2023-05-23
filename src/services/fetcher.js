const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://f42f-2803-2d60-1102-1dc2-8cb-ae35-2a96-802.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET";

export default fetcher;
