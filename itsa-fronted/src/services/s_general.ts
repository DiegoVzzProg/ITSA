import { dgav } from "../utils/site";

export class c_general {
  public static async SecretKey() {
    return await dgav.apiRequest("/secretKey", dgav.httpMethod.GET);
  }

  public static async countries() {
    return await dgav.apiRequest(`/countries`, dgav.httpMethod.GET);
  }
}
