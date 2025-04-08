import { dgav, notify, site } from "../../utils/site";

export const s_general = {
  async countries() {
    dgav.dataBase.message = "";
    const response: any = await dgav.apiRequest(
      `/countries`,
      dgav.httpMethod.GET
    );

    const message: string = dgav.dataBase.message;
    if (!site.IsNullOrEmpty(message)) {
      notify.error(message);
      return null;
    }

    return response;
  },

  async validateSessionStripe(session: string) {
    dgav.dataBase.message = "";
    const response: any = await dgav.apiRequest(
      `/stripe/validate-session`,
      dgav.httpMethod.POST,
      { session: session }
    );

    const message: string = dgav.dataBase.message;
    if (!site.IsNullOrEmpty(message)) {
      notify.error(message);
      return null;
    }

    return response;
  },
};
