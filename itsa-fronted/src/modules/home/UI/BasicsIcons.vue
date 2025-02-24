<template>
    <a href="#card_section" id="a_card_section"
        class="flex fixed bottom-[10px] transition-all bg-[rgba(255,255,255,0.26)] hover:bg-[rgb(244,242,239)] hover:border-[rgb(244,242,239)] right-[10px] max-[768px]:left-1/2 max-[768px]:-translate-x-1/2 rounded-full border border-black px-6 py-4 z-[9999]">
        get this pack!
    </a>
    <div class="min-h-screen grow shrink-0 flex flex-col">
        <div class="min-h-screen"></div>
        <div class="min-h-screen"></div>
    </div>
    <div class="flex flex-col min-h-screen absolute w-full bg-[rgba(183,164,237,0.45)] grow shrink-0 top-0 left-0 transition-all duration-500"
        id="padre_contenedor_scroll">
        <div class="w-full min-h-screen flex justify-center items-center sticky top-0 z-20">
            <div id="contenedor_scroll" class="flex flex-col w-full justify-start items-center">
                <div id="children_elemento1_scroll"
                    class="flex animate-fade-in flex-col w-full justify-center items-center">
                    <p
                        class="font-itsa-bold text-[clamp(45px,10vw,208px)] leading-[78px] flex text-black z-10 select-none">
                        basics icon set
                    </p>
                    <p class="text-[clamp(1em,3vw,4em)] text-center text-black select-none">
                        a sleek & minimalist collection <br> of geometric-style icons.
                    </p>
                </div>
                <div id="children_elemento2_scroll"
                    class="hidden animate-fade-in flex-col w-full justify-center items-center">
                    <p
                        class="font-itsa-bold text-[clamp(35px,10vw,208px)] leading-[78px] font-bold flex text-white z-10 select-none">
                        +50 elements
                    </p>
                    <p
                        class="font-itsa-bold text-[clamp(20px,7vw,108px)] max-[480px]:translate-y-[-20px] text-center font-bold flex text-white z-10 select-none">
                        personal & comercial use
                    </p>
                </div>
            </div>
        </div>
        <div class="w-full flex min-h-screen justify-center items-center sticky bottom-0 z-0 opacity-40"
            id="contenedor_children_scroll">
            <div
                class="flex opacity-50 flex-row w-full justify-between max-[1090px]:justify-center items-center gap-[clamp(8px,1.5vw,16px)]">
                <img :src="icon_morado_1" alt="_" loading="lazy"
                    class="flex w-full max-w-[clamp(130px,18vw,280px)] max-[1090px]:hidden" />
                <img :src="icon_morado_2" alt="_" loading="lazy" class="w-full flex max-w-[560px]" />
                <img :src="icon_morado_3" alt="_" loading="lazy"
                    class="w-full flex max-w-[clamp(130px,18vw,215px)] max-[1090px]:hidden" />
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
                <img :src="gif_coleccion_1" alt="_" loading="lazy" class="object-contain" />
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
                    <img :src="AI" alt="_" loading="lazy" class="w-full max-w-[44px]" />
                    <img :src="SVG" alt="_" loading="lazy" class="w-full max-w-[34px]" />
                    <img :src="PDF" alt="_" loading="lazy" class="w-full max-w-[34px]" />
                </div>
            </div>
            <div
                class="flex flex-col justify-center items-end max-[1024px]:items-center w-full max-[1024px]:grow max-[1024px]:shrink-0">
                <div
                    class="flex items-center justify-center rounded-[1em] p-5 w-full max-w-[732px] h-full max-h-[732px] bg-[rgba(115,64,255,0.45)]">
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
            <div class="w-[90%] flex items-center h-screen wrapper max-h-[200px] max-w-[1536px] relative overflow-hidden"
                style="margin-inline: auto; content-visibility: auto;">
                <div v-for="i in 57" :key="i"
                    class="flex p-[40px] app-item-scroll-infinite-basic-icons absolute rounded bg-[rgb(213,169,239)] left-[max(calc(200px*8),100%)]"
                    :style="{ animationDelay: `calc(7s / 8 * (8 - ${i}) * -1)` }">
                    <File :file="`basic set-${i}.png`" folder="../../../assets/img/gallery/basicsIcons/icons" type="img"
                        :encrypted="false" class="w-full h-full max-w-[60px] min-w-[60px] max-h-[60px]"></File>
                </div>
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
import icon_morado_1 from '../../../assets/img/gallery/basicsIcons/icon_morado_1.png'
import icon_morado_2 from '../../../assets/img/gallery/basicsIcons/icon_morado_2.png'
import icon_morado_3 from '../../../assets/img/gallery/basicsIcons/icon_morado_3.png'
import PDF from '../../../assets/img/gallery/basicsIcons/PDF.png'
import AI from '../../../assets/img/gallery/basicsIcons/Ai.png'
import SVG from '../../../assets/img/gallery/basicsIcons/SVG.png'
import basic_set_50 from '../../../assets/img/gallery/basicsIcons/basic_set_50.png'
import gif_coleccion_1 from '../../../assets/img/gallery/basicsIcons/gif_coleccion_1.gif'
import { site } from '../../../utils/site';
import File from '../components/File.vue';
import CardProduct from '../components/CardProduct.vue';

