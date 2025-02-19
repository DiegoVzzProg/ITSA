import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "./views/Home/Home.vue";
import Information from "./views/Information.vue";
import Login from "./views/Login/Login.vue";
import BasicsIcons from "./views/BasicsIcons/BasicsIcons.vue";
import UniversalIcons from "./views/UniversalIcons/UniversalIcons.vue";
import CheckOut from "./views/CheckOut/CheckOut.vue";
import Register from "./views/Register/Register.vue";
import ForgotPassword from "./views/ForgotPassword/ForgotPassword.vue";
import PaymentCompleted from "./views/PaymentCompleted.vue";
import { UniqueGuid } from "./stores/store_session";
import { numberCartShopping } from "./stores/countCartShopping";
import { site } from "./utils/site";

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
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const redirectToHome = {
    name: "home",
    query: {
      key: UniqueGuid().guid,
    },
  };

  if (String(to.meta.layout).toLowerCase() === "auth") {
    return next();
  }

  if (!site.IsNullOrEmpty(to.query.key)) {
    if (UniqueGuid().guid !== to.query.key) {
      return next(redirectToHome);
    }

    const token: string = site.getCookie("e.t", false) ?? null;
    if (
      !site.IsNullOrEmpty(token) &&
      (String(to.name).toLowerCase() == "paymentcompleted" ||
        String(to.name).toLowerCase() == "checkout")
    ) {
      numberCartShopping().update();
    }
  } else {
    return next(redirectToHome);
  }

  next();
});

export default router;
