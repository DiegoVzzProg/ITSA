import { dgav, notify, site } from "../../../utils/site";

interface IconfirmRestorePassword {
  email: string;
  password: string;
  token: string;
}

const urlAuth = "/auth";

const auth = async (
  opcion: number,
  data: Record<string, any>
): Promise<any> => {
  dgav.dataBase.message = "";
  let response: any = null;

  switch (opcion) {
    case 1:
      response = await dgav.apiRequest(
        `${urlAuth}/login`,
        dgav.httpMethod.POST,
        data
      );
      break;
    case 2:
      response = await dgav.apiRequest(
        `${urlAuth}/register`,
        dgav.httpMethod.POST,
        data
      );
      break;
  }

  const message: string = dgav.dataBase.message;
  if (!site.IsNullOrEmpty(message)) {
    notify.error(message);
    return null;
  }

  return response;
};

export const s_auth = {
  async loginUser(data: Record<string, any>): Promise<any> {
    return await auth(1, data);
  },

  async registerUser(data: Record<string, any>): Promise<any> {
    return auth(2, data);
  },

  async refreshToken(data: Record<string, any>): Promise<any> {
    dgav.dataBase.message = "";
    const response: any = await dgav.apiRequest(
      `${urlAuth}/token/refresh`,
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

  async logoutUser() {
    dgav.dataBase.message = "";

    const response: any = await dgav.apiRequest(
      `${urlAuth}/logout`,
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

  async restorePassword(data: Record<string, any>) {
    dgav.dataBase.message = "";

    await dgav.apiRequest(
      `${urlAuth}/password/forgot`,
      dgav.httpMethod.POST,
      data
    );

    const message: string = dgav.dataBase.message;
    notify.success(message);
    return null;
  },

  async secretKey() {
    dgav.dataBase.message = "";
    const response: any = await dgav.apiRequest(
      "/secret-key",
      dgav.httpMethod.GET
    );
    const message: string = dgav.dataBase.message;
    if (!site.IsNullOrEmpty(message)) {
      notify.error(message);
      return null;
    }

    return response;
  },

  async confirmRestorePassword(data: IconfirmRestorePassword) {
    dgav.dataBase.message = "";
    const response: any = await dgav.apiRequest(
      `${urlAuth}/password/forgot/confirm`,
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
};
