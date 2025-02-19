<script setup lang="ts">
import { onMounted } from 'vue';
import { numberCartShopping } from '../stores/countCartShopping';
import { notify, site } from '../utils/site';
import { c_productos } from '../services/s_productos';

const downloadProduct = async () => {
    const response: any = await c_productos.downloadFile();

    console.log(response);


    // const blob = await response.blob();
    // const blobUrl = window.URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = blobUrl;
    // link.setAttribute('download', 'archivo_itsa_studio.zip');
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // window.URL.revokeObjectURL(blobUrl); // Limpieza
}

onMounted(() => {
    downloadProduct();
});

</script>

<template>
    <div class="flex flex-col w-full min-h-screen pt-[10em]">
        <div class="flex flex-col animate-fade-in">
            <p class="font-itsa-bold text-[2rem]">
                thank you!
            </p>
            <p>
                you can access package details in the download files <br>
                of the computer
            </p>
        </div>
    </div>
</template>

<style scoped></style>
