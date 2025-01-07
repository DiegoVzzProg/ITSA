<script setup lang="ts">
import Cookies from "js-cookie";
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { IsNullOrEmpty, notify } from '../utils/site';
import { MySQLInfo } from "../interface/mysql.interface";
import { fn_l_carrito_cliente, fn_l_precio_carrito_cliente } from "../services/s_cart";

const route = useRoute();
const userData = ref<any>({});
const productPrecio = ref<string>("");
const impuesto = ref<string>("");
const productData = ref<any>({});
const name = ref<string>('');

const productos = async () => {
    const usuario = JSON.parse(Cookies.get('user_data') || "{}");
    if (usuario) {
        let response: any = await fn_l_carrito_cliente({
            id_usuario: usuario.id_usuario
        });

        if (!IsNullOrEmpty(MySQLInfo.message)) {
            notify.error(MySQLInfo.message)
            return;
        }

        productData.value = response.data;

        response = await fn_l_precio_carrito_cliente({
            id_usuario: usuario.id_usuario
        });

        if (!IsNullOrEmpty(MySQLInfo.message)) {
            notify.error(MySQLInfo.message)
            return;
        }
        productPrecio.value = response.precio;
        impuesto.value = response.impuesto;
    }
}

onMounted(() => {
    // var usuario = decryptValue(route.params.id.toString());
    userData.value = JSON.parse(Cookies.get('user_data') || "{}");
    productos();
});

</script>

<template>
    <div
        class="flex flex-row max-[1130px]:flex-col-reverse max-[1130px]:justify-end justify-between items-center w-full min-h-screen grow shrink-0 pt-[76px]">
        <div class="flex flex-row w-full">
            a
        </div>
        <div class="flex flex-col w-full">
            <p class="font-semibold text-[1.2rem] pb-5">
                cart
            </p>
            <div
                class="flex flex-col rounded-xl border-black border w-full max-w-screen-md px-[clamp(18px,5vw,80px)] py-[clamp(18px,3vw,80px)] min-h-[400px]">
                <div class="flex flex-row justify-between gap-3 border-b-black border-b pb-2">
                    <p class="font-itsa-bold text-[1.5rem]">
                        item
                    </p>
                    <p class="font-itsa-bold text-[1.5rem]">
                        total
                    </p>
                </div>
                <div class="flex flex-col overflow-auto max-h-[130px] gap-2 py-3 border-b-black border-b">
                    <div class="flex flex-row gap-2 justify-between items-center"
                        v-for="(productos, index) in productData" :key="index">
                        <div class="flex flex-row items-center gap-2">
                            <span class="h-[100px] bg-green-300 w-[100px]"></span>
                            <p class="text-[clamp(.8rem,1vw,1rem)]">
                                {{ productos.descripcion }}
                            </p>
                        </div>
                        <p class="text-[1rem]">
                            ${{ productos.precio }}
                        </p>
                    </div>
                </div>
                <div class="flex border-b-black border-b flex-row justify-between py-3">
                    <div class="flex flex-row items-center">
                        <p class="font-itsa-bold text-[1.5rem]">
                            tax
                        </p>
                        <p class="text-[1rem] translate-y-[-1px]">
                            (16%)
                        </p>
                    </div>
                    <p class="text-[1rem]">
                        ${{ impuesto }}
                    </p>
                </div>
                <div class="flex flex-row justify-between py-3">
                    <p class="font-itsa-bold text-[1.5rem]">
                        total
                    </p>
                    <p>
                        ${{ productPrecio }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
