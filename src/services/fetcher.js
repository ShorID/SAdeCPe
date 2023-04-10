const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://d32f-186-77-197-171.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET"

export default fetcher;
