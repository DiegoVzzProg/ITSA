import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { site } from "../utils/site";

const api: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  // responseType: 'blob'
  // withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const token = site.getCookie("token", false);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
