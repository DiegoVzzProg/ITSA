<template>
  <div class="min-h-[200px] mb-6 max-[1060px]:min-h-[100px]"></div>
  <div
    class="flex flex-row gap-4 max-[1060px]:pb-20 justify-evenly w-full min-h-screen grow shrink-0 max-[1060px]:flex-col-reverse max-[1060px]:items-center"
  >
    <div
      class="flex flex-col w-full max-w-md max-[1060px]:max-w-2xl gap-4 min-h-full grow shrink-0 max-[1060px]:pt-6"
    >
      <div class="flex flex-col gap-1 text-[1rem]">
        <div class="flex flex-row w-full gap-2 font-semibold">
          <p>hi user,</p>
          <p v-if="site.userData()">{{ site.userData()?.nombre || "" }}!</p>
        </div>
        <p>your biling details</p>
      </div>
      <FormToCreateClient
        v-if="!ClientData || Editar"
        @cambiar="successEditClient"
      />
      <div class="flex flex-col w-full min-h-full grow shrink-0" v-else>
        <div
          class="flex flex-col gap-4 w-full justify-between h-[min(500px,100%)]"
        >
          <div class="flex flex-col leading-1">
            <p><strong>Name:</strong> {{ ClientData.nombre }}</p>
            <p><strong>Phone:</strong> {{ ClientData.telefono }}</p>
            <p><strong>Address:</strong> {{ ClientData.direccion }}</p>
            <div class="flex flex-row gap-1">
              <p>
                <strong>Postal Code:</strong> {{ ClientData.codigo_postal }},
                {{ ClientData.municipio }}
              </p>
              <p><strong>State:</strong> {{ ClientData.estado }}</p>
            </div>
            <p><strong>Country:</strong> {{ ClientData.pais }}</p>
            <span
              class="mt-3 text-[rgb(209,207,206)] underline underline-offset-1 cursor-pointer"
              @click="FunctionEdit()"
            >
              edit
            </span>
          </div>
          <div class="flex flex-col gap-3">
            <p>click on finish</p>
            <button
              v-on:click="FunctionFinish()"
              v-if="!Finish"
              class="bg-black py-5 px-3 rounded-full text-white"
            >
              finish
            </button>
            <button
              v-if="Finish"
              v-show="!ocultarBoton"
              v-on:click="CheckoutSession($event)"
              class="bg-black py-5 px-3 rounded-full text-white animate-fade-in"
            >
              continue to download
            </button>
            <Loading v-if="LoadingHabilitado" />
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col w-full max-w-2xl gap-2">
      <p class="opacity-0 max-[1060px]:hidden before:content-['itsa']"></p>
      <p>cart</p>
      <div
        class="flex flex-col gap-2 border border-black py-5 px-10 sm:px-20 rounded-lg"
      >
        <div
          class="flex flex-row justify-between text-[clamp(1.2rem,3vw,2rem)] pb-2 border-b border-b-black"
        >
          <p class="font-itsa-bold">item</p>
          <p class="font-itsa-bold">total</p>
        </div>
        <div class="flex flex-col h-[120px] overflow-auto gap-2 py-2">
          <div
            class="flex relative flex-row items-center gap-2"
            v-for="item in stores.echoStore().carrito"
            :key="item.id_producto"
          >
            <div
              class="min-w-[100px] h-[100px] flex overflow-hidden bg-black rounded"
            >
              <File
                v-if="item.foto_producto"
                :file="item.foto_producto"
                type="img"
              />
              <Loading v-else />
            </div>
            <div
              class="flex flex-row w-full justify-between gap-4 text-[clamp(.85rem,3vw,1rem)]"
            >
              <p class="truncate">{{ item.descripcion }}</p>
              <p>${{ item.precio }}</p>
            </div>
            <button
              class="sticky right-0 rounded-s-full bg-white"
              :disabled="!deleteProduct"
              v-on:click="DeleteProduct(item.id_producto)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-x"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div
          class="flex flex-row justify-between items-center gap-2 border-y border-y-black py-2"
        >
          <p class="font-itsa-bold text-[clamp(1.2rem,3vw,2rem)]">tax(16%)</p>
          <p class="text-[1rem]">${{ stores.echoStore().totales.impuesto }}</p>
        </div>
        <div class="flex flex-row justify-between gap-2 py-2 items-center">
          <p class="font-itsa-bold text-[clamp(1.2rem,3vw,2rem)]">total</p>
          <p class="text-[1rem]">${{ stores.echoStore().totales.total }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import File from "../components/File.vue";
import Loading from "../../components/Loading.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { notify, site } from "../../../utils/site";
import stores from "../../stores/GeneralStores";
import { ProductsClass } from "../services/products-service";
import { ApiResponse } from "../../../utils/Api.interface";
import {
  CostumersClass,
  IDeleteProductFromShoppingCart,
  IProceedToCheckout,
} from "../services/costumers-service";
import FormToCreateClient from "../components/FormToCreateClient.vue";

const LoadingHabilitado = ref<boolean>(false);
const ocultarBoton = ref<boolean>(false);

onMounted(() => {
  if (!verificarCarrito()) {
    return;
  }
  if (site.getCookie("e.c.d"))
    ClientData.value = JSON.parse(site.getCookie("e.c.d"));

  Productos();
});

onUnmounted(() => {});

const ClientData = ref<any>(null);
const Finish = ref<boolean>(false);
const Editar = ref<boolean>(false);
const deleteProduct = ref<boolean>(true);

function verificarCarrito(carrito?: any): boolean {
  if (
    stores.echoStore().carrito.length == 0 ||
    carrito?.carrito_cliente.length == 0
  ) {
    site.RedirectPage({ name: "home" });
    return false;
  }
  return true;
}

async function Productos(): Promise<any> {
  const response: ApiResponse = await new CostumersClass().shoppingCartClient();
  if (!verificarCarrito(response.data)) {
    return;
  }
}

async function CheckoutSession(elemento: any): Promise<any> {
  LoadingHabilitado.value = true;
  ocultarBoton.value = true;

  if (!verificarCarrito()) {
    return;
  }

  if (parseFloat(stores.echoStore().totales.total) == 0) {
    const response: ApiResponse =
      await new ProductsClass().addProductDownloadList();

    if (!response.data) return;

    site.RedirectPage({ name: response.data.redirectToDownload });
  } else {
    const params: IProceedToCheckout = {
      key: stores.guid().value,
    };

    const response: ApiResponse = await new CostumersClass().proceedToCheckout(
      params
    );

    if (!response.data) return;

    const url: any = response.data.redirectStripePayment;

    if (site.IsNullOrEmpty(url)) return;
    window.location.href = url;
  }

  elemento.target.disabled = true;
}

function FunctionEdit(): void {
  Editar.value = !Editar.value;
}

const successEditClient = (_cambiar: boolean) => {
  Editar.value = false;

  if (site.getCookie("e.c.d"))
    ClientData.value = JSON.parse(site.getCookie("e.c.d"));
};

function FunctionFinish(): void {
  Finish.value = !Finish.value;
}

async function DeleteProduct(id_producto: string) {
  deleteProduct.value = false;

  const params: IDeleteProductFromShoppingCart = {
    id_producto: Number(id_producto),
  };

  const response: ApiResponse =
    await new CostumersClass().deleteProductFromShoppingCart(params);

  if (response.data) {
    notify.success("Product deleted");

    if (!verificarCarrito()) {
      return;
    }

    deleteProduct.value = true;
  }
}
</script>

<style scoped></style>
