import { Api } from "../../../services/api-service";
import { ApiResponse } from "../../../utils/Api.interface";
const productosUrl = "/products";

export interface IListProducts {
  id_producto: number;
}

export interface IDownloadFiles {
  id_usuario: string;
}
export interface IDownloadFile {
  id_usuario: string;
  id_producto: string;
}

export interface ICheckProduct {
  id_producto: number;
}

export class ProductsClass {
  public async listProducts(params: IListProducts): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "POST",
      endpoint: `${productosUrl}/list`,
      body: params,
    });

    return response;
  }

  public async downloadFiles(params: IDownloadFiles): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "GET",
      endpoint: `${productosUrl}/download/files/${params.id_usuario}`,
    });

    return response;
  }

  public async downloadFile(params: IDownloadFile): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "GET",
      endpoint: `${productosUrl}/download/file/${params.id_usuario}/${params.id_producto}`,
    });

    return response;
  }

  public async addProductDownloadList(): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "POST",
      endpoint: `${productosUrl}/add/product/download/list`
    });

    return response;
  }

  public async checkProduct(params: ICheckProduct): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "POST",
      endpoint: `${productosUrl}/check`,
      body: params,
    });

    return response;
  }
}
