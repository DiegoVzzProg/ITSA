import type { ApiResponse } from "../../interfaces/api-response-interface";
import { ApiService } from "../api-service";
import type {
  IAddUser,
  IGetUsers,
  IGetUsersOptions,
} from "../interfaces/user-interface";

export class UserService {
  private prefix: string = "/users";
  public async getUsersOptions(
    entities: IGetUsersOptions
  ): Promise<ApiResponse> {
    const response: ApiResponse = await new ApiService(null).Request({
      endpoint: `${this.prefix}/options/list/${entities.user_id}`,
      method: "GET",
    });

    return response.data;
  }

  public async getUsers(entities: IGetUsers): Promise<ApiResponse> {
    const response: ApiResponse = await new ApiService(null).Request({
      endpoint: `${this.prefix}/list/${entities.user_id}`,
      method: "GET",
    });

    return response.data;
  }

  public async getRoles(): Promise<ApiResponse> {
    const response: ApiResponse = await new ApiService(null).Request({
      endpoint: `${this.prefix}/roles`,
      method: "GET",
    });

    return response.data;
  }

  public async addUser(entities: IAddUser): Promise<ApiResponse> {
    const response: ApiResponse = await new ApiService(null).Request({
      endpoint: `${this.prefix}/add`,
      method: "POST",
      body: entities,
    });

    return response.data;
  }
}
