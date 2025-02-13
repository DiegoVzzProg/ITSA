import axios, { AxiosInstance } from "axios";
import { site } from "../utils/site";
import { numberCartShopping } from "../stores/countCartShopping";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status == 401) {
      // site.allDeleteCookies();
      // numberCartShopping().default();
      // site.RedirectPage("home");
      // site.setCookies(
      //   {
      //     session: "false",
      //   },
      //   false
      // );
    }
    return Promise.reject(error);
  }
);

export default api;
