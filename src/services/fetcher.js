import sessionStorageManagment from "./sessionstorageManagment";

const { default: axios } = require("axios");

const fetcher = axios;

fetcher.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

fetcher.defaults.headers = {
  "ngrok-skip-browser-warning": true,
};

axios.interceptors.request.use(
  function (config) {
    if (!config.headers.Authorization && typeof window !== "undefined") {
      config.headers.Authorization = `Bearer ${sessionStorageManagment.read(
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
      sessionStorageManagment.write("isAuth", "");
      sessionStorageManagment.write("access_token", "");
      sessionStorageManagment.write("path", window.location.href);
      window.location.pathname = "/login";
    }
    return Promise.reject(error);
  }
);

fetcher.defaults.method = "GET";

export default fetcher;
