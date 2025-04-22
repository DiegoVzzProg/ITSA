<template>
    <div class="flex w-full min-h-full grow shrink-0 flex-col justify-center items-center gap-3">
        <div class="flex w-full justify-end max-w-md sticky top-[-1px] bg-white py-2">
            <button v-on:click="() => {
                FormRegister.Reset();
                site.RedirectPage({ name: 'home' });
            }" class="flex flex-row">
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

        <div class="flex w-full max-w-md flex-col gap-3 h-[min(500px,100%)]">
            <p class="px-[clamp(18px,3vw,28px)]">
                Update your password
            </p>
            <div class="flex flex-col gap-1" v-for="(item, index) in FormRegister.User" :key="index">
                <input v-model="item.value" :type="item.type" class="border border-black py-5 px-3 rounded-full"
                    :placeholder="item.placeholder" :maxlength="item.maxLength"
                    v-on:input="ValidateRegistrationForm(item)">
                <span class="text-[rgb(216,70,70)] text-sm px-[clamp(18px,3vw,28px)] font-semibold" v-if="item.error">
                    {{ item.error }}
                </span>
            </div>
            <div class="flex flex-col w-full max-w-screen-lg max-[1020px]:max-w-md">
                <Loading v-if="loading" />
                <button v-on:click="btnConfirmForm()" v-else id="btnConfirmForm" type="button"
                    class="bg-black py-5 px-3 rounded-full text-white">
                    confirm
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
//Password reset successfully
import { reactive, ref } from 'vue';
import { notify, site } from '../../../utils/site';
import { useRoute } from 'vue-router';
import Loading from '../../components/Loading.vue';
import { AuthClass, IConfirmRestorePassword } from '../services/auth-service';
import { ApiResponse } from '../../../utils/Api.interface';

const loading = ref<boolean>(false);
const route = useRoute();

const FormRegister = reactive({
    User: {
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

    Reset: function () {
        Object.values(this.User).forEach((field) => (field.value = "", field.error = ""));
    },
});



function ValidateRegistrationForm(item: any) {
    switch (item.id) {
        case "email":
            ValidateEmail(item.value);
            break;
        case "password":
            ValidatePassword(item.value);
            break;
        case "passwordconfirmation":
            ValidatePasswordConfirm(item.value);
            break;
    }
}

function ValidatePassword(value: string) {
    const password = FormRegister.User.password;
    if (value.length < 8) {
        password.error = "Password must be at least 8 characters long";
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

async function btnConfirmForm() {
    loading.value = true;
    const UserForm1: any = FormRegister.User;
    Object.keys(UserForm1).forEach((key) => {
        ValidateRegistrationForm(UserForm1[key]);
    });

    if (
        FormRegister.User.email.error ||
        FormRegister.User.password.error ||
        FormRegister.User.passwordConfirm.error
    )
        return;

    const params: IConfirmRestorePassword = {
        email: FormRegister.User.email.value,
        password: FormRegister.User.password.value,
        token: String(route.query.token) ?? ""
    }

    const response: ApiResponse = await new AuthClass().confirmRestorePassword(params);

    if (!response.data) {
        return;
    }

    FormRegister.Reset();
    notify.success("Password reset successfully");
    loading.value = false;
    site.RedirectPage({ name: response.data.redirect });
}

</script>

<style scoped></style>
