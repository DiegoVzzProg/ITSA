import axios, { AxiosInstance } from "axios";
import { dgav, notify, site } from "../utils/site";
import { numberCartShopping } from "../stores/countCartShopping";
import { c_auth } from "./s_auth";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor de peticiones: Añade el access token al header en cada solicitud
 */

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
