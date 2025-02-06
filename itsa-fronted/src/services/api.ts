import axios, { AxiosInstance } from "axios";
import { site } from "../utils/site";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  // responseType: 'blob'
  // withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const token = site.getCookie("e.t", false);

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
