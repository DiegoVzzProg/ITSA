import { defineStore } from "pinia";
import { c_clientes } from "../services/s_clientes";
import { dgav, notify, site } from "../utils/site";

export const numberCartShopping = defineStore("numberCartShopping", {
  state: () => ({
    count: 0,
    loading: false,
  }),
  persist: true,
  actions: {
    async update() {
      this.loading = true;

      const response: any = await c_clientes.shoppingCartClient();

      if (!site.IsNullOrEmpty(dgav.dataBase.message)) {
        notify.error(dgav.dataBase.message);
        return;
      }

      if (response.carrito_cliente) {
        let value: number = response.carrito_cliente.length ?? 0;

        this.count = value;
        this.loading = false;
      }
    },
    default() {
      this.count = 0;
      this.loading = false;
    },
  },
});
