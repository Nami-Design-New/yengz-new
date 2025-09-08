import axios from "axios";

axios.defaults.baseURL = "https://ynjez.zeroonez.com/api";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const lang = localStorage.getItem("lang") || "ar";
    config.headers["lang"] = lang;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
