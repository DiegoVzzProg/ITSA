import { dgav, notify, site } from "../../../utils/site";
const shoppingCartUrl = "/shopping-cart";
const customersUrl = "/customers";

export const s_costumers = {
  async shoppingCartClient() {
    dgav.dataBase.message = "";

    const response: any = await dgav.apiRequest(
      `${shoppingCartUrl}/client`,
      dgav.httpMethod.GET
    );

    const message: string = dgav.dataBase.message;
    if (!site.IsNullOrEmpty(message)) {
      notify.error(message);
      return null;
    }

    return response;
  },

  async addProduct(data: Record<string, any>) {
    dgav.dataBase.message = "";

    const response: any = await dgav.apiRequest(
      `${shoppingCartUrl}/add/product`,
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

  //   async registerCustomer(data: Record<string, any>) {
  //     return await dgav.apiRequest(
  //       `${customersUrl}/register/customer`,
  //       dgav.httpMethod.POST,
  //       data
  //     );
  //   },

  async checkProductInShoppingCart(data: Record<string, any>) {
    dgav.dataBase.message = "";

    const response: any = await dgav.apiRequest(
      `${shoppingCartUrl}/check/product/from`,
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

  async proceedToCheckout(key: string): Promise<any> {
    dgav.dataBase.message = "";

    const response: any = await dgav.apiRequest(
      `${shoppingCartUrl}/proceed/to/checkout/${key}`,
      dgav.httpMethod.GET
    );

    const message: string = dgav.dataBase.message;
    if (!site.IsNullOrEmpty(message)) {
      notify.error(message);
      return null;
    }

    return response;
  },

  async deleteProductFromShoppingCart(data: Record<string, any>): Promise<any> {
    dgav.dataBase.message = "";

    const response: any = dgav.apiRequest(
      `${shoppingCartUrl}/delete/product/from`,
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

  async editCustomer(data: Record<string, any>): Promise<any> {
    dgav.dataBase.message = "";

    const response: any = await dgav.apiRequest(
      `${customersUrl}/edit/customer`,
      dgav.httpMethod.PUT,
      data
    );
    const message: string = dgav.dataBase.message;
    if (!site.IsNullOrEmpty(message)) {
      notify.error(message);
      return null;
    }

    return response;
  },

  async checkNumberCartShopping() {
    dgav.dataBase.message = "";

    const response: any = await dgav.apiRequest(
      `${shoppingCartUrl}/check/number`,
      dgav.httpMethod.GET
    );
    const message: string = dgav.dataBase.message;
    if (!site.IsNullOrEmpty(message)) {
      notify.error(message);
      return null;
    }

    return response;
  },
};
