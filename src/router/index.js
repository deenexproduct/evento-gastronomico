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

/**
 * Id de sección que alguna vez estuvo en la home → dónde vive hoy.
 *
 * El valor es lo que se le pasa a `redirect`, así que puede ser una ruta suelta
 * o un objeto { path, hash }. El hash importa: sin él, el que abre un enlace
 * viejo aterriza arriba de la vista y tiene que buscar a mano lo que venía a
 * ver. Con él —y con el scrollBehavior de abajo, que lo honra— cae en la
 * sección.
 *
 * CADA HASH DE ACÁ TIENE QUE EXISTIR EN SU DESTINO. No es obvio: los ids se
 * renombraron sin que este mapa se enterara, y así estaba roto.
 *
 *   #lugar  →  apuntaba a /que-es, que NO tiene la dirección. La sección del
 *              lugar es DondeSection y vive en la home, con id "donde": el que
 *              abría un "#lugar" reenviado por WhatsApp llegaba a una página
 *              que no dice dónde queda el evento. Roto desde el 31/08, cuando
 *              LocationSection salió de /que-es y la reemplazó DondeSection en
 *              la home; el mapa se había escrito diez horas antes.
 *   #faq    →  lo mismo: FAQSection se movió del pie a la home ese mismo día.
 *   #prueba →  iba a /organiza, que ya no existe: la vista del organizador se
 *   #marcas     eliminó junto con el muro de marcas que mostraba. Las dos van
 *               a la home, que es lo que hay: mandar un enlace compartido a
 *               una ruta muerta lo deja en blanco.
 */
const ANCLAS_VIEJAS = {
  "que-es": { path: "/que-es", hash: "#que-es" },
  // La jornada es el corazón del resumen: se queda en la home.
  jornada: { path: "/", hash: "#jornada" },
  "el-lunes": { path: "/beneficios", hash: "#el-lunes" },
  beneficios: { path: "/beneficios", hash: "#el-lunes" },
  partners: { path: "/participan", hash: "#partners" },
  respaldan: { path: "/participan", hash: "#respaldan" },
  sumarse: { path: "/participan", hash: "#sumarse" },
  prueba: "/",
  marcas: "/",
  acceso: { path: "/deadline", hash: "#acceso" },
  anotadas: { path: "/deadline", hash: "#anotadas" },
  registro: { path: "/deadline", hash: "#registro" },
  reservar: { path: "/deadline", hash: "#reservar" },
  // Los dos que estaban mal: el lugar y las preguntas viven en la HOME.
  lugar: { path: "/", hash: "#donde" },
  faq: { path: "/", hash: "#faq" },
};

/**
 * Lleva el scroll a un ancla, reintentando hasta que el destino existe Y su
 * posición se queda quieta.
 *
 * Un scrollIntoView suelto no alcanza acá, y falla de dos formas distintas:
 *
 *  1. EL DESTINO TODAVÍA NO EXISTE. En una redirección de ANCLAS_VIEJAS el
 *     scrollBehavior corre antes de que la vista destino termine de montar, así
 *     que querySelector devuelve null y no scrollea nada.
 *
 *  2. EL DESTINO SE MUEVE. Las secciones de la home entran con .v-reveal
 *     —opacity 0 y translateY— y las fuentes de Fontshare recomponen el texto
 *     al llegar. Scrollear a la posición de los primeros milisegundos deja al
 *     lector en cualquier lado: #donde está a 3.492px y esa cifra cambia
 *     mientras carga.
 *
 * Por eso reintenta: hasta 40 frames —unos 650ms— y corta apenas la posición
 * del destino se repite dos frames seguidos, que es cuando el layout dejó de
 * moverse. Si el ancla no aparece nunca, no hace nada y la página queda arriba,
 * que es el comportamiento de siempre.
 */
function irAlAncla(hash, intentos = 40) {
  let ultimaY = null;
  const probar = (queda) => {
    const destino = document.querySelector(hash);
    if (destino) {
      const y = Math.round(destino.getBoundingClientRect().top + window.scrollY);
      destino.scrollIntoView();
      // Dos frames con la misma posición: el layout se quedó quieto.
      if (y === ultimaY) return;
      ultimaY = y;
    }
    if (queda > 0) requestAnimationFrame(() => probar(queda - 1));
  };
  requestAnimationFrame(() => probar(intentos));
}

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
   *
   * SALVO QUE LA RUTA TRAIGA HASH. Devolvía { top: 0 } siempre, así que las
   * redirecciones de ANCLAS_VIEJAS dejaban al lector arriba de todo aunque el
   * destino fuera correcto: alguien que abría un "#acceso" reenviado llegaba a
   * /deadline y tenía que buscar la sección a mano. El destino estaba bien y el
   * scroll lo perdía igual.
   *
   * Se hace con scrollIntoView() y no con { el, top }: vue-router calcula la
   * posición con getElementPosition, que sólo resta el offset y NO lee
   * scroll-margin-top. Como main.css:44 le da 88px a todo section[id] —el alto
   * del nav fijo—, con { el, top } habría que repetir ese 88 acá y mantener dos
   * números sincronizados. scrollIntoView lo respeta solo.
   *
   * El `return false` le dice a vue-router que el scroll ya está resuelto.
   */
  scrollBehavior(a, desde, guardada) {
    if (guardada) return guardada;

    if (a.hash) {
      irAlAncla(a.hash);
      return false;
    }

    return { top: 0 };
  },
});

export default router;
