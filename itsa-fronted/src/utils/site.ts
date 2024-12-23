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
import { fn_l_carrito_cliente } from "../services/s_cart";
// Variable reactiva compartida
export const isNotified = Cookies.get('logged_in_successfully');