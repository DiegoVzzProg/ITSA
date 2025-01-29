import { dgav } from "../utils/site";

export class c_general {
  static async fileEncrypted(folder: string, filename: string) {
    return await dgav.apiRequest(
      `/public/archivo/${folder}/${filename}`,
      dgav.httpMethod.GET
    );
  }

  static async SecretKey() {
    return await dgav.apiRequest("/secret/key", dgav.httpMethod.GET);
  }

  static async DownloadFile(arch: string) {
    // response = await api.get(`/downloadfile/${arch}`, {
    //     responseType: 'blob',
    // });
    return await dgav.apiRequest(
      `/public/downloadfile/${arch}`,
      dgav.httpMethod.GET
    );
  }

  static async fn_l_paises() {
    return await dgav.apiRequest(`/countries`, dgav.httpMethod.GET);
  }
}
