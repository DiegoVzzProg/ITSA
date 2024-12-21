<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
    titulo: string;
    subtitulo: string;
    precio: string;
    descripcion: string;
}>();


onMounted(() => {

});
</script>

<template>
    <div
        class="flex text-center justify-between items-center flex-col gap-4 rounded-lg w-full max-w-[508px] border border-black min-h-[508px] max-h-[608px]">
        <p class="py-6">
            {{ titulo }}
        </p>
        <p class="font-itsa-bold text-[clamp(1.5em,3vw,3em)]">
            {{ subtitulo }}
        </p>
        <p class="font-itsa-bold text-[clamp(1.5em,3vw,3em)]">
            ${{ precio }} mxn
        </p>
        <p class="w-full max-w-44 text-pretty">
            {{ descripcion }}
        </p>
        <div class="flex pb-12">
            <button
                class="border border-black hover:bg-black hover:text-white transtion-all px-[48px] rounded-full py-5">
                <p v-if="Number(precio) > 0">
                    buy
                </p>
                <p v-else>
                    download free
                </p>
            </button>
        </div>
    </div>
</template>

<style scoped></style>
