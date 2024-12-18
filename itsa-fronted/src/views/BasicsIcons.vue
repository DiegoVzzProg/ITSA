<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { replaceClass } from '../utils/site';

onMounted(() => {
    const contenedor: any = document.getElementById("main_contenedor");
    contenedor.scrollTo({ top: 0, behavior: 'smooth' });

    replaceClass(contenedor, "overflow-y-auto", "overflow-y-hidden")
});
</script>

<template>
    <div class="flex absolute top-0 left-0 h-[calc(100vh-80px)] bg-[rgba(183,164,237,0.45)] w-full z-1" id="overflow">
    </div>
    <div class="flex flex-col min-h-screen h-screen overflow-y-auto border w-full snap-y snap-mandatory relative">
        <div class="flex flex-col min-h-full grow shrink-0 snap-center">
        </div>
        <div class="flex flex-col min-h-full grow shrink-0 snap-center">
        </div>
    </div>
</template>

<style scoped></style>
