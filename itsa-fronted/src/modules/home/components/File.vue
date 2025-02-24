<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
const props = defineProps<{
    folder: string;
    file: string;
    type: string;
    encrypted: boolean;
}>();

const archivo = ref<string>('');

const getArchivo = async (): Promise<void> => {

    archivo.value = new URL(`${props.folder}/${props.file}`, import.meta.url).href

};

onMounted(() => {
    getArchivo();
});

onBeforeMount(() => {
});

</script>

<template>

    <div class="flex" v-if="props.type == 'img' && archivo != ''">
        <img :src="archivo" alt="_" loading="lazy" class="object-contain" />
    </div>
    <div v-else-if="props.type == 'video' && archivo != ''">
        <video :src="archivo" loop autoplay muted alt="_" loading="lazy" class="w-full h-full"></video>
    </div>
</template>

<style scoped></style>
