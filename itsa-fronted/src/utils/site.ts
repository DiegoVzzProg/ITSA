import api from "../services/api";
import Cookies from "js-cookie";
import router from "../router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import CryptoJS from "crypto-js";
import { RouteLocationRaw, RouteRecordName } from "vue-router";
import { GeneralStores } from "../modules/stores/GeneralStores";

//#region  dgavClass

interface DatabaseState {
  status: number;
  message: string;
  isLoading: boolean;
}

const httpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  DOWNLOAD: "DOWNLOAD",
} as const;

type httpMethod = (typeof httpMethods)[keyof typeof httpMethods];

const REQUEST_TIMEOUT = 30000;

export class dgav {
  public static httpMethod = httpMethods;
  public static dataBase: DatabaseState = {
    status: 200,
    message: "",
    isLoading: false,
  };

  public static async apiRequest<T = any>(
    endPoint: string,
    method: httpMethod,
    body?: Record<string, any>
  ): Promise<any> {
    this.dataBase.isLoading = true;
    this.dataBase.status = 200;
    this.dataBase.message = "";

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT);

    try {
      const response: any = await this.handleRequest<T>(
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

      return JSON.parse(atob(data));
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
      this.dataBase.isLoading = false;
      clearTimeout(timeoutId);
    }
  }

  private static async handleRequest<T>(
    method: httpMethod,
    endPoint: string,
    body?: Record<string, any>,
    signal?: AbortSignal
  ): Promise<T | null> {
    const config = { signal };

    switch (method) {
      case this.httpMethod.GET:
        return (await api.get(endPoint, config)).data;
      case this.httpMethod.POST:
        if (!body) {
          throw new Error("Body is required for POST requests");
        }
        return (await api.post(endPoint, body, config)).data;
      case this.httpMethod.PUT:
        if (!body) {
          throw new Error("Body is required for PUT requests");
        }
        return (await api.put(endPoint, body, config)).data;
      case this.httpMethod.DELETE:
        return (await api.delete(endPoint, config)).data;
      case this.httpMethod.DOWNLOAD:
        return (
          await api.get(endPoint, {
            ...config,
            responseType: "blob",
          })
        ).data;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }

  private static handleError(message: string, status: number = 500): void {
    this.dataBase.status = status;
    this.dataBase.message = message;
  }

  public static rowsCounts(data: any[]): number {
    return Array.isArray(data) ? data.length : 0;
  }
}
//#endregion

export class site {
  public static userData(): any {
    const data: any = site.getCookie("e.u.d");
    return data ? JSON.parse(data) : undefined;
  }

  /**
   * Encripta cualquier dato (objeto, arreglo, número, boolean, string, etc.)
   * y retorna una cadena cifrada.
   *
   * @param data - El dato a encriptar.
   * @returns {string} La cadena encriptada o una cadena vacía si no se encuentra la clave.
   */
  public static encryptData(data: any): string {
    const encryptionKey = Cookies.get("e.k") || "";
    if (!encryptionKey) return "";

    const dataToEncrypt =
      typeof data === "string" ? data : JSON.stringify(data);

    const encryptedData = CryptoJS.AES.encrypt(
      dataToEncrypt,
      encryptionKey
    ).toString();
    return encryptedData;
  }

  /**
   * Desencripta una cadena previamente encriptada.
   * Siempre retorna una cadena con el contenido desencriptado.
   *
   * @param encryptedData - La cadena encriptada.
   * @returns {string} La cadena desencriptada o una cadena vacía si no se encuentra la clave.
   */
  public static decryptData(encryptedData: string): string {
    const encryptionKey = Cookies.get("e.k") || "";
    if (!encryptionKey) return "";

    const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
    const decryptedData: string = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }

  public static setCookies(
    cookies: Record<string, string>,
    encrypted: boolean = true,
    expireDays?: number
  ): void {
    Object.entries(cookies).forEach(([key, value]) => {
      Cookies.set(key, encrypted ? this.encryptData(value) : value, {
        path: "/",
        sameSite: "Strict",
        expires: expireDays || 20,
        secure: true,
      });
    });
  }

  public static getCookie(key: string, encrypted: boolean = true) {
    const encryptionKey = Cookies.get("e.k") || "";

    if (encryptionKey && encrypted)
      return this.decryptData(Cookies.get(key) || "");

    return Cookies.get(key) || "";
  }

  public static allDeleteCookies() {
    const allCookies: any = Cookies.get();
    Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
  }

  public static RedirectPage(
    routeName: RouteRecordName,
    parameters: Record<string, string | number> = {},
    functionOn?: () => void
  ): void {
    GeneralStores().updateGuid();

    const dataRoute: RouteLocationRaw = {
      name: routeName,
      params: parameters,
    };

    const routeActual = router
      .getRoutes()
      .find((route) => route.name === routeName);
    const layout = routeActual?.meta?.layout?.toString().toLowerCase();

    // Añadir query.key solo si el layout es Main y no es la ruta home
    if (layout === "main" && routeName?.toString().toLowerCase() !== "home") {
      dataRoute.query = { key: GeneralStores().data.guid };
    }

    router
      .push(dataRoute)
      .then(() => {
        window.scrollTo({ top: 0 });
        functionOn?.();
      })
      .catch((error) => {
        if (error.name !== "NavigationDuplicated") {
          this.fallbackRedirect();
        }
      });
  }

  private static fallbackRedirect(): void {
    router.push("/").catch(() => {
      window.location.href = "/";
    });
  }

  public static formatNumber = (num: number): string => {
    const [integer, decimal] = num.toFixed(10).split(".");
    const cleanDecimal = decimal?.replace(/0+$/, "") || "";
    return cleanDecimal ? `${integer}.${cleanDecimal}` : integer;
  };

  public static IsNullOrEmpty = (value: any): boolean => {
    return value == null || value == undefined || value == "";
  };
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
