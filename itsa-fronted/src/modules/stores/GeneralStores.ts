import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import echo from "../../services/echo";
import { reactive } from "vue";
import { site } from "../../utils/site";

const stores = reactive({
  guid: defineStore("GeneralStores", {
    state: () => ({
      value: uuidv4().toUpperCase(),
    }),
    actions: {
      updateGuid() {
        this.value = uuidv4().toUpperCase();
      },
    },
  }),
  echoStore: defineStore("cart", {
    state: () => ({
      carrito: [] as any[],
      totales: { subtotal: "0.00", impuesto: "0.00", total: "0.00" },
      total_productos: 0,
      producto_comprado: false,
      isConnected: false,
    }),
    persist: {
      omit: ["isConnected", "producto_comprado"],
      storage: localStorage,
      key: "cart",
    },
    actions: {
      init() {
        if (this.isConnected) return;

        echo.connector.pusher.connection.bind("connected", () => {
          this.isConnected = true;
          this.setupCartListener();
          this.checkProduct();
        });

        echo.connector.pusher.connection.bind("disconnected", () => {
          this.isConnected = false;
        });
      },

      reconnect() {
        if (!this.isConnected && echo) {
          echo.disconnect();
          echo.connect();
        }
      },

      setupCartListener() {
        echo.channel("cart-channel").listen(".cart.updated", (data: any) => {
          this.carrito = data.carrito;
          this.totales = data.totales;
          this.total_productos = data.total_productos;

          if (data.carrito.length == 0) {
             site.RedirectPage({ name: "home" });
          }
        });
      },
      checkProduct() {
        echo
          .channel("check-product-channel")
          .listen(".check.product", (data: any) => {
            this.producto_comprado = data.producto_comprado;
          });
      },
      leave() {
        echo.leave("check-product-channel");
        echo.leave("cart-channel");
      },
    },
  }),
});

export default stores;
