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
            <Form @submit="btnContinueForm" :validation-schema="schema"
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
                    <button id="btnContinueForm" type="submit" class=" bg-black py-5 px-3 rounded-full text-white">
                        continue
                    </button>
                </div>
            </Form>
            <div class="flex w-full max-w-md flex-col gap-3 justify-between grow shrink-0" v-else>
                <p class="px-[clamp(18px,3vw,28px)]">
                    your details
                </p>
                <div class="flex flex-col gap-2 w-full">
                    <div class="flex flex-col gap-1" v-for="(item, index) in FormRegister.Customer.Form1" :key="index">
                        <input v-model="item.value" type="text" class="border border-black py-5 px-3 rounded-full"
                            :placeholder="item.placeholder" :maxlength="item.maxLength"
                            v-on:input="ValidateRegistrationForm(item)">
                        <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                            v-if="item.error">
                            {{ item.error }}
                        </span>
                    </div>
                    <div class="flex flex-row max-[680px]:flex-col w-full gap-2">
                        <div class="flex flex-col w-full gap-1" v-for="item in FormRegister.Customer.Form2">
                            <input v-model="item.value" type="text" v-on:input="ValidateRegistrationForm(item)"
                                class="border border-black py-5 px-3 rounded-full" :placeholder="item.placeholder">
                            <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                                v-if="item.error">
                                {{ item.error }}
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <SelectCountry v-model="FormRegister.Customer.Form3.country.id_pais"
                            :placeholder="FormRegister.Customer.Form3.country.placeholder" />
                        <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                            v-if="FormRegister.Customer.Form3.country.error">
                            {{ FormRegister.Customer.Form3.country.error }}
                        </span>
                    </div>
                </div>
                <div class="flex flex-col w-full max-w-screen-lg max-[1020px]:max-w-md">
                    <Loading v-if="loading" />
                    <button v-on:click="btnRegisterUser_OnClick()" v-else id="btnContinueForm" type="button"
                        class="bg-black py-5 px-3 rounded-full text-white">
                        register
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

import { onMounted, reactive, ref } from 'vue';
import Loading from '../../components/Loading.vue';
import { site } from '../../../utils/site';
import SelectCountry from '../../components/SelectCountry.vue';
import { AuthClass, IRegister } from '../services/auth-service';
import { ApiResponse } from '../../../utils/Api.interface';
const ContinueRegistration = ref<number>(0);

const FormLeyoTerms = reactive({
    value: false,
    error: "",
});

const schema = yup.object({
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
    passwordconfirmation: yup
        .string()
        .required('you must confirm the password')
        .oneOf([yup.ref('password')], 'passwords must match'),
});

const FormRegister = reactive({
    User: {
        user_name: {
            id: "nombre",
            placeholder: "user name",
            value: "",
            error: "",
            maxLength: 24,
            type: "text",
        },
        email: {
            id: "email",
            placeholder: "email",
            value: "",
            error: "",
            maxLength: 254,
            type: "text",
        },
        password: {
            id: "password",
            placeholder: "password",
            value: "",
            error: "",
            maxLength: 20,
            type: "password",
        },
        passwordConfirm: {
            id: "passwordconfirmation",
            placeholder: "password confirmation",
            value: "",
            error: "",
            maxLength: 20,
            type: "password",
        },
    },
    Customer: {
        Form1: {
            name: {
                id: "name",
                value: "",
                placeholder: "Name",
                error: "",
                maxLength: 255,
            },
            vat_number: {
                id: "vat_number",
                value: "",
                placeholder: "Vat number (optional)",
                error: "",
                maxLength: 255,
            },
            address: {
                id: "address",
                value: "",
                placeholder: "Address",
                error: "",
                maxLength: 255,
            },
            phone: {
                id: "phone",
                value: "",
                placeholder: "Phone",
                error: "",
                maxLength: 10,
            },
        },
        Form2: {
            postal_code: {
                id: "postal_code",
                value: "",
                placeholder: "Postal Code",
                error: "",
            },
            state: {
                id: "state",
                value: "",
                placeholder: "State",
                error: "",
            },
        },
        Form3: {
            country: {
                id: "country",
                value: "",
                placeholder: "Country",
                error: "",
                id_pais: 0,
            },
        },
    },

    Reset: function () {
        Object.values(this.Customer.Form1).forEach((field) => (field.value = "", field.error = ""));
        Object.values(this.Customer.Form2).forEach((field) => (field.value = "", field.error = ""));
        Object.values(this.User).forEach((field) => (field.value = "", field.error = ""));
        this.Customer.Form3.country.id_pais = 0;
        this.Customer.Form3.country.error = "";
    },
});


onMounted(() => {

});

function btnContinueForm() {
    if (ContinueRegistration.value > 2) {
        ContinueRegistration.value = 2;
        return;
    }

    ValidateTerms(FormLeyoTerms.value);

    if (
        FormLeyoTerms.error
    )
        return;

    ContinueRegistration.value++;
}

