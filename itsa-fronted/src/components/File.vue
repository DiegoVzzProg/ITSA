<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import { fileEncrypted } from '../services/s_general/s_general';
import Loading from './Loading.vue';

const props = defineProps<{
    folder: string;
    file: string;
    type: string;
    encrypted: boolean;
}>();

const archivo = ref<string>('');

const getArchivo = async (): Promise<void> => {
    if (props.encrypted) {
        const response = await fileEncrypted(props.folder, props.file);
        archivo.value = response.data.url;
    } else {

        archivo.value = new URL(`${props.file}`, import.meta.url).href
    }
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
    <div class="flex w-full justify-center" v-else>
        <Loading />
    </div>
</template>

<style scoped></style>
