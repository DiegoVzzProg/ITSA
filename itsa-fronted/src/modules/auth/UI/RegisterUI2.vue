<template>
    <div class="flex w-full min-h-full grow shrink-0 flex-col justify-center items-center gap-3">
        <div class="flex w-full justify-end max-w-md sticky top-[-1px] bg-white py-2">
            <button v-on:click="btnToBack()" class="flex flex-row">
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
            <Form @submit="btnRegisterUser_OnClick" :validation-schema="validationSchema"
                class="flex w-full max-w-md flex-col justify-between gap-3 h-[min(500px,100%)]"
                v-if="ContinueRegistration == 0">
                <p class="px-[clamp(18px,3vw,28px)]">
                    create a new user
                </p>
                <div class="flex flex-col gap-1" v-for="(item, index) in FormRegister.User" :key="index">
                    <Field :name="item.id" :placeholder="item.placeholder" :type="item.type"
                        class="border border-black py-5 px-3 rounded-full" autocomplete="off" />
                    <ErrorMessage class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                        :name="item.id" />
                </div>
                <div class="flex flex-col gap-2 w-full ps-5">
                    <div class="flex flex-row gap-1 items-center">
                        <label class="translate-y-[4px]">
                            <input type="checkbox" class="input" v-model="FormLeyoTerms.value"
                                v-on:change="ValidateTerms(FormLeyoTerms.value)">
                            <span class="custom-checkbox"></span>
                        </label>
                        <p>
                            i agree to the
                            <button @click="site.RedirectPage({ name: 'info', params: { select: 'terms' } })"
                                class="underline underline-offset-1">terms</button>
                        </p>
                    </div>
                    <span class="text-[rgb(216,70,70)] text-sm font-semibold" v-if="FormLeyoTerms.error">
                        {{ FormLeyoTerms.error }}
                    </span>
                </div>
                <div class="flex flex-col w-full max-w-screen-lg max-[1020px]:max-w-md">
                    <button type="submit" class=" bg-black py-5 px-3 rounded-full text-white" v-if="!loading">
                        register
                    </button>
                    <Loading v-else />
                </div>
            </Form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

import { onMounted, reactive, ref } from 'vue';
import Loading from '../../components/Loading.vue';
import { site } from '../../../utils/site';
import { AuthClass, IRegister } from '../services/auth-service';
import { ApiResponse } from '../../../utils/Api.interface';
const ContinueRegistration = ref<number>(0);

const FormLeyoTerms = reactive({
    value: false,
    error: "",
});

const FormRegister = reactive({
    User: {
        user_name: {
            id: "nombre",
            placeholder: "user name",
            type: "text"
        },
        email: {
            id: "email",
            placeholder: "email",
            type: "text"
        },
        password: {
            id: "password",
            placeholder: "password",
            type: "password"
        },
        passwordConfirm: {
            id: "passwordConfirm",
            placeholder: "password confirmation",
            type: "password"
        },
    }
});

const validationSchema = yup.object({
  nombre: yup.string()
    .required('this field is required')
    .min(4, 'this field must have at least 4 characters')
    .max(24, 'this field must have a maximum of 20 characters')
    .matches(/^[^\s`]+$/, 'the name cannot contain spaces and backticks'),
  email: yup.string()
    .required('email is mandatory')
    .email('you must add a valid email')
    .max(254, 'this field must have a maximum of 254 characters'),
  password: yup.string()
    .required('password is required')
    .min(8, 'this field must have at least 8 characters')
    .max(20, 'this field must have a maximum of 254 characters'),
  passwordConfirm: yup
    .string()
    .required('you must confirm the password')
    .oneOf([yup.ref('password')], 'passwords must match'),
})

onMounted(() => {

});


function btnToBack() {
    if (ContinueRegistration.value == 0) {
        site.RedirectPage({ name: 'home' });
        return;
    }

    if (ContinueRegistration.value <= 0) {
        ContinueRegistration.value = 0;
        return;
    }

    ContinueRegistration.value--;
}

function ValidateTerms(value: boolean) {
    if (!value) {
        FormLeyoTerms.error = "You must accept the terms and conditions";
    } else {
        FormLeyoTerms.error = "";
    }
}


const loading = ref<boolean>(false);

async function btnRegisterUser_OnClick(values: any) {

    ValidateTerms(FormLeyoTerms.value);

    loading.value = true;

    const data: IRegister = {
        user_name: values.nombre,
        email: values.email.trim(),
        password: values.password.trim(),
        leyo_terms: FormLeyoTerms.value
    };

    const response: ApiResponse = await new AuthClass().Register(data);

    if (!response.data) {
        ContinueRegistration.value = 0;
        loading.value = false;
        return;
    }

    site.setCookies(
        {
            "e.t": response.data.token,
            "r.t": response.data.refresh_token,
            "s.t": response.data.session_token,
        },
        false,
        1
    );

    console.log(response.data.user_data);   // Porque no se obtiene los datos del cliente?

    site.setCookies({
        "e.c.d": JSON.stringify(response.data.client_data),
        "e.u.d": JSON.stringify(response.data.user_data),
    });

    site.setCookies(
        {
            "e.k": response.data.secretKey,
        },
        false
    );

    site.LocalStorage("set", {
        logged_in_successfully: false
    });
    site.RedirectPage({ name: 'home' });
}


</script>

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
