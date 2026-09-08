<!--
  El dock de teléfono: la navegación y la reserva, abajo, al alcance del pulgar.

  POR QUÉ ABAJO. Las pestañas vivían en una segunda fila del header y le
  costaban 44px de alto permanentes, más 29 de padding y borde propios de esa
  fila. Sumado a la barra flotante de reserva, el cromo se comía 199px de 800
  en teléfono: la cuarta parte de la pantalla, siempre. Abajo, además, están
  donde llega el pulgar sin recolocar la mano, que es de lo que se trataba el
  pedido: que se sienta una aplicación y no una página.

  LA CUENTA, sin maquillar. Las pestañas cuestan 44px arriba y 45 abajo: es un
  empate, no un ahorro. Lo que se ahorra son los 29px de la segunda fila del
  header, que desaparece. 199 → 170. El ahorro grande viene de la otra mitad
  del cambio —el header se retrae al bajar, ver Navbar.vue—: mientras se lee,
  el cromo queda en 97px, el 12% de la pantalla en vez del 25%.

  DOS PISOS Y NO UNO, siempre, porque medido no entran en una fila. Con las
  cinco pestañas que había, pedían 288px y "Reservar mi lugar" 156: 444 contra
  los 351 que hay a 375px. Con cuatro sigue sin entrar, y lo que sobra es menos
  margen del que hace falta para no repetir el error del titular del FAQ, que
  entraba por nueve píxeles y el CI lo partió al medio.

  Estuvo escrita la fusión en una fila de 560px para arriba, y se sacó: el
  único ancho donde aplicaba en vertical es un teléfono muy grande, y acostado
  ya cae en la regla de pantalla baja que esconde el dock entero. Eran tres
  variantes de layout para un caso que casi no existe.

  EL CTA VIVE ACÁ, no se turna con el del header. En teléfono el header sólo
  lleva el wordmark, así que puede retraerse sin llevarse ningún acceso a
  reservar: el de abajo es el único y está siempre, salvo cuando el botón real
  de #reservar está en pantalla y sería el segundo. El sistema de turnos de
  useBarraReserva.js sigue mandando de 640px para arriba, que es donde la
  píldora del header existe.

  LA TIRA NO SE ESCONDE NUNCA. Es el piso de la pantalla y la referencia de
  dónde está uno; una barra de navegación que aparece y desaparece obliga a
  buscarla. La que se pliega es la píldora, que es la que puede sobrar.
