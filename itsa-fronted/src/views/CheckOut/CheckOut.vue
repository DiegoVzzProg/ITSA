<script setup lang="ts">
import { onMounted } from 'vue';
import SelectCountry from "../../components/SelectCountry.vue";
import { site } from '../../utils/site';
import File from '../../components/File.vue';
import { sp_delete_product_from_shoppingCart, sp_shopping_cart_client, } from '../../stores/store_customers';
import Loading from '../../components/Loading.vue';
import { CheckOutClass } from './CheckOut';

onMounted(() => {
    CheckOutClass.OnInit();
});

</script>

<template>

    <div class="pt-[76px] min-h-[200px] mb-6">
    </div>
    <div
        class="flex flex-row gap-4 max-[1060px]:pb-20 justify-evenly w-full min-h-screen grow shrink-0 max-[1060px]:flex-col-reverse max-[1060px]:items-center">
        <div class="flex flex-col w-full max-w-md max-[1060px]:max-w-2xl gap-4 min-h-full grow shrink-0">
            <div class="flex flex-col gap-1 text-[clamp(.85rem,3vw,1rem)]">
                <div class="flex flex-row w-full gap-2 font-semibold">
                    <p>
                        hi user,
                    </p>
                    <p>
                        {{ site.userData().nombre }}!
                    </p>
                </div>
                <p>
                    your details
                </p>
                <p>biling</p>
            </div>
            <div class="flex flex-col w-full min-h-full grow shrink-0">
                <div v-if="!CheckOutClass.ClientData.value || CheckOutClass.Editar.value"
                    class="flex flex-col gap-2 w-full">
                    <div class="flex flex-col gap-1" v-for="item in CheckOutClass.FormCostumer.Customer.Form1">
                        <input v-model="item.value" type="text" :maxlength="item.maxLength"
                            class="border border-black py-5 px-3 rounded-full" :placeholder="item.placeholder"
                            v-on:input="CheckOutClass.ValidateRegistrationForm(item)">
                        <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                            v-if="item.error">
                            {{ item.error }}
                        </span>
                    </div>
                    <div class="flex flex-row max-[680px]:flex-col w-full gap-2">
                        <div class="flex flex-col w-full gap-1"
                            v-for="item in CheckOutClass.FormCostumer.Customer.Form2">
                            <input v-model="item.value" type="text" :maxlength="item.maxLength"
                                v-on:input="CheckOutClass.ValidateRegistrationForm(item)"
                                class="border border-black py-5 px-3 rounded-full" :placeholder="item.placeholder">
                            <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                                v-if="item.error">
                                {{ item.error }}
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <SelectCountry v-model="CheckOutClass.FormCostumer.Customer.Form3.country.id_pais"
                            :placeholder="CheckOutClass.FormCostumer.Customer.Form3.country.placeholder" />
                        <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                            v-if="CheckOutClass.FormCostumer.Customer.Form3.country.error">
                            {{ CheckOutClass.FormCostumer.Customer.Form3.country.error }}
                        </span>
                    </div>
                    <div v-if="CheckOutClass.Editar.value" class="flex flex-row gap-2 w-full">
                        <button @click="CheckOutClass.FunctionEditClient()"
                            class="bg-black py-5 px-3 rounded-full text-white w-full">
                            edit
                        </button>
                        <button @click="CheckOutClass.Editar.value = !CheckOutClass.Editar.value"
                            class="border-black border py-5 px-3 rounded-full text-black w-full">
                            to back
                        </button>
                    </div>
                </div>
                <div v-else class="flex flex-col gap-4 w-full justify-between h-[min(500px,100%)]">
                    <div class="flex flex-col leading-1">
                        <p>
                            <strong>Name:</strong> {{ CheckOutClass.ClientData.value.nombre }}
                        </p>
                        <p>
                            <strong>Phone:</strong> {{ CheckOutClass.ClientData.value.telefono }}
                        </p>
                        <p>
                            <strong>Address:</strong> {{ CheckOutClass.ClientData.value.direccion }}
                        </p>
                        <div class="flex flex-row gap-1">
                            <p>
                                <strong>Postal Code:</strong> {{ CheckOutClass.ClientData.value.codigo_postal }},
                            </p>
                            <p>
                                <strong>State:</strong> {{ CheckOutClass.ClientData.value.estado }}
                            </p>
                        </div>
                        <p>
                            <strong>Country:</strong> {{ CheckOutClass.ClientData.value.pais }}
                        </p>
                        <span class="mt-3 text-[rgb(209,207,206)] underline underline-offset-1 cursor-pointer"
                            @click="CheckOutClass.FunctionEdit();">
                            edit
                        </span>
                    </div>
                    <div class="flex flex-col gap-3">
                        <p v-if="Number(CheckOutClass.ProductPrecio.value) > 0">
                            payment
                        </p>
                        <p v-else>
                            click to download
                        </p>
                        <button v-on:click="CheckOutClass.FunctionFinish()" v-if="!CheckOutClass.Finish.value"
                            class="bg-black py-5 px-3 rounded-full text-white">
                            finish
                        </button>
                        <button v-if="CheckOutClass.Finish.value && Number(CheckOutClass.ProductPrecio.value) > 0"
                            v-on:click="CheckOutClass.CheckoutSession()"
                            class="bg-black py-5 px-3 rounded-full text-white animate-fade-in">
                            pay with card
                        </button>
                        <button v-else-if="CheckOutClass.Finish.value && Number(CheckOutClass.ProductPrecio.value) == 0"
                            class="bg-black py-5 px-3 rounded-full text-white animate-fade-in">
                            download
                        </button>
                    </div>
                </div>
            </div>
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
                <div v-if="!sp_shopping_cart_client().loading" class="flex flex-col h-[120px] overflow-auto gap-2 py-2">
                    <div class="flex relative flex-row items-center gap-2" :key="index"
                        v-for="(item, index) in CheckOutClass.ProductData.value">
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
                        <button class="sticky right-0 rounded-s-full bg-white"
                            :disabled="sp_delete_product_from_shoppingCart().loading"
                            v-on:click="CheckOutClass.DeleteProduct(item.id_producto)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M18 6l-12 12" />
                                <path d="M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <Loading v-else />
                <div class="flex flex-row justify-between items-center gap-2 border-y border-y-black py-2">
                    <p class="font-itsa-bold text-[clamp(1.2rem,3vw,2rem)]">
                        tax(16%)
                    </p>
                    <p class="text-[1rem]">
                        ${{ CheckOutClass.Impuesto.value }}
                    </p>
                </div>
                <div class="flex flex-row justify-between gap-2 py-2 items-center">
                    <p class="font-itsa-bold text-[clamp(1.2rem,3vw,2rem)]">
                        total
                    </p>
                    <p class="text-[1rem]">
                        ${{ CheckOutClass.ProductPrecio.value }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
