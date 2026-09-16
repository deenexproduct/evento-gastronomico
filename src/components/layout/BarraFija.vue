<template>
  <!--
    Barra de conversión persistente. Aparece pasado el hero y se esconde
    cuando el formulario está en pantalla, donde ya no aporta y tapa campos.

    DE 640px PARA ARRIBA. En teléfono la reemplaza el dock, que lleva el mismo
    CTA con el mismo contador pero a ancho completo y pegado al borde, junto a
    las pestañas. Este componente igual se sigue montando en la home
    aunque no se vea: su cuenta de scroll es la que alimenta `barraVisible`,
    que es de lo que depende la píldora del header para turnarse con ella.
    Apagarlo con v-if dejaría ese turno sin árbitro.
  -->
  <Transition name="subir">
    <!--
      El contenedor fijo abarca todo el ancho para poder centrar la barra, pero
      no puede recibir clicks: sin pointer-events-none, la franja de aire que
      queda a los costados y abajo se comería los clicks de la página.
    -->
    <div
      v-if="visible"
      class="barra-fija pointer-events-none fixed inset-x-0 bottom-0 z-[90] hidden px-3 pb-3 sm:block sm:px-6 sm:pb-5"
    >
      <div
        class="barra-flotante pointer-events-auto mx-auto flex max-w-[1080px] items-center justify-between gap-4 rounded-2xl border border-linea bg-noche/95 px-4 py-3 backdrop-blur-md sm:gap-5 sm:rounded-full sm:px-5"
      >
        <div class="min-w-0">
          <!--
            En telefono esta linea no entra: pide 396px y el boton le deja
            152, asi que se veia "DOMINGO 20.09.2026 · HOT…" durante las
            dieciseis pantallas que la barra acompania. Con el boton al lado
            no hay ancho que alcance, y achicar la tipografia solo para aca
            seria una excepcion de estilo para decir algo que la pagina ya
            dice en el hero, en el panel, en el registro y en el pie.

            Queda la linea de abajo, que es la que empuja a reservar y si
            entra entera. Entra a partir de md: a 640px todavia pedia
            429px sobre los 373 que le deja el boton.
          -->
          <p class="rotulo hidden truncate text-gris md:block">
            {{ EVENTO.fechaCorta }} · {{ EVENTO.venue }}
          </p>
          <p class="truncate text-[0.9rem] sm:mt-0.5 font-semibold tracking-[-0.02em]">
            <template v-if="agotado">Cupo completo · lista de espera</template>
            <template v-else-if="mostrarCupo">
              Quedan <span class="text-acento-texto">{{ restantes }}</span> de {{ total }} lugares
            </template>
            <template v-else>Entrada sin costo · con reserva previa</template>
          </p>
        </div>

        <a
          :href="enlaceReserva"
          target="_blank"
          rel="noopener noreferrer"
          class="presionable inline-flex min-h-[44px] shrink-0 items-center rounded-full bg-acento-boton px-5 text-[0.85rem] font-semibold text-white transition-colors hover:bg-deenex-hover sm:px-6"
        >
          {{ agotado ? "Anotarme en la lista" : "Reservar mi lugar" }}
        </a>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { EVENTO, linkWaReserva } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";
import { publicarBarra } from "@/composables/useBarraReserva";

const { total, restantes, agotado, mostrarCupo } = useCupo();
const visible = ref(false);

/*
  EL CTA DE ESTA BARRA NO LLEVABA A NINGÚN LADO.

  El template hace :href="enlaceReserva" y esta constante no existía: se
  importaba linkWaReserva y nunca se llamaba. En Vue una variable que el
  template no encuentra es undefined, y un :href undefined hace que el
  atributo NO se escriba, así que el <a> dejaba de ser un enlace. Verificado
  en producción: href null, y al tocarlo no pasaba nada —ni navegación, ni
  scroll—.

  Es el botón más visible del escritorio: la barra acompaña dieciséis pantallas
  de scroll y su única razón de existir es que siempre haya una salida a mano.
  Ninguno de los 259 tests lo agarró porque todos comprueban el href de los
  botones que SÍ lo tienen, y un elemento sin href no matchea 'a[href*="wa.me"]'
  ni ningún selector que lo busque: desaparece del conjunto medido en vez de
  fallar. Lo cubre ahora el caso de abajo, que cuenta los botones de reserva en
  lugar de mirar los que encuentra.

  Va computed y no resuelto una vez, como en el hero y en AccesoSection: el
  mensaje cambia si el cupo se agota.
*/
const enlaceReserva = computed(() => linkWaReserva({ agotado: agotado.value }));

const pasoElHero = ref(false);
const formEnPantalla = ref(false);


/*
  ACÁ VIVÍA LA REGLA DEL PIE, y se cayó sola porque su premisa desapareció.

  Decía: "la barra se esconde cuando el pie entra en pantalla, porque si no
  quedan dos píldoras magenta diciendo lo mismo, la del pie y la flotante, a
  trescientos píxeles una de otra".

  El pie ya no tiene esa píldora. Hoy mide 127px y no tiene UN SOLO enlace:
  es el nombre del evento y la bajada. Así que la regla no evitaba un
  duplicado, dejaba la última pantalla de escritorio sin ningún botón de
  reservar —medido: cero— justo donde el que llegó hasta abajo terminó de
  leer y decide.

  Si mañana el pie vuelve a tener su propio CTA, la regla tiene que volver con
  él, y el lugar es este mismo. Lo que no puede volver es la regla sin el
  botón.
*/
/*
  LA PANTALLA BAJA ENTRA EN LA CUENTA, y ese era el bug.

  El @media (max-height: 500px) de abajo esconde esta barra en un teléfono
  acostado. Antes eso lo sabía sólo el CSS: el estado compartido seguía
  diciendo "estoy visible", el nav escondía su píldora por deferencia, y en
  844x390 —un iPhone en horizontal— la home quedaba sin un solo botón de
  reservar. Ahora la misma condición se evalúa acá con matchMedia, así que lo
  que se publica es si la barra se ve DE VERDAD y no si su lógica dice que
  debería verse.
*/
const pantallaBaja = ref(false);

