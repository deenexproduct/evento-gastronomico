<!--
  La cabecera es el índice del evento: una sola fila, con las cinco pestañas
  siempre a la vista.

  Estuvo partida en dos filas —logo y botón arriba, pestañas abajo— y eso
  empujaba el contenido 130px hacia abajo y hacía leer la cabecera en dos
  tiempos. Ahora es una sola barra de 72px.

  Cómo entran cinco pestañas, un logo y un botón: lo que cede es lo accesorio,
  en este orden. Las etiquetas largas ("Quiénes son parte", "Quién organiza")
  vuelven recién en xl: con el wordmark en Panchang —más ancha que el cuerpo—
  a 1024px ya no entraban. Primero la fecha del logo (debajo de 1536),
  después el contador de lugares (debajo de 1024). Las pestañas y el botón no ceden
  nunca: son la navegación y la conversión. Si aun así no entran —un teléfono
  de 375px—, la tira de pestañas scrollea de costado dentro de su propio
  espacio, sin romper la fila ni esconder ninguna.

  Debajo de 640px ni siquiera con etiquetas cortas entran las cinco al lado del
  logo, así que ahí —y sólo ahí— la tira de pestañas baja a su propio renglón,
  donde entran las cinco sin scroll. Sigue siendo una cabecera de dos alturas
  nada más que en teléfono.

  Sin menú hamburguesa a propósito: las cinco pestañas quedan a la vista y se
  llega a cualquiera con un toque, no con dos.
-->
<template>
  <header
    ref="cabecera"
    class="fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-300"
    :class="scrolled ? 'border-white/10 bg-noche/90 backdrop-blur-md' : 'border-transparent bg-noche'"
  >
    <div class="contenedor">
      <div class="flex flex-wrap items-center gap-x-3 py-3.5 sm:flex-nowrap sm:gap-x-4 lg:gap-x-6">
        <RouterLink to="/" class="flex min-h-[44px] shrink-0 items-center gap-2 lg:gap-3">
          <span class="font-display text-[0.85rem] font-extrabold uppercase tracking-[-0.015em] text-white lg:text-[0.95rem]">
            SaboresTech
          </span>
          <!--
            "by Deenex" en el violeta de marca y en peso medio: acompaña al
            wordmark sin competirle. El color sale de --deenex-texto, que tiene
            un tono por tema porque el #695EDE de la paleta rinde 4,93:1 sobre
            blanco y sólo 3,53:1 sobre los negros.
            El -ml-1 recupera el gap-3 del contenedor, que acá separaría
            demasiado dos partes del mismo nombre.
          -->
          <span class="texto-deenex -ml-1 text-[0.75rem] font-medium lg:text-[0.8rem]">by Deenex</span>
          <span class="rotulo hidden text-gris 2xl:inline">
            {{ EVENTO.fechaNumerica }} · Córdoba
          </span>
        </RouterLink>

        <!--
          min-w-0 es lo que permite que el nav se encoja en vez de empujar al
          botón fuera de la pantalla: sin eso, un hijo flex nunca baja de su
          ancho de contenido y la fila desborda.
          La barra de scroll se oculta porque acá mide dos píxeles de alto y
          se lee como un subrayado roto debajo de las pestañas.
        -->
        <nav
          class="order-last -mb-1 flex w-full min-w-0 items-center gap-3 overflow-x-auto pb-1 [scrollbar-width:none] sm:order-none sm:w-auto sm:flex-1 sm:gap-2.5 lg:gap-5 xl:gap-7 [&::-webkit-scrollbar]:hidden"
          aria-label="Secciones"
        >
          <RouterLink
            v-for="b in BLOQUES"
            :key="b.ruta"
            :to="b.ruta"
            class="inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap text-[0.78rem] font-medium transition-colors lg:text-[0.85rem]"
            :class="rutaActiva(b.ruta) ? 'text-white' : 'text-gris hover:text-white'"
          >
            <span class="xl:hidden">{{ b.corto || b.label }}</span>
            <span class="hidden xl:inline">{{ b.label }}</span>
          </RouterLink>
        </nav>

        <div class="ml-auto flex shrink-0 items-center gap-5 sm:ml-0">
          <span class="rotulo hidden text-gris lg:inline">
            {{ agotado ? "Cupo completo" : mostrarCupo ? `${restantes} lugares` : `${total} lugares` }}
          </span>
          <!--
            Se esconde cuando la barra flotante de la home está en pantalla:
            si no, quedan dos píldoras magenta idénticas a la vez.
          -->
          <RouterLink
            v-if="!barraVisible"
            to="/deadline"
            class="presionable inline-flex min-h-[44px] items-center rounded-full bg-deenex px-3.5 text-[0.82rem] font-semibold text-white transition-colors hover:bg-deenex-hover sm:px-4 lg:px-5"
          >
            {{ agotado ? "Lista de espera" : "Reservar" }}
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { EVENTO, BLOQUES } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";
import { barraVisible } from "@/composables/useBarraReserva";

const { total, restantes, agotado, mostrarCupo } = useCupo();
const ruta = useRoute();
const scrolled = ref(false);
const cabecera = ref(null);

function rutaActiva(r) {
  return ruta.path === r;
}
function onScroll() {
  scrolled.value = window.scrollY > 24;
}

/*
  El nav publica su propio alto en --alto-nav, y main.css lo usa para el
  scroll-margin de las anclas.

  Esto lo resolvia el CSS solo, con escalones por ancho: 73px de 640 para
  arriba, 117 abajo, 161 abajo de 360. Los tres medidos a mano. Y estaba mal de
  raiz, porque EL ALTO DEL NAV NO DEPENDE SOLO DEL ANCHO: las cinco pestañas
  entran en una, dos o tres lineas segun lo que mida el texto, y eso lo decide
  la fuente que haya cargado. El CI lo dejo a la vista: en el runner de Ubuntu,
  a 360px el nav mide 161 y no 117, porque Bespoke Sans no llega y el respaldo
  del sistema es mas ancho que el de esta maquina. El mismo sitio, el mismo
  ancho, cuarenta y cuatro pixeles de diferencia.

  Le pasa a cualquier visitante en los milisegundos anteriores a que carguen
  las fuentes, y le pasa siempre al que las tenga bloqueadas.

  Medirlo evita las tres cosas: no hay que adivinar, no hay que recalibrar si
  entra una sexta pestaña, y no hay un ancho donde el escalon caiga del lado
  equivocado. El ResizeObserver dispara tambien cuando la fuente termina de
  cargar, que es justo el momento en que el numero cambia.

  Los 15px son el aire entre la barra y el titulo al que se salta. El respaldo
  de main.css sigue vivo para el primer frame, antes de que esto corra.
*/
let observador = null;

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (!cabecera.value) return;
  const publicar = (alto) => {
    if (alto > 0) document.documentElement.style.setProperty("--alto-nav", `${Math.ceil(alto)}px`);
  };
  publicar(cabecera.value.getBoundingClientRect().height);

  // En un navegador sin ResizeObserver queda el valor del montaje, que ya es
  // mejor que el escalon fijo: se midio con la fuente que efectivamente cargo.
  if (typeof ResizeObserver === "undefined") return;
  observador = new ResizeObserver(([e]) => publicar(e.contentRect.height + bordes(e.target)));
  observador.observe(cabecera.value);
});

// contentRect no incluye padding ni borde, y el header tiene borde abajo: sin
// esto el margen queda un pixel corto y el titulo roza la barra.
function bordes(el) {
  const cs = getComputedStyle(el);
  return (
    parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) +
    parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth)
  );
}

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  observador?.disconnect();
});
</script>
