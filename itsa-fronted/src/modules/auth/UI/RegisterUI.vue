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
            <div class="flex w-full max-w-md flex-col justify-between gap-3 h-[min(500px,100%)]"
                v-if="ContinueRegistration == 0">
                <p class="px-[clamp(18px,3vw,28px)]">
                    create a new user
                </p>
                <div class="flex flex-col gap-1" v-for="(item, index) in FormRegister.User" :key="index">
                    <input v-model="item.value" :type="item.type" class="border border-black py-5 px-3 rounded-full"
                        :placeholder="item.placeholder" :maxlength="item.maxLength"
                        v-on:input="ValidateRegistrationForm(item)">
                    <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold"
                        v-if="item.error">
                        {{ item.error }}
                    </span>
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
                            <button @click="site.RedirectPage('info', { select: 'terms' })"
                                class="underline underline-offset-1">terms</button>
                        </p>
                    </div>
                    <span class="text-[rgb(216,70,70)] text-sm font-semibold" v-if="FormLeyoTerms.error">
                        {{ FormLeyoTerms.error }}
                    </span>
                </div>
                <div class="flex flex-col w-full max-w-screen-lg max-[1020px]:max-w-md">
                    <button v-on:click="btnContinueForm()" id="btnContinueForm" type="button"
                        class="bg-black py-5 px-3 rounded-full text-white">
                        continue
                    </button>
                </div>
            </div>
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
                    <Loading v-if="responseRegister" />
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
import { onMounted, reactive, ref } from 'vue';
import Loading from '../../components/Loading.vue';
import { site } from '../../../utils/site';
import SelectCountry from '../../components/SelectCountry.vue';
import { s_auth } from '../services/s_auth';
const ContinueRegistration = ref<number>(0);
const responseRegister = ref<any>(null);
const FormLeyoTerms = reactive({
    value: false,
    error: "",
});

const FormRegister = reactive({
    User: {
        user_name: {
            id: "username",
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
                placeholder: "Vat number",
                error: "",
                maxLength: 12,
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

    const UserForm1: any = FormRegister.User;
    Object.keys(UserForm1).forEach((key) => {
        ValidateRegistrationForm(UserForm1[key]);
    });

    ValidateTerms(FormLeyoTerms.value);

    if (
        FormRegister.User.email.error ||
        FormRegister.User.password.error ||
        FormRegister.User.passwordConfirm.error ||
        FormRegister.User.user_name.error ||
        FormLeyoTerms.error
    )
        return;

    ContinueRegistration.value++;
}

function btnToBack() {
    if (ContinueRegistration.value == 0) {
        FormRegister.Reset();
        site.RedirectPage("home");
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
            ValidateUserName(item.value);
            break;
        case "email":
            ValidateEmail(item.value);
            break;
        case "password":
            ValidatePassword(item.value);
            break;
        case "passwordconfirmation":
            ValidatePasswordConfirm(item.value);
            break;
        case "name":
            ValidateName(item.value);
            break;
        case "address":
            ValidateAddress(item.value);
            break;
        case "vat_number":
            ValidateVatNumber(item.value);
            break;
        case "postal_code":
            ValidatePostalCode(item.value);
            break;
        case "state":
            ValidateState(item.value);
            break;
        case "country":
            ValidateCountry();
            break;
        case "phone":
            ValidatePhone(item.value);
            break;
    }
}

function ValidatePassword(value: string) {
    const password = FormRegister.User.password;
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value)) {
        password.error = `8 or more characters, At least one uppercase letter, At least one number, At least one special character`;
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
    const vat_number: any = FormRegister.Customer.Form1.vat_number;
    if (site.IsNullOrEmpty(value)) {
        vat_number.error = "";
    } else if (value.length < 8 || value.length > 12) {
        vat_number.error = "VAT number must be between 8 and 12 characters.";
    } else if (!/^[A-Z]{2}/.test(value)) {
        vat_number.error =
            "VAT number must start with a country code (e.g., ES, DE, FR).";
    } else if (!/^[A-Z]{2}[0-9A-Z]+$/.test(value)) {
        vat_number.error = "VAT number can only contain letters and numbers.";
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

    const UserForm1: any = FormRegister.User;

    const data = {
        user_name: UserForm1.user_name.value,
        email: UserForm1.email.value,
        password: UserForm1.password.value,
        leyo_terms: FormLeyoTerms.value,
        nombre: CustomerForm1.name.value,
        numero_de_iva_empresa: CustomerForm1.vat_number.value,
        direccion: CustomerForm1.address.value,
        codigo_postal: CustomerForm2.postal_code.value,
        estado: CustomerForm2.state.value,
        id_pais: CustomerForm3.country.id_pais,
        telefono: CustomerForm1.phone.value,
    };

    responseRegister.value = await s_auth.registerUser(data);

    if (!responseRegister.value) {
        FormRegister.Reset();
        return;
    }

    site.setCookies(
        {
            "e.t": responseRegister.value.token,
            "r.t": responseRegister.value.refresh_token,
            "s.t": responseRegister.value.session_token,
        },
        false,
        1
    );

    const response: any = await s_auth.secretKey();
    if (response.secretKey) {
        site.setCookies(
            {
                "e.k": response.secretKey,
            },
            false
        );

        site.LocalStorage("set", {
            logged_in_successfully: false
        });

        site.setCookies({
            "e.u.d": JSON.stringify(responseRegister.value.user_data),
            "e.c.d": JSON.stringify(responseRegister.value.client_data),
        });
        site.RedirectPage("home");
    }

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
