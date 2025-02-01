import { dgav } from "../utils/site";

const urlAuth = "/auth";

export class c_auth {
  static async fn_login(data: Record<string, any>): Promise<any> {
    return this.auth(1, data);
  }

  static async fn_register(data: Record<string, any>): Promise<any> {
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

  public static async fN_logout() {
    return await dgav.apiRequest(`${urlAuth}/logoutUser`, dgav.httpMethod.DELETE);
  }

  public static async fn_forgot_password_restore(data: Record<string, any>) {
    return await dgav.apiRequest(
      `${urlAuth}/restorePassword`,
      dgav.httpMethod.POST,
      data
    );
  }
}
