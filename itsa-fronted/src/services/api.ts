import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { notify, site } from "../utils/site";
import { s_auth } from "../modules/auth/services/s_auth";

let isRefreshing = false;
let failedRequestsQueue: Array<(token: string) => void> = [];

const setAuthTokens = (access: string, refresh: string) => {
  site.setCookies(
    {
      "e.t": access,
      "r.t": refresh,
    },
    false
  );
};

const handleLogout = (): void => {
  site.allDeleteCookies();
  notify.error("Session expired. Redirecting...");
  setTimeout(() => site.RedirectPage("login"), 2000);
};

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
    const sessionToken = site.getCookie("s.t", false);
    if (sessionToken) {
      config.headers["X-Session-Token"] = `${sessionToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    if (status != 401) {
      return Promise.reject(error);
    }

    const refreshToken: any = site.getCookie("r.t", false);

    if (site.IsNullOrEmpty(refreshToken)) {
      handleLogout();
      return Promise.reject(error);
    }

    if (!isRefreshing) {
      try {
        isRefreshing = true;
        const newAccessToken = await s_auth.refreshToken({
          refresh_token: refreshToken,
        });

        const { access_token, refresh_token } = newAccessToken as any;

        setAuthTokens(access_token, refresh_token);
        api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

        failedRequestsQueue.forEach((cb) => cb(access_token));
        failedRequestsQueue = [];

        return api(originalRequest!);
      } catch (refreshError) {
        handleLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    } else {
      return new Promise((resolve, reject) => {
        failedRequestsQueue.push((newToken: string) => {
          originalRequest!.headers!["Authorization"] = `Bearer ${newToken}`;
          resolve(api(originalRequest!));
        });
      });
    }
  }
);

export default api;
