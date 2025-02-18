import { reactive, ref } from "vue";
import { IsNullOrEmpty, site } from "../../utils/site";
import { sp_register_user } from "../../stores/sotre_auth";
import { sp_secret_key } from "../../stores/store_general";

export const RegisterClass = {
  ContinueRegistration: ref<number>(0),

  OnInit: function () {},

  FormLeyoTerms: reactive({
    value: false,
    error: "",
  }),

  FormRegister: reactive({
    User: {
      user_name: {
        id: "username",
        placeholder: "user name",
        value: "",
        error: "",
        maxLength: 24,
        type: "text",
      },
      email: {
        id: "email",
        placeholder: "email",
        value: "",
        error: "",
        maxLength: 254,
        type: "text",
      },
      password: {
        id: "password",
        placeholder: "password",
        value: "",
        error: "",
        maxLength: 20,
        type: "password",
      },
      passwordConfirm: {
        id: "passwordconfirmation",
        placeholder: "password confirmation",
        value: "",
        error: "",
        maxLength: 20,
        type: "password",
      },
    },
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
        },
        state: {
          id: "state",
          value: "",
          placeholder: "State",
          error: "",
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
      this.User.user_name.value = "";
      this.User.email.value = "";
      this.User.password.value = "";
      this.User.passwordConfirm.value = "";
      this.Customer.Form1.name.value = "";
      this.Customer.Form1.vat_number.value = "";
      this.Customer.Form1.address.value = "";
      this.Customer.Form2.postal_code.value = "";
      this.Customer.Form2.state.value = "";
      this.Customer.Form3.country.value = "";
      RegisterClass.FormLeyoTerms.value = false;
      RegisterClass.FormLeyoTerms.error = "";
      this.User.user_name.error = "";
      this.User.email.error = "";
      this.User.password.error = "";
      this.User.passwordConfirm.error = "";
      this.Customer.Form1.name.error = "";
      this.Customer.Form1.vat_number.error = "";
      this.Customer.Form1.address.error = "";
      this.Customer.Form2.postal_code.error = "";
      this.Customer.Form2.state.error = "";
      this.Customer.Form3.country.error = "";
    },
  }),

  btnContinueForm: function () {
    if (this.ContinueRegistration.value > 2) {
      this.ContinueRegistration.value = 2;
      return;
    }

    const UserForm1: any = this.FormRegister.User;
    Object.keys(UserForm1).forEach((key) => {
      this.ValidateRegistrationForm(UserForm1[key]);
    });

    this.ValidateTerms(this.FormLeyoTerms.value);

    if (
      this.FormRegister.User.email.error ||
      this.FormRegister.User.password.error ||
      this.FormRegister.User.passwordConfirm.error ||
      this.FormRegister.User.user_name.error ||
      this.FormLeyoTerms.error
    )
      return;

    this.ContinueRegistration.value++;
  },

  btnToBack: function () {
    if (this.ContinueRegistration.value == 0) {
      this.FormRegister.Reset();
      site.RedirectPage("home");
      return;
    }

    if (this.ContinueRegistration.value <= 0) {
      this.ContinueRegistration.value = 0;
      return;
    }

    this.ContinueRegistration.value--;
  },

  ValidateRegistrationForm: function (item: any) {
    switch (item.id) {
      case "username":
        this.ValidateUserName(item.value);
        break;
      case "email":
        this.ValidateEmail(item.value);
        break;
      case "password":
        this.ValidatePassword(item.value);
        break;
      case "passwordconfirmation":
        this.ValidatePasswordConfirm(item.value);
        break;
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

  ValidatePassword: function (value: string) {
    if (value.length < 8) {
      this.FormRegister.User.password.error =
        "Password must be at least 8 characters long";
    } else if (value.length > this.FormRegister.User.password.maxLength) {
      this.FormRegister.User.password.error =
        "Password must not exceed " +
        this.FormRegister.User.password.maxLength +
        " characters";
    } else {
      this.FormRegister.User.password.error = "";
    }
  },

  ValidatePasswordConfirm: function (value: string) {
    if (this.FormRegister.User.password.value != value) {
      this.FormRegister.User.passwordConfirm.error = "Password does not match";
    } else {
      this.FormRegister.User.passwordConfirm.error = "";
    }
  },

  ValidateEmail: function (value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      this.FormRegister.User.email.error = "The email is invalid";
    } else if (value.length > this.FormRegister.User.email.maxLength) {
      this.FormRegister.User.email.error =
        "The email should not exceed " +
        this.FormRegister.User.email.maxLength +
        " characters";
    } else {
      this.FormRegister.User.email.error = "";
    }
  },

  ValidateUserName: function (value: string) {
    if (IsNullOrEmpty(value)) {
      this.FormRegister.User.user_name.error = "This field is required";
    } else if (value.length > this.FormRegister.User.user_name.maxLength) {
      this.FormRegister.User.user_name.error =
        "The name must not exceed " +
        this.FormRegister.User.user_name.maxLength +
        " characters";
    } else if (value.length < 4) {
      this.FormRegister.User.user_name.error =
        "The name must be at least 4 characters long";
    } else if (!/^[^\s`]+$/.test(value)) {
      this.FormRegister.User.user_name.error =
        "The name cannot contain spaces and backticks";
    } else {
      this.FormRegister.User.user_name.error = "";
    }
  },

  ValidateTerms: function (value: boolean) {
    if (!value) {
      this.FormLeyoTerms.error = "You must accept the terms and conditions";
    } else {
      this.FormLeyoTerms.error = "";
    }
  },

  ValidateName: function (value: string) {
    const name: any = this.FormRegister.Customer.Form1.name;

    if (IsNullOrEmpty(value)) {
      name.error = "This field is required.";
    } else if (value.length > 255) {
      name.error = "The input cannot exceed 255 characters.";
    } else if (!/^[a-zA-Z\u00C0-\u00FF\s]+$/.test(value)) {
      name.error = "The input can only contain letters.";
    } else {
      name.error = "";
    }
  },

  ValidateVatNumber: function (value: string) {
    const vat_number: any = this.FormRegister.Customer.Form1.vat_number;
    if (IsNullOrEmpty(value)) {
      vat_number.error = "";
    } else if (value.length < 8 || value.length > 12) {
      vat_number.error = "VAT number must be between 8 and 12 characters.";
    } else if (!/^[A-Z]{2}/.test(value)) {
      vat_number.error =
        "VAT number must start with a country code (e.g., ES, DE, FR).";
    } else if (!/^[A-Z]{2}[0-9A-Z]+$/.test(value)) {
      vat_number.error = "VAT number can only contain letters and numbers.";
    } else {
      vat_number.error = "";
    }
  },

  ValidateAddress: function (value: string) {
    const address: any = this.FormRegister.Customer.Form1.address;
    if (IsNullOrEmpty(value)) {
      address.error = "Address is required.";
    } else if (value.length > 255) {
      address.error = "Address cannot exceed 255 characters.";
    } else {
      address.error = "";
    }
  },

  ValidatePostalCode: function (value: string) {
    const postal_code: any = this.FormRegister.Customer.Form2.postal_code;
    if (IsNullOrEmpty(value)) {
      postal_code.error = "Postal code is required.";
    } else if (value.length < 3) {
      postal_code.error = "Postal code must be at least 3 characters long.";
    } else if (value.length > 10) {
      postal_code.error = "Postal code cannot exceed 10 characters.";
    } else if (!/^[A-Za-z0-9\s\-]+$/.test(value)) {
      postal_code.error = "Postal code contains invalid characters.";
    } else {
      postal_code.error = "";
    }
  },

  ValidateState: function (value: string) {
    const state: any = this.FormRegister.Customer.Form2.state;
    if (IsNullOrEmpty(value)) {
      state.error = "State is required.";
    } else if (value.length < 2) {
      state.error = "State must be at least 2 characters long.";
    } else if (value.length > 50) {
      state.error = "State cannot exceed 50 characters.";
    } else if (!/^[A-Za-z\s\-]+$/.test(value)) {
      state.error = "State contains invalid characters.";
    } else {
      state.error = "";
    }
  },

  ValidateCountry: function () {
    const country: any = this.FormRegister.Customer.Form3.country;
    if (country.id_pais == 0) {
      country.error = "Country is required.";
    } else {
      country.error = "";
    }
  },

  ValidatePhone: function (value: string) {
    const phone: any = this.FormRegister.Customer.Form1.phone;
    if (IsNullOrEmpty(value)) {
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

  btnRegisterUser_OnClick: async function () {
    const CustomerForm1: any = this.FormRegister.Customer.Form1;
    Object.keys(CustomerForm1).forEach((key) => {
      this.ValidateRegistrationForm(CustomerForm1[key]);
    });

    const CustomerForm2: any = this.FormRegister.Customer.Form2;
    Object.keys(CustomerForm2).forEach((key) => {
      this.ValidateRegistrationForm(CustomerForm2[key]);
    });

    const CustomerForm3: any = this.FormRegister.Customer.Form3;
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

    const UserForm1: any = this.FormRegister.User;

    const data = {
      user_name: UserForm1.user_name.value,
      email: UserForm1.email.value,
      password: UserForm1.password.value,
      leyo_terms: this.FormLeyoTerms.value,
      nombre: CustomerForm1.name.value,
      numero_de_iva_empresa: CustomerForm1.vat_number.value,
      direccion: CustomerForm1.address.value,
      codigo_postal: CustomerForm2.postal_code.value,
      estado: CustomerForm2.state.value,
      id_pais: CustomerForm3.country.id_pais,
      telefono: CustomerForm1.phone.value,
    };

    await sp_register_user().exec(data);

    if (sp_register_user().data) {
      site.setCookies(
        {
          "e.t": sp_register_user().data.token,
          "r.t": sp_register_user().data.refresh_token,
          "s.t": sp_register_user().data.session_token,
        },
        false
      );

      await sp_secret_key().exec();
      if (sp_secret_key().data && sp_register_user().data) {
        site.setCookies(
          {
            "e.k": sp_secret_key().data.secretKey,
            logged_in_successfully: "false",
          },
          false
        );

        site.setCookies({
          "e.u.d": JSON.stringify(sp_register_user().data.user_data),
          "e.c.d": JSON.stringify(sp_register_user().data.client_data),
        });
        site.RedirectPage("home");
      }
    }
  },
};
