import api from '../services/api';
import Cookies from "js-cookie";
import router from '../router';
import CryptoJS from "crypto-js";
import { Notyf } from "notyf";
import { ref } from "vue";

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
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
} as const;

type httpMethod = typeof httpMethods[keyof typeof httpMethods];

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
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        try {
            this.dataBase.isLoading = true;
            const response = await this.handleRequest<T>(method, endPoint, body, controller.signal);

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
            if (error.name === 'AbortError') {
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
    };

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
                    throw new Error('Body is required for POST requests');
                }
                return (await api.post<ApiResponse<T>>(endPoint, body, config)).data;
            case this.httpMethod.PUT:
                if (!body) {
                    throw new Error('Body is required for PUT requests');
                }
                return (await api.put<ApiResponse<T>>(endPoint, body, config)).data;
            case this.httpMethod.DELETE:
                return (await api.delete<ApiResponse<T>>(endPoint, config)).data;
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }
    };

    private static handleError(message: string, status: number = 500): void {
        this.dataBase.reset();
        this.dataBase.status = status;
        this.dataBase.message = message;
    };

    static rowsCounts(data: any[]): number {
        if (!Array.isArray(data)) return 0;
        return data.length;
    };

    static validateDataTable(): boolean {
        return Array.isArray(this.dataBase.data) &&
            this.rowsCounts(this.dataBase.data) > 0 &&
            this.dataBase.status === 200;
    }
}
//#endregion

export const numberCart = ref<any>(Cookies.get('numberCart') || '0');

export class site {
    static async Init(): Promise<void> {
        const header: any = document.getElementById('header') as HTMLElement;
        if (header) {
            const footer: any = document.getElementById('footer') as HTMLElement;
            replaceClass(header, "bg-transparent", "bg-white");
            replaceClass(footer, "hidden", "flex");
            const main_contenedor: any = document.getElementById('main_contenedor') as HTMLElement;
            replaceClass(main_contenedor, "px-[0px]", "px-[clamp(18px,5vw,68px)]")
        }

        const userData = Cookies.get('user_data');
        if (userData) {
            const parsedData = JSON.parse(userData);

            const response: any = await c_clientes.fn_l_carrito_cliente({
                id_usuario: parsedData.id_usuario
            });

            if (response) {
                if (!IsNullOrEmpty(dgav.dataBase.message)) {
                    notify.error(dgav.dataBase.message)
                    return;
                }
                numberCart.value = response.length.toString();
                this.setCookies({
                    "numberCart": numberCart.value
                });
            }

        } else {
            numberCart.value = '0';
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

        if (parametros &&
            (Array.isArray(parametros) ? parametros.length > 0 : Object.keys(parametros).length > 0)
        ) {
            settingsRouter["params"] = parametros;
        }
        router.push(settingsRouter);

        if (functionOn) {
            functionOn();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.Init();
    };

    static setCookies(
        cookies: Record<string, string>
    ): void {
        Object.entries(cookies).forEach(([key, value]) => {
            Cookies.set(key, value, {
                path: '/',
                sameSite: 'Strict',
                expires: 7
            });
        });
    };
};

/**
 * Reemplaza clases CSS en un elemento HTML.
 *
 * @param element - El elemento HTML al que se le reemplazarán las clases.
 * @param oldClass - La clase que será reemplazada.
 * @param newClass - La nueva clase que reemplazará a la antigua.
 */
export function replaceClass(element: HTMLElement, oldClass: string, newClass: string): void {
    if (element.classList.contains(oldClass)) {
        element.classList.remove(oldClass);
        element.classList.add(newClass);
    }
}

export const isNotified = Cookies.get('logged_in_successfully');

export const notify = new Notyf({
    duration: 5000,
    position: {
        x: 'right',
        y: 'top',
    }
});

export const IsNullOrEmpty = (value: any): boolean => {
    return value == null || value == undefined || value == '';
};

export const encryptValue = (value: string): string => {
    const secretKey: any = localStorage.getItem('secretKey');

    if (IsNullOrEmpty(secretKey)) {
        return "";
    }

    return CryptoJS.AES.encrypt(value, secretKey).toString();
}

export const decryptValue = (encryptedValue: string) => {
    const secretKey: any = localStorage.getItem('secretKey');

    if (IsNullOrEmpty(secretKey)) {
        return "";
    }

    const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { c_clientes } from '../services/s_clientes';

gsap.registerPlugin(ScrollTrigger);
export const GasapFadeInUpEffect = () => {
    gsap.utils.toArray('.dgav-fade-up').forEach((el: any) => {
        gsap.from(el, {
            opacity: 0,
            y: 150,
            duration: .5,
            scrollTrigger: {
                trigger: el,          // Cada elemento actúa como su propio trigger
                start: 'top 80%',
                end: 'bottom 20%',
            },
        });
    });
}