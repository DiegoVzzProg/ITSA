<script setup lang="ts">
import { onMounted, ref } from 'vue';

defineProps<{
    url: string;
    type: string;
    encrypted: boolean;
}>();

const getImagePath = (nombreArchivo: string) => {
    return new URL(`../assets/img/${nombreArchivo}`, import.meta.url).href;
};

onMounted(() => {

});
</script>

<template>
    <div class="flex" v-if="type == 'img'">
        <img :src="getImagePath(url)" alt="" srcset="" class="object-contain">
    </div>
</template>

<style scoped></style>
