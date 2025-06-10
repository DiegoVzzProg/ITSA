<template>
  <button :key="prop.id" :style="{ '--hover-color': prop.hoverEffect }" :class="[
    'w-full text-start max-w-[clamp(408px,40vw,508px)] overflow-hidden lg:h-[clamp(208px,40vw,508px)] h-[408px] transition-all duration-300 ease-in-out',
    'bg-[rgb(244,242,239)] group rounded-[12px] cursor-pointer px-5 flex-auto py-8 flex flex-col max-md:bg-[var(--hover-color)] hover:bg-[var(--hover-color)]'
  ]" v-on:click="RedirectFunction" @mouseover="isHovered[prop.id] = true" @mouseleave="isHovered[prop.id] = false">
    <div class="flex flex-row gap-2 justify-between items-center">
      <p v-text="prop.titulo"
        class="font-itsa-bold group-hover:text-white text-[clamp(1.7rem,2.3vw,2.4rem)] leading-7 w-full"></p>
      <div :class="[
        `text-white bg-black py-2 text-nowrap rounded-full px-[clamp(15px,3vw,28px)] tracking-wide`
      ]">
        <p v-text="prop.precio > 0 ? `$${site.formatNumber(prop.precio)} mxn` : `free`"
          class="translate-y-[3px] font-itsa-bold text-[clamp(1.5rem,2.3vw,2rem)]"></p>
      </div>
    </div>
    <div class="flex flex-col justify-center translate-y-[clamp(-5px,2.3vw,-8px)] max-w-[70%]">
      <p class="w-full leading-6 text-balance">
        <i v-text="prop.subtitulo"
          class="times-new-roman-font group-hover:text-white text-[clamp(1.2rem,2.3vw,1.4rem)]"></i>
      </p>
      <p class="text-[clamp(.6em,2vw,.7em)] group-hover:text-white" v-text="prop.descripcion">
      </p>
    </div>
    <div class="flex justify-center items-center w-full h-full">
      <File :file="`${String(prop.urlImage)}`" type="img" class="flex w-[320px]" />
    </div>
  </button>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { site } from "../../../utils/site";
import File from "./File.vue";

const isHovered = reactive<Record<number, boolean>>({})

interface Props {
  id: number;
  pageRedirect: string;
  titulo: string;
  precio: number;
  subtitulo: string;
  descripcion: string;
  urlImage: string;
  hoverEffect: string;
}

const prop = defineProps<Props>();

const RedirectFunction = () => {
  site.RedirectPage({
    name: prop.pageRedirect,
  });
};
</script>

<style scoped></style>
