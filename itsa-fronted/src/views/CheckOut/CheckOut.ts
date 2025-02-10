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
      id: "name",
      value: "",
      placeholder: "Name",
      error: "",
    },
    vat_number: {
      id: "vat_number",
      value: "",
      placeholder: "Vat number",
      error: "",
    },
    address: {
      id: "address",
      value: "",
      placeholder: "Address",
      error: "",
    },
  });
  public static formCheckout2 = reactive({
    postal_code: {
      id: "postal_code",
      value: "",
      placeholder: "Postal Code",
      error: "",
    },
    state: {
      id: "state",
      value: "",
      placeholder: "State",
      error: "",
    },
  });

  public static validateForms1(value: string, type: string) {
    const form1: any = class_checkout.formCheckout1;

    switch (type) {
      case "name":
        if (IsNullOrEmpty(value)) {
          form1.name.error = "This field is required.";
        } else if (value.length > 255) {
          form1.name.error = "The input cannot exceed 255 characters.";
        } else if (!/^[a-zA-Z\u00C0-\u00FF\s]+$/.test(value)) {
          form1.name.error = "The input can only contain letters.";
        } else {
          form1.name.error = "";
        }
        break;
      case "vat_number":
        if (IsNullOrEmpty(value)) {
          form1.vat_number.error = "";
        } else if (value.length < 8 || value.length > 12) {
          form1.vat_number.error =
            "VAT number must be between 8 and 12 characters.";
        } else if (!/^[A-Z]{2}/.test(value)) {
          form1.vat_number.error =
            "VAT number must start with a country code (e.g., ES, DE, FR).";
        } else if (!/^[A-Z]{2}[0-9A-Z]+$/.test(value)) {
          form1.vat_number.error =
            "VAT number can only contain letters and numbers.";
        } else {
          form1.vat_number.error = "";
        }

        break;
      case "address":
        if (IsNullOrEmpty(value)) {
          form1.address.error = "Address is required.";
        } else if (value.length > 255) {
          form1.address.error = "Address cannot exceed 255 characters.";
        }
        break;
    }
  }

  public static validateForms2(value: string, type: string) {
    const form2: any = class_checkout.formCheckout2;

    switch (type) {
      case "postal_code":
        if (IsNullOrEmpty(value)) {
          form2.postal_code.error = "Postal code is required.";
        } else if (value.length < 3) {
          form2.postal_code.error =
            "Postal code must be at least 3 characters long.";
        } else if (value.length > 10) {
          form2.postal_code.error = "Postal code cannot exceed 10 characters.";
        } else if (!/^[A-Za-z0-9\s\-]+$/.test(value)) {
          form2.postal_code.error = "Postal code contains invalid characters.";
        } else {
          form2.postal_code.error = "";
        }
        break;
      case "state":
        if (IsNullOrEmpty(value)) {
          form2.state.error = "State is required.";
        } else if (value.length < 2) {
          form2.state.error = "State must be at least 2 characters long.";
        } else if (value.length > 50) {
          form2.state.error = "State cannot exceed 50 characters.";
        } else if (!/^[A-Za-z\s\-]+$/.test(value)) {
          form2.state.error = "State contains invalid characters.";
        } else {
          form2.state.error = "";
        }

        break;
    }
  }

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
    const dataUser: any = JSON.parse(site.getCookie("e.u.d"));

    const data: any = {
      id_usuario: dataUser.id_usuario,
    };

    const response: any = await c_clientes.fn_l_clientes(data);
    if (response) {
      console.log(response);
    }
  }

  public static async AddCliente() {
    const form1: any = class_checkout.formCheckout1;
    const form2: any = class_checkout.formCheckout2;

    const idsFormCheckout1: any = Object.values(
      class_checkout.formCheckout1
    ).map((field) => ({
      id: field.id,
      value: field.value,
    }));

    const idsFormCheckout2: any = Object.values(
      class_checkout.formCheckout2
    ).map((field) => ({
      id: field.id,
      value: field.value,
    }));

    for (const e of idsFormCheckout1) {
      class_checkout.validateForms1(e.value, e.id);
    }

    for (const e of idsFormCheckout2) {
      class_checkout.validateForms2(e.value, e.id);
    }

    if (
      IsNullOrEmpty(form1.name.error) ||
      IsNullOrEmpty(form1.vat_number.error) ||
      IsNullOrEmpty(form1.address.error) ||
      IsNullOrEmpty(form2.state.error) ||
      IsNullOrEmpty(form2.postal_code.error)
    ) {
      return;
    }

    if (userData.value) {
      await c_clientes.fn_a_clientes({
        id_usuario: userData.value.id_usuario,
        nombre: class_checkout.formCheckout1.name.value,
        numero_de_iva_empresa: class_checkout.formCheckout1.vat_number.value,
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
