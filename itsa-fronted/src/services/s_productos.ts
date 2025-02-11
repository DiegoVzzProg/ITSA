import { dgav } from "../utils/site";

const productosUrl = "/products";

export class c_productos {
  public static async fn_l_productos(data: Record<string, any>): Promise<any> {
    return await dgav.apiRequest(
      `${productosUrl}/listProducts`,
      dgav.httpMethod.POST,
      data
    );
  }

  public static async fn_descargar_archivo(id_producto: string): Promise<any> {
    return await dgav.apiRequest(
      `${productosUrl}/downloadFile/${id_producto}`,
      dgav.httpMethod.DOWNLOAD
    );
  }


}
