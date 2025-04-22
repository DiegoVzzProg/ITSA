import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "./modules/home/UI/Home.vue";
import Information from "./modules/home/UI/Information.vue";
import Login from "./modules/auth/UI/LoginUI.vue";
import BasicsIcons from "./modules/home/UI/BasicsIcons.vue";
import UniversalIcons from "./modules/home/UI/UniversalIcons.vue";
import CheckOut from "./modules/home/UI/CheckOut.vue";
import Register from "./modules/auth/UI/RegisterUI.vue";
//import ForgotPassword from "./views/ForgotPassword/ForgotPassword.vue";
import PaymentCompleted from "./modules/home/UI/PaymentCompleted.vue";
//import { numberCartShopping } from "./modules/home/stores/CustomerStore";
import { site } from "./utils/site";
import stores from "./modules/stores/GeneralStores";
import ForgotPassword from "./modules/auth/UI/ForgotPassword.vue";
import {
  GeneralClass,
  IvalidateSessionStripe,
} from "./modules/services/general-service";
import { ApiResponse } from "./utils/Api.interface";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "home", component: Home, meta: { layout: "Main" } },
  {
    path: "/gallery/basics-icons",
    name: "basicsicons",
    component: BasicsIcons,
    meta: { layout: "Main" },
  },
  {
    path: "/gallery/universal-icons",
    name: "universalicons",
    component: UniversalIcons,
    meta: { layout: "Main" },
  },
  {
    path: "/information/:select",
    name: "info",
    component: Information,
    meta: { layout: "Main" },
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckOut,
    meta: { layout: "Main" },
    props: true,
  },
  { path: "/login", name: "login", component: Login, meta: { layout: "Auth" } },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { layout: "Auth" },
  },
  {
    path: "/forgot/password",
    name: "forgotpassword",
    component: ForgotPassword,
    meta: { layout: "Auth" },
  },
  {
    path: "/payment/completed",
    name: "paymentcompleted",
    component: PaymentCompleted,
    meta: { layout: "Main" },
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  if (
    to.query.session &&
    (String(to.name).toLowerCase() == "checkout" ||
      String(to.name).toLowerCase() == "paymentcompleted")
  ) {
    const params: IvalidateSessionStripe = {
      session: to.query.session?.toString() ?? "",
    };

    const response: ApiResponse =
      await new GeneralClass().validateSessionStripe(params);

    if (!response.data || !response.data.valid) {
      return next({
        name: "home",
      });
    }

    return next();
  }

  if (
    !site.IsNullOrEmpty(to.query.key) &&
    (String(to.name).toLowerCase() != "checkout" ||
      String(to.name).toLowerCase() != "paymentcompleted")
  ) {
    const key: string = stores.guid().value;
    localStorage.setItem("guid", key);

    if (key !== to.query.key) {
      return next({
        name: "home",
      });
    }
  }

  return next();
});

export default router;
