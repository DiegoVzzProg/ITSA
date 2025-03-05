<template>
    <div class="flex w-full max-w-md h-full flex-col justify-center gap-3">
        <div class="flex flex-col gap-3 pb-6">
            <button @click="site.RedirectPage('home')" class="w-full flex flex-row justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M5 12l6 6" />
                    <path d="M5 12l6 -6" />
                </svg>
                <p>
                    to back
                </p>
            </button>
            <p class="px-[clamp(18px,3vw,28px)]">
                log in to your account
            </p>
            <div class="flex flex-col gap-3">
                <div class="flex flex-col gap-1" v-for="(item, index) in FormLogin.User" :key="index">
                    <input v-model="item.value" :type="item.type" class="border border-black py-5 px-3 rounded-full"
                        :placeholder="item.placeholder" :maxlength="item.maxLength" v-on:input="ValidateForm(item)">
                    <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                        v-if="item.error">
                        {{ item.error }}
                    </span>
                </div>
            </div>
            <div class="flex flex-row justify-end w-full px-[clamp(18px,3vw,28px)]" v-if="ForgotPassword">
                <button class="underline underline-offset-2" v-on:click="RetrievePassword()">forgot
                    password?</button>
            </div>
            <Loading v-if="responseLogin" />
            <button id="btnLogin" @click="btnLogin_OnClick()" v-else type="submit"
                class="bg-black py-5 px-3 rounded-full text-white">
                login
            </button>
        </div>
        <div class="flex w-full flex-col gap-3 pt-6">
            <p class="px-[clamp(18px,3vw,28px)]">
                need an account
            </p>
            <button type="button" v-on:click="site.RedirectPage('register')"
                class="bg-white border border-black py-5 px-3 rounded-full text-center">
                create account
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { site } from '../../../utils/site';
import { numberCartShopping } from '../../home/stores/CustomerStore';
import Loading from '../../components/Loading.vue';
import { s_auth } from '../services/s_auth';
const ForgotPassword = ref<boolean>(false)
const responseLogin = ref<any>(null);

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
})


onMounted(() => {
    FormLogin.Reset();
});


async function RetrievePassword(): Promise<any> {
    await s_auth.restorePassword({
        email: FormLogin.User.email.value
    });
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

    if (!emailRegex.test(value)) {
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
    } else if (value.length > 20) {
        password.error = "Password should not exceed 20 characters";
    } else {
        password.error = "";
    }
}

async function btnLogin_OnClick(): Promise<void> {
    const UserForm1: any = FormLogin.User;
    Object.keys(UserForm1).forEach((key) => {
        ValidateForm(UserForm1[key]);
    });

    if (UserForm1.email.error || UserForm1.password.error) return;

    const data: any = {
        email: UserForm1.email.value,
        password: UserForm1.password.value,
    };

    responseLogin.value = await s_auth.loginUser({ email: data.email, password: data.password });

    if (!responseLogin.value) {
        FormLogin.Reset();
        return;
    }

    site.setCookies(
        {
            "e.t": responseLogin.value.token,
            "r.t": responseLogin.value.refresh_token,
            "s.t": responseLogin.value.session_token,
        },
        false,
        1
    );

    const response: any = await s_auth.secretKey();

    if (response.secretKey) {
        site.setCookies(
            {
                "e.k": response.secretKey,
            },
            false
        );

        site.setCookies({
            "e.u.d": JSON.stringify(responseLogin.value.user_data),
            "e.c.d": JSON.stringify(responseLogin.value.client_data),
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

</script>

<style scoped></style>
