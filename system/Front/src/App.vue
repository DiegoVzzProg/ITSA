<template>
    <component :is="layout">
        <router-view />
    </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Master from './layouts/Master.vue';

const route = useRoute();
const layout = computed(() => {
    return route.meta.layout === "master" ? Master : undefined;
});

</script>

<style scoped></style>
