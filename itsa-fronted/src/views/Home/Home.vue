<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import { site } from '../../utils/site';
import { class_home, imgsPrincipal, productos } from './Home';
import File from '../../components/File.vue';
import Loading from '../../components/Loading.vue';


onMounted(() => {
    class_home.onInit();
});

onBeforeUnmount(() => {
    class_home.onUnInit();
});

</script>

<template>
    <div class="flex flex-col grow shrink-0 min-h-screen w-full">
        <div class="h-[50vh]" id="section1"></div>
        <div class="h-[50vh]" id="section2"></div>
        <div class="h-[50vh]" id="section3"></div>
        <div class="h-[50vh]" id="section4"></div>
        <div class="flex flex-col w-full justify-center items-center min-h-screen grow sticky bottom-0 shrink-0">
            <div
                class="flex relative flex-col text-center items-center justify-start gap-2 w-full overflow-hidden translate-y-[20px]">
                <p :class="`font-itsa-bold w-full text-[clamp(3rem,4vw,9rem)] ${img.class} top-[0]`"
                    v-for="(img, index) in imgsPrincipal" :key="index">
                    {{ img.texto }}
                </p>
            </div>
            <div class="flex w-full items-center justify-center translate-y-[clamp(0px,4vw,-30px)]">
                <span
                    class="flex flex-col items-center w-full text-center h-full text-[clamp(1.5rem,3vw,2.4rem)] animate-fade-in"
                    style="font-family:'Times New Roman', Times, serif; font-style: italic">
                    that make your stories look better
                </span>
            </div>
        </div>
        <div
            class="flex flex-col pt-[76px] w-full justify-start items-end min-h-screen grow shrink-0 relative animate-fade-in">
            <div class="flex flex-row-reverse w-full justify-end gap-3 py-5 transition-all max-[1024px]:flex-wrap max-[1024px]:justify-center"
                v-if="productos.length > 0">
                <div v-for="(producto, index) in productos" :key="index" :class="[
                    producto.hover_efecto,
                    'w-[min(508px,100%)] lg:min-h-[clamp(208px,40vw,508px)] min-h-[408px] transition-all duration-300 ease-in-out',
                    'bg-[rgb(244,242,239)] rounded-[12px] cursor-pointer p-5'
                ]">
                    <div class="flex flex-col w-full">
                        <div class="flex flex-row w-full justify-between items-center gap-2">
                            <p class="font-itsa-bold text-[clamp(2rem,2.3vw,2.4rem)] leading-7 w-full">
                                {{ producto.titulo }}
                            </p>
                            <button @click="site.RedirectPage(String(producto.url))"
                                :class="`text-white bg-black py-2 text-nowrap rounded-full px-[clamp(15px,3vw,28px)] text-[1.2rem] md:text-[1.4rem] lg:text-[1.2rem] xl:text-[1.8rem] tracking-wide`">
                                <p class="translate-y-[3px] font-itsa-bold ">
                                    {{ parseFloat(producto.precio) > 0 ?
                                        `$${site.formatNumber(parseFloat(producto.precio))} mxn` : 'free' }}
                                </p>
                            </button>
                        </div>
                        <div class="flex translate-y-[-8px] flex-col items-start">
                            <p class="max-w-[230px] leading-6">
                                <i class="times-new-roman-font text-[1rem] lg:text-[1.4rem] xl:text-[1.4rem]">{{
                                    producto.subtitulo }}</i>
                            </p>
                            <p class="text-[clamp(.6em,2vw,.7em)]">
                                {{ producto.descripcion }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center justify-center w-full h-[calc(100%-100px)]">
                        <span class="flex w-full max-w-[320px]">
                            <File folder="../assets/img/gallery" :file="producto.imagen" type="img"
                                :encrypted="false" />
                        </span>
                    </div>
                </div>
            </div>
            <Loading v-else />
        </div>
    </div>
</template>

<style scoped>
.hover_efecto_basicsIcons:hover {
    background-color: rgba(201, 117, 249, 0.459);
}

.hover_efecto_universalIcons:hover {
    background-color: rgba(116, 171, 253, 0.61);
}
</style>
