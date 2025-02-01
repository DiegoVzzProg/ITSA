<script setup lang="ts">
import { onMounted } from 'vue';
import { dgav } from '../utils/site';

onMounted(() => {

});
</script>

<template>
    <div class="flex w-full justify-center fixed top-0 left-0 items-center bg-white z-[9999] h-full animate-fade-in "
        v-if="dgav.dataBase.isLoading">
        <svg viewBox="25 25 50 50" class="svg-loading">
            <circle r="20" cy="50" cx="50"></circle>
        </svg>
    </div>
</template>

<style scoped>
.svg-loading {
    width: 3.25em;
    transform-origin: center;
    animation: rotate4 2s linear infinite;
}

.svg-loading circle {
    fill: none;
    stroke: hsl(214, 97%, 59%);
    stroke-width: 2;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash4 {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 200;
        stroke-dashoffset: -35px;
    }

    100% {
        stroke-dashoffset: -125px;
    }
}
</style>
