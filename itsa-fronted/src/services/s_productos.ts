import { dgav } from '../utils/site';

export class c_productos {
    static async fn_l_productos(data: Record<string, any>): Promise<any> {
        return await dgav.apiRequest('/public/productos', dgav.httpMethod.POST, data);
    }
}