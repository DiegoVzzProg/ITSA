import { reactive, ref } from "vue";
import { notify, site } from "../../utils/site";
import {
  sp_delete_product_from_shoppingCart,
  sp_edit_customer,
  sp_proceed_to_checkout,
  sp_shopping_cart_client,
} from "../../stores/store_customers";
import { numberCartShopping } from "../../stores/countCartShopping";

export const CheckOutClass = {
  ProductData: ref<any>({}),
  ProductPrecio: ref<string>(""),
  Impuesto: ref<string>(""),
  ClientData: ref<any>(null),
  Finish: ref<boolean>(false),
  Editar: ref<boolean>(false),

  FormCostumer: reactive({
    Customer: {
      Form1: {
        name: {
          id: "name",
          value: "",
          placeholder: "Name",
          error: "",
          maxLength: 255,
        },
        vat_number: {
          id: "vat_number",
          value: "",
          placeholder: "Vat number",
          error: "",
          maxLength: 12,
        },
        address: {
          id: "address",
          value: "",
          placeholder: "Address",
          error: "",
          maxLength: 255,
        },
        phone: {
          id: "phone",
          value: "",
          placeholder: "Phone",
          error: "",
          maxLength: 10,
        },
      },
      Form2: {
        postal_code: {
          id: "postal_code",
          value: "",
          placeholder: "Postal Code",
          error: "",
          maxLength: 10,
        },
        state: {
          id: "state",
          value: "",
          placeholder: "State",
          error: "",
          maxLength: 50,
        },
      },
      Form3: {
        country: {
          id: "country",
          value: "",
          placeholder: "Country",
          error: "",
          id_pais: 0,
        },
      },
    },

    Reset: function () {
      this.Customer.Form1.name.value = "";
      this.Customer.Form1.vat_number.value = "";
      this.Customer.Form1.address.value = "";
      this.Customer.Form2.postal_code.value = "";
      this.Customer.Form2.state.value = "";
      this.Customer.Form3.country.value = "";
      this.Customer.Form1.name.error = "";
      this.Customer.Form1.vat_number.error = "";
      this.Customer.Form1.address.error = "";
      this.Customer.Form2.postal_code.error = "";
      this.Customer.Form2.state.error = "";
      this.Customer.Form3.country.error = "";
    },
  }),

  OnInit: function (): void {
    numberCartShopping().update();

    if (numberCartShopping().count == 0) {
      site.RedirectPage("home");
    }
    this.ClientData.value = JSON.parse(site.getCookie("e.c.d"));
    this.Productos();
  },

  Productos: async function (): Promise<any> {
    if (site.userData()) {
      await sp_shopping_cart_client().exec();

      this.ProductData.value = sp_shopping_cart_client().data.carrito_cliente;
      this.ProductPrecio.value = sp_shopping_cart_client().data.precio;
      this.Impuesto.value = sp_shopping_cart_client().data.impuesto;
    }
  },

  ValidateRegistrationForm: function (item: any) {
    item.value = site.IsNullOrEmpty(item.value) ? "" : item.value.trim();
    switch (item.id) {
      case "name":
        this.ValidateName(item.value);
        break;
      case "address":
        this.ValidateAddress(item.value);
        break;
      case "vat_number":
        this.ValidateVatNumber(item.value);
        break;
      case "postal_code":
        this.ValidatePostalCode(item.value);
        break;
      case "state":
        this.ValidateState(item.value);
        break;
      case "country":
        this.ValidateCountry();
        break;
      case "phone":
        this.ValidatePhone(item.value);
        break;
    }
  },

  ValidateName: function (value: string) {
    const name: any = this.FormCostumer.Customer.Form1.name;

    if (site.IsNullOrEmpty(value)) {
      name.error = "This field is required.";
      return;
    }
    if (value.length > 255) {
      name.error = "The input cannot exceed 255 characters.";
      return;
    }
    if (!/^[a-zA-Z\u00C0-\u00FF\s]+$/.test(value)) {
      name.error = "The input can only contain letters.";
      return;
    }
    name.error = "";
  },

  ValidateVatNumber: function (value: string) {
    const vat_number: any = this.FormCostumer.Customer.Form1.vat_number;

    if (value == "") return;

    if (value.length < 8 || value.length > 12) {
      vat_number.error = "VAT number must be between 8 and 12 characters.";
      return;
    }
    if (!/^[A-Z]{2}/.test(value)) {
      vat_number.error =
        "VAT number must start with a country code (e.g., ES, DE, FR).";
      return;
    }
    if (!/^[A-Z]{2}[0-9A-Z]+$/.test(value)) {
      vat_number.error = "VAT number can only contain letters and numbers.";
      return;
    }
    vat_number.error = "";
  },

  ValidateAddress: function (value: string) {
    const address: any = this.FormCostumer.Customer.Form1.address;
    if (site.IsNullOrEmpty(value)) {
      address.error = "Address is required.";
      return;
    }
    if (value.length > 255) {
      address.error = "Address cannot exceed 255 characters.";
      return;
    }
    address.error = "";
  },

  ValidatePostalCode: function (value: string) {
    const postal_code: any = this.FormCostumer.Customer.Form2.postal_code;
    if (site.IsNullOrEmpty(value)) {
      postal_code.error = "Postal code is required.";

      return;
    }
    if (value.length < 3) {
      postal_code.error = "Postal code must be at least 3 characters long.";
      return;
    }
    if (value.length > 10) {
      postal_code.error = "Postal code cannot exceed 10 characters.";
      return;
    }
    if (!/^[A-Za-z0-9\s\-]+$/.test(value)) {
      postal_code.error = "Postal code contains invalid characters.";

      return;
    }
    postal_code.error = "";
  },

  ValidateState: function (value: string): void {
    const state: any = this.FormCostumer.Customer.Form2.state;
    if (site.IsNullOrEmpty(value)) {
      state.error = "State is required.";
      return;
    }
    if (value.length < 2) {
      state.error = "State must be at least 2 characters long.";
      return;
    }
    if (value.length > 50) {
      state.error = "State cannot exceed 50 characters.";
      return;
    }

    if (!/^[A-Za-z\s\-]+$/.test(value)) {
      state.error = "State contains invalid characters.";
      return;
    }
    state.error = "";
  },

  ValidateCountry: function (): void {
    const country: any = this.FormCostumer.Customer.Form3.country;
    if (country.id_pais == 0) {
      country.error = "Country is required.";
      return;
    }
    country.error = "";
  },

  ValidatePhone: function (value: string): void {
    const phone: any = this.FormCostumer.Customer.Form1.phone;
    if (site.IsNullOrEmpty(value)) {
      phone.error = "Phone is required.";
      return;
    }

    if (!/^[0-9\s\-]+$/.test(value)) {
      phone.error = "Phone contains invalid characters.";
      return;
    }

    if (value.length < 10 || value.length > 10) {
      phone.error = "Phone must be at least 10 characters long.";
      return;
    }

    phone.error = "";
  },

  CheckoutSession: async function (): Promise<any> {
    await sp_proceed_to_checkout().exec();

    if (sp_proceed_to_checkout().data) {
      const url: any = sp_proceed_to_checkout().data.redirectStripePayment;

      if (site.IsNullOrEmpty(url)) {
        return;
      }

      window.location.href = url;
    }
  },

  FunctionEdit: function (): void {
    this.Editar.value = !this.Editar.value;
    const form1: any = this.FormCostumer.Customer.Form1;
    const form2: any = this.FormCostumer.Customer.Form2;
    const form3: any = this.FormCostumer.Customer.Form3;

    form1.name.value = this.ClientData.value.nombre;
    form1.vat_number.value = this.ClientData.value.numero_de_iva_empresa;
    form1.address.value = this.ClientData.value.direccion;
    form1.phone.value = this.ClientData.value.telefono;
    form2.state.value = this.ClientData.value.estado;
    form2.postal_code.value = this.ClientData.value.codigo_postal;
    form3.country.id_pais = this.ClientData.value.id_pais;
  },

  FunctionEditClient: async function (): Promise<any> {
    const CustomerForm1: any = this.FormCostumer.Customer.Form1;

    Object.keys(CustomerForm1).forEach((key) => {
      this.ValidateRegistrationForm(CustomerForm1[key]);
    });

    const CustomerForm2: any = this.FormCostumer.Customer.Form2;
    Object.keys(CustomerForm2).forEach((key) => {
      this.ValidateRegistrationForm(CustomerForm2[key]);
    });

    const CustomerForm3: any = this.FormCostumer.Customer.Form3;
    this.ValidateRegistrationForm(CustomerForm3.country);

    if (
      !site.IsNullOrEmpty(CustomerForm1.name.error) ||
      !site.IsNullOrEmpty(CustomerForm1.vat_number.error) ||
      !site.IsNullOrEmpty(CustomerForm1.address.error) ||
      !site.IsNullOrEmpty(CustomerForm2.state.error) ||
      !site.IsNullOrEmpty(CustomerForm2.postal_code.error) ||
      !site.IsNullOrEmpty(CustomerForm3.country.error)
    )
      return;

    await sp_edit_customer().exec({
      id_cliente: this.ClientData.value.id_cliente,
      nombre: CustomerForm1.name.value,
      numero_de_iva_empresa: CustomerForm1.vat_number.value,
      direccion: CustomerForm1.address.value,
      codigo_postal: CustomerForm2.postal_code.value,
      estado: CustomerForm2.state.value,
      id_pais: CustomerForm3.country.id_pais,
      telefono: CustomerForm1.phone.value,
    });

    if (sp_edit_customer().data) {
      notify.success("your billing information has been saved.");
      this.ClientData.value = sp_edit_customer().data;
      site.setCookies({
        "e.c.d": JSON.stringify(sp_edit_customer().data),
      });
      this.Editar.value = false;
    }
  },

  FunctionFinish: function (): void {
    this.Finish.value = !this.Finish.value;
  },

  DeleteProduct: async function (id_producto: string) {
    await sp_delete_product_from_shoppingCart().exec({
      id_producto: btoa(id_producto),
    });

    if (sp_delete_product_from_shoppingCart().data) {
      notify.success("Product deleted");

      if (sp_delete_product_from_shoppingCart().data.productos.length == 0) {
        site.RedirectPage("home");
        return;
      }

      this.Productos();
    }
  },
};
