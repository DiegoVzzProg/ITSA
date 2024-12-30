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

import Cookies from "js-cookie";
// Variable reactiva compartida
export const isNotified = Cookies.get('logged_in_successfully');

import { Notyf } from "notyf";
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

import CryptoJS from "crypto-js";

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
    const footer: any = document.getElementById('footer') as HTMLElement;
    replaceClass(header, "bg-transparent", "bg-white");
    replaceClass(footer, "hidden", "flex");
    const main_contenedor: any = document.getElementById('main_contenedor') as HTMLElement;
    replaceClass(main_contenedor, "px-[0px]", "px-[clamp(18px,5vw,68px)]")
}