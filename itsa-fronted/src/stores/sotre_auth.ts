import { defineStore } from "pinia";
import { dgav, notify, site } from "../utils/site";
import { c_auth } from "../services/s_auth";

export const sp_login_user = defineStore("sp_login_user", {
  state: () => ({
    loading: false,
    data: null as any,
  }),
  actions: {
    async exec(data: Record<string, any>): Promise<any> {
      this.loading = true;

      const response: any = await c_auth.loginUser(data);

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

export const sp_register_user = defineStore("sp_register_user", {
  state: () => ({
    loading: false,
    data: null as any,
  }),
  actions: {
    async exec(data: Record<string, any>): Promise<any> {
      this.loading = true;

      const response: any = await c_auth.registerUser(data);

      if (!site.IsNullOrEmpty(dgav.dataBase.message)) {
        notify.error(dgav.dataBase.message);
        return null;
      }

      if (response) {
        this.loading = false;
        return response;
      }
    },
  },
});
