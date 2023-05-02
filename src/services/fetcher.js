const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://b720-2803-2d60-1102-1dc2-251d-aad1-a8af-a1a2.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET";

export default fetcher;
