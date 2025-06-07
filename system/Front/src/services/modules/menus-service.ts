import type { ApiResponse } from "../../interfaces/api-response-interface";
import { ApiService } from "../api-service";

export interface IMenu {
  option_id: number;
}

export class MenusService {
  private prefix: string = "/menus";
  public async getMenus(entities: IMenu): Promise<ApiResponse> {
    const response: ApiResponse = await new ApiService(null).Request({
      endpoint: `${this.prefix}/list/${entities.option_id}`,
      method: "GET",
    });

    return response.data;
  }
}
