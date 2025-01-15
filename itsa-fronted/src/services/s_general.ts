
import { dgav } from '../../utils/site';

export class c_general {
    static async fileEncrypted(
        folder: string, filename: string
    ) {
        await dgav.apiRequest(`/archivo/${folder}/${filename}`, dgav.httpMethod.GET);
    };

    static async SecretKey() {
        await dgav.apiRequest("/scret/key", dgav.httpMethod.GET);
    };

    static async DownloadFile(arch: string) {
        // response = await api.get(`/downloadfile/${arch}`, {
        //     responseType: 'blob',
        // });
        await dgav.apiRequest(`/downloadfile/${arch}`, dgav.httpMethod.GET);
    };

    static async fn_l_paises() {
        await dgav.apiRequest(`/countries`, dgav.httpMethod.GET);
    }
};