const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://ca85-2803-2d60-1102-1dc2-1801-ceef-d6d5-7d71.ngrok-free.app";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET"

export default fetcher;
