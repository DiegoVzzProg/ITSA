<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { s_products } from '../services/s_products';
import { dgav, notify, site } from '../../../utils/site';
import { useRoute } from 'vue-router';
import stores from '../../stores/GeneralStores';
import { s_general } from '../../services/s_general';


const route = useRoute();

const downloadProduct = async () => {
    dgav.dataBase.message = "";
    let response;
    if (site.IsNullOrEmpty(route.query.idprod)) {
        response = await s_products.downloadFiles(btoa(site.userData().id_usuario));
    } else {
        response = await s_products.downloadFile(btoa(site.userData().id_usuario), String(route.query.idprod));
    }

    const message: string = dgav.dataBase.message;
    if (!site.IsNullOrEmpty(message)) {
        notify.error(message);
        site.RedirectPage({ name: 'home' });
        return;
    }

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

onMounted(async () => {
    if (route.query.session) {
        const response: any = await s_general.validateSessionStripe(
            route.query.session?.toString() ?? ""
        );

        if (response?.valid) {
            stores.echoStore().reconnect();
            stores.echoStore().init();
        }
    }
    downloadProduct();
});

onUnmounted(() => {

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
