import { ref } from "vue";
import { dgav, IsNullOrEmpty, notify, site } from "../../utils/site";
import { c_auth } from "../../services/s_auth";
import { c_general } from "../../services/s_general";

export const email = ref("");
export const name = ref<string>("");
export const password = ref("");
export const passwordConfirm = ref("");
export const leyo_terms = ref<boolean>(false);

export const nameError = ref<string>("");
export const emailError = ref("");
export const passwordError = ref("");
export const passwordConfirmError = ref("");
export const leyoTermsError = ref<string>("");

export class c_registerView {
  public static validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      emailError.value = "The email is invalid";
    } else {
      emailError.value = "";
    }
  };

  public static validatePassword = (value: string) => {
    if (value.length < 4) {
      passwordError.value = "Password must be at least 4 characters long";
    } else {
      passwordError.value = "";
    }
  };

  public static validatePasswordConfirm = (value: string) => {
    console.log(password.value, value);

    if (password.value != value) {
      passwordConfirmError.value = "Password does not match";
    } else {
      passwordConfirmError.value = "";
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
      nameError.value = "This field is required";
    } else {
      nameError.value = "";
    }
  };

  public static Register = async () => {
    this.validateEmail(email.value);
    this.validatePasswordConfirm(passwordConfirm.value);
    this.validatePassword(password.value);
    this.validateTerms(leyo_terms.value);
    this.validateName(name.value);

    if (
      emailError.value ||
      passwordError.value ||
      passwordConfirmError.value ||
      leyoTermsError.value ||
      nameError.value
    )
      return;

    let response: any = await c_auth.fn_register({
      nombre: name.value,
      email: email.value,
      password: password.value,
      leyo_terms: leyo_terms.value,
    });
    if (response) {
      const message: string = dgav.dataBase.message;
      if (!IsNullOrEmpty(message)) {
        notify.error(message);
        return;
      }

      site.setCookies({
        token: response.token,
        user_data: JSON.stringify(response.user_data),
        logged_in_successfully: "false",
      });

      response = await c_general.SecretKey();
      if (response) {
        site.setCookies({
          secretKey: response.secretKey || "",
        });

        site.RedirectPage("home");
      }
    }
  };
}
