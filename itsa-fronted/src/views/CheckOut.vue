<script setup lang="ts">
import Cookies from "js-cookie";
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { decryptValue, Init, IsNullOrEmpty, notify } from '../utils/site';
import { getProductos } from "../services/s_productos/s_productos";
import { MySQLInfo } from "../interface/mysql.interface";
import { fn_l_carrito_cliente, fn_l_precio_carrito_cliente } from "../services/s_cart";

const route = useRoute();
const userData = ref<any>({});
const productPrecio = ref<string>("");
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
    }
}

onMounted(() => {
    // var usuario = decryptValue(route.params.id.toString());
    userData.value = JSON.parse(Cookies.get('user_data') || "{}");
    productos();
});

</script>

<template>
    <div class="flex flex-row justify-between w-full min-h-[calc(100vh-76px)] grow shrink-0 pt-[76px] ">
        <div
            class="flex flex-row max-[1260px]:flex-col items-center max-[1260px]:items-start max-[1260px]:justify-center gap-3 w-full">
            <div class="flex flex-col w-full min-h-[540px] max-w-xs justify-start">
                <p class="font-bold">
                    hi, {{ userData["nombre"] }}!
                </p>
            </div>
            <div class="flex min-h-[540px] grow shrink-0 flex-col max-w-md justify-center gap-3 w-full">
                <div class="flex flex-col">
                    <p class="px-[clamp(18px,3vw,28px)] max-[1260px]:px-[0px]">
                        your details
                    </p>
                    <p class="px-[clamp(18px,3vw,28px)] max-[1260px]:px-[0px]">
                        billing
                    </p>
                </div>
                <div class="flex flex-col gap-1">
                    <input type="text" disabled :value="userData['nombre']"
                        class="border placeholder:text-[rgba(0,0,0,0.5)] border-black py-5 px-3 rounded-full"
                        placeholder="name">
                    <!-- <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] max-[1260px]:px-[0px] font-semibold" v-if="emailError">
                        {{ emailError }}
                    </span> -->
                </div>
                <div class="flex flex-col gap-1">
                    <input type="text"
                        class="border placeholder:text-[rgba(0,0,0,0.5)] border-black py-5 px-3 rounded-full"
                        placeholder="vat number">
                    <!-- <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] max-[1260px]:px-[0px] font-semibold" v-if="emailError">
                        {{ emailError }}
                    </span> -->
                </div>
                <div class="flex flex-col gap-1">
                    <input type="text"
                        class="border placeholder:text-[rgba(0,0,0,0.5)] border-black py-5 px-3 rounded-full"
                        placeholder="address">
                    <!-- <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] max-[1260px]:px-[0px] font-semibold" v-if="emailError">
                        {{ emailError }}
                    </span> -->
                </div>
                <div class="flex flex-row gap-2">
                    <div class="flex flex-col gap-1">
                        <input type="text"
                            class="border placeholder:text-[rgba(0,0,0,0.5)] border-black py-5 px-3 rounded-full"
                            placeholder="postcode">
                        <!-- <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] max-[1260px]:px-[0px] font-semibold" v-if="emailError">
                        {{ emailError }}
                    </span> -->
                    </div>
                    <div class="flex flex-col gap-1">
                        <input type="text"
                            class="border placeholder:text-[rgba(0,0,0,0.5)] border-black py-5 px-3 rounded-full"
                            placeholder="address">
                        <!-- <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] max-[1260px]:px-[0px] font-semibold" v-if="emailError">
                        {{ emailError }}
                    </span> -->
                    </div>
                </div>
                <button class="flex flex-row justify-between border border-black py-5 px-3 rounded-full">
                    <p class="text-[rgba(0,0,0,0.5)]">
                        country
                    </p>
                    <span class="flex h-full items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                            fill="currentColor"
                            class="icon icon-tabler icons-tabler-filled icon-tabler-triangle-inverted">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                                d="M20.118 3h-16.225a2.914 2.914 0 0 0 -2.503 4.371l8.116 13.549a2.917 2.917 0 0 0 4.987 .005l8.11 -13.539a2.914 2.914 0 0 0 -2.486 -4.386z" />
                        </svg>
                    </span>
                </button>
                <button type="button" class="bg-black py-5 px-3 rounded-full text-white">
                    continue
                </button>
            </div>
        </div>
        <div class="flex items-center justify-center flex-col w-full ps-[clamp(12px,5vw,80px)]">
            <div
                class="flex flex-col w-full min-h-96 justify-center px-[clamp(15px,5vw,80px)] border overflow-hidden border-black rounded-xl">
                <div class="flex flex-row justify-between border-b gap-3 border-b-black">
                    <p>
                        item
                    </p>
                    <p>
                        total
                    </p>
                </div>
                <div class="flex flex-col py-2 gap-2 border-b h-[185px] overflow-y-auto border-b-black">
                    <div class="flex flex-row items-center gap-2 justify-between"
                        v-for="(producto, index) in productData" :key="index">
                        <div class="flex flex-row gap-2 items-center">
                            <div class="flex bg-green-300 w-20 min-w-20 h-20"></div>
                            <p class="text-[.7rem] font-extrabold">
                                {{ producto.descripcion }}
                            </p>
                        </div>
                        <p>
                            ${{ producto.precio }}
                        </p>
                    </div>
                </div>
                <div class="flex flex-row justify-between w-full py-2 border-b-black border-b">
                    <div class="flex flex-row gap-2">
                        <p>
                            tax
                        </p>
                        <p>
                            (16%)
                        </p>
                    </div>
                </div>
                <div class="flex flex-row justify-between py-2">
                    <p>
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
