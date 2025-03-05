import { dgav, notify, site } from "../../../utils/site";
const productosUrl = "/products";

export const s_products = {
  async listProducts(data: Record<string, any>): Promise<any> {
    dgav.dataBase.message = "";

    const response: any = await dgav.apiRequest(
      `${productosUrl}/list`,
      dgav.httpMethod.POST,
      data
    );

    const message: string = dgav.dataBase.message;
    if (!site.IsNullOrEmpty(message)) {
      notify.error(message);
      return null;
    }

    return response;
  },

  async downloadFile(): Promise<any> {
    dgav.dataBase.message = "";

    const response: any = await dgav.apiRequest(
      `${productosUrl}/download/file`,
      dgav.httpMethod.DOWNLOAD
    );

    const message: string = dgav.dataBase.message;
    if (!site.IsNullOrEmpty(message)) {
      notify.error(message);
      return null;
    }

    return response;
  },

  async addProductDownloadList(): Promise<any> {
    dgav.dataBase.message = "";

    const response: any = await dgav.apiRequest(
      `${productosUrl}/add/product/download/list`,
      dgav.httpMethod.POST,
      {}
    );

    const message: string = dgav.dataBase.message;
    if (!site.IsNullOrEmpty(message)) {
      notify.error(message);
      return null;
    }

    return response;
  },
};
