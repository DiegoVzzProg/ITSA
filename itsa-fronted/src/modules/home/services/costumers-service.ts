import { Api } from "../../../services/api-service";
import { ApiResponse } from "../../../utils/Api.interface";
const shoppingCartUrl = "/shopping-cart";
const customersUrl = "/customers";

export interface IAddProduct {
  id_producto: number;
  descripcion: string;
}

export interface ICheckProductInShoppingCart {
  id_producto: number;
}

export interface IProceedToCheckout {
  key: string;
}

export interface IDeleteProductFromShoppingCart {
  id_producto: number;
}

export interface IEditCustomer {
  id_cliente: number;
  nombre: string;
  numero_de_iva_empresa: string;
  direccion: string;
  estado: string;
  codigo_postal: string;
  id_pais: number;
  telefono: string;
}

export class CostumersClass {
  public async shoppingCartClient(): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "GET",
      endpoint: `${shoppingCartUrl}/client`,
    });

    return response;
  }

  public async addProduct(params: IAddProduct): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "POST",
      endpoint: `${shoppingCartUrl}/add/product`,
      body: params,
    });

    return response;
  }

  public async checkProductInShoppingCart(
    params: ICheckProductInShoppingCart
  ): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "POST",
      endpoint: `${shoppingCartUrl}/check/product/from`,
      body: params,
    });

    return response;
  }

  public async proceedToCheckout(
    params: IProceedToCheckout
  ): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "GET",
      endpoint: `${shoppingCartUrl}/proceed/to/checkout/${params.key}`,
    });

    return response;
  }

  public async deleteProductFromShoppingCart(
    params: IDeleteProductFromShoppingCart
  ): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "POST",
      endpoint: `${shoppingCartUrl}/delete/product/from`,
      body: params,
    });

    return response;
  }

  public async editCustomer(params: IEditCustomer): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "PUT",
      endpoint: `${customersUrl}/edit/customer`,
      body: params,
    });

    return response;
  }
}
