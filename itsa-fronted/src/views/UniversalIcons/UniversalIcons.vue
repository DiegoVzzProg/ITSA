<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import File from '../../components/File.vue';
import CardProduct from '../../components/CardProduct.vue';
import { class_universalIcons } from './UniversalIcons';
import { IsNullOrEmpty } from '../../utils/site';
import { sp_list_products } from '../../stores/store_products';


onMounted(() => {
    class_universalIcons.onInit();

    const data: any = {
        id_producto: 2,
    };
    sp_list_products().exec(data);
});

onUnmounted(() => {
    class_universalIcons.onUnInit();
});
</script>

<template>
    <a href="#card_section"
        class="flex fixed bottom-[10px] transition-all hover:bg-[rgb(244,242,239)] hover:border-[rgb(244,242,239)] right-[40px] rounded-full border border-black px-6 py-4 z-[9999]">
        get this pack!
    </a>
    <div class="min-h-screen grow shrink-0 flex flex-col">
        <div class="min-h-screen"></div>
        <div class="min-h-screen"></div>
    </div>
    <div class="flex flex-col min-h-screen absolute w-full bg-[rgba(116,171,253,0.47)] after:content-[' '] after:absolute after:w-full after:h-full after:bg-[rgba(0,0,0)] after:transition-all after:duration-500 after:opacity-0 grow shrink-0 top-0 left-0 transition-all duration-500"
        id="padre_contenedor_scroll">
        <div class="w-full min-h-screen flex justify-center items-center sticky top-0 z-20">
            <div id="contenedor_scroll" class="flex flex-col w-full justify-start items-center">
                <div id="children_elemento1_scroll"
                    class="flex animate-fade-in flex-col w-full justify-center items-center">
                    <p
                        class="font-itsa-bold text-[clamp(45px,10vw,208px)] leading-[clamp(30px,7vw,130px)] flex text-white z-10">
                        universal <br> icon pack
                    </p>
                    <p class="text-[clamp(1em,3vw,2em)] text-center text-white">
                        a sleek & minimalist collection solid <br> of minimalist style icons.
                    </p>
                </div>
                <div id="children_elemento2_scroll"
                    class="hidden animate-fade-in flex-col w-full justify-center items-center">
                    <p
                        class="font-itsa-bold text-[clamp(25px,7vw,208px)] leading-[clamp(50px,10vw,150px)] font-bold flex text-white z-10">
                        +500 elements
                    </p>
                    <p
                        class="font-itsa-bold text-[clamp(25px,7vw,208px)] leading-[clamp(50px,10vw,150px)] text-center font-bold flex text-white z-10">
                        fully editable
                    </p>
                    <p
                        class="font-itsa-bold text-[clamp(25px,7vw,208px)] leading-[clamp(50px,10vw,150px)] text-center font-bold flex text-white z-10">
                        personal & comercial use
                    </p>
                </div>
            </div>
        </div>
        <div class="w-full flex min-h-screen justify-center items-center sticky bottom-0 z-0 opacity-40"
            id="contenedor_children_scroll">
            <div
                class="flex opacity-50 flex-row w-full justify-center max-[1090px]:justify-center items-center gap-[clamp(8px,1.5vw,16px)]">
                <File folder="../assets/img/gallery/universalicons" file="universalicon_cover.png" type="img"
                    :encrypted="false" class="max-[680px]:hidden" />
                <File folder="../assets/img/gallery/universalicons" file="universalicon_cover_1_icon.png" type="img"
                    :encrypted="false" class="max-[680px]:block hidden" />
            </div>
        </div>
    </div>
    <!-- <div
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
    </div> -->
    <div id="contenedor_gallery_basics"
        class="flex flex-col w-full min-h-screen grow shrink-0 px-[clamp(18px,5vw,68px)]">
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
        <div class="min-h-screen items-center justify-center grow shrink-0 flex flex-col" id="card_section"
            v-if="!IsNullOrEmpty(sp_list_products().products)">
            <CardProduct :id_producto="2" titulo="get this pack" subtitulo="universal icon pack"
                descripcion="524 items <br/> available as: <br/> illustrator, figma, svg & pdf <br/> commercial & personal use"
                :precio="`${sp_list_products().products.precio}`">
            </CardProduct>
        </div>
    </div>
</template>

<style scoped></style>
