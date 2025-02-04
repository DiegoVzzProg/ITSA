import { dgav } from "../utils/site";

const productosUrl = "/public";

export class c_productos {
  public static async fn_l_productos(data: Record<string, any>): Promise<any> {
    return await dgav.apiRequest(
      `${productosUrl}/listProducts`,
      dgav.httpMethod.POST,
      data
    );
  }
}
