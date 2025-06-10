<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import { site } from '../../../utils/site';
const props = defineProps<{
    file: string;
    type: string;
    class?: string;
}>();

const archivo = ref<string>('');

const getArchivo = async (): Promise<void> => {
    const fechaActual: Date = new Date();
    archivo.value = `${import.meta.env.VITE_URL_RECURSOS}${props.file.trim()}?${fechaActual.getTime()}`;

};

onMounted(() => {
    getArchivo();
});

onBeforeMount(() => {
});

</script>

<template>

    <img :src="archivo" alt="_" loading="lazy" :class="['object-contain', props.class]"
        v-if="props.type == 'img' && !site.IsNullOrEmpty(archivo)" />

    <video :src="archivo" loop autoplay muted alt="_" loading="lazy" class="w-full h-full"
        v-else-if="props.type == 'video' && !site.IsNullOrEmpty(archivo)"></video>

</template>

<style scoped></style>
