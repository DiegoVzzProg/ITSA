import { ref } from "vue";
import { c_clientes } from "../../services/s_clientes";
import { dgav, IsNullOrEmpty, notify } from "../../utils/site";
import Cookies from "js-cookie"; // assuming you are using js-cookie library

export const productData = ref<any>({});
export const productPrecio = ref<string>("");
export const impuesto = ref<string>("");
export const userData = ref<any>({});

export class c_checkOut {
  public static async productos() {
    if (userData.value) {
      let response: any = await c_clientes.fn_l_carrito_cliente({
        id_usuario: userData.value.id_usuario,
      });

      let message: string = dgav.dataBase.message;

      if (response) {
        if (!IsNullOrEmpty(message)) {
          notify.error(message);
          return;
        }

        productData.value = response;

        response = await c_clientes.fn_l_precio_carrito_cliente({
          id_usuario: userData.value.id_usuario,
        });

        if (response) {
          if (!IsNullOrEmpty(message)) {
            notify.error(message);
            return;
          }

          productPrecio.value = response.precio;
          impuesto.value = response.impuesto;
        }
      }
    }
  }
}
