import { createApp } from "vue";
import App from "./router/App.vue";
import router from "./router";
import "./styles/main.css";

// Prueba de fondo claro: se activa con ?claro en la URL.
if (new URLSearchParams(location.search).has("claro")) {
  document.documentElement.classList.add("claro");
}

const app = createApp(App);
app.use(router);
app.mount("#app");
