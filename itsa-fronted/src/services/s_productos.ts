import { dgav } from "../utils/site";

const productosUrl = "/products";

export class c_productos {
  public static async listProducts(data: Record<string, any>): Promise<any> {
    return await dgav.apiRequest(
      `${productosUrl}/list/products`,
      dgav.httpMethod.POST,
      data
    );
  }

  public static async downloadFile(): Promise<any> {
    return await dgav.apiRequest(
      `${productosUrl}/download/file`,
      dgav.httpMethod.DOWNLOAD
    );
  }

  public static async addProductDownloadList(): Promise<any> {
    return await dgav.apiRequest(
      `${productosUrl}/add/product/download/list`,
      dgav.httpMethod.POST,
      {}
    );
  }
}
