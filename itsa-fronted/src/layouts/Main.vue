<script setup lang="ts">
import { onMounted } from 'vue';
import Cookies from "js-cookie";
import { Notyf } from 'notyf';
import { isNotified, site } from '../utils/site';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Loading from '../components/Loading.vue';


onMounted(() => {

    const userData = site.getCookie('e.u.d');
    if (userData) {
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
    <Header />
    <main class="flex flex-col w-full min-h-[calc(100vh-76px)] px-[clamp(18px,5vw,68px)]" id="main_contenedor">
        <div class="flex flex-col w-full items-start justify-start min-h-full grow shrink-0">
            <Loading />
            <slot></slot>
        </div>
    </main>
    <Footer />
</template>

<style scoped></style>