/*
  ── POR QUÉ ESTO SE MIDE Y NO SE OBSERVA ──────────────────────────────

  Acá había dos IntersectionObserver montados en onMounted sobre el nodo que
  devolvía un querySelector. Y fallaba en silencio: quedaban DOS píldoras
  violetas a la vez —la de #reservar y ésta— diciendo lo mismo, de forma
  estable, no durante una transición.

  LA CAUSA: un observer vigila un NODO, no un selector. El botón de #reservar
  vive en un subárbol que Vue vuelve a crear cuando useCupo resuelve y cambia
  el estado del cupo; a partir de ahí el observer apunta a un nodo huérfano que
  ya no está en el documento y que, por lo tanto, no interseca nunca. Medido:
  un observer NUEVO sobre el nodo actual dispara con ratio 1 en la misma
  posición en la que el del componente tenía formEnPantalla en false.

  Es la tercera vez que este repo tropieza con lo mismo —DockMovil tiene las
  otras dos escritas— y el arreglo es el que quedó allá: preguntarle al DOM en
  el momento en que hace falta, que acá es cada scroll. No hay nodo guardado,
  así que no hay nodo que se pueda quedar viejo.

  POR QUÉ NO SE VEÍA ANTES: el recorrido que lo caza salta de 600 en 600
  píxeles, y con la página más corta ninguna parada caía donde los dos botones
  se ven enteros al mismo tiempo. La grilla de la jornada alargó la home 4.000
  píxeles y una parada cayó justo ahí. El defecto estaba en producción desde
  antes; lo que cambió es que ahora hay una parada que lo pisa.
*/

/** Qué parte de un elemento se ve en la ventana, de 0 a 1. */
function porcionVisible(el) {
  const caja = el.getBoundingClientRect();
  if (caja.height === 0) return 0;
  const dentro = Math.max(0, Math.min(caja.bottom, window.innerHeight) - Math.max(caja.top, 0));
  return dentro / caja.height;
}

function recalcular() {
  // Umbral alto: la barra se apaga recién cuando el botón de la sección se ve
  // casi entero, no cuando asoma un borde. Es el mismo 0.9 que tenía el
  // observer, por la misma razón que está escrita más abajo.
  const boton = document.querySelector('#reservar a[href*="wa.me"]');
  formEnPantalla.value = boton ? porcionVisible(boton) >= 0.9 : false;

  const seVe = pasoElHero.value && !formEnPantalla.value && !pantallaBaja.value;
  visible.value = seVe;
  publicarBarra(seVe);
}
function onScroll() {
  pasoElHero.value = window.scrollY > window.innerHeight * 0.7;
  recalcular();
}

let mqBaja = null;

onMounted(() => {
  // La misma condición que el @media de abajo, para que no haya dos verdades.
  mqBaja = window.matchMedia("(max-height: 500px)");
  pantallaBaja.value = mqBaja.matches;
  mqBaja.addEventListener("change", (e) => {
    pantallaBaja.value = e.matches;
    recalcular();
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  /*
    Se mide EL BOTÓN y no la sección entera. Mirando la sección la barra se
    apagaba apenas asomaba —mide 1183px en escritorio y 2376 en teléfono—, así
    que quedaba un tramo largo de lectura sin ningún botón en pantalla, justo
    adentro de la sección que sirve para reservar.
  */
  onScroll();

  // Al redimensionar cambia qué entra en la ventana sin que haya scroll: un
  // teléfono que rota deja la cuenta vieja hasta el siguiente movimiento.
  window.addEventListener("resize", recalcular, { passive: true });

  /*
    Y una recuenta cuando el cupo resuelve. Es el momento exacto en que Vue
    rehace el subárbol de #reservar —lo que antes dejaba al observer huérfano—
    y además puede cambiar el alto del botón. Sin esto, entre que el fetch
    vuelve y el visitante mueve el dedo, la cuenta queda vieja.
  */
  watch(agotado, recalcular, { flush: "post" });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", recalcular);
  /*
    Y se apaga el estado compartido, que es lo que no hacía.

    `barraVisible` es un ref de MÓDULO: sobrevive al componente. Esta barra sólo
    se monta en la home (App.vue la envuelve en v-if="esHome"), así que al
    navegar a una vista interna se desmontaba dejando el ref en true. El Navbar
    esconde su píldora justo cuando ese ref es true —se turnan para no mostrar
    dos botones iguales a la vez—, de modo que en /que-es y /beneficios no
    quedaba NINGÚN acceso a reservar en pantalla, y no volvía hasta recargar.

    Una línea, y es el único lugar donde puede ir: el componente que enciende
    el estado es el que tiene que apagarlo.
  */
  visible.value = false;
  publicarBarra(false);
});

</script>

<style scoped>
/* Pantalla baja (celular acostado): la barra ocupa demasiado y se oculta. */
@media (max-height: 500px) {
  .barra-fija { display: none; }
}

.subir-enter-active,
.subir-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s;
}
.subir-enter-from,
.subir-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .subir-enter-active,
  .subir-leave-active {
    transition: none;
  }
}
</style>
