<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import { fileEncrypted } from '../services/s_general/s_general';
import Loading from './Loading.vue';

const props = defineProps<{
    file: string;
    type: string;
    encrypted: boolean;
}>();

const imageUrl = ref<string>('');

const getImagePath = async (): Promise<void> => {
    if (props.encrypted) {
        const response = await fileEncrypted(props.file);
        imageUrl.value = response.data.url;
    } else {

        imageUrl.value = new URL(`${props.file}`, import.meta.url).href
    }
};

onMounted(() => {
    getImagePath();
});

onBeforeMount(() => {
});

</script>

<template>
    <div class="flex" v-if="imageUrl != ''">
        <div class="flex" v-if="props.type == 'img'">
            <img :src="imageUrl" alt="Imagen" class="object-contain" />
        </div>
    </div>
    <div class="flex w-full justify-center" v-else>
        <Loading />
    </div>
</template>

<style scoped></style>
