import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from './components/home/Home.vue';
import Information from './components/information/Information.vue';
import Login from './components/auth/Login.vue';

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'Home', component: Home, meta: { layout: "Main" } },
    { path: '/information/:select', name: 'info', component: Information, meta: { layout: "Main" } },
    { path: '/login', name: 'login', component: Login, meta: { layout: "Auth" } }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;