import { dgav } from "../utils/site";

const shoppingCartUrl = "/shoppingCart";
const customersUrl = "/customers";

export class c_clientes {
  public static async fn_l_carrito_cliente(data: Record<string, any>) {
    return await dgav.apiRequest(
      `${shoppingCartUrl}/client`,
      dgav.httpMethod.POST,
      data
    );
  }

  public static async fn_a_carrito_cliente(data: Record<string, any>) {
    return await dgav.apiRequest(
      `${shoppingCartUrl}/addProduct`,
      dgav.httpMethod.POST,
      data
    );
  }

  public static async fn_l_precio_carrito_cliente(data: Record<string, any>) {
    return await dgav.apiRequest(
      `${shoppingCartUrl}/totalPrice`,
      dgav.httpMethod.POST,
      data
    );
  }

  public static async fn_a_clientes(data: Record<string, any>) {
    return await dgav.apiRequest(
      `${customersUrl}/registerCustomer`,
      dgav.httpMethod.POST,
      data
    );
  }

  public static async fn_l_clientes(data: Record<string, any>) {
    return await dgav.apiRequest(
      `${customersUrl}/getCustomer`,
      dgav.httpMethod.POST,
      data
    );
  }

  public static async fn_existe_producto_carrito_cliente(
    data: Record<string, any>
  ) {
    return await dgav.apiRequest(
      `${customersUrl}/checkProductInShoppingCart`,
      dgav.httpMethod.POST,
      data
    );
  }
  public static async proceedToCheckout(
    data: Record<string, any>
  ): Promise<any> {
    return await dgav.apiRequest(
      `${shoppingCartUrl}/proceedToCheckout`,
      dgav.httpMethod.POST,
      data
    );
  }
}
