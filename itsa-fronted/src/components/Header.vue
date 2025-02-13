<script setup lang="ts">
import { onMounted, ref } from 'vue';
import logo from '../assets/svg/logo.svg'

import { site } from '../utils/site';
import { c_auth } from '../services/s_auth';
import { useRoute } from 'vue-router';
import { numberCartShopping } from '../stores/countCartShopping'

const id_usuario = ref<number>(0);
const router = useRoute();

const LogOut = async () => {
    const response: any = await c_auth.logoutUser();
    if (response) {
        site.allDeleteCookies();
        numberCartShopping().default();

        if (router.name == 'home') {
            window.location.reload();
        } else {
            site.RedirectPage('home');
            id_usuario.value = 0;
        }
    }
}

function GoCheckOut() {
    if (site.userData() && numberCartShopping().count > 0) {
        site.RedirectPage('checkout');
    }
}


onMounted(() => {
    if (site.userData()) {
        id_usuario.value = site.userData().id_usuario || 0;
    }
});


</script>

<template>
    <header id="header" ref="headerComponent"
        class="flex min-w-[320px] w-full px-[clamp(18px,5vw,68px)] h-[76px] items-center justify-center fixed top-0 left-0 bg-white z-[9999]">
        <div class="flex items-center justify-between w-full h-full border-b border-black" id="header_div">
            <button @click="site.RedirectPage('home')" class="flex w-full h-full items-center max-w-[165px]">
                <img :src="logo" alt="" srcset="" class="select-none">
            </button>
            <nav class="flex flex-row justify-end gap-3 min-w-[164px]">
                <button @click="site.RedirectPage('login')"
                    class="flex flex-col items-center justify-center text-center h-full" v-if="id_usuario == 0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-user-exclamation">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4c.348 0 .686 .045 1.008 .128" />
                        <path d="M19 16v3" />
                        <path d="M19 22v.01" />
                    </svg>
                    <span class="text-[.7rem] font-semibold">
                        Login
                    </span>
                </button>
                <button @click="LogOut()" class="flex flex-col items-center justify-center text-center h-full" v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
                        fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-user">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                        <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
                    </svg>
                    <span class="text-[.7rem] font-semibold truncate">
                        Logout
                    </span>
                </button>
                <button @click="GoCheckOut()" class="flex flex-col items-center justify-center text-center h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M17 17h-11v-14h-2" />
                        <path d="M6 5l14 1l-1 7h-13" />
                    </svg>
                    <span class="text-[.70rem] font-semibold min-w-[20px]" v-text="numberCartShopping().count"></span>
                </button>
            </nav>
        </div>
    </header>
</template>

<style scoped></style>
