import { defineStore } from "pinia";
import { c_productos } from "../services/s_productos";
import { dgav, notify, site } from "../utils/site";

export const sp_list_products = defineStore("sp_list_products", {
  state: () => ({
    products: [] as any,
    loading: false,
  }),
  actions: {
    async exec(data: Record<string, any>): Promise<any> {
      dgav.dataBase.message = "";
      this.loading = true;
      const response: any = await c_productos.listProducts(data);

      if (!site.IsNullOrEmpty(dgav.dataBase.message)) {
        notify.error(dgav.dataBase.message);
        return null;
      }

      if (response) {
        this.products = response;
        this.loading = false;
        return response;
      }
    },
  },
});

export const sp_add_product_download_list = defineStore(
  "sp_add_product_download_list",
  {
    state: () => ({
      data: [] as any,
      loading: false,
    }),
    actions: {
      async exec(): Promise<any> {
        dgav.dataBase.message = "";
        this.loading = true;
        const response: any = await c_productos.addProductDownloadList();

        if (!site.IsNullOrEmpty(dgav.dataBase.message)) {
          notify.error(dgav.dataBase.message);
          return null;
        }

        if (response) {
          this.data = response;
          this.loading = false;
          return response;
        }
      },
    },
  }
);
