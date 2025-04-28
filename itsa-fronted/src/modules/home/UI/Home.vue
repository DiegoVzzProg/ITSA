<template>
  <div class="flex flex-col grow shrink-0 min-h-screen w-full">
    <div class="min-h-screen flex flex-col justify-center items-center" ref="section1">
      <div class="flex flex-col max-h-[clamp(40px,4vw,60px)] overflow-hidden text-center">
        <span v-for="(item, index) in texts" :key="index" :class="[
          item.class,
          'text-[clamp(2.1em,4vw,6rem)] animate-scroll-down font-itsa-bold translate-y-[-10px]',
        ]">
          {{ item.texto }}
        </span>
      </div>
      <p class="text-[clamp(1.5rem,3vw,3rem)] text-center times-new-roman-font">
        that make your stories look better
      </p>
    </div>
    <div id="gallery"
      class="flex flex-col pt-[76px] w-full justify-start items-end min-h-screen grow shrink-0 relative animate-fade-in">
      <div
        class="flex flex-row-reverse w-full justify-end gap-3 py-5 transition-all flex-wrap max-[1024px]:justify-center"
        v-if="productos">
        <div v-for="(producto, index) in productos" :key="index" :class="[
          producto.hover_efecto,
          'w-full max-w-[clamp(408px,40vw,508px)] lg:min-h-[clamp(208px,40vw,508px)] min-h-[408px] transition-all duration-300 ease-in-out',
          'bg-[rgb(244,242,239)] rounded-[12px] cursor-pointer p-5 flex-auto',
        ]" @click="site.RedirectPage({ name: String(producto.url) })">
          <div class="flex flex-col w-full">
            <div class="flex flex-row w-full justify-between items-center gap-2">
              <p class="font-itsa-bold text-[clamp(2rem,2.3vw,2.4rem)] leading-7 w-full">
                {{ producto.titulo }}
              </p>
              <button
                :class="`text-white bg-black py-2 text-nowrap rounded-full px-[clamp(15px,3vw,28px)] text-[1.2rem] md:text-[1.4rem] lg:text-[1.2rem] xl:text-[1.8rem] tracking-wide`">
                <p class="translate-y-[3px] font-itsa-bold">
                  {{
                    parseFloat(producto.precio) > 0
                      ? `$${site.formatNumber(parseFloat(producto.precio))} mxn`
                      : "free"
                  }}
                </p>
              </button>
            </div>
            <div class="flex translate-y-[-8px] flex-col items-start">
              <p class="max-w-[230px] leading-6">
                <i class="times-new-roman-font text-[1rem] lg:text-[1.4rem] xl:text-[1.4rem]">{{ producto.subtitulo
                }}</i>
              </p>
              <p class="text-[clamp(.6em,2vw,.7em)]">
                {{ producto.descripcion }}
              </p>
            </div>
          </div>
          <div class="flex items-center justify-center w-full h-[calc(100%-100px)]">
            <span class="flex w-[320px]">
              <File :file="`${String(producto.imagen)}`" type="img" />
            </span>
          </div>
        </div>
      </div>
      <Loading v-else></Loading>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { site } from "../../../utils/site";
import File from "../components/File.vue";
import Loading from "../../components/Loading.vue";
import { ApiResponse } from "../../../utils/Api.interface";
import { IListProducts, ProductsClass } from "../services/products-service";
//import { numberCartShopping } from "../stores/CustomerStore";

const productos = ref<any>([]);
const section1 = ref<HTMLElement | null>(null);
const texts = ref<any>([
  {
    texto: "-",
    class: "opacity-0",
  },
  {
    texto: "fresh icons",
    class: "",
  },
  {
    texto: "useful mockups",
    class: "",
  },
  {
    texto: "coll illustration",
    class: "",
  },
  {
    texto: "lovely type",
    class: "",
  },
  {
    texto: "practical templates",
    class: "",
  },
]);

onMounted(async () => {
  //numberCartShopping().init();
  await Productos();

  let sessionExpire: boolean =
    Boolean(site.getCookie("session", false)) ?? false;

  if (sessionExpire) {
    site.allDeleteCookies();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  setTimeout(() => {
    document.getElementById("gallery")?.scrollIntoView({
      behavior: "smooth", // Desplazamiento suave
      block: "start", // Alinea al inicio del elemento
    });
  }, 4200);
});

onBeforeUnmount(() => { });

const Productos = async () => {
  const parameters: IListProducts = {
    id_producto: 0
  }

  const response: ApiResponse = await new ProductsClass().listProducts(parameters);

  if (!response.data) {
    return;
  }
  productos.value = response.data;
}

</script>

<style scoped>
.hover_efecto_basicsIcons:hover {
  background-color: rgba(201, 117, 249, 0.459);
}

.hover_efecto_universalIcons:hover {
  background-color: rgba(116, 171, 253, 0.61);
}

.animate-scroll-down {
  animation: spin_4991 5s linear infinite;
}

@keyframes spin_4991 {
  15% {
    transform: translateY(-110%);
  }

  25% {
    transform: translateY(-120%);
  }

  30% {
    transform: translateY(-210%);
  }

  40% {
    transform: translateY(-220%);
  }

  45% {
    transform: translateY(-310%);
  }

  55% {
    transform: translateY(-320%);
  }

  60% {
    transform: translateY(-410%);
  }

  70% {
    transform: translateY(-420%);
  }

  75% {
    transform: translateY(-510%);
  }

  85% {
    transform: translateY(-520%);
  }

  90% {
    transform: translateY(-610%);
  }

  100% {
    transform: translateY(-620%);
  }
}
</style>
