<template>
    <a href="#card_section" id="a_card_section"
        class="flex fixed bottom-[10px] hover:text-white transition-all bg-[rgba(255,255,255,0.26)] hover:bg-[rgb(0,0,0)] hover:border-[rgb(0,0,0)] right-[10px] max-[768px]:left-1/2 max-[768px]:-translate-x-1/2 rounded-full border border-black px-6 py-4 z-[9999]">
        get this pack!
    </a>
    <div id="overflow"
        class="after:content-[' '] after:bg-black after:opacity-0 after:z-10 after:absolute after:w-full after:h-full after:top-0 after:left-0 after:transition-all after:duration-500 bg-[rgba(183,164,237,0.45)] transition-all duration-500 absolute w-full top-0 left-0 z-0">
        <div class="min-h-screen"></div>
        <div class="min-h-screen"></div>
    </div>
    <div class="flex flex-col w-full">
        <div class="min-h-screen"></div>
        <div class="min-h-screen"></div>
    </div>
    <div
        class="flex flex-col min-h-screen scroll-section overflow-hidden absolute w-full grow shrink-0 top-0 left-0 transition-all duration-500">
        <div class="w-full h-screen flex justify-center items-center z-20">
            <div id="children_elemento1_scroll" class="flex flex-col w-full justify-center items-center">
                <p
                    class="font-itsa-bold text-[clamp(45px,10vw,208px)] leading-[clamp(30px,7vw,130px)] flex text-white z-10">
                    basics icon set
                </p>
                <p class="text-[clamp(1em,3vw,2em)] text-center text-white times-new-roman-font">
                    a sleek & minimalist collection <br> of geometric-style icons.
                </p>
            </div>
        </div>
        <div class="w-full h-screen flex justify-center items-center z-20">
            <div id="children_elemento2_scroll" class="flex flex-col w-full justify-center items-center">
                <p
                    class="font-itsa-bold text-[clamp(25px,7vw,208px)] leading-[clamp(50px,10vw,150px)] font-bold flex text-white z-10">
                    +50 elements
                </p>
                <p
                    class="font-itsa-bold text-[clamp(25px,7vw,208px)] leading-[clamp(50px,10vw,150px)] text-center font-bold flex text-white z-10">
                    personal & comercial use
                </p>
            </div>
        </div>
        <div class="w-full flex h-screen justify-center items-center absolute top-0 z-0 sticky-section">
            <div class="flex flex-row w-full justify-center max-[1090px]:justify-center items-center">
                <div class="flex flex-row justify-between w-full max-w-screen-xl items-center">
                    <File file="icon1 color 3.png" class="w-full max-w-[250px] imagen-icon-1" type="img" />
                    <File file="icon2 color 3.png" class="w-full max-w-[500px] imagen-icon-1" type="img" />
                    <File file="icon3 color 3.png" class="w-full max-w-[220px] imagen-icon-1" type="img" />
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col w-full min-h-screen grow shrink-0 px-[clamp(18px,5vw,68px)]"
        id="contenedor_gallery_basics">
        <div class="flex flex-col items-center justify-center w-full min-h-screen grow shrink-0">
            <p class="font-itsa-bold text-[clamp(40px,8vw,108px)]">
                fresh icons
            </p>
            <div class="flex rounded-[2em] overflow-hidden">
                <File file="gif_coleccion_1.gif" type="img"></File>
            </div>
        </div>
        <div class="flex flex-row w-full h-screen max-[1024px]:flex-col-reverse grow shrink-0">
            <div
                class="flex flex-col justify-center max-[1024px]:items-center max-[1024px]:text-center w-full max-w-lg  max-[1024px]:max-w-full max-[1024px]:grow max-[1024px]:shrink-0">
                <p class="font-itsa-bold text-[clamp(60px,8vw,108px)] leading-[100px]">
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
                    <File file="Ai.png" type="img" class="w-full max-w-[44px]"></File>
                    <File file="SVG.png" type="img" class="w-full max-w-[34px]"></File>
                    <File file="PDF.png" type="img" class="w-full max-w-[34px]"></File>
                </div>
            </div>
            <div
                class="flex flex-col justify-center items-end max-[1024px]:items-center w-full max-[1024px]:grow max-[1024px]:shrink-0">
                <div
                    class="flex items-center justify-center rounded-[1em] p-5 w-full max-w-[732px] h-full max-h-[732px] bg-[rgba(115,64,255,0.45)]">
                    <File file="basic_set_50.png" type="img" class="flex w-full max-w-[220px]"></File>
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
            <div
                class="flex items-center justify-center h-screen max-h-[530px] max-w-[1536px] relative overflow-hidden">
                <File file="video2-basicicon.gif" type="img" class="translate-x-[10px]" />
            </div>
        </div>
        <div class="min-h-screen items-center justify-center grow shrink-0 flex flex-col" id="card_section">
            <CardProduct :id_producto="1" titulo="basics icon set" subtitulo="basics icons pack"
                descripcion="57 items <br/> available as: <br/> illustrator, figma & svg <br/> commercial & personal use"
                precio="0">
            </CardProduct>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import File from '../components/File.vue';
import CardProduct from '../components/CardProduct.vue';
import { $v2 } from '../../../utils/JQueryV2';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const headerComponent = ref<HTMLElement | null>(null);

onMounted(() => {
    headerComponent.value = document.getElementById("header") as HTMLElement;
    $v2("header").addStyle("background-color: transparent;");

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
        trigger: ".sticky-section",
        start: "center center",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        snap: {
            snapTo: 1,
            delay: 0,
            duration: 1
        }
    });

    ScrollTrigger.create({
        trigger: ".scroll-section",
        start: "center center",
        end: "bottom top",
        pinSpacing: false,
        onToggle: (self) => {
            const overflow: any = document.querySelector("#overflow");
            if (self.isActive) {
                $v2("header").find("#headerSection").replaceClass("border-black", "border-white");
                $v2("header").find("#logoBlack").replaceClass("block", "hidden");
                $v2("header").find("#logoWhite").replaceClass("hidden", "block");
                $v2("header").addStyle("color: white;");
                $v2(overflow).replaceClass("after:opacity-0", "after:opacity-30");
            } else {
                headerDefault();
                $v2(overflow).replaceClass("after:opacity-30", "after:opacity-0");
            }
        }
    });


    ScrollTrigger.create({
        trigger: ".scroll-section",
        start: "top center",
        end: "bottom top",
        pinSpacing: false,
        onToggle: (self) => {
            const header: any = document.querySelector("#header");
            if (self.isActive) {
                $v2(header).addStyle("background-color: transparent;");
            } else {
                $v2(header).addStyle("background-color: white;");
            }
        }
    });
})

onUnmounted(() => {
    const triggers = ScrollTrigger.getAll();
    triggers.forEach(trigger => trigger.kill());
    $v2("header").addStyle("background-color: white;");
})

const headerDefault = (): void => {

    $v2("header").find("#headerSection").replaceClass("border-white", "border-black");
    $v2("header").find("#logoBlack").replaceClass("hidden", "block");
    $v2("header").find("#logoWhite").replaceClass("block", "hidden");
    $v2("header").addStyle("color: black;");
}
</script>


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
