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
                <div class="flex flex-col gap-1">
                    <Field name="email" v-slot="{ field, meta, errorMessage }">
                        <input v-bind="field" type="email" placeholder="email" v-model="email"
                            class="border border-black py-5 px-3 rounded-full" @blur="onEmailBlur(meta)"
                            autocomplete="off" />
                        <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold">{{
                            errorMessage }}</span>
                    </Field>
                </div>
                <div class="flex flex-col gap-1">
                    <Field name="password" placeholder="password" type="password"
                        class="border border-black py-5 px-3 rounded-full" autocomplete="off" />
                    <ErrorMessage class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                        name="password" />
                </div>
            </div>
            <div class="flex flex-row justify-end w-full px-[clamp(18px,3vw,28px)]">
                <button class="underline underline-offset-2" v-show="visibleRecovery" v-on:click="RetrievePassword()"
                    v-if="enableRecovery">
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
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { onMounted, onUnmounted, ref } from "vue";
import { notify, site } from "../../../utils/site";
import Loading from "../../components/Loading.vue";
import { CostumersClass } from "../../home/services/costumers-service";
import { AuthClass, ILogin, IRestorePassword } from "../services/auth-service";
import { ApiResponse } from "../../../utils/Api.interface";
const enableRecovery = ref<boolean>(true);
const visibleRecovery = ref<boolean>(false);
const email = ref<string>('');
const loading = ref<boolean>(false);

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

    if (!email.value)
        return;

    enableRecovery.value = false;

    const params: IRestorePassword = {
        email: email.value?.trim() ?? '',
    };

    const response: ApiResponse = await new AuthClass().restorePassword(params);

    if (response.data?.exito) {
        notify.success(response.data.message);
    }

    enableRecovery.value = true;
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

async function onEmailBlur(meta: { valid: boolean; touched: boolean }) {
    if (meta.valid && meta.touched) {
        visibleRecovery.value = true;
    }
}
onUnmounted(() => { });
</script>

<style scoped></style>
