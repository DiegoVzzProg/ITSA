<template>

    <p class="title-view">
        Add User System
    </p>
    <Form @submit="RegisterNewUser" class="flex flex-col gap-2 w-full" :validation-schema="schema">
        <div class="flex flex-row justify-between gap-2">
            <div class="flex flex-col gap-2 w-full">
                <div class="flex flex-col gap-1 w-full">
                    <span>
                        User name
                    </span>
                    <Field name="username" autocomplete="off" placeholder="Write a user..."
                        class="bg-[#222630] px-4 py-3 outline-none text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                        type="text" />
                    <ErrorMessage class="text-red-400 text-[clamp(.9rem,3vw,1rem)]" name="username" />
                </div>
                <div class="flex flex-col gap-1 w-full">
                    <span>
                        Password
                    </span>
                    <Field name="password" autocomplete="off" placeholder="Write a password"
                        class="bg-[#222630] px-4 py-3 outline-none text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                        type="password" />
                    <ErrorMessage class="text-red-400 text-[clamp(.9rem,3vw,1rem)]" name="password" />
                </div>
            </div>
            <div class="flex flex-col gap-2 w-full">

            </div>
        </div>
        <button type="submit"
            class="bg-[#31d842] w-full p-[10px] opacity-80 transition-all hover:opacity-100 rounded text-[#121212] font-black flex justify-center gap-1 items-center">
            <UserPlus />
            Add a user
        </button>
    </Form>
</template>

<script setup lang="ts">

import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
    username: yup.string()
        .required('This field is required')
        .min(4, 'This field must have at least 4 characters')
        .max(255, 'This field must have maximum 255 characters')
        .matches(/^[A-Za-z_ ]+$/, 'Only letters are allowed'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'This field must have at least 8 characters')
        .max(255, 'This field must have maximum 255 characters'),
});

const RegisterNewUser = (data: any) => {
    console.log(data);

}
</script>

<style scoped>
@reference "tailwindcss";

.input-forms {
    @apply bg-[#222630] px-4 py-3 outline-none text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]
}
</style>
