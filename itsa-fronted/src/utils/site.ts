import api from '../services/api';
import Cookies from "js-cookie";
import router from '../router';
import CryptoJS from "crypto-js";
import { Notyf } from "notyf";
import { ref } from "vue";

//#region  dgavClass
const httpMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
} as const;

type httpMethod = typeof httpMethods[keyof typeof httpMethods];

export class dgav {
    static httpMethod = httpMethods;
    static dataBase = {
        status: 200,
        message: "",
        data: {} as Record<string, any>,
        reset() {
            this.status = 200;
            this.message = "";
            this.data = {};
        },
    };
    static async apiRequest(
        endPoint: string,
        method: httpMethod,
        body?: Record<string, any>
    ): Promise<void> {
        try {
            const response: any = await this.handleRequest(method, endPoint, body);

            if (!response || !response.data) {
                console.error("La respuesta del servidor no contiene datos válidos.");
                return undefined;
            }


            const { data } = response;
            if (data.message) {
                this.handleError(data.message);
                return undefined;
            }
            this.dataBase.data = data.data;
        } catch (error: any) {
            this.handleError("An unexpected error has occurred.");
        }
    };
    private static async handleRequest(
        method: httpMethod,
        endPoint: string,
        body?: Record<string, any>
    ) {
        switch (method) {
            case this.httpMethod.GET:
                return await api.get(endPoint);
            case this.httpMethod.POST:
                if (!body) {
                    console.error('El "body" es obligatorio para POST.');
                    return null;
                }
                return await api.post(endPoint, body);
            case this.httpMethod.PUT:
                if (!body) {
                    console.error('El "body" es obligatorio para PUT.');
                    return null;
                }
                return await api.put(endPoint, body);
            case this.httpMethod.DELETE:
                return await api.delete(endPoint);
        }
    };
    private static handleError(message: string, error?: any): void {
        this.dataBase.reset();
        this.dataBase.status = 599;

        // this.dataBase.message =
        //     error?.message || "Ha ocurrido un error inesperado.";
        this.dataBase.message = message;
    };
    static rowsCounts(data: Record<string, any>): number {
        if (!data)
            return 0;
        return data.length;
    };
    static validateDataTable(): boolean {
        return this.rowsCounts(dgav.dataBase.data) > 0 && dgav.dataBase.status == 200;
    }
}
//#endregion

export const numberCart = ref<String>('0');

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
            const data = {
                id_usuario: parsedData.id_usuario
            };

            await c_clientes.fn_l_carrito_cliente(data);

            const response: any = dgav.dataBase;
            if (!IsNullOrEmpty(response.message)) {
                notify.error(response.message)
                return;
            }

            if (!IsNullOrEmpty(response.data)) {
                numberCart.value = response.data.length.toString();
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