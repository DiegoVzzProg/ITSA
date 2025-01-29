import { dgav } from "../utils/site";

export class c_clientes {
  static async fn_l_carrito_cliente(data: Record<string, any>) {
    return await dgav.apiRequest(
      "/carrito/cliente",
      dgav.httpMethod.POST,
      data
    );
  }

  static async fn_a_carrito_cliente(data: Record<string, any>) {
    return await dgav.apiRequest(
      "/carrito/agregar/",
      dgav.httpMethod.POST,
      data
    );
  }

  static async fn_l_precio_carrito_cliente(data: Record<string, any>) {
    return await dgav.apiRequest(
      `/carrito/precio/${data.id_usuario}`,
      dgav.httpMethod.GET
    );
  }

  public static async fn_a_clientes(data: Record<string, any>) {
    return await dgav.apiRequest(
      "/clientes/alta/cliente",
      dgav.httpMethod.POST,
      data
    );
  }

  public static async fn_l_clientes(id_cliente: number) {
    return await dgav.apiRequest(
      `/clientes/obtener/cliente/${id_cliente}`,
      dgav.httpMethod.GET
    );
  }
}
