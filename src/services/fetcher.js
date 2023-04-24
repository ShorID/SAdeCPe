const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://d47e-2803-2d60-1102-1dc2-f5ca-6467-1338-20c0.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET"

export default fetcher;
