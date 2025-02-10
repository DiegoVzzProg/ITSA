<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import SelectCountry from "../../components/SelectCountry.vue";
import { class_checkout, impuesto, productData, productPrecio, userData } from "./CheckOut";
import { site } from '../../utils/site';
import File from '../../components/File.vue';


onMounted(() => {
    userData.value = JSON.parse(site.getCookie("e.u.d") || "{}");

    class_checkout.productos();
    class_checkout.infoForms1();
});


onUnmounted(() => {

});

</script>

<template>
    <div class="flex flex-row gap-2 pt-[76px] w-full min-h-[200px] mb-6 items-end justify-center">
        <div class="flex flex-row w-full max-[1060px]:max-w-2xl gap-2">
            <p>
                hi,
            </p>
            <p>
                {{ userData.nombre }}!
            </p>
        </div>
    </div>
    <div
        class="flex flex-row gap-4 max-[1060px]:pb-20 justify-between w-full min-h-screen grow shrink-0 max-[1060px]:flex-col-reverse max-[1060px]:items-center">
        <div class="flex flex-col w-full max-w-md max-[1060px]:max-w-2xl gap-2">
            <div class="flex flex-col gap-1 text-[clamp(.85rem,3vw,1rem)]">
                <p>
                    your details
                </p>
                <p>biling</p>
            </div>
            <div class="flex flex-col gap-1" v-for="item in class_checkout.formCheckout1">
                <input v-model="item.value" type="text" class="border border-black py-5 px-3 rounded-full"
                    :placeholder="item.placeholder" @input="class_checkout.validateForms1(item.value, item.id)">
                <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold" v-if="item.error">
                    {{ item.error }}
                </span>
            </div>
            <div class="flex flex-row max-[680px]:flex-col w-full gap-2">
                <div class="flex flex-col w-full gap-1" v-for="item in class_checkout.formCheckout2">
                    <input v-model="item.value" type="text" class="border border-black py-5 px-3 rounded-full"
                        :placeholder="item.placeholder">
                    <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                        v-if="item.error">
                        {{ item.error }}
                    </span>
                </div>
            </div>
            <SelectCountry />
            <button type="submit" @click="class_checkout.AddCliente()"
                class="bg-black py-5 px-3 rounded-full text-white">
                continue
            </button>
        </div>

        <div class="flex flex-col w-full max-w-2xl gap-2">
            <p class="opacity-0 max-[1060px]:hidden before:content-['itsa']">

            </p>
            <p>
                cart
            </p>
            <div class="flex flex-col gap-2 border border-black py-5 px-10 sm:px-20 rounded-lg">
                <div class="flex flex-row justify-between text-[clamp(1.2rem,3vw,2rem)] pb-2 border-b border-b-black">
                    <p class="font-itsa-bold">
                        item
                    </p>
                    <p class="font-itsa-bold">
                        total
                    </p>
                </div>
                <div class="flex flex-col h-[120px] overflow-auto gap-2 border-b border-b-black py-2">
                    <div class="flex relative flex-row items-center gap-2" :key="index"
                        v-for="(item, index) in productData">
                        <div class="min-w-[100px] h-[100px] flex overflow-hidden bg-black rounded">
                            <File folder="../assets/img/gallery" :file="item.foto_producto" type="img"
                                :encrypted="false" />
                        </div>
                        <div class="flex flex-row w-full justify-between gap-4 text-[clamp(.85rem,3vw,1rem)]">
                            <p class="truncate">{{ item.descripcion }}</p>
                            <p>
                                ${{ item.precio }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row justify-between items-center gap-2 border-b border-b-black py-2">
                    <p class="font-itsa-bold text-[clamp(1.2rem,3vw,2rem)]">
                        tax(16%)
                    </p>
                    <p class="text-[1rem]">
                        ${{ impuesto }}
                    </p>
                </div>
                <div class="flex flex-row justify-between gap-2 py-2 items-center">
                    <p class="font-itsa-bold text-[clamp(1.2rem,3vw,2rem)]">
                        total
                    </p>
                    <p class="text-[1rem]">
                        ${{ productPrecio }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
