import { ref } from "vue";
import { dgav, IsNullOrEmpty, notify, site } from "../../utils/site";
import { c_auth } from "../../services/s_auth";
import { c_general } from "../../services/s_general";
import { c_clientes } from "../../services/s_clientes";
import Cookies from "js-cookie";

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
    if (value.length < 8) {
      passwordError.value = "Password must be at least 8 characters long";
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
      email.value = "";
      password.value = "";

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

        const userData = Cookies.get("user_data");
        if (userData) {
          const parsedData = JSON.parse(userData);
          const response: any = await c_clientes.fn_l_carrito_cliente({
            id_usuario: parsedData.id_usuario,
          });

          if (response) {
            if (!IsNullOrEmpty(dgav.dataBase.message)) {
              notify.error(dgav.dataBase.message);
              return;
            }
          }

          site.setCookies({
            numberCart: response.length.toString(),
          });
        }

        site.RedirectPage("home");
      }
    }
  };
}
