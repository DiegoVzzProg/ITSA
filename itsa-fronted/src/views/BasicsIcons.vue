<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { replaceClass } from '../utils/site';
import icon_morado_1 from '../assets/img/gallery/basicsIcons/icon_morado_1.png'
import icon_morado_2 from '../assets/img/gallery/basicsIcons/icon_morado_2.png'
import icon_morado_3 from '../assets/img/gallery/basicsIcons/icon_morado_3.png'
import PDF from '../assets/img/gallery/basicsIcons/PDF.png'
import AI from '../assets/img/gallery/basicsIcons/Ai.png'
import SVG from '../assets/img/gallery/basicsIcons/SVG.png'
import basic_set_1 from '../assets/img/gallery/basicsIcons/basic_set_1.png'
import gif_coleccion_1 from '../assets/img/gallery/basicsIcons/gif_coleccion_1.gif'
import File from '../components/File.vue'

onMounted(() => {
    const header: any = document.getElementById('header') as HTMLElement;
    const footer: any = document.getElementById('footer') as HTMLElement;
    const overflow: any = document.getElementById('overflow') as HTMLElement;

    //window.scrollTo({ top: 0, behavior: 'smooth' });

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
        class="flex opacity-50 flex-row w-full left-0 top-0 h-full px-[clamp(18px,5vw,68px)] absolute justify-between items-center gap-8">
        <File :file="icon_morado_1" type="img" :encrypted="false"
            class="flex w-full max-w-[clamp(130px,18vw,310px)] max-[680px]:hidden" />
        <File :file="icon_morado_2" type="img" :encrypted="false" class="flex w-full max-w-[560px]" />
        <File :file="icon_morado_3" type="img" :encrypted="false"
            class="flex w-full max-w-[clamp(130px,18vw,245px)] max-[680px]:hidden" />
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
    <div class="flex flex-col w-full min-h-screen grow shrink-0" id="div_contenedor_gallery_basics_2">
        <div class="flex flex-col items-center justify-center w-full min-h-screen grow shrink-0">
            <p class="font-itsa-bold text-[clamp(40px,8vw,108px)]">
                fresh icons
            </p>
            <div class="flex rounded-[2em] overflow-hidden">
                <File :file="gif_coleccion_1" type="img" :encrypted="false"></File>
            </div>
        </div>
        <div class="flex flex-row w-full min-h-screen grow shrink-0">
            <div class="flex flex-col min-h-full w-full items-start justify-center">
                <p class="font-itsa-bold text-[clamp(40px,8vw,108px)]  leading-[100px]">
                    outline
                </p>
                <div class="flex flex-col">
                    <p>
                        they are ready be used and will help <br>
                        you hive your new project a great look
                    </p>
                    <br>
                    <p>
                        aviable as:illustrator, svg & pdf
                    </p>
                </div>
                <div class="flex flex-row min-w-[300px] gap-4">
                    <File :file="AI" class="w-full max-w-[44px]" type="img" :encrypted="false"></File>
                    <File :file="SVG" class="w-full max-w-[34px]" type="img" :encrypted="false"></File>
                    <File :file="PDF" class="w-full max-w-[34px]" type="img" :encrypted="false"></File>
                </div>
            </div>
            <div class="flex flex-col min-h-full w-full items-center justify-center">
                <div
                    class="flex items-center justify-center rounded-[1em] p-5 w-full max-w-[532px] h-[532px] bg-[rgba(115,64,255,0.45)]">
                    <File :file="basic_set_1" type="img" class="flex max-w-[220px]" :encrypted="false"></File>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
