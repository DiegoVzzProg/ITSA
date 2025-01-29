<script setup lang="ts">
import { onMounted } from 'vue';
import { site } from '../utils/site';

onMounted(() => {

});
</script>

<template>
    <footer id="footer" class="flex flex-col w-full grow shrink-0">
        <div
            class="flex flex-col items-center justify-center w-full h-full find-us-mensaje app-findus-animation-timeline">
            <p class="text-pretty w-full max-w-[500px] text-center">
                itsa studio <sub class="align-super text-[.55rem] font-black z-[-1]">TM</sub> is
                an
                independent digital assets boutique runned by
                IN THE SAME AGENCY <sub class="align-super text-[.55rem] font-black z-[-1]">TM</sub>
                team that provides high quality, useful, affordable and extermely
                unique resources. our passion is
                to create digital products to hep to students, designers,
                agencies and anyone person creative.
            </p>
        </div>
        <div
            class="flex flex-col items-center md:flex-row lg:flex-row md:justify-between lg:justify-between gap-[40px] md:items-start lg:items-start mt-[50px]">
            <section class="flex flex-col w-full md:max-w-[230px] lg:max-w-[230px] gap-[7px]">
                <p style="font-family: 'Times New Roman', Times, serif; font-style: italic" class="find-us-titulo">
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
                <p style="font-family: 'Times New Roman', Times, serif; font-style: italic" class="find-us-titulo">
                    folow us
                </p>
                <div class="flex flex-col find-us-description gap-[5px]">
                    <a href="https://www.instagram.com/itsastudio_mx/?igsh=N284M2I0ZjBreWUy"
                        class="hover:bg-[rgb(244, 242, 239)] transition-all" target="_blank">
                        instagram
                    </a>
                    <a href="https://www.behance.net/itsastudio" class="hover:bg-[rgb(244, 242, 239)] transition-all"
                        target="_blank">
                        behance
                    </a>
                    <a href="https://www.tiktok.com/@itsa.studio?lang=es"
                        class="hover:bg-[rgb(244, 242, 239)] transition-all" target="_blank">
                        tiktok
                    </a>
                </div>
            </section>
            <section class="flex flex-col w-full md:max-w-[230px] lg:max-w-[230px] gap-[7px]">
                <p style="font-family: 'Times New Roman', Times, serif; font-style: italic" class="find-us-titulo">
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
</template>

<style scoped></style>
