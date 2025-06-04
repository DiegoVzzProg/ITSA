import type { AxiosInstance } from "axios";
import axios from "axios";
import type {
  ApiRequest,
  ApiResponse,
} from "../interfaces/api-response-interface";

export interface IApiService {
  typeApi: "STORE" | "LOCAL" | "PRODUCTION";
  headers?: any;
}

export class ApiService {
  private apiInstance: AxiosInstance;
  private baseUrl = (typeApi: string | null): string => {
    switch (typeApi) {
      case "STORE":
        return import.meta.env.VITE_API_URL_STORE;
      case "LOCAL":
        return import.meta.env.VITE_API_URL_LOCAL_SYSTEM;
      case "PRODUCTION":
        return import.meta.env.VITE_API_URL_SYSTEM;
      default:
        return import.meta.env.VITE_API_URL_LOCAL_SYSTEM;
    }
  };
  public constructor(params: IApiService | null) {
    this.apiInstance = axios.create({
      baseURL: this.baseUrl(params?.typeApi || null),
      timeout: 10000,
      headers: params?.headers || {
        "Content-Type": "application/json",
      },
    });

    this.apiInstance.interceptors.request.use(
      async (config) => {
        // const token: string = FeaturesClass.getCookie("__user__token");
        // if (token) {
        //   config.headers["Authorization"] = `Bearer ${token}`;
        // }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  public async Request({
    method,
    endpoint,
    body,
  }: ApiRequest): Promise<ApiResponse> {
    try {
      let axiosResponse: ApiResponse;
      switch (method) {
        case "GET":
          axiosResponse = await this.apiInstance.get(endpoint);
          break;
        case "POST":
          axiosResponse = await this.apiInstance.post(endpoint, body);
          break;
        case "PUT":
          axiosResponse = await this.apiInstance.put(endpoint, body);
          break;
        case "DELETE":
          axiosResponse = await this.apiInstance.delete(endpoint);
          break;
      }

      return { data: axiosResponse.data };
    } catch (error: any) {
      console.error(error);
      return { data: null };
    }
  }
}
