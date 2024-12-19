<script setup lang="ts">
import { useRoute } from 'vue-router';
import License from './License.vue';
import Payments from './Payments.vue';
import Terms from './Terms.vue';
import Privacity from './Privacity.vue';
import Contact from './Contact.vue';
const route = useRoute();

</script>

<template>
    <div class="flex flex-col pt-[76px]">
        <License v-if="route.params.select == 'license'" />
        <Payments v-if="route.params.select == 'payments'" />
        <Terms v-if="route.params.select == 'terms'" />
        <Privacity v-if="route.params.select == 'privacity'" />
        <Contact v-if="route.params.select == 'contact'" />
    </div>
</template>

<style scoped></style>
