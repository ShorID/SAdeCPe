const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://b6cb-2803-2d60-1102-1dc2-2015-bb27-be16-bc91.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET";

export default fetcher;
