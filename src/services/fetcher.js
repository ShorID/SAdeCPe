const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://503d-2803-2d60-1102-1dc2-a85b-bf61-e677-78b7.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET";

export default fetcher;
