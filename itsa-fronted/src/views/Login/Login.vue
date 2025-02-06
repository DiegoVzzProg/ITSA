<script setup lang="ts">
import { onMounted } from 'vue';
import { site } from '../../utils/site';
import { c_loginView, forgotPassword, FormLogin } from './Login';

onMounted(() => {
    c_loginView.onInit();
});

</script>

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
                    regresar
                </p>
            </button>
            <p class="px-[clamp(18px,3vw,28px)]">
                log in to your account
            </p>
            <div class="flex flex-col gap-3">
                <div class="flex flex-col gap-1" v-for="(item, index) in FormLogin" :key="index">
                    <input v-model="item.value" :type="item.type" class="border border-black py-5 px-3 rounded-full"
                        :placeholder="item.placeholder" :maxlength="item.maxLength"
                        v-on:input="c_loginView.validaciones(item.value, item.placeholder)">
                    <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                        v-if="item.error">
                        {{ item.error }}
                    </span>
                </div>
            </div>
            <div class="flex flex-row justify-end w-full px-[clamp(18px,3vw,28px)]" v-if="forgotPassword">
                <button class="underline underline-offset-2" v-on:click="c_loginView.RecuperarPassword()">forgot
                    password?</button>
            </div>
            <button @click="c_loginView.Login" type="submit" class="bg-black py-5 px-3 rounded-full text-white">
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

<style scoped></style>
