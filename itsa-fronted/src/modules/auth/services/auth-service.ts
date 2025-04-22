import { Api } from "../../../services/api-service";
import { ApiResponse } from "../../../utils/Api.interface";
const urlAuth = "/auth";

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  user_name: string;
  email: string;
  password: string;
  leyo_terms: boolean;
  nombre: string;
  numero_de_iva_empresa: string;
  direccion: string;
  codigo_postal: string;
  estado: string;
  id_pais: number;
  telefono: string;
}

export interface IRefreshToken {
  refresh_token: string;
}

export interface IRestorePassword {
  email: string;
}

export interface IConfirmRestorePassword {
  email: string;
  password: string;
  token: string;
}

export class AuthClass {
  public async Login(params: ILogin): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "POST",
      endpoint: `${urlAuth}/login`,
      body: params,
    });

    return response;
  }

  public async Register(params: IRegister): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "POST",
      endpoint: `${urlAuth}/register`,
      body: params,
    });

    return response;
  }

  public async refreshToken(params: IRefreshToken): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "POST",
      endpoint: `${urlAuth}/token/refresh`,
      body: params,
    });

    return response;
  }

  public async logoutUser(): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "POST",
      endpoint: `${urlAuth}/logout`,
      body: { asd: 0 },
    });

    console.log(response);

    return response;
  }

  public async restorePassword(params: IRestorePassword): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "POST",
      endpoint: `${urlAuth}/password/forgot`,
      body: params,
    });

    return response;
  }

  public async secretKey(): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "GET",
      endpoint: `/secret-key`,
    });

    return response;
  }

  public async confirmRestorePassword(
    params: IConfirmRestorePassword
  ): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "POST",
      endpoint: `${urlAuth}/password/forgot/confirm`,
      body: params,
    });

    return response;
  }
}
