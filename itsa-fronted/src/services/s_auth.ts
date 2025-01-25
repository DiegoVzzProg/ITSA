import { dgav } from "../utils/site";

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
          "/auth/login",
          dgav.httpMethod.POST,
          data
        );
        break;
      case 2:
        response = await dgav.apiRequest(
          "/auth/register",
          dgav.httpMethod.POST,
          data
        );
        break;
    }
    return response;
  }

  public static async fN_logout() {
    return await dgav.apiRequest("/auth/logout/user", dgav.httpMethod.DELETE);
  }
}
