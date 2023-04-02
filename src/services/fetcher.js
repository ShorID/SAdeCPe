const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://1f2a-2803-2d60-1102-1dc2-2881-61ce-8b54-b65b.ngrok.io";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET"

export default fetcher;
