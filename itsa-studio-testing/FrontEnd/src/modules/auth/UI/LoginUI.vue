<template>
  <div class="flex w-full max-w-md h-full flex-col justify-center gap-3">
    <div class="flex flex-col gap-3 pb-6">
      <button @click="site.RedirectPage({ name: 'home' })" class="w-full flex flex-row justify-end">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>
        <p>to back</p>
      </button>
      <p class="px-[clamp(18px,3vw,28px)]">log in to your account</p>
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-1" v-for="(item, index) in FormLogin.User" :key="index">
          <input v-model="item.value" :type="item.type" class="border border-black py-5 px-3 rounded-full"
            :placeholder="item.placeholder" :maxlength="item.maxLength" v-on:input="ValidateForm(item)" />
          <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold" v-if="item.error">
            {{ item.error }}
          </span>
        </div>
      </div>
      <div class="flex flex-row justify-end w-full px-[clamp(18px,3vw,28px)]" v-if="ForgotPassword">
        <button class="underline underline-offset-2" v-on:click="RetrievePassword()" v-if="DeshabilitarBotonPass">
          forgot password?
        </button>
        <Loading v-else />
      </div>
      <Loading v-if="loading" />
      <button id="btnLogin" @click="btnLogin_OnClick()" v-else type="submit"
        class="bg-black py-5 px-3 rounded-full text-white">
        login
      </button>
    </div>
    <div class="flex w-full flex-col gap-3 pt-6">
      <p class="px-[clamp(18px,3vw,28px)]">need an account?</p>
      <button type="button" v-on:click="site.RedirectPage({ name: 'register' })"
        class="bg-white border border-black py-5 px-3 rounded-full text-center">
        create account
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { notify, site } from "../../../utils/site";
import Loading from "../../components/Loading.vue";
import { CostumersClass } from "../../home/services/costumers-service";
import { AuthClass, ILogin, IRestorePassword } from "../services/auth-service";
import { ApiResponse } from "../../../utils/Api.interface";
const ForgotPassword = ref<boolean>(false);
const DeshabilitarBotonPass = ref<boolean>(true);
const loading = ref<boolean>(false);
const FormLogin = reactive({
  User: {
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
  },
  Reset: function (): void {
    this.User.email.value = "";
    this.User.password.value = "";
    this.User.email.error = "";
    this.User.password.error = "";
  },
});

onMounted(() => {
  FormLogin.Reset();
});

async function RetrievePassword(): Promise<any> {
  DeshabilitarBotonPass.value = false;

  const params: IRestorePassword = {
    email: FormLogin.User.email.value.trim(),
  };

  const response: ApiResponse = await new AuthClass().restorePassword(params);

  if (response.data?.exito) {
    notify.success(response.data.message);
  }

  DeshabilitarBotonPass.value = true;
}

function ValidateForm(item: any): void {
  switch (item.id) {
    case "email":
      ValidateEmail(item.value);
      break;
    case "password":
      ValidatePassword(item.value);
      break;
  }
}

function ValidateEmail(value: string): void {
  const email = FormLogin.User.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  ForgotPassword.value = false;

  if (!emailRegex.test(value.trim())) {
    email.error = "The email is invalid";
    return;
  }

  if (value.length > 254) {
    email.error = "The email should not exceed 254 characters";
    return;
  }

  ForgotPassword.value = true;
  email.error = "";
}

function ValidatePassword(value: string): void {
  const password = FormLogin.User.password;

  if (value.length < 8) {
    password.error = "Password must be at least 8 characters long";
    return;
  }

  if (value.length > 20) {
    password.error = "Password should not exceed 20 characters";
    return;
  }
  password.error = "";
}

async function btnLogin_OnClick(): Promise<void> {
  const UserForm1: any = FormLogin.User;
  Object.keys(UserForm1).forEach((key) => {
    ValidateForm(UserForm1[key]);
  });

  if (UserForm1.email.error || UserForm1.password.error) return;
  loading.value = true;

  const params: ILogin = {
    email: UserForm1.email.value.trim(),
    password: UserForm1.password.value.trim(),
  };

  const response: ApiResponse = await new AuthClass().Login(params);

  if (!response.data) {
    FormLogin.Reset();
    loading.value = false;
    return;
  }

  site.setCookies(
    {
      "e.t": response.data.token,
      "r.t": response.data.refresh_token,
      "s.t": response.data.session_token,
      "e.k": response.data.secretKey,
    },
    false,
    1
  );

  if (response.data.client_data)
    site.setCookies({
      "e.c.d": JSON.stringify(response.data.client_data),
    });

  site.LocalStorage("set", {
    logged_in_successfully: false,
    "e.u.d": JSON.stringify(response.data.user_data),
  });

  await new CostumersClass().shoppingCartClient();
  loading.value = false;
  site.RedirectPage({ name: "home" });
}

onUnmounted(() => { });
</script>

<style scoped></style>
