import { reactive, ref } from "vue";
import { site } from "../../utils/site";
import { numberCartShopping } from "../../stores/countCartShopping";
import { sp_login_user, sp_restore_password } from "../../stores/sotre_auth";
import { sp_secret_key } from "../../stores/store_general";

export const LoginClass = {
  ForgotPassword: ref<boolean>(false),

  FormLogin: reactive({
    User: {
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
    },
    Reset: function (): void {
      this.User.email.value = "";
      this.User.password.value = "";
      this.User.email.error = "";
      this.User.password.error = "";
    },
  }),

  OnInit: function (): void {
    this.FormLogin.Reset();
  },

  RetrievePassword: async function (): Promise<any> {
    const data = {
      email: this.FormLogin.User.email.value,
    };
    await sp_restore_password().exec(data);
  },

  ValidateForm: function (item: any): void {
    switch (item.id) {
      case "email":
        this.ValidateEmail(item.value);
        break;
      case "password":
        this.ValidatePassword(item.value);
        break;
    }
  },

  ValidateEmail: function (value: string): void {
    const email = this.FormLogin.User.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    this.ForgotPassword.value = false;

    if (!emailRegex.test(value)) {
      email.error = "The email is invalid";
      return;
    }

    if (value.length > 254) {
      email.error = "The email should not exceed 254 characters";
      return;
    }

    this.ForgotPassword.value = true;
    email.error = "";
  },

  ValidatePassword: function (value: string): void {
    const password = this.FormLogin.User.password;
    if (value.length < 8) {
      password.error = "Password must be at least 8 characters long";
    } else if (value.length > 20) {
      password.error = "Password should not exceed 20 characters";
    } else {
      password.error = "";
    }
  },

  btnLogin_OnClick: async function (): Promise<void> {
    const UserForm1: any = this.FormLogin.User;
    Object.keys(UserForm1).forEach((key) => {
      this.ValidateForm(UserForm1[key]);
    });

    if (UserForm1.email.error || UserForm1.password.error) return;

    const data: any = {
      email: UserForm1.email.value,
      password: UserForm1.password.value,
    };

    await sp_login_user().exec(data);

    if (sp_login_user().data) {
      site.setCookies(
        {
          "e.t": sp_login_user().data.token,
          "r.t": sp_login_user().data.refresh_token,
          "s.t": sp_login_user().data.session_token,
        },
        false
      );

      await sp_secret_key().exec();
      if (sp_secret_key().data) {
        site.setCookies(
          {
            "e.k": sp_secret_key().data.secretKey,
          },
          false
        );

        site.setCookies({
          "e.u.d": JSON.stringify(sp_login_user().data.user_data),
          "e.c.d": JSON.stringify(sp_login_user().data.client_data),
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
          site.RedirectPage("home");
        }
      }
    }
  },
};
