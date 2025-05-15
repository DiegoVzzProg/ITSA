<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { site } from '../../../utils/site';
import { useRoute } from 'vue-router';
import stores from '../../stores/GeneralStores';
import { IDownloadFile, IDownloadFiles, ProductsClass } from '../services/products-service';
import { ApiResponse } from '../../../utils/Api.interface';
import { GeneralClass, IvalidateSessionStripe } from '../../services/general-service';


const route = useRoute();

const downloadProduct = async () => {

    if(!site.userData()){
        site.RedirectPage({ name: "home" });
        return;
    }
    
    let response: ApiResponse;

    if (site.IsNullOrEmpty(route.query.idprod)) {
        const data: IDownloadFiles = {
            id_usuario: btoa(site.userData()?.id_usuario || 0)
        }
        response = await new ProductsClass().downloadFiles(data);
    } else {
        const data: IDownloadFile = {
            id_usuario: btoa(site.userData()?.id_usuario || 0),
            id_producto: String(route.query.idprod)
        }
        response = await new ProductsClass().downloadFile(data);
    }

    if (!response.data)
        return;

    response.data.urls.forEach((element: any) => {
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

        const params: IvalidateSessionStripe = {
            session: route.query.session?.toString() ?? ""
        };

        const response: ApiResponse = await new GeneralClass().validateSessionStripe(params);

        if (response.data?.valid) {
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
