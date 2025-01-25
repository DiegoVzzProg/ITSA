import { ref } from "vue";
import { dgav, IsNullOrEmpty, notify, site } from "../../utils/site";
import { c_auth } from "../../services/s_auth";
import { c_general } from "../../services/s_general";

export const email = ref("");
export const password = ref("");

export const emailError = ref("");
export const passwordError = ref("");

export class c_loginView {
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

  public static Login = async () => {
    this.validateEmail(email.value);
    this.validatePassword(password.value);

    if (emailError.value || passwordError.value) return;

    let response: any = await c_auth.fn_login({
      email: email.value,
      password: password.value,
    });

    const message: string = dgav.dataBase.message;
    if (!IsNullOrEmpty(message)) {
      notify.error(message);
      return;
    }

    if (response) {
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
