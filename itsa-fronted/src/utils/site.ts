import Cookies from "js-cookie";
import router from "../router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import CryptoJS from "crypto-js";
import { RouteLocationRaw, RouteRecordName } from "vue-router";
import stores from "../modules/stores/GeneralStores";

interface RouterParams {
  name: RouteRecordName;
  params?: Record<string, string>;
  functionOn?: () => void;
  query?: Record<string, string>;
}

export class site {
  /**
   * Retorna el objeto de usuario que se encuentra en una cookie.
   * Este objeto se guarda en una cookie con el nombre "e.u.d".
   * La cookie se crea cuando se inicia sesión y se elimina cuando se cierra la sesión.
   *
   * @returns {any} El objeto de usuario o undefined si no se encuentra la cookie.
   */
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

  public static LocalStorage(type: "set", values: Record<string, any>): void;

  public static LocalStorage(
    type: "get",
    keys: string[]
  ): Record<string, string | null>;

  public static LocalStorage(
    type: "get" | "set",
    data: Record<string, any> | string[]
  ): Record<string, string | null> | void {
    if (type === "set") {
      Object.entries(data as Record<string, any>).forEach(([key, value]) => {
        localStorage.setItem(key, String(value));
      });
    } else {
      return (data as string[]).reduce((result, key) => {
        result[key] = localStorage.getItem(key);
        return result;
      }, {} as Record<string, string | null>);
    }
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

  public static RedirectPage(routerParams: RouterParams): void {
    const dataRoute: RouteLocationRaw = {
      name: routerParams.name,
      params: routerParams.params,
      query: routerParams.query,
    };

    stores.guid().updateGuid();
    const routeActual = router
      .getRoutes()
      .find((route) => route.name === routerParams.name);
    const layout = routeActual?.meta?.layout?.toString().toLowerCase();

    if (
      layout === "main" &&
      routerParams.name?.toString().toLowerCase() !== "home"
    ) {
      dataRoute.query = {
        ...(dataRoute.query || {}),
        key: stores.guid().value,
      };
    }

    router
      .push(dataRoute)
      .then(() => {
        window.scrollTo({ top: 0 });
        routerParams.functionOn?.();
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
