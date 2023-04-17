const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://f909-2803-2d60-1102-1dc2-9898-6913-999b-f5e8.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET"

export default fetcher;
