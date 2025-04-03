<script setup lang="ts">
import { onMounted } from 'vue';
import { s_products } from '../services/s_products';
import { site } from '../../../utils/site';
import { useRoute } from 'vue-router';
import stores from '../../stores/GeneralStores';


const route = useRoute();

const downloadProduct = async () => {
    let response;
    if (site.IsNullOrEmpty(route.query.idprod)) {
        response = await s_products.downloadFiles(btoa(site.userData().id_usuario));
    } else {
        response = await s_products.downloadFile(btoa(site.userData().id_usuario), String(route.query.idprod));
    }

    console.log(response);

    response.urls.forEach((element: any) => {
        const url = element.url;

        const a = document.createElement('a');
        a.href = url;
        a.download = '';
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
    });
}

onMounted(() => {
    downloadProduct();
    stores.echoStore().leaveCartListener();
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
