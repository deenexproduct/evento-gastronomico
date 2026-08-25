import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

/**
 * La landing es una sola página, pero el modo hash hace que el navegador y el
 * router se peleen por el mismo símbolo: "gastrotech.ar/#registro" le llega al
 * router como la ruta "/registro". Sin una regla que la absorba no matchea
 * nada y la página queda literalmente en blanco — que es lo que veía cualquiera
 * que abriera un link con ancla compartido por WhatsApp, mail o pauta.
 *
 * La comodín devuelve la misma home y scrollBehavior se encarga de bajar hasta
 * la sección que pedía el ancla.
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/:seccion(.*)", name: "ancla", component: HomeView },
  ],
  scrollBehavior(to, desde) {
    const id = to.path.replace(/^\/+/, "");
    if (!id) return { top: 0 };

    // En la primera carga el router resuelve antes de que Vue monte las
    // secciones, así que hay que esperar a que el ancla exista de verdad.
    // Se reintenta hasta un segundo y medio; después, arriba de todo.
    //
    // Con setTimeout y no con requestAnimationFrame a propósito: un link de
    // WhatsApp que abre en una pestaña de fondo no compone frames, ahí rAF no
    // corre nunca y la promesa quedaría colgada esperando para siempre.
    return new Promise((resolver) => {
      const limite = Date.now() + 1500;
      const buscar = () => {
        const el = document.getElementById(id);
        if (el) {
          // Entrando de un link externo el salto es directo: animar doce mil
          // píxeles deja al que llega mirando pasar la página entera.
          resolver({ el, behavior: desde.name ? "smooth" : "auto" });
        } else if (Date.now() < limite) {
          setTimeout(buscar, 60);
        } else {
          resolver({ top: 0 });
        }
      };
      buscar();
    });
  },
});

export default router;
