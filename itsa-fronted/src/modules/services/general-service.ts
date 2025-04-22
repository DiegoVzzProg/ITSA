import { Api } from "../../services/api-service";
import { ApiResponse } from "../../utils/Api.interface";

export interface IvalidateSessionStripe {
  session: string;
}

export class GeneralClass {
  public async countries(): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "GET",
      endpoint: `/countries`,
    });

    return response;
  }

  public async validateSessionStripe(
    params: IvalidateSessionStripe
  ): Promise<ApiResponse> {
    const response: ApiResponse = await Api.Request({
      method: "POST",
      endpoint: `/stripe/validate-session`,
      body: params,
    });

    return response;
  }
}
