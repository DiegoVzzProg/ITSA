import { dgav } from "../utils/site";

export class c_general {
  public static async SecretKey() {
    return await dgav.apiRequest("/secretKey", dgav.httpMethod.GET);
  }

  static async DownloadFile(arch: string) {
    return await dgav.apiRequest(
      `/public/downloadFile/${arch}`,
      dgav.httpMethod.GET
    );
  }

  static async countries() {
    return await dgav.apiRequest(`/countries`, dgav.httpMethod.GET);
  }
}
