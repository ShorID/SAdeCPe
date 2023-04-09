const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://7f88-2803-2d60-1102-1dc2-ecb3-d68d-e793-565a.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET"

export default fetcher;
