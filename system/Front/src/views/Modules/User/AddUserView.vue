<template>

    <p class="title-view">
        Add User System
    </p>
    <Form @submit="RegisterNewUser" class="flex flex-col gap-2 w-full forms-vee-validate" :validation-schema="schema">
        <div class="flex flex-col gap-2 w-full">
            <div class="flex flex-col gap-1 w-full">
                <span>
                    User name
                </span>
                <Field name="username" autocomplete="off" placeholder="Write a user..." type="text" />
                <ErrorMessage class="text-red-400 text-[clamp(.9rem,3vw,1rem)]" name="username" />
            </div>
            <div class="flex flex-col gap-1 w-full">
                <span>
                    Password
                </span>
                <Field name="password" autocomplete="off" placeholder="Write a password" type="password" />
                <ErrorMessage class="text-red-400 text-[clamp(.9rem,3vw,1rem)]" name="password" />
            </div>
            <div class="flex flex-col gap-1 w-full">
                <span>
                    Email
                </span>
                <Field name="email" autocomplete="off" placeholder="Write a email" type="email" />
                <ErrorMessage class="text-red-400 text-[clamp(.9rem,3vw,1rem)]" name="email" />
            </div>
            <div class="flex flex-col gap-1 w-full">
                <span>
                    Role
                </span>
                <Field name="role" as="select">
                    <option v-for="item in roles" :value="item.role_id">{{ item.role_name }}</option>
                </Field>
                <ErrorMessage class="text-red-400 text-[clamp(.9rem,3vw,1rem)]" name="role" />
            </div>
        </div>
        <button type="submit"
            class="bg-[#31d842] w-full p-[10px] opacity-80 transition-all hover:opacity-100 rounded text-[#121212] font-black flex justify-center gap-1 items-center">
            Add user to the system
        </button>
    </Form>
</template>

<script setup lang="ts">

import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import type { ApiResponse } from '../../../interfaces/api-response-interface';
import { UserService } from '../../../services/modules/users-service';
import { onMounted, ref } from 'vue';
import type { IAddUser } from '../../../services/interfaces/user-interface';
import { Functions } from '../../../utilities/functions';
const schema = yup.object({
    username: yup.string()
        .required('User name is required')
        .min(4, 'This field must have at least 4 characters')
        .max(255, 'This field must have maximum 255 characters')
        .matches(/^[A-Za-z_ ]+$/, 'Only letters are allowed'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'This field must have at least 8 characters')
        .max(255, 'This field must have maximum 255 characters'),
    email: yup.string()
        .required('Email is required')
        .email('Must be a valid email')
        .max(255, 'This field must have maximum 255 characters'),
    role: yup.string()
        .required('Role selection is required')
});
const RegisterNewUser = async (data: any) => {

    const entities: IAddUser = {
        username: data.username,
        password: data.password,
        email: data.email,
        role_id: data.role
    }

    await new UserService().addUser(entities);

    Functions.RedirectPage('users_catalog');
}

const roles = ref([]);

onMounted(async () => {
    await getRoles();
});

const getRoles = async () => {
    const response: ApiResponse = await new UserService().getRoles();

    roles.value = response.data;
}
</script>

<style scoped>
@reference "tailwindcss";

.forms-vee-validate input,
select {
    @apply bg-[#222630] px-4 py-3 outline-none text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]
}

.forms-vee-validate select {
    @apply cursor-pointer
}
</style>
