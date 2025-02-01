import { reactive, ref } from "vue";
import { c_clientes } from "../../services/s_clientes";
import { dgav, IsNullOrEmpty, notify, site } from "../../utils/site";

export const productData = ref<any>({});
export const productPrecio = ref<string>("");
export const impuesto = ref<string>("");
export const userData = ref<any>({});

export class class_checkout {
  public static formCheckout1 = reactive({
    name: {
      value: "",
      placeholder: "Name",
      error: "",
    },
    phone: {
      value: "",
      placeholder: "Phone",
      error: "",
    },
    address: {
      value: "",
      placeholder: "Address",
      error: "",
    },
  });
  public static formCheckout2 = reactive({
    postal_code: {
      value: "",
      placeholder: "Postal Code",
      error: "",
    },
    state: {
      value: "",
      placeholder: "State",
      error: "",
    },
  });

  // Método para actualizar un campo
  public static updateFieldFormCheckout1(
    field: keyof typeof class_checkout.formCheckout1,
    value: string
  ) {
    console.log(field, value);

    class_checkout.formCheckout1[field].value = value;
  }
  public static updateFieldFormCheckout2(
    field: keyof typeof class_checkout.formCheckout2,
    value: string
  ) {
    class_checkout.formCheckout2[field].value = value;
  }

  // Ejemplo de función para resetear los valores
  public static resetForms() {
    for (const key in class_checkout.formCheckout1) {
      if (
        Object.prototype.hasOwnProperty.call(class_checkout.formCheckout1, key)
      ) {
        class_checkout.formCheckout1[
          key as keyof typeof class_checkout.formCheckout1
        ].value = "";
        class_checkout.formCheckout1[
          key as keyof typeof class_checkout.formCheckout1
        ].error = "";
      }
    }
  }

  public static async infoForms1() {
    const dataUser: any = JSON.parse(site.getCookie("user_data"));

    const data: any = {
      id_usuario: dataUser.id_usuario,
    };

    const response: any = await c_clientes.fn_l_clientes(data);
    if (response) {
      console.log(response);
    }
  }

  public static async AddCliente() {
    if (userData.value) {
      await c_clientes.fn_a_clientes({
        id_usuario: userData.value.id_usuario,
        nombre: class_checkout.formCheckout1.name.value,
        telefono: class_checkout.formCheckout1.phone.value,
        direccion: class_checkout.formCheckout1.address.value,
        id_pais: 1,
        estado: class_checkout.formCheckout2.state.value,
        codigo_postal: class_checkout.formCheckout2.postal_code.value,
      });

      let message: string = dgav.dataBase.message;
      if (!IsNullOrEmpty(message)) {
        notify.error(message);
        return;
      }
    }
  }

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
