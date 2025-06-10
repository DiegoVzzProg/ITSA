<template>
  <div class="flex flex-col w-full min-h-screen grow shrink-0">
    <div class="flex flex-col justify-center items-center min-h-screen" ref="section1">
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
        <ProductContainer v-for="(producto, _index) in productos" :key="producto.id_producto"
          :page-redirect="producto.url" :hover-effect="producto.hover_efecto" :titulo="producto.titulo"
          :urlImage="producto.imagen" :id="producto.id_producto" :precio="parseFloat(producto.precio)"
          :subtitulo="producto.subtitulo" :descripcion="producto.descripcion" />
      </div>
      <Loading v-else></Loading>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { site } from "../../../utils/site";
import Loading from "../../components/Loading.vue";
import { ApiResponse } from "../../../utils/Api.interface";
import { IListProducts, ProductsClass } from "../services/products-service";
import ProductContainer from "../components/ProductContainer.vue";
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
    texto: "cool illustration",
    class: "",
  },
  {
    texto: "lovely typefaces",
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
    id_producto: 0,
  };

  const response: ApiResponse = await new ProductsClass().listProducts(
    parameters
  );

  if (!response.data) {
    return;
  }
  productos.value = response.data;
};
</script>

<style scoped>
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
