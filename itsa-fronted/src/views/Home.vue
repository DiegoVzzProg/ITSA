<script setup lang="ts">
import { onMounted, ref } from 'vue';
import freshicons_slogan from '../assets/img/freshicons_slogan.png'
import usefulmockups_slogans from '../assets/img/usefulmockups_slogans.png'
import collillustration_slogans from '../assets/img/collillustration_slogans.png'
import lovelytype_slogans from '../assets/img/lovelytype_slogans.png'
import slogan_principal from '../assets/img/slogan_principal.png'
import { c_productos } from '../services/s_productos';
import Loading from '../components/Loading.vue'
import File from '../components/File.vue'
import { dgav, IsNullOrEmpty, notify, site } from '../utils/site';

const productos: any = ref([]);

const Productos = async () => {
    const response: any = await c_productos.fn_l_productos({
        id_producto: 0
    });
    if (response) {
        if (!IsNullOrEmpty(dgav.dataBase.message)) {
            notify.error(dgav.dataBase.message);
            return;
        }
        productos.value = response;
    }
};

onMounted(() => {
    Productos();
});
</script>

<template>
    <!-- <div class="flex flex-col w-full items-start justify-start min-h-full grow shrink-0"> -->
    <div class="flex items-center justify-center w-full min-h-screen snap-center">
        <span class="flex flex-col items-center w-full aos-init aos-animate">
            <img :src="freshicons_slogan" alt="_" loading="lazy" class=" w-full max-w-[240px]">
            <img :src="slogan_principal" alt="_" loading="lazy" class=" w-full max-w-[550px]">
        </span>
    </div>
    <div class="flex dgav-fade-up items-center justify-center w-full min-h-screen snap-center">
        <span class="flex flex-col items-center w-full">
            <img :src="usefulmockups_slogans" alt="_" loading="lazy" class=" w-full max-w-[240px]">
            <img :src="slogan_principal" alt="_" loading="lazy" class=" w-full max-w-[550px]">
        </span>
    </div>
    <div class="flex dgav-fade-up items-center justify-center w-full min-h-screen snap-center">
        <span class="flex flex-col items-center w-full">
            <img :src="collillustration_slogans" alt="_" loading="lazy" class=" w-full max-w-[240px]">
            <img :src="slogan_principal" alt="_" loading="lazy" class=" w-full max-w-[550px]">
        </span>
    </div>
    <div class="flex dgav-fade-up items-center justify-center w-full min-h-screen snap-center">
        <span class="flex flex-col items-center w-full">
            <img :src="lovelytype_slogans" alt="_" loading="lazy" class=" w-full max-w-[230px]">
            <img :src="slogan_principal" alt="_" loading="lazy" class=" w-full max-w-[550px]">
        </span>
    </div>
    <div class="flex dgav-fade-up flex-row-reverse justify-end max-[768px]:flex-col max-[768px]:items-center w-full gap-2 py-5 transition-all snap-center"
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
    <div class="flex items-center justify-center w-full min-h-screen snap-center" v-else>
        <Loading />
    </div>
    <!-- </div> -->
</template>

<style scoped></style>
