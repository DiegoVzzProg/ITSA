<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { replaceClass } from '../utils/site';
import icon_morado_1 from '../assets/img/gallery/basicsIcons/icon_morado_1.png'
import icon_morado_2 from '../assets/img/gallery/basicsIcons/icon_morado_2.png'
import icon_morado_3 from '../assets/img/gallery/basicsIcons/icon_morado_3.png'
import PDF from '../assets/img/gallery/basicsIcons/PDF.png'
import AI from '../assets/img/gallery/basicsIcons/Ai.png'
import SVG from '../assets/img/gallery/basicsIcons/SVG.png'
import basic_set_50 from '../assets/img/gallery/basicsIcons/basic_set_50.png'
import gif_coleccion_1 from '../assets/img/gallery/basicsIcons/gif_coleccion_1.gif'
import File from '../components/File.vue'
import CardProduct from '../components/CardProduct.vue';

onMounted(() => {
    const header: any = document.getElementById('header') as HTMLElement;
    const footer: any = document.getElementById('footer') as HTMLElement;
    const overflow: any = document.getElementById('overflow') as HTMLElement;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    const main_contenedor: any = document.getElementById('main_contenedor') as HTMLElement;
    replaceClass(main_contenedor, "px-[0px]", "px-[clamp(18px,5vw,68px)]")

    const div_contenedor_gallery_basics_1: any = document.getElementById('div_contenedor_gallery_basics_1') as HTMLElement;
    const div_contenedor_gallery_basics_2: any = document.getElementById('div_contenedor_gallery_basics_2') as HTMLElement;
    const div_sub_contenedor_2 = document.getElementById('div_sub_contenedor_2') as HTMLElement;
    const targetRect = div_sub_contenedor_2.getBoundingClientRect();

    div_contenedor_gallery_basics_1.addEventListener('scroll', () => {

        if (div_contenedor_gallery_basics_1.scrollTop >= (targetRect.height - 100)) {
            replaceClass(overflow, "bg-[rgba(183,164,237,0.45)]", "bg-[rgba(25,18,44,0.7)]")
            replaceClass(footer, "hidden", "flex");
            replaceClass(div_contenedor_gallery_basics_2, "hidden", "flex");
        } else {
            replaceClass(overflow, "bg-[rgba(25,18,44,0.7)]", "bg-[rgba(183,164,237,0.45)]")
            replaceClass(header, "bg-white", "bg-transparent");
            replaceClass(footer, "flex", "hidden");
            replaceClass(div_contenedor_gallery_basics_2, "flex", "hidden");
        }

    });

    window.addEventListener('scroll', () => {
        if (window.scrollY >= targetRect.height) {
            replaceClass(header, "bg-transparent", "bg-white");
        } else {
            replaceClass(header, "bg-white", "bg-transparent");
        }
    })
});
</script>

