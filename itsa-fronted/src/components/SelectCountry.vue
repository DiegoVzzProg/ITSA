<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { c_general } from '../services/s_general';

interface Country {
    id_pais: number;
    nombre: string;
}
const props = defineProps({
    placeholder: {
        type: String,
        default: 'Country'
    }
});

const emit = defineEmits(['update:modelValue', 'change']);

const countries = ref<Country[]>([]);
const selectedCountry = ref<string>('');
const showCountries = ref(false);
const search = ref('');
const dropdownButton = ref<HTMLButtonElement>();
const inputSearch = ref<HTMLButtonElement>();

// Mejor nombre de función
const fetchCountries = async () => {
    const response = await c_general.fn_l_paises();
    if (response?.data_pais) {
        countries.value = response.data_pais;
    }
};

const filteredCountries = computed(() => {
    if (!search.value) return countries.value;
    return countries.value.filter(country =>
        country.nombre.toLowerCase().includes(search.value.toLowerCase())
    );
});

const selectCountry = (country: Country) => {
    selectedCountry.value = country.nombre;
    showCountries.value = false;
    search.value = '';
    emit('update:modelValue', country.id_pais);
    emit('change', country);
};

const closeOnClickOutside = (event: MouseEvent) => {
    if (!dropdownButton.value?.contains(event.target as Node) && !inputSearch.value?.contains(event.target as Node)) {
        showCountries.value = false;
    }
};

onMounted(() => {
    fetchCountries();
    document.addEventListener('click', closeOnClickOutside);
});
</script>

<template>
    <div class="custom-select">
        <button ref="dropdownButton" @click="showCountries = !showCountries" class="select-button"
            :aria-expanded="showCountries" aria-haspopup="listbox">
            <span :class="['selected-value', !selectedCountry && 'placeholder']">
                {{ selectedCountry || placeholder }}
            </span>
        </button>

        <transition name="slide-fade">
            <div v-if="showCountries" role="listbox" class="dropdown-container">
                <div class="search-container">
                    <input v-model="search" ref="inputSearch" type="text" placeholder="Search..." class="search-input"
                        aria-label="Search country" />
                </div>

                <ul class="options-list">
                    <li v-for="(country, index) in filteredCountries" :key="country.id_pais" role="option"
                        :aria-selected="country.id_pais === index" class="option-item" @click="selectCountry(country)">
                        {{ country.nombre }}
                    </li>

                    <li v-if="!filteredCountries.length" class="no-results">
                        No results found
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.custom-select {
    @apply relative w-full;
}

.select-button {
    @apply w-full border border-black py-5 px-3 rounded-full text-start;
    @apply transition-colors duration-200 ease-in-out;
}

.selected-value {
    @apply truncate;
}

.selected-value.placeholder {
    @apply text-gray-400;
}

.dropdown-container {
    @apply absolute w-full border border-black bg-white z-50 mt-2 rounded-lg shadow-lg max-h-60 overflow-auto;
    top: 100%;
}

.search-container {
    @apply p-2 sticky top-0 bg-white border-b border-gray-200;
}

.search-input {
    @apply w-full bg-gray-100 rounded px-4 py-3 focus:ring-2 focus:ring-blue-500;
}

.options-list {
    @apply overflow-y-auto divide-y divide-gray-200;
}

.option-item {
    @apply px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200 truncate;
}

.no-results {
    @apply px-4 py-3 text-gray-500 italic;
}

.slide-fade-enter-active {
    transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.15s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}
</style>