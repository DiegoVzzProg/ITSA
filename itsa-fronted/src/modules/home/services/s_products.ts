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

  async downloadFiles(id_usuario: string): Promise<any> {
    dgav.dataBase.message = "";

    const response: any = await dgav.apiRequest(
      `${productosUrl}/download/files/${id_usuario}`,
      dgav.httpMethod.GET
    );

    const message: string = dgav.dataBase.message;
    if (!site.IsNullOrEmpty(message)) {
      notify.error(message);
      return null;
    }

    return response;
  },

  async downloadFile(id_usuario: string, id_producto: string): Promise<any> {
    dgav.dataBase.message = "";

    const response: any = await dgav.apiRequest(
      `${productosUrl}/download/file/${id_usuario}/${id_producto}`,
      dgav.httpMethod.GET
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

  async checkProduct(id_producto: number): Promise<any> {
    dgav.dataBase.message = "";

    const response: any = await dgav.apiRequest(
      `${productosUrl}/check`,
      dgav.httpMethod.POST,
      { id_producto }
    );

    const message: string = dgav.dataBase.message;
    if (!site.IsNullOrEmpty(message)) {
      notify.error(message);
      return null;
    }

    return response;
  },
};
