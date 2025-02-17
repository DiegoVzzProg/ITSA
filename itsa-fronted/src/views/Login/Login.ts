import { ref } from "vue";
import { dgav, IsNullOrEmpty, notify, site } from "../../utils/site";
import { c_auth } from "../../services/s_auth";
import { c_general } from "../../services/s_general";
import { c_clientes } from "../../services/s_clientes";
import { numberCartShopping } from "../../stores/countCartShopping";
import { sp_login_user, sp_restore_password } from "../../stores/sotre_auth";
import { sp_secret_key } from "../../stores/store_general";

export const forgotPassword = ref<boolean>(false);
export const FormLogin = ref<any>({
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
});

export class c_loginView {
  public static onInit() {
    this.ResetFormLogin();
  }

  public static ResetFormLogin() {
    FormLogin.value.email.value = "";
    FormLogin.value.password.value = "";
    FormLogin.value.email.error = "";
    FormLogin.value.password.error = "";
  }

  public static async RecuperarPassword() {
    await sp_restore_password().exec({
      email: FormLogin.value.email.value,
    });
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

    const data: any = {
      email: formEmail.value,
      password: formPassword.value,
    };

    await sp_login_user().exec(data);

    const message: string = dgav.dataBase.message;
    if (!IsNullOrEmpty(message)) {
      notify.error(message);
      return;
    }

    if (sp_login_user().data) {
      site.setCookies(
        {
          "e.t": sp_login_user().data.token,
          "r.t": sp_login_user().data.refresh_token,
        },
        false
      );

      await sp_secret_key().exec();
      if (sp_secret_key().data && sp_login_user().data) {
        site.setCookies(
          {
            "e.k": sp_secret_key().data.secretKey,
          },
          false
        );

        site.setCookies({
          "e.u.d": JSON.stringify(sp_login_user().data.user_data),
        });

        site.setCookies(
          {
            logged_in_successfully: "false",
          },
          false
        );

        const userData = site.getCookie("e.u.d");

        if (userData) {
          numberCartShopping().update();

          this.ResetFormLogin();
          site.RedirectPage("home");
        }
      }
    }
  };
}