function btnToBack() {
    if (ContinueRegistration.value == 0) {
        FormRegister.Reset();
        site.RedirectPage({ name: 'home' });
        return;
    }

    if (ContinueRegistration.value <= 0) {
        ContinueRegistration.value = 0;
        return;
    }

    ContinueRegistration.value--;
}

function ValidateRegistrationForm(item: any) {
    switch (item.id) {
        case "username":
            ValidateUserName(item.value.trim());
            break;
        case "email":
            ValidateEmail(item.value.trim());
            break;
        case "password":
            ValidatePassword(item.value.trim());
            break;
        case "passwordconfirmation":
            ValidatePasswordConfirm(item.value.trim());
            break;
        case "name":
            ValidateName(item.value.trim());
            break;
        case "address":
            ValidateAddress(item.value.trim());
            break;
        case "vat_number":
            ValidateVatNumber(item.value.trim());
            break;
        case "postal_code":
            ValidatePostalCode(item.value.trim());
            break;
        case "state":
            ValidateState(item.value.trim());
            break;
        case "country":
            ValidateCountry();
            break;
        case "phone":
            ValidatePhone(item.value.trim());
            break;
    }
}

function ValidatePassword(value: string) {
    const password = FormRegister.User.password;
    if (value.length < 8) {
        password.error = "Password must be at least 8 characters long.";
        return;
    }
    if (value.length > 20) {
        password.error = "Password should not exceed 20 characters";
        return;
    }

    password.error = "";
}

function ValidatePasswordConfirm(value: string) {
    if (FormRegister.User.password.value != value) {
        FormRegister.User.passwordConfirm.error = "Password does not match";
    } else {
        FormRegister.User.passwordConfirm.error = "";
    }
}

function ValidateEmail(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
        FormRegister.User.email.error = "The email is invalid";
    } else if (value.length > FormRegister.User.email.maxLength) {
        FormRegister.User.email.error =
            "The email should not exceed " +
            FormRegister.User.email.maxLength +
            " characters";
    } else {
        FormRegister.User.email.error = "";
    }
}

