import { dgav, site } from '../utils/site';
import { c_general } from './s_general';

export class c_auth {
    static async fn_login(
        data: Record<string, any>
    ): Promise<void> {
        this.auth(1, data);
    };

    static async fn_register(
        data: Record<string, any>
    ): Promise<void> {
        this.auth(2, data);
    };

    private static async auth(
        opcion: number,
        data: Record<string, any>
    ): Promise<void> {
        switch (opcion) {
            case 1:
                await dgav.apiRequest("/auth/login", dgav.httpMethod.POST, data);
                break;
            case 2:
                await dgav.apiRequest("/auth/register", dgav.httpMethod.POST, data);
                break;
        }

        if (dgav.validateDataTable()) {
            const response: any = dgav.dataBase.data;
            const token = response.token;
            site.setCookies({
                "token": token,
                "user_data": JSON.stringify(response.user_data),
                "logged_in_successfully": 'false'
            });

            await c_general.SecretKey();
            if (dgav.validateDataTable()) {
                site.setCookies({
                    "secretKey": dgav.dataBase.data.secretKey || ''
                });
            }
        }
    }
};