import { dgav } from "../utils/site";

const productosUrl = "/products";

export class c_productos {
  public static async listProducts(data: Record<string, any>): Promise<any> {
    return await dgav.apiRequest(
      `${productosUrl}/listProducts`,
      dgav.httpMethod.POST,
      data
    );
  }

  public static async downloadFile(id_producto: string): Promise<any> {
    return await dgav.apiRequest(
      `${productosUrl}/downloadFile/${id_producto}`,
      dgav.httpMethod.DOWNLOAD
    );
  }

  public static async stripeCheckoutSuccess(
    data: Record<string, any>
  ): Promise<any> {
    return await dgav.apiRequest(
      `${productosUrl}/stripe/checkoutSuccess`,
      dgav.httpMethod.POST,
      data
    );
  }
}
