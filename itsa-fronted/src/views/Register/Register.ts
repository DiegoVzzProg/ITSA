import { ref } from "vue";
import { dgav, IsNullOrEmpty, notify, site } from "../../utils/site";
import { c_auth } from "../../services/s_auth";
import { c_general } from "../../services/s_general";

export const FormRegister = ref<any>({
  name: {
    placeholder: "user name",
    value: "",
    error: "",
    maxLength: 24,
    type: "text",
  },
  email: {
    placeholder: "email",
    value: "",
    error: "",
    maxLength: 254,
    type: "text",
  },
  password: {
    placeholder: "password",
    value: "",
    error: "",
    maxLength: 20,
    type: "password",
  },
  passwordConfirm: {
    placeholder: "password confirmation",
    value: "",
    error: "",
    maxLength: 20,
    type: "password",
  },
});

export const leyo_terms = ref<boolean>(false);

export const leyoTermsError = ref<string>("");

export class c_registerView {
  private static formsProps = FormRegister.value;

  public static validacionesFormRegister = (placeholder: string) => {
    switch (placeholder.replace(" ", "").trim()) {
      case "username":
        this.validateName(this.formsProps.name.value);
        break;
      case "email":
        this.validateEmail(this.formsProps.email.value);
        break;
      case "password":
        this.validatePassword(this.formsProps.password.value);
        break;
      case "passwordconfirmation":
        this.validatePasswordConfirm(this.formsProps.passwordConfirm.value);
        break;
      default:
        break;
    }
  };

  public static validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      this.formsProps.email.error = "The email is invalid";
    } else if (value.length > this.formsProps.email.maxLength) {
      this.formsProps.email.error =
        "The email should not exceed " +
        this.formsProps.email.maxLength +
        " characters";
    } else {
      this.formsProps.email.error = "";
    }
  };

  public static validatePassword = (value: string) => {
    if (value.length < 8) {
      this.formsProps.password.error =
        "Password must be at least 8 characters long";
    } else if (value.length > this.formsProps.password.maxLength) {
      this.formsProps.password.error =
        "Password must not exceed " +
        this.formsProps.password.maxLength +
        " characters";
    } else {
      this.formsProps.password.error = "";
    }
  };

  public static validatePasswordConfirm = (value: string) => {
    if (this.formsProps.password.value != value) {
      this.formsProps.passwordConfirm.error = "Password does not match";
    } else {
      this.formsProps.passwordConfirm.error = "";
    }
  };

  public static validateTerms = (value: boolean) => {
    if (!value) {
      leyoTermsError.value = "You must accept the terms and conditions";
    } else {
      leyoTermsError.value = "";
    }
  };

  public static validateName = (value: string) => {
    if (IsNullOrEmpty(value)) {
      this.formsProps.name.error = "This field is required";
    } else if (value.length > this.formsProps.name.maxLength) {
      this.formsProps.name.error =
        "The name must not exceed " +
        this.formsProps.name.maxLength +
        " characters";
    } else if (value.length < 4) {
      this.formsProps.name.error =
        "The name must be at least 4 characters long";
    } else if (!/^[^\s`]+$/.test(value)) {
      this.formsProps.name.error =
        "The name cannot contain spaces and backticks";
    } else {
      this.formsProps.name.error = "";
    }
  };

  public static Register = async () => {
    this.validateEmail(this.formsProps.email.value);
    this.validatePasswordConfirm(this.formsProps.passwordConfirm.value);
    this.validatePassword(this.formsProps.password.value);
    this.validateTerms(leyo_terms.value);
    this.validateName(this.formsProps.name.value);

    if (
      this.formsProps.email.error ||
      this.formsProps.password.error ||
      this.formsProps.passwordConfirm.error ||
      leyoTermsError.value ||
      this.formsProps.name.error
    )
      return;

    const responseRegister = await c_auth.registerUser({
      nombre: this.formsProps.name.value,
      email: this.formsProps.email.value,
      password: this.formsProps.password.value,
      leyo_terms: leyo_terms.value,
    });

    const message: string = dgav.dataBase.message;
    if (!IsNullOrEmpty(message)) {
      notify.error(message);
      return;
    }

    if (responseRegister) {
      site.setCookies(
        {
          "e.t": responseRegister.token,
          "r.t": responseRegister.refresh_token,
        },
        false
      );

      const response = await c_general.SecretKey();

      if (response && responseRegister) {
        site.setCookies(
          {
            "e.k": response.secretKey || "",
            logged_in_successfully: "false",
          },
          false
        );

        site.setCookies({
          "e.u.d": JSON.stringify(responseRegister.user_data),
        });
        site.RedirectPage("home");
      }
    }
  };
}
