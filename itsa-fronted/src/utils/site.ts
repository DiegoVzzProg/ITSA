import api from "../services/api";
import Cookies from "js-cookie";
import router from "../router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { ref } from "vue";
import { c_clientes } from "../services/s_clientes";

//#region  dgavClass
interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

interface DatabaseState<T = any> {
  status: number;
  message: string;
  data: T;
  isLoading: boolean;
  reset(): void;
}

const httpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

type httpMethod = (typeof httpMethods)[keyof typeof httpMethods];

const REQUEST_TIMEOUT = 30000;

export class dgav {
  static httpMethod = httpMethods;
  static dataBase: DatabaseState = {
    status: 200,
    message: "",
    data: {},
    isLoading: false,
    reset() {
      this.status = 200;
      this.message = "";
      this.data = {};
      this.isLoading = false;
    },
  };

  static async apiRequest<T = any>(
    endPoint: string,
    method: httpMethod,
    body?: Record<string, any>
  ): Promise<any> {
    this.dataBase.reset();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      this.dataBase.isLoading = true;
      const response = await this.handleRequest<T>(
        method,
        endPoint,
        body,
        controller.signal
      );

      if (!response) {
        throw new Error("Invalid server response");
      }

      const { data, status } = response;
      this.dataBase.status = status;

      if (response.message) {
        this.handleError(response.message);
        return;
      }

      return data;
    } catch (error: any) {
      if (error.name === "AbortError") {
        this.handleError("Request timeout - please try again");
      } else if (error.response) {
        const message = error.response.data?.message || "Server error occurred";
        this.handleError(message, error.response.status);
      } else if (error.request) {
        this.handleError("No response from server - check your connection");
      } else {
        this.handleError(error.message || "An unexpected error occurred");
      }
    } finally {
      clearTimeout(timeoutId);
      this.dataBase.isLoading = false;
    }
  }

  private static async handleRequest<T>(
    method: httpMethod,
    endPoint: string,
    body?: Record<string, any>,
    signal?: AbortSignal
  ): Promise<ApiResponse<T> | null> {
    const config = { signal };

    switch (method) {
      case this.httpMethod.GET:
        return (await api.get<ApiResponse<T>>(endPoint, config)).data;
      case this.httpMethod.POST:
        if (!body) {
          throw new Error("Body is required for POST requests");
        }
        return (await api.post<ApiResponse<T>>(endPoint, body, config)).data;
      case this.httpMethod.PUT:
        if (!body) {
          throw new Error("Body is required for PUT requests");
        }
        return (await api.put<ApiResponse<T>>(endPoint, body, config)).data;
      case this.httpMethod.DELETE:
        return (await api.delete<ApiResponse<T>>(endPoint, config)).data;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }

  private static handleError(message: string, status: number = 500): void {
    this.dataBase.reset();
    this.dataBase.status = status;
    this.dataBase.message = message;
  }

  static rowsCounts(data: any[]): number {
    if (!Array.isArray(data)) return 0;
    return data.length;
  }

  static validateDataTable(): boolean {
    return (
      Array.isArray(this.dataBase.data) &&
      this.rowsCounts(this.dataBase.data) > 0 &&
      this.dataBase.status === 200
    );
  }
}
//#endregion

export const numberCart = ref<any>(Cookies.get("numberCart") || "0");

export class site {
  public static allDeleteCookies() {
    const allCookies: any = Cookies.get();
    Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
  }

  static async Init(): Promise<void> {
    const userData = Cookies.get("user_data");
    if (!userData) {
      numberCart.value = "0";
    } else {
      numberCart.value = Cookies.get("numberCart");
    }
  }
  static RedirectPage(
    url: string,
    parametros: Record<string, any> = {},
    functionOn?: () => void
  ): void {
    const settingsRouter: Record<string, any> = {
      name: url,
    };

    if (
      parametros &&
      (Array.isArray(parametros)
        ? parametros.length > 0
        : Object.keys(parametros).length > 0)
    ) {
      settingsRouter["params"] = parametros;
    }
    router.push(settingsRouter);

    if (functionOn) {
      functionOn();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    this.Init();
  }

  public static setCookies(cookies: Record<string, string>): void {
    Object.entries(cookies).forEach(([key, value]) => {
      Cookies.set(key, value, {
        path: "/",
        sameSite: "Strict",
        expires: 7,
      });
    });
  }

  public static replaceClass(
    element: HTMLElement,
    oldClass: string,
    newClass: string
  ): void {
    if (element.classList.contains(oldClass)) {
      element.classList.remove(oldClass);
      element.classList.add(newClass);
    }
  }
}

/**
 * Reemplaza clases CSS en un elemento HTML.
 *
 * @param element - El elemento HTML al que se le reemplazarán las clases.
 * @param oldClass - La clase que será reemplazada.
 * @param newClass - La nueva clase que reemplazará a la antigua.
 */
export function replaceClass(
  element: HTMLElement,
  oldClass: string,
  newClass: string
): void {
  if (element.classList.contains(oldClass)) {
    element.classList.remove(oldClass);
    element.classList.add(newClass);
  }
}

export const isNotified = Cookies.get("logged_in_successfully");

export const notify = new Notyf({
  duration: 5000,
  position: {
    x: "right",
    y: "top",
  },
});

export const IsNullOrEmpty = (value: any): boolean => {
  return value == null || value == undefined || value == "";
};
