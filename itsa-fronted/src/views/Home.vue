<script setup lang="ts">
import { onMounted, ref } from 'vue';
import freshicons_slogan from '../assets/img/freshicons_slogan.png'
import usefulmockups_slogans from '../assets/img/usefulmockups_slogans.png'
import collillustration_slogans from '../assets/img/collillustration_slogans.png'
import lovelytype_slogans from '../assets/img/lovelytype_slogans.png'
import slogan_principal from '../assets/img/slogan_principal.png'
import { getProductos } from '../services/s_productos/s_productos'
import Loading from '../components/Loading.vue'
import File from '../components/File.vue'
import { replaceClass } from '../utils/site';

const productos: any = ref([]);

const Productos = async () => {
    try {
        const data = {
            id_producto: 0
        };
        productos.value = (await getProductos(data)).data;

    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
};

onMounted(() => {
    Productos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const header: any = document.getElementById('header') as HTMLElement;
    const footer: any = document.getElementById('footer') as HTMLElement;
    replaceClass(header, "bg-transparent", "bg-white");
    replaceClass(footer, "hidden", "flex");
    const main_contenedor: any = document.getElementById('main_contenedor') as HTMLElement;
    replaceClass(main_contenedor, "px-[0px]", "px-[clamp(18px,5vw,68px)]")
});
</script>

<template>
    <div class="flex items-center justify-center w-full min-h-screen snap-center">
        <span class="flex flex-col items-center w-full">
            <img :src="freshicons_slogan" alt="_" loading="lazy" class=" w-full max-w-[240px]">
            <img :src="slogan_principal" alt="_" loading="lazy" class=" w-full max-w-[550px]">
        </span>
    </div>
    <div class="flex items-center justify-center w-full min-h-screen snap-center">
        <span class="flex flex-col items-center w-full">
            <img :src="usefulmockups_slogans" alt="_" loading="lazy" class=" w-full max-w-[240px]">
            <img :src="slogan_principal" alt="_" loading="lazy" class=" w-full max-w-[550px]">
        </span>
    </div>
    <div class="flex items-center justify-center w-full min-h-screen snap-center">
        <span class="flex flex-col items-center w-full">
            <img :src="collillustration_slogans" alt="_" loading="lazy" class=" w-full max-w-[240px]">
            <img :src="slogan_principal" alt="_" loading="lazy" class=" w-full max-w-[550px]">
        </span>
    </div>
    <div class="flex items-center justify-center w-full min-h-screen snap-center">
        <span class="flex flex-col items-center w-full">
            <img :src="lovelytype_slogans" alt="_" loading="lazy" class=" w-full max-w-[230px]">
            <img :src="slogan_principal" alt="_" loading="lazy" class=" w-full max-w-[550px]">
        </span>
    </div>
    <div class="flex flex-row max-[768px]:flex-col max-[768px]:items-center w-full min-h-screen gap-2 py-5 transition-all grow shrink-0 snap-center"
        v-if="productos.length > 0">
        <div v-for="(producto, index) in productos" :key="index"
            class="bg-[rgb(244,242,239)] w-full max-w-[508px] h-full max-h-[508px] min-h-[508px] max-[620px]:min-h-[408px] max-[620px]:max-h-[408px] rounded-[12px] p-5 flex flex-col group hover:bg-[rgba(201,117,249,0.4)]">
            <div class="flex flex-row group-hover:text-white">
                <div class="flex flex-col w-full gap-1">
                    <p class="font-itsa-bold text-[clamp(1.8em,5vw,2.5em)] mb-[-18px] leading-8">
                        {{ producto.titulo }}
                    </p>
                    <span class="w-full max-w-[230px] leading-6 ms-1 mt-4">
                        <i class="times-new-roman-font text-[clamp(1.4em,5vw,2em)]">{{ producto.subtitulo }}</i>
                    </span>
                    <p class="text-[clamp(.6em,2vw,.7em)]">
                        {{ producto.descripcion }}
                    </p>
                </div>
                <div class="flex items-start justify-end w-full">
                    <RouterLink :to="producto.url"
                        class="text-white bg-black py-2 rounded-full px-7 poppins-font font-bold text-[1.7em]">
                        {{ parseFloat(producto.precio) > 0 ? producto.precio : 'free' }}
                    </RouterLink>
                </div>
            </div>
            <div class="flex items-center justify-center w-full h-full">
                <span class="flex w-full max-w-[320px]">
                    <File :file="producto.imagen" type="img" :encrypted="true" />
                </span>
            </div>
        </div>
    </div>
    <div class="flex items-center justify-center w-full min-h-screen snap-center" v-else>
        <Loading />
    </div>
</template>

<style scoped></style>
