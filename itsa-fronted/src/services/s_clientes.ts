import { dgav } from "../utils/site";

const shoppingCartUrl = "/shopping/cart";
const customersUrl = "/customers";

export class c_clientes {
  public static async shoppingCartClient() {
    return await dgav.apiRequest(
      `${shoppingCartUrl}/client`,
      dgav.httpMethod.GET
    );
  }

  public static async addProduct(data: Record<string, any>) {
    return await dgav.apiRequest(
      `${shoppingCartUrl}/add/product`,
      dgav.httpMethod.POST,
      data
    );
  }

  public static async registerCustomer(data: Record<string, any>) {
    return await dgav.apiRequest(
      `${customersUrl}/register/customer`,
      dgav.httpMethod.POST,
      data
    );
  }

  public static async checkProductInShoppingCart(data: Record<string, any>) {
    return await dgav.apiRequest(
      `${shoppingCartUrl}/check/product/from`,
      dgav.httpMethod.POST,
      data
    );
  }
  public static async proceedToCheckout(): Promise<any> {
    return await dgav.apiRequest(
      `${shoppingCartUrl}/proceed/to/checkout`,
      dgav.httpMethod.GET
    );
  }

  public static async deleteProductFromShoppingCart(
    data: Record<string, any>
  ): Promise<any> {
    return await dgav.apiRequest(
      `${shoppingCartUrl}/delete/product/from`,
      dgav.httpMethod.POST,
      data
    );
  }

  public static async editCustomer(data: Record<string, any>): Promise<any> {
    return await dgav.apiRequest(
      `${customersUrl}/edit/customer`,
      dgav.httpMethod.PUT,
      data
    );
  }

  public static async checkNumberCartShopping() {
    return await dgav.apiRequest(
      `${shoppingCartUrl}/check/number`,
      dgav.httpMethod.GET
    );
  }
}
