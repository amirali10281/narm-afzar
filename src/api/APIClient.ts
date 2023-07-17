import axios from "axios";
import { PATH_DASHBOARD } from "../routes/paths";

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",

  },
});

axiosInstance.defaults.baseURL = "https://hrm-api.amirentezari.ir"

axiosInstance.interceptors.response.use(
  (response) => response,
  (err) => {
    const originalConfig = err.config;

    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        document.location.href = PATH_DASHBOARD.login;
        return;
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
