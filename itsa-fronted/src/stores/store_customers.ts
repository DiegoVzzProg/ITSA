import { defineStore } from "pinia";
import { dgav, notify, site } from "../utils/site";
import { c_clientes } from "../services/s_clientes";

export const sp_shopping_cart_client = defineStore("sp_shopping_cart_client", {
  state: () => ({
    loading: false,
    data: null as any,
  }),
  persist: true,
  actions: {
    async exec() {
      this.loading = true;

      const response: any = await c_clientes.shoppingCartClient();

      if (!site.IsNullOrEmpty(dgav.dataBase.message)) {
        notify.error(dgav.dataBase.message);
        return;
      }

      if (response) {
        this.loading = false;
        return response;
      }
    },

    default() {
      this.loading = false;
      this.data = null;
    },
  },
});

export const sp_add_product = defineStore("sp_add_product", {
  state: () => ({
    data: null as any,
    loading: false,
  }),
  actions: {
    async exec(data: Record<string, any>): Promise<any> {
      this.loading = true;
      const response: any = await c_clientes.addProduct(data);

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
});

export const sp_register_customer = defineStore("sp_register_customer", {
  state: () => ({
    data: null as any,
    loading: false,
  }),
  actions: {
    async exec(data: Record<string, any>): Promise<any> {
      this.loading = true;
      const response: any = await c_clientes.registerCustomer(data);

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
});

export const sp_edit_customer = defineStore("sp_edit_customer", {
  state: () => ({
    data: null as any,
    loading: false,
  }),
  actions: {
    async exec(data: Record<string, any>): Promise<any> {
      this.loading = true;
      const response: any = await c_clientes.editCustomer(data);

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
});

export const sp_get_customer = defineStore("sp_get_customer", {
  state: () => ({
    data: null as any,
    loading: false,
  }),
  actions: {
    async exec(data: Record<string, any>): Promise<any> {
      this.loading = true;
      const response: any = await c_clientes.getCustomer(data);

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
});

export const sp_check_product_in_shopping_cart = defineStore(
  "sp_check_product_in_shopping_cart",
  {
    state: () => ({
      data: null as any,
      loading: false,
    }),
    actions: {
      async exec(data: Record<string, any>): Promise<any> {
        this.loading = true;
        const response: any = await c_clientes.checkProductInShoppingCart(data);

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

export const sp_proceed_to_checkout = defineStore("sp_proceed_to_checkout", {
  state: () => ({
    data: null as any,
    loading: false,
  }),
  actions: {
    async exec(): Promise<any> {
      this.loading = true;
      const response: any = await c_clientes.proceedToCheckout();

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
});

export const sp_delete_product_from_shoppingCart = defineStore(
  "sp_delete_product_from_shoppingCart",
  {
    state: () => ({
      data: null as any,
      loading: false,
    }),
    actions: {
      async exec(data: Record<string, any>): Promise<any> {
        this.loading = true;
        const response: any = await c_clientes.deleteProductFromShoppingCart(
          data
        );

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
