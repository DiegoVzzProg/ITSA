<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import Main from "./modules/layouts/Main.vue";
import Auth from "./modules/layouts/Auth.vue";

const route = useRoute();
const layout = computed(() => {
  return route.meta.layout === "Main" ? Main : Auth;
});

onMounted(() => {});
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<style scoped></style>
