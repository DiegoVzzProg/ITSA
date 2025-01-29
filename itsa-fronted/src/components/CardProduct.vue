<script setup lang="ts">
import { onMounted } from 'vue';
import Cookies from "js-cookie";
import { dgav, IsNullOrEmpty, notify, site } from '../utils/site';
import { c_general } from '../services/s_general';
import { c_productos } from '../services/s_productos';
import { c_clientes } from '../services/s_clientes';

const props = defineProps<{
    id_producto: number;
    titulo: string;
    subtitulo: string;
    precio: string;
    descripcion: string;
}>();

const AddCartCostumer = async () => {
    const userData = Cookies.get('user_data');
    if (userData) {
        const parsedData = JSON.parse(userData);

        await c_clientes.fn_a_carrito_cliente({
            id_usuario: parsedData.id_usuario,
            id_producto: props.id_producto,
            descripcion: props.subtitulo
        });

        const message: any = dgav.dataBase.message;

        if (!IsNullOrEmpty(message)) {
            notify.error(message)
            return;
        }

        const response: any = await c_clientes.fn_l_carrito_cliente({
            id_usuario: parsedData.id_usuario,
        });

        if (response) {
            if (!IsNullOrEmpty(dgav.dataBase.message)) {
                notify.error(dgav.dataBase.message);
                return;
            }

            site.setCookies({
                numberCart: response.length.toString(),
            });
        }

        site.RedirectPage("home");

    } else {
        site.RedirectPage("login");
    }
}

const Download = async () => {
    // await c_productos.fn_l_productos({
    //     id_producto: props.id_producto
    // });


    // let response: any = dgav.dataBase;

    // if (!IsNullOrEmpty(response.message)) {
    //     notify.error(response.message)
    //     return;
    // }
    // let archivo: string = response.data.archivo;

    // c_general.DownloadFile(archivo);

    // response = dgav.dataBase;
    // if (!IsNullOrEmpty(response.message)) {
    //     notify.error(response.messag)
    //     return;
    // }

    // console.log(response.data);


    // //Crear un enlace para descargar el archivo
    // const url = window.URL.createObjectURL(new Blob([responseDownload.data]));
    // const link = document.createElement('a');
    // link.href = url;
    // link.setAttribute('download', "basicsicons"); // Nombre del archivo
    // document.body.appendChild(link);
    // link.click();

    // // Limpiar el objeto Blob
    // window.URL.revokeObjectURL(url);
}

onMounted(() => {

});
</script>

<template>
    <div
        class="flex text-center justify-between items-center flex-col gap-4 rounded-lg w-full max-w-[508px] border border-black min-h-[508px] max-h-[608px]">
        <p class="py-6">
            {{ titulo }}
        </p>
        <p class="font-itsa-bold text-[clamp(1.5em,3vw,3em)]">
            {{ subtitulo }}
        </p>
        <p class="font-itsa-bold text-[clamp(1.5em,3vw,3em)]">
            ${{ precio }} mxn
        </p>
        <p class="w-full max-w-44 text-pretty">
            {{ descripcion }}
        </p>
        <div class="flex pb-12">
            <button @click="AddCartCostumer"
                class="border border-black hover:bg-black hover:text-white transtion-all px-[48px] rounded-full py-5"
                v-if="Number(precio) > 0">
                buy
            </button>
            <button @click="Download"
                class="border border-black hover:bg-black hover:text-white transtion-all px-[48px] rounded-full py-5"
                v-else>
                download free
            </button>
        </div>
    </div>
</template>

<style scoped></style>
