import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router"; // Importar el router
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import stores from "./modules/stores/GeneralStores";

const app = createApp(App);
const pinia = createPinia();

app.use(router);

app.use(pinia);
pinia.use(piniaPluginPersistedstate);

stores.echoStore().initEcho();

app.mount("#app");
