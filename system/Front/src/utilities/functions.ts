import type { RouteLocationRaw, RouteRecordName } from "vue-router";
import router from "../router";

export interface RouterParams {
  name: RouteRecordName;
  params?: Record<string, string>;
  query?: Record<string, string>;
  functionOn?: () => void;
}

export class Functions {
  public static RedirectPage(name: string): void;
  public static RedirectPage(routerParams: RouterParams): void;
  public static RedirectPage(routerParams: RouterParams | string): void {
    const dataRoute: RouteLocationRaw =
      typeof routerParams === "string"
        ? { name: routerParams }
        : {
            name: routerParams.name,
            params: routerParams.params,
            query: routerParams.query,
          };

    router
      .push(dataRoute)
      .then(() => {
        window.scrollTo({ top: 0 });
        if (typeof routerParams !== "string") {
          routerParams.functionOn?.();
        }
      })
      .catch((error) => {
        if (error.name !== "NavigationDuplicated") {
          router.push("/").catch(() => {
            window.location.href = "/";
          });
        }
      });
  }
}
