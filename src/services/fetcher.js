const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://1709-2803-2d60-1102-1dc2-647c-3345-3d44-4bad.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET";

export default fetcher;
