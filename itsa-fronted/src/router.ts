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

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "home", component: Home, meta: { layout: "Main" } },
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
  // {
  //   path: "/forgot/password",
  //   name: "forgotpassword",
  //   component: ForgotPassword,
  //   meta: { layout: "Auth" },
  // },
  {
    path: "/payment/completed",
    name: "paymentcompleted",
    component: PaymentCompleted,
    meta: { layout: "Main" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const redirectToHome = {
    name: "home",
  };
  stores.useCartStore().setupCartListener();

  if (
    String(to.meta.layout).toLowerCase() === "auth" ||
    String(to.name).toLowerCase() === "home"
  ) {
    return next();
  }

  if (!site.IsNullOrEmpty(to.query.key)) {
    const key: string = stores.guid().value;
    localStorage.setItem("guid", key);

    if (key !== to.query.key) {
      return next(redirectToHome);
    }
  } else {
    return next(redirectToHome);
  }

  next();
});

export default router;
