<script setup lang="ts">
// EJEMPLO DE AGREGAR UNA COOKIE
//
// Cookies.set('id_usuario', response.data["id_usuario"], {
//     expires: 30,         // Expira en 7 días
//     secure: true,       // Solo se envía en conexiones HTTPS
//     sameSite: 'Strict', // Previene el envío en solicitudes de terceros
//     path: '/',          // Disponible en toda la web
// });

// EJEMPLO REMOVER UNA COOKIE
//
// Cookies.remove('id_usuario', { path: '/' }); // Necesario si estableciste un path

// EJEMPLO LEER UNA COOKIE
//
// Cookies.get('id_usuario');

import { onMounted, ref } from 'vue';
import logo from '../assets/svg/logo.svg'
import Cookies from "js-cookie";
import { Notyf } from 'notyf';
import { GasapFadeInUpEffect, isNotified, numberCart, site } from '../utils/site';

const id_usuario = ref(0);

const LogOut = () => {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach((cookieName) => {
        Cookies.remove(cookieName);
    });
    id_usuario.value = 0;

    localStorage.clear();
    sessionStorage.clear();

    site.RedirectPage('home');
}

function GoCheckOut() {
    const userData = Cookies.get('user_data');
    if (userData && Number(numberCart.value) > 0) {
        site.RedirectPage('checkout');
    }
}


onMounted(() => {
    GasapFadeInUpEffect();
    const userData = Cookies.get('user_data');
    console.log(userData);

    if (userData) {
        const parsedData = JSON.parse(userData);
        id_usuario.value = parsedData.id_usuario || 0;
        if (!isNotified) {
            const notyf = new Notyf({
                duration: 5000,
                position: {
                    x: 'right',
                    y: 'top',
                }
            });
            notyf.success("Logged in successfully");
            Cookies.set('logged_in_successfully', 'true', {
                secure: true,
                sameSite: 'Strict',
                path: '/',
            });
        }

    }
});

</script>

<template>
    <header id="header"
        class="flex min-w-[320px] w-full px-[clamp(18px,5vw,68px)] h-[76px] items-center justify-center fixed top-0 left-0 bg-white z-[9999]">
        <div class="flex items-center justify-between w-full h-full border-b border-black" id="header_div">
            <button @click="site.RedirectPage('home')" class="flex w-full h-full items-center max-w-[165px]">
                <img :src="logo" alt="" srcset="">
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
                <button @click="site.RedirectPage('home', undefined, () => { LogOut() })"
                    class="flex flex-col items-center justify-center text-center h-full" v-else>
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
                    <span class="text-[.70rem] font-semibold min-w-[20px]" v-text="numberCart"></span>
                </button>
            </nav>
        </div>
    </header>
    <main class="flex flex-col w-full h-[calc(100vh-76px)] px-[clamp(18px,5vw,68px)]" id="main_contenedor">
        <div class="flex flex-col w-full items-start justify-start min-h-full grow shrink-0">
            <slot></slot>
            <footer id="footer" class="flex flex-col w-full grow shrink-0 min-h-[calc(100vh-76px)] snap-end">
                <div
                    class="flex flex-col items-center justify-center w-full h-full find-us-mensaje app-findus-animation-timeline">
                    <p class="text-pretty w-full max-w-[500px] text-center">
                        itsa studio <sub class="align-super text-[.55rem] font-black">TM</sub> is
                        an
                        independent digital assets boutique runned by
                        IN THE SAME AGENCY <sub class="align-super text-[.55rem] font-black">TM</sub>
                        team that provides high quality, useful, affordable and extermely
                        unique resources. our passion is
                        to create digital products to hep to students, designers,
                        agencies and anyone person creative.
                    </p>
                </div>
                <div
                    class="flex flex-col items-center md:flex-row lg:flex-row md:justify-between lg:justify-between gap-[40px] md:items-start lg:items-start mt-[50px]">
                    <section class="flex flex-col w-full md:max-w-[230px] lg:max-w-[230px] gap-[7px]">
                        <p style="font-family: 'Times New Roman', Times, serif; font-style: italic"
                            class="find-us-titulo">
                            information
                        </p>
                        <div class="flex flex-col items-start find-us-description gap-[5px]">
                            <button @click="site.RedirectPage('info', { select: 'license' })"
                                class="hover:bg-[rgb(244, 242, 239)] transition-all">
                                license
                            </button>
                            <button @click="site.RedirectPage('info', { select: 'payments' })"
                                class="hover:bg-[rgb(244, 242, 239)] transition-all">
                                payments & refunds
                            </button>
                            <button @click="site.RedirectPage('info', { select: 'terms' })"
                                class="hover:bg-[rgb(244, 242, 239)] transition-all">
                                terms & conditions
                            </button>
                            <button @click="site.RedirectPage('info', { select: 'privacity' })"
                                class="hover:bg-[rgb(244, 242, 239)] transition-all">
                                privacity policy
                            </button>
                        </div>
                    </section>
                    <section class="flex flex-col w-full md:max-w-[230px] lg:max-w-[230px]  gap-[7px]">
                        <p style="font-family: 'Times New Roman', Times, serif; font-style: italic"
                            class="find-us-titulo">
                            folow us
                        </p>
                        <div class="flex flex-col find-us-description gap-[5px]">
                            <a href="https://www.instagram.com/itsastudio_mx/?igsh=N284M2I0ZjBreWUy"
                                class="hover:bg-[rgb(244, 242, 239)] transition-all" target="_blank">
                                instagram
                            </a>
                            <a href="https://www.behance.net/itsastudio"
                                class="hover:bg-[rgb(244, 242, 239)] transition-all" target="_blank">
                                behance
                            </a>
                            <a href="https://www.tiktok.com/@itsa.studio?lang=es"
                                class="hover:bg-[rgb(244, 242, 239)] transition-all" target="_blank">
                                tiktok
                            </a>
                        </div>
                    </section>
                    <section class="flex flex-col w-full md:max-w-[230px] lg:max-w-[230px] gap-[7px]">
                        <p style="font-family: 'Times New Roman', Times, serif; font-style: italic"
                            class="find-us-titulo">
                            support
                        </p>
                        <div class="flex flex-col find-us-description items-start hover:bg-[rgb(244, 242, 239)]">
                            <button @click="site.RedirectPage('info', { select: 'contact' })"
                                class="hover:bg-[rgb(244, 242, 239)] transition-all">
                                contact
                            </button>
                        </div>
                    </section>
                </div>
                <div class="w-full felx">
                    <p class="py-[20px]">&#169;2024 all rights reserved</p>
                </div>
            </footer>
        </div>
    </main>
</template>

<style scoped>
.find-us-titulo {
    position: relative;
    font-size: clamp(1rem, 3vw, 1.2rem)
}

.find-us-titulo::before {
    top: 28px;
    position: absolute;
    content: " ";
    width: 100%;
    height: 1px;
    background-color: black
}

.find-us-mensaje p {
    font-family: "Poppins", sans-serif;
    font-weight: 900;
    font-size: clamp(.8rem, 3vw, 1.5rem)
}

.find-us-description p {
    font-weight: 500;
    font-size: clamp(.8rem, 3vw, 1rem)
}
</style>
