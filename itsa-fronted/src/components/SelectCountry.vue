<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { c_general } from '../services/s_general';

const countries = ref<any[]>([]);
const selectedCountry = ref<string>('country');
const showCountries = ref<boolean>(false);
const search = ref<string>('');

const filteredCountries = computed(() => {
    return countries.value.filter(country =>
        country.nombre.toLowerCase().includes(search.value.toLowerCase())
    );
});

const countrysAll = async () => {
    const respsponse: any = await c_general.fn_l_paises();
    countries.value = respsponse.data_pais;
}
onMounted(() => {
    countrysAll();
});

</script>

<template>
    <div class="flex flex-col w-full relative">
        <button @click="showCountries = !showCountries"
            class="flex flex-col w-full border border-black py-5 px-3 rounded-full">
            <span class="text-gray-400" v-text="selectedCountry">
            </span>
        </button>
        <div v-if="showCountries"
            class="flex flex-col w-full border border-black absolute gap-1 overflow-auto bottom-[-205px] z-[9999] bg-white left-0 h-[200px] rounded-lg">
            <div class="flex flex-row w-full py-3 px-2">
                <input type="text" placeholder="Buscar" class="flex w-full bg-gray-100 rounded px-4 py-3"
                    v-model="search">
            </div>
            <div class="flex py-3 px-4 rounded w-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-100"
                v-for="item in filteredCountries" :key="item.id"
                @click="selectedCountry = item.nombre; showCountries = false; search = '';">
                <p>
                    {{ item.nombre }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
