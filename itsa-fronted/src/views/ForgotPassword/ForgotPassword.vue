<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import { class_forgotPassword, FormForgotPassword } from './forgotPassword';
import { site } from '../../utils/site';

onMounted(() => {

});

onBeforeUnmount(() => {

});

</script>

<template>
    <div class="flex w-full max-w-md h-full flex-col justify-center gap-3">
        <div class="flex flex-col gap-3 pb-6">
            <p class="px-[clamp(18px,3vw,28px)]">
                Recover your password
            </p>
            <div class="flex flex-col gap-3">
                <div class="flex flex-col gap-1" v-for="(item, index) in FormForgotPassword" :key="index">
                    <input v-model="item.value" type="text" class="border border-black py-5 px-3 rounded-full"
                        :placeholder="item.placeholder">
                    <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                        v-if="item.error">
                        {{ item.error }}
                    </span>
                </div>
            </div>
            <div class="flex flex-row justify-between w-full px-[clamp(18px,3vw,28px)]">

            </div>
            <button type="submit" class="bg-black py-5 px-3 rounded-full text-white">
                Change password
            </button>
        </div>
    </div>
</template>

<style scoped></style>