<template>
    <div
        class="flex opacity-50 flex-row w-full left-0 top-0 h-full px-[clamp(18px,5vw,68px)] absolute justify-between max-[1090px]:justify-center items-center gap-8">
        <img :src="icon_morado_1" alt="_" loading="lazy"
            class="flex w-full max-w-[clamp(130px,18vw,310px)] max-[1090px]:hidden" />
        <img :src="icon_morado_2" alt="_" loading="lazy" class="w-full flex max-w-[560px]" />
        <img :src="icon_morado_3" alt="_" loading="lazy"
            class="w-full flex max-w-[clamp(130px,18vw,245px)] max-[1090px]:hidden" />
    </div>
    <div class="flex absolute top-0 left-0 h-screen bg-[rgba(183,164,237,0.45)] transition-all w-full" id="overflow">
    </div>
    <div id="div_contenedor_gallery_basics_1"
        class="flex flex-col min-h-screen h-screen overflow-y-auto w-full snap-y snap-mandatory relative pt-[76px] scroll-none">
        <div id="div_sub_contenedor_1"
            class="flex flex-col min-h-full grow shrink-0 snap-center items-center justify-center">
            <div class="flex flex-col w-full justify-center items-center">
                <p class="font-itsa-bold text-[clamp(45px,10vw,208px)] leading-[78px] flex text-white z-10">
                    basics icon set
                </p>
                <p class="text-[clamp(1em,3vw,4em)] text-center text-white">
                    a sleek & minimalist collection <br> of geometric-style icons.
                </p>
            </div>
        </div>
        <div id="div_sub_contenedor_2"
            class="flex flex-col min-h-full grow shrink-0 snap-center items-center justify-center">
            <div class="flex flex-col w-full justify-center items-center">
                <p class="font-itsa-bold text-[clamp(35px,10vw,208px)] leading-[78px] font-bold flex text-white z-10">
                    +50 elements
                </p>
                <p
                    class="font-itsa-bold text-[clamp(20px,7vw,108px)] max-[480px]:translate-y-[-20px] text-center font-bold flex text-white z-10">
                    personal & comercial use
                </p>
            </div>
        </div>
    </div>
    <div class="flex flex-col w-full min-h-screen grow shrink-0 px-[clamp(18px,5vw,68px)]"
        id="div_contenedor_gallery_basics_2">
        <div class="flex flex-col items-center justify-center w-full min-h-screen grow shrink-0">
            <p class="font-itsa-bold text-[clamp(40px,8vw,108px)]">
                fresh icons
            </p>
            <div class="flex rounded-[2em] overflow-hidden">
                <img :src="gif_coleccion_1" alt="_" loading="lazy" class="object-contain" />
            </div>
        </div>
        <div class="flex flex-row max-[680px]:flex-col-reverse w-full min-h-screen grow shrink-0">
            <div
                class="flex flex-col h-full w-full items-start max-[680px]:justify-start max-[680px]:items-center max-[680px]:text-center justify-center">
                <p class="font-itsa-bold text-[clamp(40px,8vw,108px)]  leading-[100px]">
                    outline
                </p>
                <div class="flex flex-col">
                    <p class="flex w-full">
                        they are ready be used and will help <br>
                        you hive your new project a great look
                    </p>
                    <br>
                    <p>
                        aviable as:illustrator, svg & pdf
                    </p>
                </div>
                <div class="flex flex-row min-w-[300px] max-[680px]:min-w-[0px] max-[680px]:pt-5 pt-0 gap-4">
                    <img :src="AI" alt="_" loading="lazy" class="w-full max-w-[44px]" />
                    <img :src="SVG" alt="_" loading="lazy" class="w-full max-w-[34px]" />
                    <img :src="PDF" alt="_" loading="lazy" class="w-full max-w-[34px]" />
                </div>
            </div>
            <div class="flex flex-col h-full w-full items-center justify-center">
                <div
                    class="flex items-center justify-center rounded-[1em] p-5 w-full max-w-[532px] h-full max-h-[532px] bg-[rgba(115,64,255,0.45)]">
                    <img :src="basic_set_50" alt="_" loading="lazy" class="flex w-full max-w-[220px]" />
                </div>
            </div>
        </div>
        <div class="min-h-screen justify-center grow shrink-0 flex flex-col text-center">
            <p class="font-itsa-bold text-[clamp(3em,10vw,5.5em)]">
                57 items
            </p>
            <p>
                a large library of basic elements including <br>
                social media, weather, store and much more.
            </p>
            <div class="w-[90%] flex items-center h-full wrapper max-h-[200px] max-w-[1536px] relative overflow-hidden"
                style="margin-inline: auto; content-visibility: auto;">
                <div v-for="i in 57" :key="i"
                    class="flex p-[40px] app-item-scroll-infinite-basic-icons absolute rounded bg-[rgb(213,169,239)] left-[max(calc(200px*8),100%)]"
                    :style="{ animationDelay: `calc(7s / 8 * (8 - ${i}) * -1)` }">
                    <File :file="`basic set-${i}.png`" folder="../assets/img/gallery/basicsIcons/icons" type="img"
                        :encrypted="false" class="w-full h-full max-w-[60px] min-w-[60px] max-h-[60px]"></File>
                </div>
            </div>
        </div>
        <div class="min-h-screen items-center justify-center grow shrink-0 flex flex-col">
            <CardProduct :id_producto="1" titulo="basics icon set" subtitulo="this pack is free"
                descripcion="57 items available as: illustrator, figma & svg commercial & personal use" precio="0">
            </CardProduct>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    mask-image: linear-gradient(to right,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 1) 20%,
            rgba(0, 0, 0, 1) 80%,
            rgba(0, 0, 0, 0));
}

@keyframes scrollLeft {
    to {
        left: -200px;
    }
}

.app-item-scroll-infinite-basic-icons {
    position: absolute;
    animation-name: scrollLeft;
    animation-duration: 7s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}
</style>
