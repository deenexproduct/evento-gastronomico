import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

/**
 * Cinco vistas y una home que resume.
 *
 * La home es el resumen ejecutivo de la jornada: se entiende de un scroll
 * corto y termina en la reserva. Cada bloque de la cabecera abre su propia
 * vista con el detalle, así el que quiere profundizar entra por donde le
 * interesa y el que no, no lo tiene que scrollear igual.
 *
 * MODO HASH, y eso condiciona todo lo de abajo: el navegador y el router se
 * pelean por el mismo símbolo. "saborestech.ar/#registro" le llega al router
 * como la ruta "/registro". Antes eso lo absorbía una sola comodín que
 * devolvía la home; ahora que hay rutas de verdad, los anclas viejos que ya
 * circulan por WhatsApp, mail y pauta tienen que seguir llegando a algún
 * lado con sentido. Por eso ANCLAS_VIEJAS: cada id que alguna vez fue una
 * sección de la home se redirige a la vista donde vive hoy ese contenido.
 *
 * El orden importa: vue-router matchea de arriba hacia abajo, así que la
 * comodín va SIEMPRE última o se come todas las rutas reales.
 */

/** Id de sección que alguna vez estuvo en la home → dónde vive hoy. */
const ANCLAS_VIEJAS = {
  "que-es": "/que-es",
  jornada: "/", // la jornada es el corazón del resumen: se queda en la home
  "el-lunes": "/beneficios",
  beneficios: "/beneficios",
  partners: "/participan",
  respaldan: "/participan",
  sumarse: "/participan",
  prueba: "/organiza",
  marcas: "/organiza",
  acceso: "/deadline",
  anotadas: "/deadline",
  registro: "/deadline",
  reservar: "/deadline",
  lugar: "/que-es",
  faq: "/que-es",
};

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    {
      path: "/que-es",
      name: "que-es",
      component: () => import("@/views/QueEsView.vue"),
    },
    {
      path: "/beneficios",
      name: "beneficios",
      component: () => import("@/views/BeneficiosView.vue"),
    },
    {
      path: "/deadline",
      name: "deadline",
      component: () => import("@/views/DeadlineView.vue"),
    },
    {
      // alias: "#/partners" es el link que ya circula y no se puede romper.
      path: "/participan",
      alias: "/partners",
      name: "participan",
      component: () => import("@/views/ParticipanView.vue"),
    },
    {
      path: "/organiza",
      name: "organiza",
      component: () => import("@/views/OrganizaView.vue"),
    },
    {
      // Lo que no matcheó ninguna ruta real: o es un ancla vieja conocida y
      // se redirige, o es basura y cae en la home.
      path: "/:resto(.*)",
      name: "resto",
      redirect: (a) => ANCLAS_VIEJAS[a.params.resto?.replace(/^\/+/, "")] || "/",
    },
  ],

  /**
   * Cambiar de vista siempre lleva arriba: es una página nueva, no un salto
   * dentro de la misma. Volver con el botón del navegador restaura dónde
   * estabas, que es lo único que el lector espera que se conserve.
   */
  scrollBehavior(a, desde, guardada) {
    if (guardada) return guardada;
    return { top: 0 };
  },
});

export default router;
