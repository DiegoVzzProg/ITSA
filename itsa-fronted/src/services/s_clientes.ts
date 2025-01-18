import { dgav } from '../utils/site';

export class c_clientes {
    static async fn_l_carrito_cliente(data: Record<string, any>) {
        return await dgav.apiRequest("/carrito/cliente", dgav.httpMethod.POST, data);
    };

    static async fn_a_carrito_cliente(data: Record<string, any>) {
        return await dgav.apiRequest("/carrito/agregar/", dgav.httpMethod.POST, data);
    };

    static async fn_l_precio_carrito_cliente(data: Record<string, any>) {
        return await dgav.apiRequest(`/carrito/precio/${data.id_usuario}`, dgav.httpMethod.GET);
    };
};