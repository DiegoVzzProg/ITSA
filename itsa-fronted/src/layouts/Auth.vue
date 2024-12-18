<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {

});
</script>

<template>
    <main class="flex flex-col w-full h-screen px-[clamp(18px,5vw,68px)]" style="content-visibility: auto;">
        <div class="flex flex-col w-full items-center justify-center h-full overflow-y-auto" id="main_contenedor">
            <slot></slot>
        </div>
    </main>
</template>

<style scoped></style>
