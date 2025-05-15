<template>
    <div class="flex w-full max-w-md h-full flex-col justify-center gap-3">
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
        <Form @submit="btnLogin_OnClick" :validation-schema="validationSchema" class="flex flex-col gap-3 pb-6">
            <p class="px-[clamp(18px,3vw,28px)]">log in to your account</p>
            <div class="flex flex-col gap-3">
                <div class="flex flex-col gap-1" v-for="(item, index) in FormLogin.User" :key="index">
                    <Field :name="item.id" :placeholder="item.placeholder" :type="item.type"
                        class="border border-black py-5 px-3 rounded-full" autocomplete="off" />
                    <ErrorMessage class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                        :name="item.id" />
                </div>
            </div>
            <div class="flex flex-row justify-end w-full px-[clamp(18px,3vw,28px)]">
                <button class="underline underline-offset-2" v-on:click="RetrievePassword()"
                    v-if="DeshabilitarBotonPass">
                    forgot password?
                </button>
                <Loading v-else />
            </div>
            <Loading v-if="loading" />
            <button v-else type="submit" class="bg-black py-5 px-3 rounded-full text-white">
                login
            </button>
        </Form>
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
import { Form, Field, ErrorMessage, useField } from "vee-validate";
import * as yup from "yup";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { notify, site } from "../../../utils/site";
import Loading from "../../components/Loading.vue";
import { CostumersClass } from "../../home/services/costumers-service";
import { AuthClass, ILogin, IRestorePassword } from "../services/auth-service";
import { ApiResponse } from "../../../utils/Api.interface";
const DeshabilitarBotonPass = ref<boolean>(true);
const loading = ref<boolean>(false);
const FormLogin = reactive({
    User: {
        email: {
            id: "email",
            placeholder: "email",
            maxLength: 254,
            type: "email",
        },
        password: {
            id: "password",
            placeholder: "password",
            maxLength: 20,
            type: "password",
        },
    }
});

const { value: email } = useField<string>('email')

const validationSchema = yup.object({
    email: yup
        .string()
        .required("email is mandatory")
        .email("you must add a valid email")
        .max(254, "this field must have a maximum of 254 characters"),
    password: yup
        .string()
        .required("password is required")
        .min(8, "this field must have at least 8 characters")
        .max(20, "this field must have a maximum of 254 characters")
});

onMounted(() => {

});

async function RetrievePassword(): Promise<any> {
    DeshabilitarBotonPass.value = false;

    const params: IRestorePassword = {
        email: email.value.trim() ?? '',
    };

    const response: ApiResponse = await new AuthClass().restorePassword(params);

    if (response.data?.exito) {
        notify.success(response.data.message);
    }

    DeshabilitarBotonPass.value = true;
}


async function btnLogin_OnClick(data: any): Promise<void> {
    loading.value = true;

    const params: ILogin = {
        email: data.email.trim(),
        password: data.password.trim(),
    };

    const response: ApiResponse = await new AuthClass().Login(params);

    if (!response.data) {
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
