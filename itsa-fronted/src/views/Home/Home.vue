<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import freshicons_slogan from '../../assets/img/freshicons_slogan.png'
import usefulmockups_slogans from '../../assets/img/usefulmockups_slogans.png'
import collillustration_slogans from '../../assets/img/collillustration_slogans.png'
import lovelytype_slogans from '../../assets/img/lovelytype_slogans.png'
import slogan_principal from '../../assets/img/slogan_principal.png'
import { site } from '../../utils/site';
import File from '../../components/File.vue';
import { home, productos, showSection } from './Home';


onMounted(() => {
    document.getElementById('footer')?.classList.remove('flex');
    document.getElementById('footer')?.classList.add('hidden');

    window.addEventListener('resize', home.onResize);

    home.Productos();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', home.onResize);
});

</script>

<template>
    <div v-if="!showSection"
        class="flex flex-col w-full justify-center items-center min-h-screen grow shrink-0 relative"
        @mousedown="home.onMouseDown" @mousemove="home.onMouseMove" @mouseup="home.onMouseUp"
        @mouseleave="home.onMouseLeave" @wheel.prevent="home.onWheel" @touchstart="home.onTouchStart"
        @touchmove="home.onTouchMove" @touchend="home.onTouchEnd">
        <div class="flex relative flex-col items-center justify-start gap-2 w-screen h-[40px] overflow-hidden">
            <span class="flex flex-col items-center w-full min-h-screen transition-transform duration-700"
                :style="home.transformStyle1.value">
                <img :src="freshicons_slogan" alt="_" loading="lazy" class=" w-full max-w-[230px]">
            </span>
            <span class="flex flex-col items-center w-full min-h-screen transition-transform duration-700"
                :style="home.transformStyle2.value">
                <img :src="usefulmockups_slogans" alt="_" loading="lazy" class=" w-full max-w-[240px]">
            </span>
            <span class="flex flex-col items-center w-full min-h-screen transition-transform duration-700"
                :style="home.transformStyle3.value">
                <img :src="collillustration_slogans" alt="_" loading="lazy" class=" w-full max-w-[240px]">
            </span>
            <span class="flex flex-col items-center w-full min-h-screen transition-transform duration-700"
                :style="home.transformStyle4.value">
                <img :src="lovelytype_slogans" alt="_" loading="lazy" class=" w-full max-w-[220px] scale-[.9]">
            </span>
        </div>
        <div class="flex w-full items-center justify-center">
            <span class="flex flex-col items-center w-full h-full">
                <img :src="slogan_principal" alt="_" loading="lazy" class=" w-full max-w-[550px]">
            </span>
        </div>
    </div>
    <div v-else
        class="flex flex-col pt-[76px] w-full justify-start items-end min-h-screen grow shrink-0 relative animate-fade-in">
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
