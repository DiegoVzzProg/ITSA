<script setup lang="ts">
import { onMounted } from 'vue';
import { s_products } from '../services/s_products';
import { site } from '../../../utils/site';

const downloadProduct = async () => {
    const response: any = await s_products.downloadFile(btoa(site.userData().id_usuario));
    console.log(response);
    
    response.urls.forEach((element: any) => {
        const url = element.url;

        const a = document.createElement('a');
        a.href = url;
        a.download = 'prueba.zip';
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
    });
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
