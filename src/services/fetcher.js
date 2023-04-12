const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://668b-2803-2d60-1102-1dc2-b5a5-2f98-ac83-dd3b.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET"

export default fetcher;
