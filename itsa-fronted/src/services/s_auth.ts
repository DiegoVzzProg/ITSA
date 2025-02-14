import { dgav } from "../utils/site";

const urlAuth = "/auth";

export class c_auth {
  public static async refreshToken(data: Record<string, any>): Promise<any> {
    return await dgav.apiRequest(
      `${urlAuth}/refreshToken`,
      dgav.httpMethod.POST,
      data
    );
  }

  public static async loginUser(data: Record<string, any>): Promise<any> {
    return this.auth(1, data);
  }

  public static async registerUser(data: Record<string, any>): Promise<any> {
    return this.auth(2, data);
  }

  private static async auth(
    opcion: number,
    data: Record<string, any>
  ): Promise<any> {
    let response: any = null;

    switch (opcion) {
      case 1:
        response = await dgav.apiRequest(
          `${urlAuth}/loginUser`,
          dgav.httpMethod.POST,
          data
        );
        break;
      case 2:
        response = await dgav.apiRequest(
          `${urlAuth}/registerUser`,
          dgav.httpMethod.POST,
          data
        );
        break;
    }
    return response;
  }

  public static async logoutUser() {
    return await dgav.apiRequest(
      `${urlAuth}/logoutUser`,
      dgav.httpMethod.DELETE
    );
  }

  public static async restorePassword(data: Record<string, any>) {
    return await dgav.apiRequest(
      `${urlAuth}/restorePassword`,
      dgav.httpMethod.POST,
      data
    );
  }
}
