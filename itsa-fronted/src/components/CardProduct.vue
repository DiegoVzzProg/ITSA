<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { dgav, IsNullOrEmpty, notify, site } from '../utils/site';
import { c_clientes } from '../services/s_clientes';
import { c_productos } from '../services/s_productos';

const props = defineProps<{
    id_producto: number;
    titulo: string;
    subtitulo: string;
    precio: string;
    descripcion: string;
}>();

const AddCartCostumer = async () => {
    const userData = site.getCookie('e.u.d');
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

        let mensaje: any = dgav.dataBase.message;

        if (response) {
            if (!IsNullOrEmpty(mensaje)) {
                notify.error(mensaje);
                return;
            }
            site.setCookies({
                "e.n.o.p": response.length.toString(),
            }, false);
        }

        site.RedirectPage("home");

    } else {
        site.RedirectPage("login");
    }
}

const Download = async () => {
    const response: any = await c_productos.fn_descargar_archivo(String(props.id_producto));
    console.log(response);

    if (response) {
        // // Se crea una URL temporal a partir del blob recibido
        // const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

        // // Se crea un elemento <a> para simular el clic y descargar el archivo
        // const link = document.createElement("a");
        // link.href = blobUrl;
        // link.download = filename; // Nombre del archivo a descargar
        // document.body.appendChild(link);
        // link.click();

        // // Se limpia el DOM y se libera la URL creada
        // document.body.removeChild(link);
        // window.URL.revokeObjectURL(blobUrl);
    }
}

function GoCheckOut() {
    const userData = site.getCookie('e.u.d');
    if (userData) {
        site.RedirectPage('checkout');
    }
}


const existeArticuloEnCarrito = ref<boolean>(false);
const habilitarDescarga = async () => {
    const response: any = await c_clientes.fn_existe_producto_carrito_cliente({
        id_producto: props.id_producto
    });


    if (response) {
        existeArticuloEnCarrito.value = response.existe;
    }
}
onMounted(() => {
    habilitarDescarga();
});
</script>

<template>
    <div
        class="flex text-center justify-between items-center flex-col gap-4 rounded-lg w-full max-w-[408px] border border-black min-h-[608px] max-h-[608px]">
        <p class="py-6 mt-6">
            {{ titulo }}
        </p>
        <p class="font-itsa-bold text-[clamp(2em,3vw,3em)]">
            {{ subtitulo }}
        </p>
        <p class="font-itsa-bold text-[clamp(2em,3vw,3em)]">
            ${{ precio }} mxn
        </p>
        <p class="w-full max-w-44 text-pretty">
            {{ descripcion }}
        </p>
        <div class="flex pb-12">
            <button v-if="existeArticuloEnCarrito" v-on:click="GoCheckOut()"
                class="border border-black hover:bg-black hover:text-white transtion-all px-[48px] rounded-full py-5">
                Go to cart
            </button>
            <button @click="AddCartCostumer"
                class="border border-black hover:bg-black hover:text-white transtion-all px-[48px] rounded-full py-5"
                v-else-if="Number(precio) > 0">
                buy
            </button>
            <button @click="Download"
                class="border border-black hover:bg-black hover:text-white transtion-all px-[48px] rounded-full py-5"
                v-else>
                download {{ Number(precio) > 0 ? "" : "free" }}
            </button>
        </div>
    </div>
</template>

<style scoped></style>
