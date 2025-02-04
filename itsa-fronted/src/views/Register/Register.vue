<script setup lang="ts">
import { site } from '../../utils/site';
import { c_registerView, FormRegister, leyo_terms, leyoTermsError } from './Register';


</script>

<template>
    <div class="flex w-full max-w-md h-full flex-col justify-center gap-3">
        <div class="flex flex-col gap-3 pb-6">
            <button @click="site.RedirectPage('home')" class="w-full flex flex-row justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M5 12l6 6" />
                    <path d="M5 12l6 -6" />
                </svg>
                <p>
                    regresar
                </p>
            </button>
            <p class="px-[clamp(18px,3vw,28px)]">
                create a new user
            </p>
            <div class="flex flex-col gap-1" v-for="(item, index) in FormRegister" :key="index">
                <input v-model="item.value" :type="item.type" class="border border-black py-5 px-3 rounded-full"
                    :placeholder="item.placeholder" :maxlength="item.maxLength"
                    v-on:input="c_registerView.validacionesFormRegister(item.placeholder)">
                <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold" v-if="item.error">
                    {{ item.error }}
                </span>
            </div>
            <div class="flex flex-col gap-2 w-full px-[clamp(18px,3vw,28px)]">
                <div class="flex flex-row gap-1">
                    <label class="translate-y-[1px]">
                        <input type="checkbox" class="input" v-model="leyo_terms">
                        <span class="custom-checkbox"></span>
                    </label>
                    <p>
                        i agree to the
                        <button @click="site.RedirectPage('info', { select: 'terms' })"
                            class="underline underline-offset-1">terms</button>
                    </p>
                </div>
                <span class="text-[rgb(216,70,70)] text-sm font-semibold" v-if="leyoTermsError">
                    {{ leyoTermsError }}
                </span>
            </div>
            <button type="button" @click="c_registerView.Register" class="bg-black py-5 px-3 rounded-full text-white">
                register
            </button>
        </div>
    </div>
</template>

<style scoped>
.input[type="checkbox"] {
    display: none;
}


/* Style for the custom checkbox */
.custom-checkbox {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #333;
    border-radius: 2px;
    position: relative;
    cursor: pointer;
}

/* Style for the custom checkmark */
.custom-checkbox::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: #333;
    border-radius: 2px;
    opacity: 0;
}

/* Show the checkmark when checkbox is checked */
.input[type="checkbox"]:checked+.custom-checkbox::after {
    opacity: 1;
}
</style>
