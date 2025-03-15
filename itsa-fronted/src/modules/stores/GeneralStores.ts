import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import echo from "../../services/echo";
import { reactive } from "vue";

const stores = reactive({
  guid: defineStore("GeneralStores", {
    state: () => ({
      value: localStorage.getItem("guid") || uuidv4().toUpperCase(),
    }),
    actions: {
      updateGuid() {
        this.value = uuidv4().toUpperCase();
      },
    },
  }),
  useCartStore: defineStore("cart ", {
    state: () => ({
      carrito: [] as any[],
      totales: { subtotal: "0.00", impuesto: "0.00", total: "0.00" },
      total_productos: 0,
    }),
    persist: true,
    actions: {
      setupCartListener() {
        echo.channel("cart-channel").listen(".cart.updated", (data: any) => {
          this.carrito = data.carrito;
          this.totales = data.totales;
          this.total_productos = data.total_productos;
        });
      },
      leaveCartListener() {
        echo.leave("cart-channel");
      },
    },
  }),
});

export default stores;
