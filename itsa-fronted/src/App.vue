<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Main from './layouts/Main.vue';
import Auth from './layouts/Auth.vue';
import { fileEncrypted } from './services/s_general/s_general';


const route = useRoute();
const layout = computed(() => {
  return route.meta.layout === 'Main' ? Main : Auth;
});

onMounted(() => {

});
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<style scoped></style>
