<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { site } from '../../../utils/site';
import { s_costumers } from '../services/s_costumers';
import { s_products } from '../services/s_products';
import stores from '../../stores/GeneralStores';
import Loading from '../../components/Loading.vue';
const productoComprado = ref<boolean>(false);
const loadingHabilitado = ref<boolean>(true);

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
            site.RedirectPage({ name: 'home' });
        }

    } else {
        site.RedirectPage({ name: 'login' });
    }
}

function GoCheckOut() {
    const userData = site.getCookie('e.u.d');
    if (userData) {
        site.RedirectPage({ name: 'checkout' });
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

onMounted(async () => {
    await habilitarBotonGoToCart();
    await checkProduct();
    loadingHabilitado.value = false;
});

const checkProduct = async () => {
    if (!site.userData())
        return;

    const response = await s_products.checkProduct(props.id_producto);

    if (!response)
        return;

    productoComprado.value = stores.echoStore().producto_comprado;
}

const downloadProduct = async () => {
    site.RedirectPage({ name: 'paymentcompleted', query: { idprod: btoa(props.id_producto.toString()) } });
}
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
        <div class="flex" v-if="!loadingHabilitado">
            <button v-if="existeArticuloEnCarrito && !productoComprado" v-on:click="GoCheckOut()"
                class="border border-black hover:bg-black hover:text-white transtion-all px-[48px] rounded-full py-5">
                Go to cart
            </button>
            <button v-if="!existeArticuloEnCarrito && productoComprado" v-on:click="downloadProduct()"
                class="border border-black hover:bg-black hover:text-white transtion-all px-[48px] rounded-full py-5">
                Download
            </button>
            <button @click="AddCartCostumer"
                class=" border border-black hover:bg-black hover:text-white transtion-all px-[48px] rounded-full py-5"
                v-else-if="!existeArticuloEnCarrito">
                {{ Number(precio) > 0 ? "Buy" : "Add to cart" }}
            </button>
        </div>
        <Loading v-else />
    </div>
</template>

<style scoped></style>