function ValidateUserName(value: string) {
    if (site.IsNullOrEmpty(value)) {
        FormRegister.User.user_name.error = "This field is required";
    } else if (value.length > FormRegister.User.user_name.maxLength) {
        FormRegister.User.user_name.error =
            "The name must not exceed " +
            FormRegister.User.user_name.maxLength +
            " characters";
    } else if (value.length < 4) {
        FormRegister.User.user_name.error =
            "The name must be at least 4 characters long";
    } else if (!/^[^\s`]+$/.test(value)) {
        FormRegister.User.user_name.error =
            "The name cannot contain spaces and backticks";
    } else {
        FormRegister.User.user_name.error = "";
    }
}

function ValidateTerms(value: boolean) {
    if (!value) {
        FormLeyoTerms.error = "You must accept the terms and conditions";
    } else {
        FormLeyoTerms.error = "";
    }
}

function ValidateName(value: string) {
    const name: any = FormRegister.Customer.Form1.name;

    if (site.IsNullOrEmpty(value)) {
        name.error = "This field is required.";
    } else if (value.length > 255) {
        name.error = "The input cannot exceed 255 characters.";
    } else if (!/^[a-zA-Z\u00C0-\u00FF\s]+$/.test(value)) {
        name.error = "The input can only contain letters.";
    } else {
        name.error = "";
    }
}

function ValidateVatNumber(value: string) {
    const regex: any = /^(?:(?:[A-Z&Ñ]{3,4}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[A-Z\d]{3})|(?:ATU\d{8}|BE0\d{9}|BG\d{9,10}|HR\d{11}|CY\d{8}[A-Z]|CZ\d{8,10}|DE\d{9}|DK\d{8}|EE\d{9}|EL\d{9}|ES[A-Z]\d{7}[A-Z]|FI\d{8}|FR[A-HJ-NP-Z0-9]{2}\d{9}|GB(?:\d{9}|\d{12}|GD\d{3}|HA\d{3})|HU\d{8}|IE\d{7}[A-W]|IT\d{11}|LT(?:\d{9}|\d{12})|LU\d{8}|LV\d{11}|MT\d{8}|NL\d{9}B\d{2}|PL\d{10}|PT\d{9}|RO\d{2,10}|SE\d{12}|SI\d{8}|SK\d{10}))$/;
    const vat_number: any = FormRegister.Customer.Form1.vat_number;
    if (site.IsNullOrEmpty(value)) {
        vat_number.error = "";
    } else if (!regex.test(value)) {
        vat_number.error =
            "Please enter a valid RFC or VAT number.";
    } else {
        vat_number.error = "";
    }
}

function ValidateAddress(value: string) {
    const address: any = FormRegister.Customer.Form1.address;
    if (site.IsNullOrEmpty(value)) {
        address.error = "Address is required.";
    } else if (value.length > 255) {
        address.error = "Address cannot exceed 255 characters.";
    } else {
        address.error = "";
    }
}

function ValidatePostalCode(value: string) {
    const postal_code: any = FormRegister.Customer.Form2.postal_code;
    if (site.IsNullOrEmpty(value)) {
        postal_code.error = "Postal code is required.";
    } else if (value.length < 3) {
        postal_code.error = "Postal code must be at least 3 characters long.";
    } else if (value.length > 10) {
        postal_code.error = "Postal code cannot exceed 10 characters.";
    } else if (!/^[A-Za-z0-9\s\-]+$/.test(value)) {
        postal_code.error = "Postal code contains invalid characters.";
    } else {
        postal_code.error = "";
    }
}

function ValidateState(value: string) {
    const state: any = FormRegister.Customer.Form2.state;
    if (site.IsNullOrEmpty(value)) {
        state.error = "State is required.";
    } else if (value.length < 2) {
        state.error = "State must be at least 2 characters long.";
    } else if (value.length > 50) {
        state.error = "State cannot exceed 50 characters.";
    } else if (!/^[A-Za-z\s\-]+$/.test(value)) {
        state.error = "State contains invalid characters.";
    } else {
        state.error = "";
    }
}

function ValidateCountry() {
    const country: any = FormRegister.Customer.Form3.country;
    if (country.id_pais == 0) {
        country.error = "Country is required.";
    } else {
        country.error = "";
    }
}

function ValidatePhone(value: string) {
    const phone: any = FormRegister.Customer.Form1.phone;
    if (site.IsNullOrEmpty(value)) {
        phone.error = "Phone is required.";
        return;
    }

    if (!/^[0-9\s\-]+$/.test(value)) {
        phone.error = "Phone contains invalid characters.";
        return;
    }

    if (value.length < 10 || value.length > 10) {
        phone.error = "Phone must be at least 10 characters long.";
        return;
    }

    phone.error = "";
}

const loading = ref<boolean>(false);

async function btnRegisterUser_OnClick() {
    const CustomerForm1: any = FormRegister.Customer.Form1;
    Object.keys(CustomerForm1).forEach((key) => {
        ValidateRegistrationForm(CustomerForm1[key]);
    });

    const CustomerForm2: any = FormRegister.Customer.Form2;
    Object.keys(CustomerForm2).forEach((key) => {
        ValidateRegistrationForm(CustomerForm2[key]);
    });

    const CustomerForm3: any = FormRegister.Customer.Form3;
    ValidateRegistrationForm(CustomerForm3.country);

    if (
        !site.IsNullOrEmpty(CustomerForm1.name.error) ||
        !site.IsNullOrEmpty(CustomerForm1.vat_number.error) ||
        !site.IsNullOrEmpty(CustomerForm1.address.error) ||
        !site.IsNullOrEmpty(CustomerForm2.state.error) ||
        !site.IsNullOrEmpty(CustomerForm2.postal_code.error) ||
        !site.IsNullOrEmpty(CustomerForm3.country.error)
    )
        return;

    loading.value = true;
    const UserForm1: any = FormRegister.User;

    const data: IRegister = {
        user_name: UserForm1.user_name.value,
        email: UserForm1.email.value.trim(),
        password: UserForm1.password.value.trim(),
        leyo_terms: FormLeyoTerms.value,
        nombre: CustomerForm1.name.value,
        numero_de_iva_empresa: CustomerForm1.vat_number.value,
        direccion: CustomerForm1.address.value,
        codigo_postal: CustomerForm2.postal_code.value,
        estado: CustomerForm2.state.value,
        id_pais: CustomerForm3.country.id_pais,
        telefono: CustomerForm1.phone.value,
    };

    const responseRegister: ApiResponse = await new AuthClass().Register(data);

    if (!responseRegister.data) {
        ContinueRegistration.value = 0;
        FormRegister.Reset();
        loading.value = false;
        return;
    }

    site.setCookies(
        {
            "e.t": responseRegister.data.token,
            "r.t": responseRegister.data.refresh_token,
            "s.t": responseRegister.data.session_token,
        },
        false,
        1
    );

    const response: ApiResponse = await new AuthClass().secretKey();

    if (!response.data) {
        return;
    }

    site.setCookies(
        {
            "e.k": response.data.secretKey,
        },
        false
    );

    site.LocalStorage("set", {
        logged_in_successfully: false
    });

    site.setCookies({
        "e.u.d": JSON.stringify(responseRegister.data.user_data),
        "e.c.d": JSON.stringify(responseRegister.data.client_data),
    });
    site.RedirectPage({ name: 'home' });
    loading.value = false;
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
