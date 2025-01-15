import { dgav } from '../utils/site';

export class c_productos {
    static async fn_l_productos(data: Record<string, any>) {
        await dgav.apiRequest('/productos', dgav.httpMethod.POST, data);
    }
}