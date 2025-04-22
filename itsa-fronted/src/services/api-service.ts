import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { notify, site } from "../utils/site";
import { ApiRequest, ApiResponse } from "../utils/Api.interface";
import {
  AuthClass,
  IRefreshToken,
} from "../modules/auth/services/auth-service";

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
  setTimeout(() => site.RedirectPage({ name: "login" }), 2000);
};

const apiInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor de peticiones: Añade el access token al header en cada solicitud
 */

apiInstance.interceptors.request.use(
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

apiInstance.interceptors.response.use(
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

        const params: IRefreshToken = {
          refresh_token: refreshToken,
        };

        const newAccessToken: ApiResponse = await new AuthClass().refreshToken(
          params
        );

        if (!newAccessToken.data) {
          return;
        }

        const { access_token, refresh_token } = newAccessToken.data;

        setAuthTokens(access_token, refresh_token);
        apiInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        failedRequestsQueue.forEach((cb) => cb(access_token));
        failedRequestsQueue = [];

        return apiInstance(originalRequest!);
      } catch (refreshError) {
        handleLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    } else {
      return new Promise((resolve) => {
        failedRequestsQueue.push((newToken: string) => {
          originalRequest!.headers!["Authorization"] = `Bearer ${newToken}`;
          resolve(apiInstance(originalRequest!));
        });
      });
    }
  }
);

export class Api {
  public static async Request<T = any>({
    method,
    endpoint,
    body,
  }: ApiRequest): Promise<ApiResponse<T>> {
    try {
      // if (
      //   ["POST", "PUT"].includes(method) &&
      //   (!body || Object.keys(body).length === 0)
      // ) {
      //   throw new Error("Body not proportioned");
      // }

      let axiosResponse;
      switch (method) {
        case "GET":
          axiosResponse = await apiInstance.get(endpoint);
          break;
        case "POST":
          axiosResponse = await apiInstance.post(endpoint, body);
          break;
        case "PUT":
          axiosResponse = await apiInstance.put(endpoint, body);
          break;
        case "DELETE":
          axiosResponse = await apiInstance.delete(endpoint);
          break;
      }
      const { data } = axiosResponse.data;

      return { data: JSON.parse(atob(data)) };
    } catch (error: any) {
      if (error.response) {
        notify.error(error.response.data?.message || "Server error occurred");
      } else if (error.name == "AbortError") {
        notify.error("Request timeout - please try again");
      } else if (error.request) {
        notify.error("No response from server - check your connection");
      } else {
        console.error(error);
      }

      return { data: null };
    }
  }
}
