<script setup lang="ts">
import Cookies from "js-cookie";
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { decryptValue } from '../utils/site';

const route = useRoute();
const userData = ref<any>({});
const name = ref<string>('');
onMounted(() => {
    decryptValue(route.params.id.toString());
    userData.value = JSON.parse(Cookies.get('user_data') || "{}");
});

</script>

<template>
    <div class="flex flex-row justify-between w-full min-h-full grow shrink-0 pt-[76px]">
        <div class="flex flex-col w-full max-w-xs pt-[clamp(30px,5vw,100px)]">
            <p>
                hi, {{ userData["nombre"] }}!
            </p>
        </div>
        <div class="flex flex-col max-w-md gap-3 w-full pt-[clamp(30px,5vw,100px)]">
            <div class="flex flex-col gap-3">
                <p class="px-[clamp(18px,3vw,28px)]">
                    your details
                </p>
                <p class="px-[clamp(18px,3vw,28px)]">
                    billing
                </p>
            </div>
            <div class="flex flex-col gap-1">
                <input type="text" disabled :value="userData['nombre']"
                    class="border placeholder:text-[rgba(0,0,0,0.5)] border-black py-5 px-3 rounded-full"
                    placeholder="name">
                <!-- <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold" v-if="emailError">
                    {{ emailError }}
                </span> -->
            </div>
            <div class="flex flex-col gap-1">
                <input type="text" class="border placeholder:text-[rgba(0,0,0,0.5)] border-black py-5 px-3 rounded-full"
                    placeholder="vat number">
                <!-- <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold" v-if="emailError">
                    {{ emailError }}
                </span> -->
            </div>
            <div class="flex flex-col gap-1">
                <input type="text" class="border placeholder:text-[rgba(0,0,0,0.5)] border-black py-5 px-3 rounded-full"
                    placeholder="address">
                <!-- <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold" v-if="emailError">
                    {{ emailError }}
                </span> -->
            </div>
            <div class="flex flex-row gap-2">
                <div class="flex flex-col gap-1">
                    <input type="text"
                        class="border placeholder:text-[rgba(0,0,0,0.5)] border-black py-5 px-3 rounded-full"
                        placeholder="postcode">
                    <!-- <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold" v-if="emailError">
                    {{ emailError }}
                </span> -->
                </div>
                <div class="flex flex-col gap-1">
                    <input type="text"
                        class="border placeholder:text-[rgba(0,0,0,0.5)] border-black py-5 px-3 rounded-full"
                        placeholder="address">
                    <!-- <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold" v-if="emailError">
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
                        fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-triangle-inverted">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                            d="M20.118 3h-16.225a2.914 2.914 0 0 0 -2.503 4.371l8.116 13.549a2.917 2.917 0 0 0 4.987 .005l8.11 -13.539a2.914 2.914 0 0 0 -2.486 -4.386z" />
                    </svg>
                </span>
            </button>
        </div>
        <div class="flex flex-col w-full max-w-md pt-[clamp(30px,5vw,100px)]">

        </div>
    </div>
</template>

<style scoped></style>
