<script setup lang="ts">
import { onMounted, ref } from "vue";
import logo from "../../assets/svg/itsastudio.svg";
import logoWhite from "../../assets/svg/itsastudio_white.svg";
import { useRoute } from "vue-router";
import { site } from "../../utils/site";
import stores from "../stores/GeneralStores";
import { AuthClass } from "../auth/services/auth-service";
import { ApiResponse } from "../../utils/Api.interface";

const id_usuario = ref<number>(0);
const router = useRoute();

const LogOut = async () => {
  const response: ApiResponse = await new AuthClass().logoutUser();

  if (!response.data) {
    return;
  }

  site.allDeleteCookies();
  stores.echoStore().leave();
  localStorage.clear();
  sessionStorage.clear();
  if (router.name == "home") {
    window.location.reload();
  } else {
    site.RedirectPage({ name: "home" });
    id_usuario.value = 0;
  }
};

function GoCheckOut() {
  if (site.userData() && stores.echoStore().total_productos > 0) {
    site.RedirectPage({ name: "checkout" });
  }
}

onMounted(() => {
  if (site.userData()) {
    id_usuario.value = site.userData()?.id_usuario || 0;
  }
});
</script>

<template>
  <header
    id="header"
    ref="headerComponent"
    class="flex min-w-[320px] w-full px-[clamp(18px,5vw,68px)] h-[76px] items-center justify-center sticky top-0 left-0 bg-white z-[9999]"
  >
    <div
      class="flex flex-row items-center justify-between w-full h-full border-b border-black gap-5"
      id="headerSection"
    >
      <button
        @click="site.RedirectPage({ name: 'home' })"
        class="flex w-full items-center max-w-[165px]"
      >
        <img
          id="logoBlack"
          :src="logo"
          alt=""
          srcset=""
          class="select-none block"
        />
        <img
          id="logoWhite"
          :src="logoWhite"
          alt=""
          srcset=""
          class="select-none hidden"
        />
      </button>
      <nav class="flex flex-row justify-between gap-3 w-[min(300px,100%)]">
        <button
          @click="site.RedirectPage({ name: 'login' })"
          class="flex flex-col items-center justify-center text-center hover:bg-[rgb(0,0,0)] hover:text-white transition-all"
          v-if="id_usuario == 0"
        >
          <span class="text-[1rem]"> login/join </span>
        </button>
        <button
          @click="LogOut()"
          class="flex flex-col items-center justify-center text-center hover:bg-[rgb(0,0,0)] hover:text-white transition-all"
          v-else
        >
          <span class="text-[1rem]"> logout </span>
        </button>
        <button
          @click="GoCheckOut()"
          :class="[
            'flex flex-row items-center justify-center text-center hover:bg-[rgb(0,0,0)] hover:text-white transition-all',
          ]"
        >
          cart(<span
            class="text-[.7rem] font-semibold translate-y-[1px]"
            v-text="stores.echoStore().total_productos"
          ></span
          >)
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped></style>