const headerComponent = ref<HTMLElement | null>(null);
const padre_contenedor_scroll = ref<HTMLElement | null>(null);
const contenedor_scroll = ref<HTMLElement | null>(null);
const contenedor_children_scroll = ref<HTMLElement | null>(null);
const children_elemento1_scroll = ref<HTMLElement | null>(null);
const children_elemento2_scroll = ref<HTMLElement | null>(null);
const contenedor_gallery_basics = ref<HTMLElement | null>(null);

onMounted(() => {
    headerComponent.value = document.getElementById("header") as HTMLElement;
    headerComponent.value?.classList.add("bg-transparent");
    headerComponent.value?.classList.remove("bg-white");
    padre_contenedor_scroll.value = document.getElementById(
        "padre_contenedor_scroll"
    ) as HTMLElement;
    contenedor_scroll.value = document.getElementById(
        "contenedor_scroll"
    ) as HTMLElement;
    contenedor_children_scroll.value = document.getElementById(
        "contenedor_children_scroll"
    ) as HTMLElement;
    children_elemento1_scroll.value = document.getElementById(
        "children_elemento1_scroll"
    ) as HTMLElement;
    children_elemento2_scroll.value = document.getElementById(
        "children_elemento2_scroll"
    ) as HTMLElement;
    contenedor_gallery_basics.value = document.getElementById(
        "contenedor_gallery_basics"
    ) as HTMLElement;

    window.addEventListener("scroll", handleScroll);

})

onUnmounted(() => {
    headerComponent.value?.classList.add("bg-white");
    headerComponent.value?.classList.remove("bg-transparent");
    window.removeEventListener("scroll", handleScroll);
})

function handleScroll() {
    if (
        contenedor_scroll.value &&
        contenedor_children_scroll.value &&
        padre_contenedor_scroll.value &&
        contenedor_gallery_basics.value
    ) {
        const rect = contenedor_scroll.value.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const topAbsoluto = rect.top + scrollTop;

        const vpadre_contenedor_scroll: any = padre_contenedor_scroll.value;
        const IsMiddle =
            vpadre_contenedor_scroll.getBoundingClientRect().height / 2 <=
            topAbsoluto;
        const vchildren_elemento1_scroll: any = children_elemento1_scroll.value;
        const vchildren_elemento2_scroll: any = children_elemento2_scroll.value;

        if (IsMiddle) {
            site.replaceClass(vchildren_elemento1_scroll, "flex", "hidden");
            site.replaceClass(vchildren_elemento2_scroll, "hidden", "flex");
            site.replaceClass(
                vpadre_contenedor_scroll,
                "bg-[rgba(183,164,237,0.45)]",
                "bg-[rgba(25,18,44,0.7)]"
            );
        } else {
            site.replaceClass(vchildren_elemento1_scroll, "hidden", "flex");
            site.replaceClass(vchildren_elemento2_scroll, "flex", "hidden");
            site.replaceClass(
                vpadre_contenedor_scroll,
                "bg-[rgba(25,18,44,0.7)]",
                "bg-[rgba(183,164,237,0.45)]"
            );
        }

        const headerRect = headerComponent.value?.getBoundingClientRect();
        const galleryRect =
            contenedor_gallery_basics.value?.getBoundingClientRect();

        if (headerRect && galleryRect) {
            const headerBottom = headerRect.bottom;
            const galleryTop = galleryRect.top;
            const distance = galleryTop - headerBottom;

            if (distance <= 0) {
                headerComponent.value?.classList.add("bg-white");
                headerComponent.value?.classList.remove("bg-transparent");
            } else {
                headerComponent.value?.classList.add("bg-transparent");
                headerComponent.value?.classList.remove("bg-white");
            }
        }

        const card_section: HTMLElement = document.getElementById(
            "card_section"
        ) as HTMLElement;

        const a_card_section: HTMLElement = document.getElementById(
            "a_card_section"
        ) as HTMLElement;

        if (card_section.getBoundingClientRect().top <= 0) {
            a_card_section.classList.add("hidden");
        } else {
            a_card_section.classList.remove("hidden");
        }
    }
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

.animate-scroll-principal {}
</style>
