<template>
    <header class="flex flex-row justify-center h-[200px] px-5 bg-[var(--clr-primary-a20)]">
        <nav class="w-full max-w-[1280px] h-full flex flex-row justify-between items-center">
            <p class="text-[#121212] font-extrabold text-[1.2rem] select-none">
                In The Same Agency
            </p>
            <nav class="flex flex-row gap-2">
                <button type="button" v-on:click="Functions.RedirectPage('menu')"
                    class="button-menu-fast">
                    <House />
                </button>
                <button type="button" class="button-menu-fast">
                    <Settings />
                </button>
            </nav>
        </nav>
    </header>
    <main class="flex flex-row justify-center py-4 px-5 h-[calc(100vh-200px)]">
        <section class="flex flex-col w-full max-w-[1280px] h-full">
            <slot />
        </section>
    </main>
</template>

<script setup lang="ts">
import { House, Settings } from 'lucide-vue-next';
import { Functions } from '../utilities/functions';

</script>

<style scoped>
@reference "tailwindcss";

.button-menu-fast {
    @apply bg-[#121212] p-[10px] rounded-full opacity-80 hover:opacity-100 transition-all duration-500
}
</style>
