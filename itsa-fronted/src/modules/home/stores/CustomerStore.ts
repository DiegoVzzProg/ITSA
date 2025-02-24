import { defineStore } from "pinia";
import { dgav, notify, site } from "../../../utils/site";
import { s_costumers } from "../services/s_costumers";

export const numberCartShopping = defineStore("numberCartShopping", {
  state: () => ({
    count: 0,
    loading: false,
  }),
  persist: true,
  actions: {
    async update() {
      this.loading = true;

      const response: any = await s_costumers.checkNumberCartShopping();

      if (!site.IsNullOrEmpty(dgav.dataBase.message)) {
        notify.error(dgav.dataBase.message);
        return;
      }

      if (response) {
        const value: number = response.cantidad ?? 0;
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
