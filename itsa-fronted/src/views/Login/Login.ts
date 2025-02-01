import { ref } from "vue";
import { dgav, IsNullOrEmpty, notify, site } from "../../utils/site";
import { c_auth } from "../../services/s_auth";
import { c_general } from "../../services/s_general";
import { c_clientes } from "../../services/s_clientes";
import Cookies from "js-cookie";

export const forgotPassword = ref<boolean>(false);
export const FormLogin = ref<any>({
  email: {
    placeholder: "email",
    value: "",
    error: "",
  },
  password: {
    placeholder: "password",
    value: "",
    error: "",
  },
});

export class c_loginView {
  public static async RecuperarPassword() {
    await c_auth.fn_forgot_password_restore({
      email: FormLogin.value.email.value,
    });

    const message = dgav.dataBase.message;
    const status = dgav.dataBase.status;
    console.log(status);

    if (status == 200) {
      notify.success(message);
    } else {
      notify.error(message);
    }
  }

  public static validaciones(value: string, seccion: string) {
    switch (seccion) {
      case "email":
        this.validateEmail(value);
        break;
      case "password":
        this.validatePassword(value);
        break;
      default:
        break;
    }
  }

  public static validateEmail = (value: string) => {
    const formEmail = FormLogin.value.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    forgotPassword.value = false;

    if (!emailRegex.test(value)) {
      formEmail.error = "The email is invalid";
      return;
    }

    if (value.length > 254) {
      formEmail.error = "The email should not exceed 254 characters";
      return;
    }

    forgotPassword.value = true;
    formEmail.error = "";
  };

  public static validatePassword = (value: string) => {
    const formPassword = FormLogin.value.password;
    if (value.length < 8) {
      formPassword.error = "Password must be at least 8 characters long";
    } else if (value.length > 20) {
      formPassword.error = "Password should not exceed 20 characters";
    } else {
      formPassword.error = "";
    }
  };

  public static Login = async () => {
    const formEmail = FormLogin.value.email;
    const formPassword = FormLogin.value.password;

    this.validateEmail(formEmail.value);
    this.validatePassword(formPassword.value);

    if (formEmail.error || formPassword.error) return;

    const responseLogin: any = await c_auth.fn_login({
      email: formEmail.value,
      password: formPassword.value,
    });

    const message: string = dgav.dataBase.message;
    if (!IsNullOrEmpty(message)) {
      notify.error(message);
      return;
    }

    if (responseLogin) {
      FormLogin.value.email.value = "";
      FormLogin.value.password.value = "";

      site.setCookies(
        {
          token: responseLogin.token,
        },
        false
      );

      const response = await c_general.SecretKey();
      if (response) {
        site.setCookies(
          {
            secretKey: response.secretKey,
          },
          false
        );

        site.setCookies({
          user_data: JSON.stringify(responseLogin.user_data),
          logged_in_successfully: "false",
        });

        const userData = site.getCookie("user_data");
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

          site.setCookies(
            {
              numberCart: response.length.toString() ?? "0",
            },
            false
          );

          site.RedirectPage("home");
        }
      }
    }
  };
}
