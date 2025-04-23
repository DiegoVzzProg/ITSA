<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { site } from '../../../utils/site';
import Loading from '../../components/Loading.vue';
import { ProductsClass } from '../services/products-service';
import { ApiResponse } from '../../../utils/Api.interface';
import { CostumersClass, IAddProduct, ICheckProductInShoppingCart } from '../services/costumers-service';
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

        const params: IAddProduct = {
            id_producto: props.id_producto,
            descripcion: props.subtitulo.replace(/<[^>]*>/g, '').trim()
        }

        const response: ApiResponse = await new CostumersClass().addProduct(params);

        if (response.data) {
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

    const params: ICheckProductInShoppingCart = {
        id_producto: props.id_producto
    }
    const response: ApiResponse = await new CostumersClass().checkProductInShoppingCart(params);

    if (!response.data) {
        return;
    }

    existeArticuloEnCarrito.value = response.data.existe;
}

onMounted(async () => {
    await habilitarBotonGoToCart();
    await checkProduct();
    loadingHabilitado.value = false;
});

const checkProduct = async () => {
    if (!site.userData())
        return;

    const params: any = {
        id_producto: props.id_producto
    }

    const response: ApiResponse = await new ProductsClass().checkProduct(params);

    if (!response.data)
        return;

    productoComprado.value = response.data.producto_comprado;
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
        <p class="font-itsa-bold text-[clamp(1.6rem,4vw,3.5rem)]" v-html="subtitulo">
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
                Add to cart
            </button>
        </div>
        <Loading v-else />
    </div>
</template>

<style scoped></style>
