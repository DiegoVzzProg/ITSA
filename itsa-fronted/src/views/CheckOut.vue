<script setup lang="ts">
import Cookies from "js-cookie";
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { IsNullOrEmpty, notify } from '../utils/site';
import { MySQLInfo } from "../interface/mysql.interface";
import { fn_l_carrito_cliente, fn_l_precio_carrito_cliente } from "../services/s_cart";
import SelectCountry from "../components/SelectCountry.vue";

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
        class="flex flex-row max-[1397px]:flex-col-reverse gap-2 max-[1130px]:justify-end justify-between items-center w-full min-h-screen grow shrink-0 pt-[76px]">
        <div class="flex flex-row max-[1397px]:flex-col w-full min-h-[464px]">
            <div class="w-full flex justify-center pb-1">
                <p class="w-full max-w-screen-sm">
                    hi, {{ userData.nombre }}!
                </p>
            </div>
            <div class="w-full flex justify-center min-w-[709px] max-[1397px]:min-w-full">
                <div class="flex flex-col w-full max-w-[460px] gap-2">
                    <div class="flex flex-col px-[clamp(18px,3vw,28px)]">
                        <p>
                            your details
                        </p>
                        <p>
                            billing
                        </p>
                    </div>
                    <div class="flex flex-col gap-1">
                        <input type="text" disabled class="border border-black py-5 px-3 rounded-full"
                            :value="userData.nombre">
                    </div>
                    <div class="flex flex-col gap-1">
                        <input type="text" class="border border-black py-5 px-3 rounded-full" placeholder="vat number">
                        <!-- <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                            v-if="emailError">
                            {{ emailError }}
                        </span> -->
                    </div>
                    <div class="flex flex-col gap-1">
                        <input type="text" class="border border-black py-5 px-3 rounded-full" placeholder="address">
                        <!-- <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                            v-if="emailError">
                            {{ emailError }}
                        </span> -->
                    </div>
                    <div class="flex flex-row max-[1130px]:flex-col gap-2">
                        <div class="flex flex-col w-full gap-1">
                            <input type="text" class="border border-black py-5 px-3 rounded-full"
                                placeholder="zip code">
                            <!-- <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                                v-if="emailError">
                                {{ emailError }}
                            </span> -->
                        </div>
                        <div class="flex flex-col w-full gap-1">
                            <input type="text" class="border border-black py-5 px-3 rounded-full" placeholder="state">
                            <!-- <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                                v-if="emailError">
                                {{ emailError }}
                            </span> -->
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <SelectCountry></SelectCountry>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col w-full max-w-screen-sm">
            <p class="pb-5">
                cart
            </p>
            <div
                class="flex flex-col rounded-xl border-black border w-full px-[clamp(18px,5vw,80px)] py-[clamp(18px,3vw,80px)] min-h-[400px]">
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
