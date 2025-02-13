<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { c_general } from '../services/s_general';

interface Country {
    id_pais: number;
    nombre: string;
}

const props = defineProps({
    modelValue: {
        type: Number,
        default: null
    },
    placeholder: {
        type: String,
        default: 'Seleccione un país'
    }
});

const emit = defineEmits(['update:modelValue', 'change']);

const countries = ref<Country[]>([]);
const selectedCountry = ref<string>('');
const showCountries = ref(false);
const search = ref('');

// Watcher para actualizar la selección cuando cambia el id_pais
watch(() => props.modelValue, (newId) => {
    if (newId) {
        const country = countries.value.find(c => c.id_pais === newId);
        if (country) {
            selectedCountry.value = country.nombre;
        }
    } else {
        selectedCountry.value = '';
    }
}, { immediate: true });

// Watcher adicional para cuando se cargan los países
watch(countries, () => {
    if (props.modelValue) {
        const country = countries.value.find(c => c.id_pais === props.modelValue);
        if (country) {
            selectedCountry.value = country.nombre;
        }
    }
});

const fetchCountries = async () => {
    const response = await c_general.countries();
    if (response?.data_pais) {
        countries.value = response.data_pais;
    }
};

const filteredCountries = computed(() => {
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

onMounted(() => {
    fetchCountries();
});
</script>

<template>
    <div class="custom-select">
        <button @click="showCountries = !showCountries" class="select-button" :aria-expanded="showCountries">
            <span :class="['selected-value', !selectedCountry && 'placeholder']">
                {{ selectedCountry || placeholder }}
            </span>
        </button>

        <div v-if="showCountries" class="dropdown-container">
            <div class="search-container">
                <input v-model="search" type="text" placeholder="Buscar..." class="search-input" />
            </div>

            <ul class="options-list">
                <li v-for="country in filteredCountries" :key="country.id_pais" class="option-item"
                    @click="selectCountry(country)">
                    {{ country.nombre }}
                </li>
            </ul>
        </div>
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