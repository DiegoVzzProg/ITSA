import { dgav } from "../utils/site";

const shoppingCartUrl = "/shoppingCart";
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
      `${shoppingCartUrl}/addProduct`,
      dgav.httpMethod.POST,
      data
    );
  }

  public static async registerCustomer(data: Record<string, any>) {
    return await dgav.apiRequest(
      `${customersUrl}/registerCustomer`,
      dgav.httpMethod.POST,
      data
    );
  }

  public static async getCustomer(data: Record<string, any>) {
    return await dgav.apiRequest(
      `${customersUrl}/getCustomer`,
      dgav.httpMethod.POST,
      data
    );
  }

  public static async checkProductInShoppingCart(data: Record<string, any>) {
    return await dgav.apiRequest(
      `${shoppingCartUrl}/checkProductInShoppingCart`,
      dgav.httpMethod.POST,
      data
    );
  }
  public static async proceedToCheckout(): Promise<any> {
    return await dgav.apiRequest(
      `${shoppingCartUrl}/proceedToCheckout`,
      dgav.httpMethod.GET
    );
  }

  public static async deleteProductFromShoppingCart(
    data: Record<string, any>
  ): Promise<any> {
    return await dgav.apiRequest(
      `${shoppingCartUrl}/deleteProductFromShoppingCart`,
      dgav.httpMethod.POST,
      data
    );
  }

  public static async editCustomer(data: Record<string, any>): Promise<any> {
    return await dgav.apiRequest(
      `${customersUrl}/editCustomer`,
      dgav.httpMethod.PUT,
      data
    );
  }
}
