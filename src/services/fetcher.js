const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://6559-2803-2d60-1102-1dc2-a52c-9ef4-bdd3-3181.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET"

export default fetcher;
