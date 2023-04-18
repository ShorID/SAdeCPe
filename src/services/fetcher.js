const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://14fe-2803-2d60-1102-1dc2-348f-dcc3-7154-ba57.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET"

export default fetcher;
