<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { site } from '../../../utils/site';
import { s_costumers } from '../services/s_costumers';
import stores from '../../stores/GeneralStores';
const props = defineProps<{
    id_producto: number;
    titulo: string;
    subtitulo: string;
    precio: string;
    descripcion: string;
}>();

const AddCartCostumer = async () => {
    const userData = site.userData();
    if (userData) {
        const response: any = await s_costumers.addProduct({
            id_producto: props.id_producto,
            descripcion: props.subtitulo
        });

        if (response) {
            site.RedirectPage("home");
        }

    } else {
        site.RedirectPage("login");
    }
}

function GoCheckOut() {
    const userData = site.getCookie('e.u.d');
    if (userData) {
        site.RedirectPage('checkout');
    }
}


const existeArticuloEnCarrito = ref<boolean>(false);
const habilitarBotonGoToCart = async () => {

    const istoken: any = site.getCookie("e.t", false);
    if (site.IsNullOrEmpty(istoken)) {
        return;
    }

    const response: any = await s_costumers.checkProductInShoppingCart({
        id_producto: props.id_producto
    });

    if (response) {
        existeArticuloEnCarrito.value = response.existe;
    }
}
onMounted(() => {
    habilitarBotonGoToCart();
});

onUnmounted(() => {

});
</script>

<template>
    <div
        class="flex text-center py-[47px] justify-evenly items-center flex-col gap-4 rounded-lg w-full max-w-[508px] border border-black min-h-[608px] max-h-[608px] px-4">
        <p>
            {{ titulo }}
        </p>
        <p class="font-itsa-bold text-[clamp(1.6rem,4vw,3.5rem)]">
            {{ subtitulo }}
        </p>
        <p class="font-itsa-bold text-[clamp(1.6rem,4vw,3.5rem)]">
            ${{ site.formatNumber(parseFloat(precio)) }} mxn
        </p>
        <p class="w-full whitespace-pre-line" v-html="descripcion">
        </p>
        <div class="flex">
            <button v-if="existeArticuloEnCarrito" v-on:click="GoCheckOut()"
                class="border border-black hover:bg-black hover:text-white transtion-all px-[48px] rounded-full py-5">
                Go to cart
            </button>
            <button @click="AddCartCostumer"
                class=" border border-black hover:bg-black hover:text-white transtion-all px-[48px] rounded-full py-5"
                v-else>
                {{ Number(precio) > 0 ? "Buy" : "Add to cart" }}
            </button>
        </div>
    </div>
</template>

<style scoped></style>
