import { defineStore } from "pinia";
import { dgav, notify, site } from "../utils/site";
import { c_general } from "../services/s_general";

export const sp_secret_key = defineStore(
    "sp_secret_key",
    {
        state: () => ({
            data: null as any,
            loading: false,
        }),
        actions: {
            async exec(): Promise<any> {
                dgav.dataBase.message = "";
                this.loading = true;
                const response: any = await c_general.SecretKey();

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

export const sp_countries = defineStore(
    "sp_countries",
    {
        state: () => ({
            data: null as any,
            loading: false,
        }),
        actions: {
            async exec(): Promise<any> {
                dgav.dataBase.message = "";
                this.loading = true;
                const response: any = await c_general.countries();

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