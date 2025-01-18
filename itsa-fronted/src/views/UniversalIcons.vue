<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { replaceClass } from '../utils/site';
import File from '../components/File.vue'
import CardProduct from '../components/CardProduct.vue';

const handleScroll = () => {
    const header: any = document.getElementById('header') as HTMLElement;
    const targetRect = document.getElementById('div_sub_contenedor_2').getBoundingClientRect();

    if (window.scrollY >= targetRect.height) {
        replaceClass(header, "bg-transparent", "bg-white");
    } else {
        replaceClass(header, "bg-white", "bg-transparent");
    }
};

onMounted(() => {
    const header: any = document.getElementById('header') as HTMLElement;
    const footer: any = document.getElementById('footer') as HTMLElement;
    const overflow: any = document.getElementById('overflow') as HTMLElement;
    const overflow2: any = document.getElementById('overflow2') as HTMLElement;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    const main_contenedor: any = document.getElementById('main_contenedor') as HTMLElement;
    replaceClass(main_contenedor, "px-[0px]", "px-[clamp(18px,5vw,68px)]")

    const div_contenedor_gallery_basics_1: any = document.getElementById('div_contenedor_gallery_basics_1') as HTMLElement;
    const div_contenedor_gallery_basics_2: any = document.getElementById('div_contenedor_gallery_basics_2') as HTMLElement;
    const div_sub_contenedor_2 = document.getElementById('div_sub_contenedor_2') as HTMLElement;
    const targetRect = div_sub_contenedor_2.getBoundingClientRect();

    div_contenedor_gallery_basics_1.addEventListener('scroll', () => {

        if (div_contenedor_gallery_basics_1.scrollTop >= (targetRect.height - 100)) {
            replaceClass(overflow2, "opacity-0", "opacity-60")
            replaceClass(footer, "hidden", "flex");
            replaceClass(div_contenedor_gallery_basics_2, "hidden", "flex");
        } else {
            replaceClass(overflow2, "opacity-60", "opacity-0")
            replaceClass(header, "bg-white", "bg-transparent");
            replaceClass(footer, "flex", "hidden");
            replaceClass(div_contenedor_gallery_basics_2, "flex", "hidden");
        }

    });

    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <a href="#card_section"
        class="flex fixed bottom-[10px] right-[40px] rounded-full border border-black px-6 py-4 z-[9999]">
        get this pack!
    </a>
    <div
        class="flex opacity-50 flex-row w-full left-0 top-0 h-full px-[clamp(18px,5vw,68px)] absolute justify-center items-center gap-8">
        <File folder="../assets/img/gallery/universalicons" file="universalicon_cover.png" type="img" :encrypted="false"
            class="max-[680px]:hidden" />
        <File folder="../assets/img/gallery/universalicons" file="universalicon_cover_1_icon.png" type="img"
            :encrypted="false" class="max-[680px]:block hidden" />
    </div>
    <div class="flex absolute top-0 left-0 h-screen bg-[rgb(0,0,0)] transition-all w-full opacity-0" id="overflow2">
    </div>
    <div class="flex absolute top-0 left-0 h-screen bg-[rgb(116,171,253)] transition-all w-full opacity-60"
        id="overflow">
    </div>
    <div id="div_contenedor_gallery_basics_1"
        class="flex flex-col min-h-screen h-screen overflow-y-auto w-full snap-y snap-mandatory relative pt-[76px] scroll-none">
        <div id="div_sub_contenedor_1"
            class="flex flex-col min-h-full grow shrink-0 snap-center items-center justify-center">
            <div class="flex flex-col w-full justify-center items-center">
                <p
                    class="font-itsa-bold text-[clamp(45px,10vw,208px)] leading-[clamp(30px,7vw,130px)] flex text-white z-10">
                    universal <br> icon pack
                </p>
                <p class="text-[clamp(1em,3vw,2em)] text-center text-white">
                    a sleek & minimalist collection solid <br> of minimalist style icons.
                </p>
            </div>
        </div>
        <div id="div_sub_contenedor_2"
            class="flex flex-col min-h-full grow shrink-0 snap-center items-center justify-center">
            <div class="flex flex-col w-full justify-center items-center leading-[clamp(35px,10vw,120px)]">
                <p class="font-itsa-bold text-[clamp(25px,7vw,208px)] font-bold flex text-white z-10">
                    +500 elements
                </p>
                <p class="font-itsa-bold text-[clamp(25px,7vw,208px)] text-center font-bold flex text-white z-10">
                    fully editable
                </p>
                <p class="font-itsa-bold text-[clamp(25px,7vw,208px)] text-center font-bold flex text-white z-10">
                    personal & comercial use
                </p>
            </div>
        </div>
    </div>
    <div class="flex flex-col w-full min-h-screen grow shrink-0 px-[clamp(18px,5vw,68px)]"
        id="div_contenedor_gallery_basics_2">
        <div class="flex flex-col items-center justify-center w-full min-h-screen grow shrink-0">
            <p class="font-itsa-bold text-[clamp(40px,8vw,108px)]">
                universal icon
            </p>
            <p
                class="w-full text-center translate-y-[-30px] max-[520px]:translate-y-[-20px] py-1 text-[clamp(.8rem,3vw,1rem)] text-pretty">
                this plus pack consists of 500 essential icons in solid, forming an essential <br>
                collection fit for you personal and professional projects
            </p>
            <div class="flex rounded-[2em] w-full max-w-screen-md overflow-hidden">
                <File folder="../assets/img/gallery/universalicons" file="universalicon_02.png" type="img"
                    :encrypted="false"></File>
            </div>
        </div>
        <div class="flex flex-row max-[680px]:flex-col-reverse w-full min-h-screen grow shrink-0">
            <div
                class="flex flex-col h-full w-full items-start max-[680px]:justify-start max-[680px]:items-center max-[680px]:text-center justify-center">
                <p class="font-itsa-bold text-[clamp(40px,8vw,108px)]  leading-[100px]">
                    solid
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
                    <File folder="../assets/img/gallery/basicsIcons" file="Ai.png" class="w-full max-w-[44px]"
                        type="img" :encrypted="false">
                    </File>
                    <File folder="../assets/img/gallery/basicsIcons" file="SVG.png" class="w-full max-w-[34px]"
                        type="img" :encrypted="false">
                    </File>
                    <File folder="../assets/img/gallery/basicsIcons" file="PDF.png" class="w-full max-w-[34px]"
                        type="img" :encrypted="false">
                    </File>
                </div>
            </div>
            <div class="flex flex-col h-full w-full items-center justify-center">
                <div class="flex items-center justify-center rounded-[1em] w-full max-w-[532px] h-full max-h-[532px]">
                    <File folder="../assets/img/gallery/universalicons" file="universalicon_03.png" type="img"
                        :encrypted="false"></File>
                </div>
            </div>
        </div>
        <div class="min-h-screen justify-center items-center grow shrink-0 flex flex-col text-center">
            <p class="font-itsa-bold text-[clamp(3em,10vw,5.5em)]">
                524 items
            </p>
            <p class="text-[clamp(.8rem,3vw,1rem)] translate-y-[-30px] max-[520px]:translate-y-[-20px]">
                a large library of basic elements including <br>
                social media, weather, store and much more.
            </p>
            <div class="flex rounded-[1em] w-full justify-center overflow-hidden">
                <File file="video1-universal icon.gif" folder="../assets/img/gallery/universalicons" type="img"
                    :encrypted="false"></File>
            </div>
        </div>
        <div class="min-h-screen justify-center items-center grow shrink-0 flex flex-col text-center">
            <p class="font-itsa-bold text-[clamp(3em,10vw,5.5em)]">
                print & digital use
            </p>
            <div class="flex w-full justify-center items-center translate-y-[-30px] max-[520px]:translate-y-[-20px]">
                <p class="text-[clamp(.8rem,3vw,1rem)] text-center w-full max-w-2xl">
                    all files are royalty-free and one time fee. you can use them in any number of personal and
                    commercial
                    projects for yourself or a client and you can do any ind of design work with them.
                </p>
            </div>
            <div class="flex rounded-[1em] w-full justify-center overflow-hidden">
                <File file="video2-universalicon.gif" folder="../assets/img/gallery/universalicons" type="img"
                    :encrypted="false"></File>
            </div>
        </div>
        <div class="min-h-screen justify-center items-center grow shrink-0 flex flex-col text-center">
            <p class="font-itsa-bold text-[clamp(3em,10vw,5.5em)]">
                universal icon pack
            </p>
            <div class="flex w-full justify-center items-center translate-y-[-30px] max-[520px]:translate-y-[-20px]">
                <p class="text-[clamp(.8rem,3vw,1rem)] text-center w-full max-w-2xl">
                    all files are royalty-free and one time fee. you can use them in any number of personal and
                    commercial
                    projects for yourself or a client and you can do any ind of design work with them.
                </p>
            </div>
            <div class="flex rounded-[1em] w-full justify-center overflow-hidden">
                <File file="video3-universalicon.gif" folder="../assets/img/gallery/universalicons" type="img"
                    :encrypted="false"></File>
            </div>
        </div>
        <div class="min-h-screen items-center justify-center grow shrink-0 flex flex-col" id="card_section">
            <CardProduct :id_producto="2" titulo="get this pack" subtitulo="universal icon pack"
                descripcion="524 items available as: illustrator, figma, svg & pdf commercial & personal use"
                precio="455">
            </CardProduct>
        </div>
    </div>
</template>

<style scoped></style>
