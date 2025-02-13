import { defineStore } from "pinia";
import { dgav, notify, site } from "../utils/site";

const productosUrl: string = "/products";

export const sp_list_products = defineStore("sp_list_products", {
  state: () => ({
    products: [] as any[],
    loading: false,
  }),
  actions: {
    async execute(data: Record<string, any>): Promise<any> {
      this.loading = true;
      const response: any = await dgav.apiRequest(
        `${productosUrl}/listProducts`,
        dgav.httpMethod.POST,
        data
      );

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
