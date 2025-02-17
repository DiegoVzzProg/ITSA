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
      dgav.dataBase.message = "";
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
        this.data = response;
        this.loading = false;
        return response;
      }
    },
  },
});

export const sp_refresh_token = defineStore("sp_refresh_token", {
  state: () => ({
    loading: false,
    data: null as any,
  }),
  actions: {
    async exec(data: Record<string, any>): Promise<any> {
      this.loading = true;

      const response: any = await c_auth.refreshToken(data);

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

export const sp_logout_user = defineStore("sp_logout_user", {
  state: () => ({
    loading: false,
    data: null as any,
  }),
  actions: {
    async exec(): Promise<any> {
      this.loading = true;

      const response: any = await c_auth.logoutUser();

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

export const sp_restore_password = defineStore("sp_restore_password", {
  state: () => ({}),
  actions: {
    async exec(data: Record<string, any>) {
      await c_auth.restorePassword(data);

      const message = dgav.dataBase.message;
      const status = dgav.dataBase.status;

      if (status == 200) {
        notify.success(message);
      } else {
        notify.error(message);
      }
    },
  },
});
