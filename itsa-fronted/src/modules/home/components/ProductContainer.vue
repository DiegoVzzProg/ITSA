<template>
  <div
    :class="[
      'w-full max-w-[clamp(408px,40vw,508px)] lg:h-[clamp(208px,40vw,508px)] h-[408px] transition-all duration-300 ease-in-out',
      'bg-[rgb(244,242,239)] rounded-[12px] cursor-pointer px-5 flex-auto py-10',
    ]"
    v-on:click="RedirectFunction"
  >
    <div class="flex flex-row gap-2 justify-between items-center">
      <p
        v-text="prop.titulo"
        class="font-itsa-bold text-[clamp(2rem,2.3vw,2.4rem)] leading-7 w-full"
      ></p>

      <button
        :class="[
          `text-white bg-black py-2 translate-y-[3px] font-itsa-bold text-nowrap rounded-full px-[clamp(15px,3vw,28px)] tracking-wide`,
          `text-[clamp(1.5rem,3vw,2rem)]`
        ]"
        v-text="
          prop.precio > 0 ? `$${site.formatNumber(prop.precio)} mxn` : `free`
        "
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { site } from "../../../utils/site";

interface Props {
  pageRedirect: string;
  titulo: string;
  precio: number;
}

const prop = defineProps<Props>();

const RedirectFunction = () => {
  site.RedirectPage({
    name: prop.pageRedirect,
  });
};
</script>

<style scoped></style>
