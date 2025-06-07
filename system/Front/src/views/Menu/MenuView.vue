<template>
    <p class="title-view">
        Menu
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-3 mt-3">
        <button
            class="flex transition-all hover:bg-[var(--clr-primary-a10)] active:scale-[.95] flex-row items-center cursor-pointer text-left w-full bg-[var(--clr-primary-a30)] rounded p-5 gap-2"
            v-for="item in menusOptions" v-on:click="Functions.RedirectPage({ name: item.route })">
            <span class="rounded-full bg-black p-[10px] flex overflow-hidden">
                <component :is="icons[`${item.icon || 'Option'}`]"></component>
            </span>
            <div class="flex flex-col text-[clamp(.95rem,3vw,1rem)] text-balance">
                <p class="text-[#121212] font-bold" v-text="item.name"></p>
                <small class="text-[#121212b0]" v-text="item.description"></small>
            </div>
        </button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { ApiResponse } from '../../interfaces/api-response-interface';
import { MenusService, type IMenu } from '../../services/modules/menus-service';
import * as icons from "lucide-vue-next";
import { Functions } from '../../utilities/functions';

const menusOptions = ref([]);

onMounted(async () => {
    await getMenu();
})

const getMenu = async () => {
    const entities: IMenu = {
        option_id: 0,
    }
    const response: ApiResponse = await new MenusService().getMenus(entities);

    menusOptions.value = response.data;
}

</script>

<style scoped></style>
