<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {

});
</script>

<template>
    <div class="flex w-full justify-center items-center h-[min(500px,100%)] bg-white">
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
