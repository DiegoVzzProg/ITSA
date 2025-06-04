import type { ApiResponse } from "../../interfaces/api-response-interface";
import { ApiService } from "../api-service";

export interface IUsersOptions {
  user_id: number;
}

export interface IUsers {
  user_id: number;
}

export class UserService {
  private prefix: string = "/users";
  public async getUsersOptions(entities: IUsersOptions): Promise<ApiResponse> {
    const response: ApiResponse = await new ApiService(null).Request({
      endpoint: `${this.prefix}/options/list/${entities.user_id}`,
      method: "GET",
    });

    return response.data;
  }

  public async getUsers(entities: IUsers): Promise<ApiResponse> {
    const response: ApiResponse = await new ApiService(null).Request({
      endpoint: `${this.prefix}/list/${entities.user_id}`,
      method: "GET",
    });

    return response.data;
  }
}
