import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "./views/Home/Home.vue";
import Information from "./views/Information.vue";
import Login from "./views/Login/Login.vue";
import BasicsIcons from "./views/BasicsIcons/BasicsIcons.vue";
import UniversalIcons from "./views/UniversalIcons/UniversalIcons.vue";
import CheckOut from "./views/CheckOut/CheckOut.vue";
import Register from "./views/Register/Register.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
