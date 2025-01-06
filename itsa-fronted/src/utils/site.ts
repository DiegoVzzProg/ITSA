import router from '../router';
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

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

import { Notyf } from "notyf";
import { MySQLInfo } from "../interface/mysql.interface";
import { fn_l_carrito_cliente } from "../services/s_cart";
import { ref } from "vue";
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

export const Init = () => {
    const header: any = document.getElementById('header') as HTMLElement;
    if (header) {
        const footer: any = document.getElementById('footer') as HTMLElement;
        replaceClass(header, "bg-transparent", "bg-white");
        replaceClass(footer, "hidden", "flex");
        const main_contenedor: any = document.getElementById('main_contenedor') as HTMLElement;
        replaceClass(main_contenedor, "px-[0px]", "px-[clamp(18px,5vw,68px)]")
    }

    //console.log(header);

}

export const Navegar = (
    url: string,
    parametros: Record<string, any> = {},
    functionOn?: () => void
) => {
    const settingsRouter: Record<string, any> = {
        name: url,
    };

    if (parametros && (Array.isArray(parametros) ? parametros.length > 0 : Object.keys(parametros).length > 0)) {
        settingsRouter["params"] = parametros;
    }
    router.push(settingsRouter);


    if (functionOn) {
        functionOn();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    Init();
    fetchNumberCart();
};

export const numberCart = ref<String>('0');

const fetchNumberCart = async () => {
    let response: any = null;
    const userData = Cookies.get('user_data');
    if (userData) {
        const parsedData = JSON.parse(userData);
        const data = {
            id_usuario: parsedData.id_usuario
        };

        response = await fn_l_carrito_cliente(data);

        if (!IsNullOrEmpty(MySQLInfo.message)) {
            notify.error(MySQLInfo.message)
            return;
        }

        console.log(response.data);


        if (!IsNullOrEmpty(response.data)) {
            numberCart.value = response.data.length.toString();
        }


    } else {
        numberCart.value = '0';
    }
};
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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