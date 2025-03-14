<script setup lang="ts">
import { onMounted } from 'vue';
import { Notyf } from 'notyf';
import { site } from '../../utils/site';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

onMounted(() => {
    const logged_in_successfully: boolean = JSON.parse(site.LocalStorage("get", ["logged_in_successfully"])?.["logged_in_successfully"] || "false");

    if (site.userData()) {
        if (!logged_in_successfully) {
            const notyf = new Notyf({
                duration: 5000,
                position: {
                    x: 'right',
                    y: 'top',
                }
            });
            notyf.success("Logged in successfully");

            site.LocalStorage("set", {
                logged_in_successfully: true
            });
        }
    }
});

</script>

<template>
    <Header />
    <main class="flex flex-col w-full min-h-[calc(100vh-76px)] px-[min(68px,5vw)]" id="main_contenedor">
        <div class="flex flex-col w-full items-start justify-start min-h-full grow shrink-0">
            <slot></slot>
        </div>
    </main>
    <Footer />
</template>

<style scoped></style>
