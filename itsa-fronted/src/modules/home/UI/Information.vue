<script setup lang="ts">
import { useRoute } from 'vue-router';
import License from '../sections/License.vue';
import Payments from '../sections/Payments.vue';
import Terms from '../sections/Terms.vue';
import Privacity from '../sections/Privacity.vue';
import Contact from '../sections/Contact.vue';
const route = useRoute();

</script>

<template>
    <div class="flex flex-col w-full">
        <License v-if="route.params.select == 'license'" />
        <Payments v-if="route.params.select == 'payments'" />
        <Terms v-if="route.params.select == 'terms'" />
        <Privacity v-if="route.params.select == 'privacity'" />
        <Contact v-if="route.params.select == 'contact'" />
    </div>
</template>

<style scoped></style>
