import { ref } from "vue";

export const FormForgotPassword = ref<any>({
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
  passwordConfirm: {
    placeholder: "password confirmation",
    value: "",
    error: "",
  },
});

export class class_forgotPassword {
  public static onInit() {}
}
