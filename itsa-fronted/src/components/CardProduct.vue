<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fn_a_carrito_cliente } from '../services/s_cart';
import { useRouter } from 'vue-router';
import Cookies from "js-cookie";
import { MySQLInfo } from '../interface/mysql.interface';
import { IsNullOrEmpty, notify } from '../utils/site';

const router = useRouter();
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
        const data = {
            id_usuario: parsedData.id_usuario,
            id_producto: props.id_producto,
            descripcion: props.descripcion
        }

        await fn_a_carrito_cliente(data);

        if (!IsNullOrEmpty(MySQLInfo.message)) {
            notify.error(MySQLInfo.message)
            return;
        }

        router.push('/');

    } else {
        router.push('/login');
    }
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
                class="border border-black hover:bg-black hover:text-white transtion-all px-[48px] rounded-full py-5">
                <p v-if="Number(precio) > 0">
                    buy
                </p>
                <p v-else>
                    download free
                </p>
            </button>
        </div>
    </div>
</template>

<style scoped></style>
