const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://7fa3-2803-2d60-1102-1dc2-50d3-7b6c-7173-92bd.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

fetcher.defaults.method = "GET";

export default fetcher;
