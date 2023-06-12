const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL =
  "https://e056-186-77-197-27.ngrok-free.app/";

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

axios.interceptors.request.use(
  function (config) {
    if (!config.headers.Authorization && typeof window !== "undefined") {
      config.headers.Authorization = `Bearer ${window.sessionStorage.getItem(
        "access_token"
      )}`;
    }
    return config;
  },
  function (error) {
    console.log("Error requesting Axios: ", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      window.location.pathname = "/login";
    }
    return Promise.reject(error);
  }
);

fetcher.defaults.method = "GET";

export default fetcher;