-->
<template>
  <div
    class="dock-movil fixed inset-x-0 bottom-0 z-[95] sm:hidden"
    :style="{ '--alto-dock': altoDock + 'px' }"
  >
    <!--
      El contenido se desvanece antes de llegar al dock.

      La franja de la píldora es transparente —la píldora es una cápsula, no
      una barra— así que el texto de la página pasaba por detrás y quedaba
      cortado a la mitad entre la cápsula y la tira: en la captura se leía
      "TODO ESTO PASA EL" partido al medio por el borde de arriba. Un degradado
      corto lo apaga antes de que llegue, que es lo que hace que el dock se lea
      como el piso de la pantalla y no como algo apoyado encima.

      NO se hace con las utilidades de degradado de Tailwind, y está medido por
      qué: en tailwind.config.js `noche` es "#1A1A1A" literal, no var(--noche).
      El bloque html.claro pisa `.bg-noche` por substring, pero `from-noche`
      genera --tw-gradient-from y ese no lo pisa nadie, así que en el tema claro
      —que es el default— el velo salía oscuro sobre blanco: una banda sucia
      cortada al ras arriba del dock. Es la misma fuga que el comentario del
      bloque claro ya documenta para otras tres clases.

      Con fondo sólido y máscara se resuelven las dos cosas de una: el color
      sale de var(--noche), que sí cambia por tema, y el desvanecido lo hace la
      máscara en vez de una interpolación de color, así que tampoco pasa por el
      gris que aparece cuando un degradado va hacia `transparent` —que es
      rgba(0,0,0,0)—. Es el mismo recurso que usa la marquesina de logos.

      pointer-events-none: es decoración y no puede comerse los toques de lo
      que hay abajo.
    -->
    <div class="velo-dock pointer-events-none absolute inset-x-0 bottom-full h-10" aria-hidden="true"></div>

    <!--
      La píldora, a ancho completo y con el cupo adentro.

      El contador vivía en la barra flotante y es lo que apura: cuántos lugares
      quedan es el único dato de escasez que ve alguien que llega de un anuncio.
      Entra en la misma píldora en vez de pedir su propia línea —a 375px sobran
      67px de los 311 útiles, medido— así que la mudanza no le cuesta alto a
      nadie.
    -->
    <Transition name="plegar">
      <div v-if="mostrarPildora" class="bg-noche px-3 pb-2 pt-1">
        <a
          :href="enlaceReserva"
          target="_blank"
          rel="noopener noreferrer"
          class="presionable flex min-h-[44px] w-full items-center justify-between gap-3 rounded-full bg-acento-boton px-5 text-white transition-colors hover:bg-deenex-hover"
        >
          <span class="text-[0.9rem] font-semibold tracking-[-0.02em]">
            {{ agotado ? "Anotarme en la lista" : "Reservar mi lugar" }}
          </span>
          <!--
            tabular-nums: el contador baja de a uno con cada reserva y sin esto
            la píldora cambia de ancho con cada dígito.

            " de 200" cae abajo de 360px, donde el ancho útil se pone justo. El
            número solo sigue diciendo lo que tiene que decir.
          -->
          <span
            v-if="!agotado && mostrarCupo"
            class="shrink-0 text-[0.72rem] font-bold tabular-nums text-white/80"
          >
            Quedan {{ restantes }}<span class="hidden min-[360px]:inline"> de {{ total }}</span>
          </span>
          <span v-else-if="!agotado" class="shrink-0 text-[0.72rem] font-bold text-white/80">
            Sin costo
          </span>
        </a>
      </div>
    </Transition>

    <!--
      La tira. pb con el inset del gesto: en un iPhone con barra de gesto los
      últimos 34px de la pantalla son suyos, y una barra pegada al borde que no
      lo respete pone sus botones abajo del swipe que cierra la app. La barra
      flotante que había antes lo ignoraba —flotaba 12px del borde, o sea 22px
      adentro de esa franja—, y era un defecto, no una ventaja.
    -->
    <nav
      ref="tira"
      class="flex border-t border-linea bg-noche/95 backdrop-blur-md"
      style="padding-bottom: env(safe-area-inset-bottom, 0px)"
      aria-label="Secciones"
    >
      <RouterLink
        v-for="b in BLOQUES"
        :key="b.ruta"
        :to="b.ruta"
        class="presionable relative flex min-h-[44px] flex-1 items-center justify-center px-0.5 text-center text-[0.7rem] font-medium leading-none transition-colors"
        :class="
          rutaActiva(b.ruta)
            ? 'text-white before:absolute before:inset-x-4 before:top-0 before:h-0.5 before:rounded-full before:bg-acento'
            : 'text-gris'
        "
        :aria-current="rutaActiva(b.ruta) ? 'page' : undefined"
      >
        {{ b.corto || b.label }}
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { BLOQUES, linkWaReserva } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";

const { total, restantes, agotado, mostrarCupo } = useCupo();
const ruta = useRoute();
const tira = ref(null);
// El mensaje del chat cambia si el cupo se agotó: dice "quiero entrar en la
// lista de espera" en vez de "quiero sumarme". Va computed como en el hero y
// en AccesoSection, no resuelto una vez al montar.
const enlaceReserva = computed(() => linkWaReserva({ agotado: agotado.value }));

/*
  En la home no queda ninguna pestaña activa, y está bien que así sea.

  Las rutas son /que-es, /beneficios, /deadline y /participan; la home es "/" y
  no es ninguna de ellas: es el índice que las contiene. Una tab bar que marcara
  una estaría mintiendo sobre dónde está parado el lector. Lo que da la
  referencia en la home es el wordmark del header, que lleva a "/".
*/
function rutaActiva(r) {
  return ruta.path === r;
}

/*
  La píldora se pliega cuando hay OTRO botón de reserva de verdad en pantalla.

  Dos píldoras violetas iguales a la vez hacen que el violeta deje de querer
  decir "esta es LA acción" y pase a ser decoración; es el mismo motivo por el
  que el nav y la barra flotante se turnan.

  ESTO ESTABA MAL Y LO MOSTRÓ UNA CAPTURA. Primero miraba sólo el botón de
  #reservar, con el argumento de que plegarse en el hero dejaría la primera
  pantalla sin salida. Es falso: el hero tiene su propio "Quiero mi lugar", que
  es exactamente el mismo enlace. A 320px se veían las dos, una arriba de la
  otra, a media pantalla de distancia. La barra flotante ya tenía resuelto esto
  con su condición `pasoElHero`, que yo había descartado por ese razonamiento.

  Se observan TODOS los botones de reserva de la página en vez de nombrar uno:
  así el hero, #reservar y cualquiera que se agregue mañana entran solos, sin
  que haya que acordarse de sumar un selector.
*/
const visibles = ref(0);
const mostrarPildora = computed(() => visibles.value === 0);

let ro = null;
const altoDock = ref(0);

