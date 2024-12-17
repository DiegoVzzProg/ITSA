<script setup lang="ts">
import { ref, watch } from 'vue';
import { postLogin } from '../../services/s_login/s_login';

const email = ref('');
const password = ref('');

const emailError = ref('');
const passwordError = ref('');

// Función para validar el email
const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        emailError.value = 'El correo no es válido';
    } else {
        emailError.value = '';
    }
};

// Función para validar la contraseña
const validatePassword = (value: string) => {
    if (value.length < 3) {
        passwordError.value = 'La contraseña debe tener al menos 6 caracteres';
    } else {
        passwordError.value = '';
    }
};

// Watchers para escuchar cambios y validar automáticamente
watch(email, (newValue) => {
    validateEmail(newValue);
});

watch(password, (newValue) => {
    validatePassword(newValue);
});

const Login = async () => {
    try {
        validateEmail(email.value);
        validatePassword(password.value);

        // Si no hay errores, enviamos el formulario
        if (emailError.value && passwordError.value)
            return;

        const data = {
            email: email.value,
            password: password.value
        };

        console.log((await postLogin(data)).data);

    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
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
            <router-link to="/register" class="bg-white border border-black py-5 px-3 rounded-full">
                create account
            </router-link>
        </div>
    </div>
</template>

<style scoped></style>
