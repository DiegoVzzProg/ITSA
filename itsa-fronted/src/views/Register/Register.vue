<script setup lang="ts">
import { onMounted } from 'vue';
import { site } from '../../utils/site';
import { RegisterClass } from './Register';
import SelectCountry from '../../components/SelectCountry.vue';

onMounted(() => {
    RegisterClass.OnInit();
});

</script>

<template>
    <div class="flex w-full min-h-full grow shrink-0 flex-col justify-center items-center gap-3">
        <div class="flex w-full justify-end max-w-md">
            <button v-on:click="RegisterClass.btnToBack()" class="flex flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M5 12l6 6" />
                    <path d="M5 12l6 -6" />
                </svg>
                <p>
                    to back
                </p>
            </button>
        </div>
        <div class="flex flex-row w-full justify-center max-w-screen-lg items-center gap-3 max-[1020px]:flex-col">
            <div class="flex w-full max-w-md flex-col justify-between gap-3 h-[min(500px,100%)]"
                v-if="RegisterClass.ContinueRegistration.value == 0">
                <p class="px-[clamp(18px,3vw,28px)]">
                    create a new user
                </p>
                <div class="flex flex-col gap-1" v-for="(item, index) in RegisterClass.FormRegister.User" :key="index">
                    <input v-model="item.value" :type="item.type" class="border border-black py-5 px-3 rounded-full"
                        :placeholder="item.placeholder" :maxlength="item.maxLength"
                        v-on:input="RegisterClass.ValidateRegistrationForm(item)">
                    <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                        v-if="item.error">
                        {{ item.error }}
                    </span>
                </div>
                <div class="flex flex-col gap-2 w-full ps-5">
                    <div class="flex flex-row gap-1 items-center">
                        <label class="translate-y-[4px]">
                            <input type="checkbox" class="input" v-model="RegisterClass.FormLeyoTerms.value"
                                v-on:change="RegisterClass.ValidateTerms(RegisterClass.FormLeyoTerms.value)">
                            <span class="custom-checkbox"></span>
                        </label>
                        <p>
                            i agree to the
                            <button @click="site.RedirectPage('info', { select: 'terms' })"
                                class="underline underline-offset-1">terms</button>
                        </p>
                    </div>
                    <span class="text-[rgb(216,70,70)] text-sm font-semibold" v-if="RegisterClass.FormLeyoTerms.error">
                        {{ RegisterClass.FormLeyoTerms.error }}
                    </span>
                </div>
                <div class="flex flex-col w-full max-w-screen-lg max-[1020px]:max-w-md">
                    <button v-on:click="RegisterClass.btnContinueForm()" id="btnContinueForm" type="button"
                        class="bg-black py-5 px-3 rounded-full text-white">
                        continue
                    </button>
                </div>
            </div>
            <div class="flex w-full max-w-md flex-col gap-3 justify-between h-[min(500px,100%)]" v-else>
                <p class="px-[clamp(18px,3vw,28px)]">
                    your details
                </p>
                <div class="flex flex-col gap-2 w-full">
                    <div class="flex flex-col gap-1" v-for="(item, index) in RegisterClass.FormRegister.Customer.Form1"
                        :key="index">
                        <input v-model="item.value" type="text" class="border border-black py-5 px-3 rounded-full"
                            :placeholder="item.placeholder" :maxlength="item.maxLength"
                            v-on:input="RegisterClass.ValidateRegistrationForm(item)">
                        <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                            v-if="item.error">
                            {{ item.error }}
                        </span>
                    </div>
                    <div class="flex flex-row max-[680px]:flex-col w-full gap-2">
                        <div class="flex flex-col w-full gap-1"
                            v-for="item in RegisterClass.FormRegister.Customer.Form2">
                            <input v-model="item.value" type="text"
                                v-on:input="RegisterClass.ValidateRegistrationForm(item)"
                                class="border border-black py-5 px-3 rounded-full" :placeholder="item.placeholder">
                            <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                                v-if="item.error">
                                {{ item.error }}
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <SelectCountry v-model="RegisterClass.FormRegister.Customer.Form3.country.id_pais"
                            :placeholder="RegisterClass.FormRegister.Customer.Form3.country.placeholder" />
                        <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                            v-if="RegisterClass.FormRegister.Customer.Form3.country.error">
                            {{ RegisterClass.FormRegister.Customer.Form3.country.error }}
                        </span>
                    </div>
                </div>
                <div class="flex flex-col w-full max-w-screen-lg max-[1020px]:max-w-md">
                    <button v-on:click="RegisterClass.btnRegisterUser_OnClick()" id="btnContinueForm" type="button"
                        class="bg-black py-5 px-3 rounded-full text-white">
                        register
                    </button>
                </div>
            </div>
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
