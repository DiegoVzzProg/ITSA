<script setup lang="ts">
import { onMounted } from 'vue';
import { site } from '../../utils/site';

onMounted(() => {

});
</script>

<template>
    <footer id="footer" class="flex flex-col w-full grow shrink-0 px-[clamp(18px,5vw,68px)] min-h-screen justify-end">
        <div class="flex flex-col items-center justify-center w-full h-full grow shrink-0">
            <p class="text-pretty text-[clamp(1rem,2.5vw,1.5rem)] w-full max-w-[700px] text-center">
                itsa studio <sub class="align-super text-[.55rem] font-black">TM</sub> is
                an
                independent digital assets boutique runned by
                IN THE SAME AGENCY <sub class="align-super text-[.55rem] font-black">TM</sub>
                team that provides high quality, useful, affordable and extrem
                unique resources. our passion is
                to create digital products to hep to students, designers,
                agencies and anyone person creative.
            </p>
        </div>
        <div
            class="flex flex-col items-center md:flex-row lg:flex-row md:justify-between lg:justify-between gap-[40px] md:items-start lg:items-start mt-[50px]">
            <section
                class="flex flex-row max-[768px]:flex-col w-full md:max-w-[230px] lg:max-w-[230px] min-h-full gap-[7px]">
                <p
                    class="times-new-roman-font md:border-e md:border-e-black md:border-b-0 border-b-black border-b pe-4 find-us-titulo text-[1.1rem]">
                    information
                </p>
                <div class="flex flex-col items-start gap-[5px]">
                    <button @click="site.RedirectPage({ name: 'info', params: { select: 'license' } })"
                        class="hover:bg-[rgb(0,0,0)] hover:text-white transition-all text-nowrap">
                        license
                    </button>
                    <button @click="site.RedirectPage({ name: 'info', params: { select: 'payments' } })"
                        class="hover:bg-[rgb(0,0,0)] hover:text-white transition-all text-nowrap">
                        payments & refunds
                    </button>
                    <button @click="site.RedirectPage({ name: 'info', params: { select: 'terms' } })"
                        class="hover:bg-[rgb(0,0,0)] hover:text-white transition-all text-nowrap">
                        terms & conditions
                    </button>
                    <button @click="site.RedirectPage({ name: 'info', params: { select: 'privacity' } })"
                        class="hover:bg-[rgb(0,0,0)] hover:text-white transition-all text-nowrap">
                        privacity policy
                    </button>
                </div>
            </section>
            <section
                class="flex flex-row max-[768px]:flex-col w-full md:max-w-[230px] lg:max-w-[230px] min-h-full gap-[7px]">
                <p class="times-new-roman-font md:border-e md:border-e-black md:border-b-0 border-b-black border-b pe-4 text-[1.1rem]">
                    folow us
                </p>
                <div class="flex flex-col find-us-description gap-[5px] ps-1">
                    <a href="https://www.instagram.com/itsastudio_mx/?igsh=N284M2I0ZjBreWUy"
                        class="hover:bg-[rgb(0,0,0)] hover:text-white transition-all" target="_blank">
                        instagram
                    </a>
                    <a href="https://www.behance.net/itsastudio" class="hover:bg-[rgb(0,0,0)] hover:text-white transition-all"
                        target="_blank">
                        behance
                    </a>
                    <a href="https://www.tiktok.com/@itsa.studio?lang=es"
                        class="hover:bg-[rgb(0,0,0)] hover:text-white transition-all" target="_blank">
                        tiktok
                    </a>
                </div>
            </section>
            <section
                class="flex flex-row max-[768px]:flex-col w-full md:max-w-[230px] lg:max-w-[230px] min-h-full gap-[7px]">
                <p class="times-new-roman-font md:border-e md:border-e-black md:border-b-0 border-b-black border-b pe-4 text-[1.1rem]">
                    support
                </p>
                <div class="flex flex-col find-us-description items-start hover:bg-[rgb(244, 242, 239)]">
                    <button @click="site.RedirectPage({ name: 'info', params: { select: 'contact' } })"
                        class="hover:bg-[rgb(0,0,0)] hover:text-white transition-all">
                        contact
                    </button>
                </div>
            </section>
        </div>
        <div class="w-full felx pt-10">
            <p class="py-[20px]">&#169;2025 all rights reserved</p>
        </div>
    </footer>
</template>

<style scoped></style>
