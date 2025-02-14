<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { site } from '../utils/site';
import { numberCartShopping } from '../stores/countCartShopping';
import { sp_add_product, sp_check_product_in_shopping_cart } from '../stores/store_customers';

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

        const response: any = await sp_add_product().exec({
            id_usuario: parsedData.id_usuario,
            id_producto: props.id_producto,
            descripcion: props.subtitulo
        });

        if (response) {
            numberCartShopping().update();
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

    const response: any = await sp_check_product_in_shopping_cart().exec({
        id_producto: props.id_producto
    })

    if (response) {
        existeArticuloEnCarrito.value = response.existe;
    }
}
onMounted(() => {
    habilitarBotonGoToCart();
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
                class="border border-black hover:bg-black hover:text-white transtion-all px-[48px] rounded-full py-5"
                v-else>
                {{ Number(precio) > 0 ? "Buy" : "Add to cart" }}
            </button>
        </div>
    </div>
</template>

<style scoped></style>
