<script setup lang="ts">
import { ref, watch } from 'vue';
import { fnLogin } from '../services/s_login/s_login';
import Cookies from "js-cookie";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');

const emailError = ref('');
const passwordError = ref('');

const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        emailError.value = 'The email is invalid';
    } else {
        emailError.value = '';
    }
};

const validatePassword = (value: string) => {
    if (value.length < 3) {
        passwordError.value = 'Password must be at least 3 characters long';
    } else {
        passwordError.value = '';
    }
};

watch(email, (newValue) => {
    validateEmail(newValue);
});

watch(password, (newValue) => {
    validatePassword(newValue);
});

const Login = async () => {
    validateEmail(email.value);
    validatePassword(password.value);

    if (emailError.value && passwordError.value)
        return;

    const data = {
        email: email.value,
        password: password.value
    };
    const response = await fnLogin(data);

    if (response.message != '') {
        const notyf = new Notyf({
            duration: 5000,
            position: {
                x: 'right',
                y: 'top',
            }
        });
        notyf.error(response.message)
        return;
    }

    Cookies.set('user_data', JSON.stringify(response.data.user_data), {
        secure: true,
        sameSite: 'Strict',
        path: '/',
    });
    Cookies.set('logged_in_successfully', 'false', {
        secure: true,
        sameSite: 'Strict',
        path: '/',
    });

    router.push('/');
};
</script>

<template>
    <div class="flex w-full max-w-md h-full flex-col justify-center gap-3">
        <div class="flex flex-col gap-3 pb-6">
            <router-link to="/" class="w-full flex flex-row justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M5 12l6 6" />
                    <path d="M5 12l6 -6" />
                </svg>
                <p>
                    regresar
                </p>
            </router-link>
            <p class="px-[clamp(18px,3vw,28px)]">
                log in to your account
            </p>
            <div class="flex flex-col gap-1">
                <input v-model="email" type="text" class="border border-black py-5 px-3 rounded-full"
                    placeholder="email">
                <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold" v-if="emailError">
                    {{ emailError }}
                </span>
            </div>
            <div class="flex flex-col gap-1">
                <input v-model="password" type="text" class="border border-black py-5 px-3 rounded-full"
                    placeholder="password">

                <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                    v-if="passwordError">
                    {{ passwordError }}
                </span>
            </div>
            <div class="flex flex-row justify-between w-full px-[clamp(18px,3vw,28px)]">

            </div>
            <button @click="Login" type="submit" class="bg-black py-5 px-3 rounded-full text-white">
                login
            </button>
        </div>
        <div class="flex w-full flex-col gap-3 pt-6">
            <p class="px-[clamp(18px,3vw,28px)]">
                need an account
            </p>
            <router-link to="/register" class="bg-white border border-black py-5 px-3 rounded-full text-center">
                create account
            </router-link>
        </div>
    </div>
</template>

<style scoped></style>
