const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://7bd3-2803-2d60-1102-1dc2-fd45-1601-2996-16c4.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET"

export default fetcher;
