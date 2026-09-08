<!--
  La cabecera es el índice del evento: una sola fila, con las pestañas
  siempre a la vista.

  Estuvo partida en dos filas —logo y botón arriba, pestañas abajo— y eso
  empujaba el contenido 130px hacia abajo y hacía leer la cabecera en dos
  tiempos. Ahora es una sola barra de 72px.

  Cómo entran las pestañas, el logo y el botón: lo que cede es lo accesorio,
  en este orden. Las etiquetas largas ("Quiénes son parte", "Con qué te
  volvés") vuelven recién en xl: con el wordmark en Panchang —más ancha que el cuerpo—
  a 1024px ya no entraban. Primero la fecha del logo (debajo de 1536),
  después el contador de lugares (debajo de 1024). Las pestañas y el botón no ceden
  nunca: son la navegación y la conversión. Si aun así no entran —un teléfono
  de 375px—, la tira de pestañas scrollea de costado dentro de su propio
  espacio, sin romper la fila ni esconder ninguna.

  Debajo de 640px ni siquiera con etiquetas cortas entran al lado del
  logo, así que ahí —y sólo ahí— la tira de pestañas baja a su propio renglón,
  donde entran todas sin scroll. Sigue siendo una cabecera de dos alturas
  nada más que en teléfono.

  Sin menú hamburguesa a propósito: las pestañas quedan a la vista y se
  llega a cualquiera con un toque, no con dos.
-->
<template>
  <header
    ref="cabecera"
    class="cabecera fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-300"
    :class="[
      scrolled ? 'border-white/10 bg-noche/90 backdrop-blur-md' : 'border-transparent bg-noche',
      retraida ? 'cabecera-arriba' : '',
    ]"
  >
    <div class="contenedor">
      <div class="flex flex-wrap items-center gap-x-3 py-3.5 sm:flex-nowrap sm:gap-x-4 lg:gap-x-6">
        <RouterLink to="/" class="flex min-h-[44px] shrink-0 items-center gap-2 lg:gap-3">
          <span class="font-display text-[0.85rem] font-extrabold uppercase tracking-[-0.015em] text-white lg:text-[0.95rem]">
            SaboresTech
          </span>
          <!--
            SIN "by Deenex". El wordmark dice SaboresTech y nada más.

            Estuvo acá desde el rename y era el último lugar donde la empresa
            aparecía como sujeto en la primera pantalla. Sale por la misma
            razón por la que ya había salido del hero y del pie: el evento se
            presenta solo, no como algo que alguien montó. Quién organiza se
            sigue diciendo en la respuesta del FAQ que lo pregunta, que es
            donde lo busca el que quiere saberlo.
          -->
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
          class="order-last -mb-1 hidden w-full min-w-0 items-center gap-3 overflow-x-auto pb-1 [scrollbar-width:none] sm:order-none sm:flex sm:w-auto sm:flex-1 sm:gap-2.5 lg:gap-5 xl:gap-7 [&::-webkit-scrollbar]:hidden"
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
            Aparece cuando NO hay ningún otro acceso a reservar en pantalla, en
            cualquier ancho. El turno lo arbitra useBarraReserva.js, y ahora
            cuenta a los dos: la barra flotante de escritorio y el dock de
            teléfono. Con dos píldoras violetas a la vez el violeta deja de
            querer decir "esta es LA acción".

            EL sm: SE FUE Y ESA ERA LA MITAD DEL BUG. Estaba escondida abajo de
            640px porque ahí el CTA vive en el dock, y es cierto casi siempre:
            pero el dock se esconde en pantallas de menos de 500px de alto, y
            entonces no quedaba ninguno. Un teléfono chico acostado, o la
            pantalla partida de Android, dejaban la home sin un solo botón de
            reservar. Ahora la condición es una sola y dice lo que importa: si
            no hay otro, esta aparece.
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
/*
  La cabecera se va al bajar y vuelve al subir, sólo en teléfono.

  Es la mitad del cambio que de verdad recupera pantalla. Con las pestañas
  mudadas al dock, en teléfono esta barra lleva únicamente el wordmark: no hay
  navegación ni CTA adentro, así que esconderla mientras alguien lee no le
  saca nada, y son 73px de vuelta. Medido, el cromo pasa de 199px a 97 mientras
  se lee: del 25% de la pantalla al 12%.

  Vuelve con el gesto de subir, que es el mismo con el que uno busca el menú.

  · El umbral de 8px es para que el rebote elástico de iOS y los saltos de un
    píxel del scroll suave no la hagan parpadear.
  · Arriba de todo siempre está: si no, la primera pantalla arranca sin marca.
  · De 640px para arriba nunca se retrae, porque ahí adentro viven las
    pestañas y la píldora de reserva. La regla vive en el CSS de abajo y no en
    esta condición: así el estado de Vue es uno solo y el ancho lo decide el
    medio que sabe de anchos.
  · Con prefers-reduced-motion la transición no corre, pero el retraerse sí:
    lo que molesta es el deslizamiento, no que la barra no esté.
*/
const retraida = ref(false);
let ultimaY = 0;

function onScroll() {
  const y = window.scrollY;
  scrolled.value = y > 24;

  const salto = y - ultimaY;
  if (Math.abs(salto) < 8) return;
  /*
    NO SE RETRAE SI SE LLEVA EL ÚNICO ACCESO A RESERVAR.

    La idea de esconderla al bajar es que en teléfono esta barra lleva sólo el
    wordmark, así que no le saca nada al lector. Deja de ser cierto justo
    cuando el turno le devuelve la píldora: si abajo no hay ni barra flotante
    ni dock —un teléfono chico acostado, la pantalla partida de Android—, la
    píldora de acá es la única salida que queda, y retraerse se la lleva.

    Medido a 375x500: el dock se esconde por la regla de pantalla baja, la
    píldora vuelve al nav, y al bajar el nav se iba con ella. Cero botones de
    reservar en toda la página.
  */
  retraida.value = salto > 0 && y > 120 && barraVisible.value;
  ultimaY = y;
}

/*
  El nav publica su propio alto en --alto-nav, y main.css lo usa para el
  scroll-margin de las anclas.

  Esto lo resolvia el CSS solo, con escalones por ancho: 73px de 640 para
  arriba, 117 abajo, 161 abajo de 360. Los tres medidos a mano. Y estaba mal de
  raiz, porque EL ALTO DEL NAV NO DEPENDE SOLO DEL ANCHO: las pestañas
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
  ultimaY = window.scrollY;
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

<style scoped>
/*
  La retracción es sólo de teléfono: de 640px para arriba esta barra lleva las
  pestañas y la píldora de reserva, y esconderlas al bajar sería sacarle
  al lector la navegación y la conversión de la mano.

  Se mueve con transform y no con altura: la altura la leen --alto-nav, el
  hero, CabeceraVista y el scroll-margin de las anclas, y si cambiara al
  scrollear todos esos se recalcularían en cada rueda del mouse. Trasladada,
  la caja sigue midiendo lo mismo.
*/
.cabecera {
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, border-color 0.3s;
}
@media (max-width: 639px) {
  .cabecera-arriba { transform: translateY(-100%); }
}
@media (prefers-reduced-motion: reduce) {
  .cabecera { transition: background-color 0.3s, border-color 0.3s; }
}
</style>
