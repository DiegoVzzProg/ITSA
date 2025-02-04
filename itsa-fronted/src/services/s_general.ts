import { dgav } from "../utils/site";

export class c_general {
  static async SecretKey() {
    return await dgav.apiRequest("/secretKey", dgav.httpMethod.GET);
  }

  static async DownloadFile(arch: string) {
    // response = await api.get(`/downloadfile/${arch}`, {
    //     responseType: 'blob',
    // });
    return await dgav.apiRequest(
      `/public/downloadFile/${arch}`,
      dgav.httpMethod.GET
    );
  }

  static async fn_l_paises() {
    return await dgav.apiRequest(`/countries`, dgav.httpMethod.POST, {});
  }
}
