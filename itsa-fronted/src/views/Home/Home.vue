<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import freshicons_slogan from '../../assets/img/freshicons_slogan.png'
import usefulmockups_slogans from '../../assets/img/usefulmockups_slogans.png'
import collillustration_slogans from '../../assets/img/collillustration_slogans.png'
import lovelytype_slogans from '../../assets/img/lovelytype_slogans.png'
import slogan_principal from '../../assets/img/slogan_principal.png'
import { site } from '../../utils/site';
import { class_home, imgsPrincipal, productos } from './Home';
import File from '../../components/File.vue';


onMounted(() => {
    class_home.onInit();
});

onBeforeUnmount(() => {
    class_home.onUnInit();
});

</script>

<template>
    <div class="h-[50vh]" id="section1"></div>
    <div class="h-[50vh]" id="section2"></div>
    <div class="h-[50vh]" id="section3"></div>
    <div class="h-[50vh]" id="section4"></div>
    <div class="flex flex-col w-full justify-center items-center min-h-screen grow sticky bottom-0 shrink-0">
        <div
            class="flex relative flex-col text-center items-center justify-center gap-2 w-full h-[55px] overflow-hidden ">
            <p :class="`font-itsa-bold w-full text-[clamp(3rem,3vw,10rem)] ${img.class} animate-fade-in translate-y-[6px]`"
                v-for="(img, index) in imgsPrincipal" :key="index">
                {{ img.texto }}
            </p>
        </div>
        <div class="flex w-full items-center justify-center">
            <span
                class="flex flex-col items-center w-full text-center h-full text-[clamp(1.5rem,3vw,2.4rem)] animate-fade-in"
                style="font-family:'Times New Roman', Times, serif; font-style: italic">
                that make your stories look better
            </span>
        </div>
    </div>
    <div class="flex flex-col pt-[76px] w-full justify-start items-end h-screen grow shrink-0 relative animate-fade-in">
        <div class="flex flex-row-reverse justify-end max-[768px]:flex-col max-[768px]:items-center w-full gap-2 py-5 transition-all"
            v-if="productos.length > 0">
            <div v-for="(producto, index) in productos" :key="index"
                class="bg-[rgb(244,242,239)] w-full max-w-[508px] h-full max-h-[508px] min-h-[508px] max-[620px]:min-h-[408px] max-[620px]:max-h-[408px] rounded-[12px] p-5 flex flex-col group hover:bg-[rgba(201,117,249,0.4)]">
                <div class="flex flex-row group-hover:text-white">
                    <div class="flex flex-col w-full gap-1">
                        <p class="font-itsa-bold text-[clamp(1.8em,5vw,2.5em)] mb-[-18px] leading-8">
                            {{ producto.titulo }}
                        </p>
                        <span class="w-full max-w-[230px] leading-6 ms-1 mt-4">
                            <i class="times-new-roman-font text-[1rem] lg:text-[1.4rem] xl:text-[1.4rem]">{{
                                producto.subtitulo }}</i>
                        </span>
                        <p class="text-[clamp(.6em,2vw,.7em)]">
                            {{ producto.descripcion }}
                        </p>
                    </div>
                    <div class="flex items-start justify-end">
                        <button @click="site.RedirectPage(String(producto.url))"
                            class="text-white bg-black py-2 rounded-full px-[clamp(15px,3vw,28px)] poppins-font font-bold text-[clamp(12px,3vw,20px)]">
                            {{ parseFloat(producto.precio) > 0 ? `$${producto.precio}` : 'free' }}
                        </button>
                    </div>
                </div>
                <div class="flex items-center justify-center w-full h-full">
                    <span class="flex w-full max-w-[320px]">
                        <File folder="../assets/img/gallery" :file="producto.imagen" type="img" :encrypted="false" />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
