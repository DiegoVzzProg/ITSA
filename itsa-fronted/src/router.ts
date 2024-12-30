import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from './views/Home.vue';
import Information from './views/Information.vue';
import Login from './views/Login.vue';
import BasicsIcons from './views/BasicsIcons.vue';
import UniversalIcons from './views/UniversalIcons.vue';
import CheckOut from './views/CheckOut.vue';

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'Home', component: Home, meta: { layout: "Main" } },
    { path: '/gallery/basics-icons', name: 'basicsicons', component: BasicsIcons, meta: { layout: "Main" } },
    { path: '/gallery/universal-icons', name: 'universalicons', component: UniversalIcons, meta: { layout: "Main" } },
    { path: '/information/:select', name: 'info', component: Information, meta: { layout: "Main" } },
    { path: '/checkout/:id', name: 'checkout', component: CheckOut, meta: { layout: "Main" }, props: true },
    { path: '/login', name: 'login', component: Login, meta: { layout: "Auth" } }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;