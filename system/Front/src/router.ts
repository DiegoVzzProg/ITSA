import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import MenuView from "./views/Menu/MenuView.vue";
import UserView from "./views/Modules/User/UserView.vue";
import AddUserView from "./views/Modules/User/AddUserView.vue";
import EditUserView from "./views/Modules/User/EditUserView.vue";
const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/menu" },
  {
    path: "/menu",
    name: "menu",
    component: MenuView,
    meta: { layout: "master" },
  },
  {
    path: "/users/catalogo",
    name: "users_catalog",
    component: UserView,
    meta: { layout: "master" },
  },
  {
    path: "/users/add",
    name: "user_add",
    component: AddUserView,
    meta: { layout: "master" },
  },
  {
    path: "/users/edit/:user_id",
    name: "user_edit",
    component: EditUserView,
    meta: { layout: "master" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  return next();
});

export default router;