/*
  ¿Hay otro botón de reserva a la vista? Se pregunta en cada scroll, no con un
  IntersectionObserver.

  EL OBSERVER NO SIRVE ACÁ Y ESTÁ MEDIDO POR QUÉ. Un IntersectionObserver
  observa NODOS, y estos nodos no sobreviven: el texto de los botones sale de
  useCupo() —"Reservar mi lugar" o "Anotarme en la lista" según el cupo— así
  que cuando ese estado se resuelve Vue recrea los <a> y el observer queda
  apuntando a elementos que ya no están en el documento. Nunca vuelve a
  disparar. Verificado: observaba los dos botones correctos, el de #reservar
  quedaba 100% dentro de la pantalla, y la píldora no se plegaba.

  Antes de eso hubo otros dos errores en el mismo punto, los dos por creer que
  el observer dice más de lo que dice: buscar los botones en onMounted, cuando
  el contenido de la vista todavía no existe (encontraba cero); y contar los
  eventos con ++/-- en vez del estado, cuando el primer callback reporta TODOS
  los observados de una —uno adentro y otro afuera— y el contador quedaba en
  cero.

  Consultar el DOM en el scroll es menos elegante y es correcto: son tres
  elementos, se lee en un rAF y no hay ninguna referencia que se pueda quedar
  vieja. El listener es passive.
*/
const CTA_DE_RESERVA = /reservar|quiero mi lugar|anotarme|lista de espera/i;

function recalcular() {
  const propio = document.querySelector(".dock-movil");
  const alto = window.innerHeight;
  const otros = [...document.querySelectorAll('a[href*="wa.me"]')].filter((a) => {
    // La píldora de este mismo dock no cuenta: se estaría mirando al espejo.
    if (propio?.contains(a)) return false;
    // "Quiero ser sponsor" y "Pedir acreditación" son otros enlaces de
    // WhatsApp de la página, y no son esta acción.
    if (!CTA_DE_RESERVA.test(a.innerText)) return false;
    const b = a.getBoundingClientRect();
    if (b.height === 0) return false;
    // El mismo 90% que usaba el observer: se pliega cuando el otro botón se ve
    // casi entero, no cuando asoma un borde.
    const dentro = Math.max(0, Math.min(b.bottom, alto) - Math.max(b.top, 0));
    return dentro / b.height >= 0.9;
  });
  visibles.value = otros.length;
}

let pendiente = false;
function onScroll() {
  if (pendiente) return;
  pendiente = true;
  requestAnimationFrame(() => {
    pendiente = false;
    recalcular();
  });
}

// Al cambiar de vista el contenido es otro, y el scroll no se mueve solo.
watch(() => ruta.path, () => nextTick(() => requestAnimationFrame(recalcular)), {
  immediate: true,
});

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  recalcular();

  /*
    El dock publica su alto en --alto-dock igual que el nav publica el suyo.

    Sin esto el pie y el último bloque de cada vista quedan abajo del dock: es
    contenido tapado que no se puede alcanzar con ningún scroll. Se mide en vez
    de escribirlo porque el alto cambia —la píldora se pliega, el inset del
    gesto existe o no, la tira crece si mañana entra una sexta pestaña— y
    porque es el mismo error que el nav tenía con sus tres escalones a mano.
  */
  /*
    Se reserva el alto MÁXIMO, no el de este instante.

    El dock cambia de alto cuando la píldora se pliega —45px con la tira sola,
    101 con la píldora— y el colchón del body seguía ese número. El efecto se
    ve al final de la página: ahí no hay ningún otro botón de reserva, así que
    la píldora se despliega, el colchón crece 56px de golpe y el pie salta bajo
    el dedo justo cuando el lector terminó de leer.

    Guardando el máximo visto, el colchón no se mueve nunca. Cuesta 56px de
    aire de más en los tramos donde la píldora está plegada, que son cortos y
    donde de todos modos hay un botón grande ocupando la pantalla.
  */
  let maximo = 0;
  const publicar = () => {
    const el = document.querySelector(".dock-movil");
    const alto = el ? Math.ceil(el.getBoundingClientRect().height) : 0;
    altoDock.value = alto;
    if (alto > maximo) {
      maximo = alto;
      document.documentElement.style.setProperty("--alto-dock-real", `${maximo}px`);
    }
  };
  publicar();
  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(publicar);
    const el = document.querySelector(".dock-movil");
    if (el) ro.observe(el);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  ro?.disconnect();
  document.documentElement.style.setProperty("--alto-dock-real", "0px");
});
</script>

<style scoped>
.velo-dock {
  background: var(--noche);
  -webkit-mask-image: linear-gradient(to top, #000, transparent);
  mask-image: linear-gradient(to top, #000, transparent);
}

/*
  Pantalla baja (teléfono acostado): el dock se lleva demasiado de los 400px de
  alto que quedan. Es la misma regla que traía la barra flotante.
*/
@media (max-height: 500px) {
  .dock-movil { display: none; }
}

.plegar-enter-active,
.plegar-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s;
}
.plegar-enter-from,
.plegar-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .plegar-enter-active,
  .plegar-leave-active { transition: none; }
}
</style>
