import { createApp } from "vue";
import App from "./router/App.vue";
import router from "./router";
import "./styles/main.css";

// El fondo claro es el modo real y la clase viene puesta desde index.html,
// para que no haya un destello de negro antes de que arranque Vue. ?oscuro
// queda para poder comparar contra la version anterior.
if (new URLSearchParams(location.search).has("oscuro")) {
  document.documentElement.classList.remove("claro");
}

const app = createApp(App);
app.use(router);
app.mount("#app");
