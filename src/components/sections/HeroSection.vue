<template>
  <!--
    El hero venía apilando cinco bloques de texto y la tarjeta de cupo en una
    sola columna, y eso empujaba el botón 109px por debajo del fold en
    1280x800: el que entraba no veía un CTA hasta hacer scroll.

    Ahora la columna izquierda solo carga fecha, nombre, promesa y botones, y
    todo lo que es dato —cuánto falta y cuánto queda— se va a un panel a la
    derecha. En celular el panel cae debajo de los botones, que es el orden que
    corresponde ahí.
  -->
  <section id="hero" class="relative overflow-hidden pt-[104px]">
    <!-- Halo del violeta de marca, contenido y barato: sin JS ni imágenes -->
    <div
      class="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[130px]"
      style="background: radial-gradient(circle, #695EDE 0%, transparent 70%)"
      aria-hidden="true"
    ></div>

    <div class="contenedor relative py-12 sm:py-16">
      <div class="grid items-start gap-10">
        <!-- Columna del mensaje -->
        <div>
          <!--
            Donde y cuando, antes que nada. Con el panel de la derecha
            afuera, estas dos lineas son lo unico que lo dicen en la primera
            pantalla.

            Mismo tratamiento tipografico que el subtitulo de abajo —caja
            baja, peso medio, sin tracking de rotulo—: lo unico que los separa
            es el cuerpo. Venia en versales con tracking abierto, que en el
            mismo bloque que el nombre del evento sumaba un tercer estilo de
            letra sin que hiciera falta.

            Van en DOS lineas a proposito, no por accidente. Los tres datos
            —hotel, ciudad y fecha— no entran en una sola en un telefono de
            375px: el ancho util es 335px y la version mas corta que los
            tiene a los tres pide 338. Medi seis combinaciones antes de
            partirlo. A 12px las dos lineas piden 303 y 284, con margen.

            Sale "Edicion 01" de aca: ya no entra y ademas abre la seccion
            de acceso, que es donde significa algo. Y sale "Organiza Deenex":
            quien organiza tiene su propia seccion mas abajo.
          -->
          <p class="text-[12px] font-medium leading-[1.65] text-gris-2 sm:text-[13px]">
            {{ EVENTO.venue }} · {{ EVENTO.ciudad }}<br />
            {{ EVENTO.fechaLarga }}
          </p>

          <!--
            El nombre es lo único de nivel 1 en esta pantalla, así que ocupa
            todo el ancho disponible, que es el máximo peso visual que puede
            tener sin romper nada.

            El tamaño está MEDIDO, no elegido: "Sabores Tech" en Panchang 800
            con este tracking mide 11,53 px de ancho por cada px de cuerpo.
            Medido en el navegador con Range.getBoundingClientRect() y la
            fuente ya cargada, no a ojo.

            El ancho ÚTIL del contenedor no es 1200: es 1200 menos 64 de
            padding, o sea 1136, y ahí topa. El comentario anterior decía 1200
            y por eso el techo quedaba 27px pasado sin que se viera.

            Contra ese útil —viewport menos 40px de padding en teléfono, 64 de
            ahí para arriba, tope 1136— el máximo que entra va de 7,59vw a
            320px hasta 8,13vw a 1024. 7,2vw deja margen en toda la escala.

            El techo es 6rem: 96px × 11,53 = 1107 contra 1136 útiles. Con
            6,3rem el texto medía 1163 y se cortaba de 1440 para arriba. El
            piso es 1,4rem, que sólo gobierna por debajo de 311px; con 1,6 el
            texto medía 295 contra 280 útiles en un teléfono de 320.

            Ojo si se cambia el NOMBRE, la tipografía o el tracking: ese 11,53
            se mueve y el titular se corta sin avisar, porque la sección tiene
            overflow-hidden y no aparece barra de scroll. Pasó al renombrar
            —"GastroTech" medía 10,46 y el nombre nuevo es 10% más ancho.

            Ojo si se cambia la tipografía o el tracking: ese 10,46 se mueve y
            el titular se corta sin avisar, porque la sección tiene
            overflow-hidden y no aparece barra de scroll. Se mide con
            Range.getBoundingClientRect() sobre el h1, no a ojo.

            El interlineado baja a 0.88: en una sola palabra no hay renglón
            siguiente que proteger.
          -->
          <h1
            class="display mt-4 text-[clamp(1.4rem,7.2vw,6rem)] leading-[0.88] tracking-[-0.035em]"
          >
            <!--
              El nombre real, para el buscador y para un lector de pantalla:
              el efecto es visual y no puede cambiar lo que la página dice
              que es. Lo animado va aria-hidden.
            -->
            <span class="sr-only">{{ EVENTO.nombre }}</span>

            <!--
              Las dos palabras van APILADAS, no una reemplazando a la otra:
              así el titular no cambia de ancho a mitad de la transición y
              nada de abajo se mueve. El humo va detrás de las dos.
            -->
            <span class="mutante" aria-hidden="true">
              <span class="humo" :class="{ 'humo-activo': mutando }"></span>
              <span class="capa" :class="{ 'capa-fuera': enDeenex }">{{ EVENTO.nombre }}</span>
              <span class="capa capa-abs" :class="{ 'capa-fuera': !enDeenex }">
                <span class="capa-by">by</span>{{ EVENTO.organiza }}
              </span>
            </span>
          </h1>

          <!--
            Antes había dos bajadas seguidas: una rosa con la categoría y otra
            gris con la promesa. La categoría pasó a la línea de datos de abajo
            y queda una sola frase, que es la que tiene que leerse.
          -->
          <!--
            El acento cae en "centrada en gastronomía": eso es lo que separa
            esto de un evento de tecnología cualquiera, y es lo que el lector
            todavía no sabe cuando llega.
          -->
          <!--
            Nivel 2, y se lee como nivel 2: cuerpo simple, caja baja, peso
            medio. Estaba en la display, en versales y a peso 800 — competía de
            igual a igual con el nombre del evento, que es lo único que tiene
            que destacarse acá. Lo que sostiene la jerarquía ahora es el salto
            de cuerpo y de tipografía, no el grito.

            El acento cae en la invitación y no en la autoría: quién lo hace ya
            está dicho en el "by Deenex" de la cabecera, y repetirlo acá gasta
            el único resalte de la frase en un dato que el lector ya leyó.

            Quien organiza se nombra acá arriba y no sólo en el "by Deenex" de
            la cabecera: es la primera frase que lee el 100% de los que entran,
            y el respaldo de la empresa es parte de lo que hace creíble a una
            edición 01 sin historial.
          -->
          <p class="mt-6 max-w-[34ch] text-[clamp(1.1rem,2.4vw,1.5rem)] font-medium leading-[1.35]">
            Deenex crea un espacio para hablar de tecnología vanguardista en el
            rubro gastronómico <span class="texto-deenex font-bold">y vos podés ser parte.</span>
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <!--
              Abre WhatsApp directo. Antes hacía scroll hasta el panel de
              reserva —ocho pantallas— y ahí había OTRO botón que recién
              entonces abría el chat: tres toques para una acción que el
              lector cree que es una.
            -->
            <a :href="enlaceReserva" target="_blank" rel="noopener noreferrer" class="btn">{{
              agotado ? "Entrar a la lista" : "Quiero mi lugar"
            }}</a>
            <a href="#jornada" class="btn-linea" @click.prevent="ir('jornada')">Ver el programa</a>
          </div>

          <!--
            La cuenta regresiva, pegada al botón.

            Estaba en días. Ahora corre en tiempo real hasta la apertura de
            puertas: el segundo que se mueve es lo que convierte una fecha
            lejana en algo que está pasando ahora.

            Los cuatro números en tabular-nums y con ancho mínimo fijo, si no
            la fila se corre de costado cada vez que un dígito cambia de 1 a 8.
            `aria-live="off"`: un lector de pantalla que anuncie cada segundo
            es inusable, y el dato ya está escrito en la fecha de arriba.
          -->
          <div v-if="!restante.vencido" class="mt-7" aria-live="off">
            <div class="flex items-end gap-5 sm:gap-6">
              <div v-for="u in unidades" :key="u.clave" class="flex flex-col">
                <span
                  class="font-display text-[clamp(1.25rem,2.8vw,1.7rem)] font-extrabold leading-none tabular-nums tracking-[-0.02em] texto-deenex"
                  style="min-width: 2ch; display: inline-block"
                  >{{ String(u.valor).padStart(2, "0") }}</span
                >
                <span class="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-gris-2">
                  {{ u.label }}
                </span>
              </div>
            </div>
          </div>
          <p
            v-else
            class="mt-7 font-display text-[clamp(1.4rem,3.4vw,1.9rem)] font-extrabold uppercase leading-none texto-deenex"
          >
            Es hoy
          </p>

          <p class="mt-5 text-[14px] leading-[1.5] text-gris">
            Entrada sin costo con reserva previa · Se reserva por WhatsApp, sin formularios
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { EVENTO, linkWaReserva } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";
import { useRelojEvento } from "@/composables/useCuentaRegresiva";

const { total, ocupados, porcentaje, agotado, mostrarCupo } = useCupo();
const { restante } = useRelojEvento();
const enlaceReserva = computed(() => linkWaReserva({ agotado: agotado.value }));

// El orden importa y es de mayor a menor: es como se lee un reloj.
const unidades = computed(() => [
  { clave: "d", valor: restante.value.dias, label: "días" },
  { clave: "h", valor: restante.value.horas, label: "horas" },
  { clave: "m", valor: restante.value.minutos, label: "min" },
  { clave: "s", valor: restante.value.segundos, label: "seg" },
]);

const ancho = ref(0);
onMounted(() => setTimeout(() => (ancho.value = Math.max(porcentaje.value, 3)), 400));
watch(porcentaje, (v) => {
  if (ancho.value > 0) ancho.value = Math.max(v, 3);
});

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/*
  Sabores Tech se disuelve en humo violeta y aparece "by Deenex".

  La primera versión revolvía las letras. Era vistoso y era el gesto
  equivocado: un titular que se desarma dice inestabilidad, y este titular es
  el nombre del evento. Acá las dos palabras se cruzan con un desenfoque
  corto y una nube violeta que crece y se apaga entre las dos — el cambio se
  siente, no se sufre.

  Lo que lo mantiene honesto:
  · el <h1> conserva "Sabores Tech" como texto real en un sr-only. Lo animado
    es aria-hidden, así que ni el buscador ni un lector de pantalla ven el
    titular cambiado.
  · las dos capas están apiladas, así que el ancho del titular nunca cambia y
    nada de lo que está debajo se mueve.
  · la palabra está quieta el 90% del tiempo. Un titular en movimiento
    permanente no se lee.
  · con prefers-reduced-motion no arranca y queda Sabores Tech fijo.
*/
const QUIETO = 4600; // lo que dura cada palabra legible
const ANTICIPO = 380; // el humo entra ANTES del cambio y lo cubre
const CRUCE = 1500; // lo que queda encendido después del cambio

const enDeenex = ref(false);
const mutando = ref(false);
let tQuieto = null;
let tCambio = null;
let tCruce = null;

/*
  El orden importa y es lo que hacía que el cambio se viera brusco: el humo y
  el texto arrancaban juntos, así que la palabra ya se había ido cuando la
  nube recién empezaba a formarse. Ahora el humo entra primero, y el texto
  cambia cuando la nube ya está: el ojo ve una disolución, no un corte.
*/
function alternar() {
  tQuieto = setTimeout(() => {
    mutando.value = true;
    tCambio = setTimeout(() => {
      enDeenex.value = !enDeenex.value;
      tCruce = setTimeout(() => {
        mutando.value = false;
        alternar();
      }, CRUCE);
    }, ANTICIPO);
  }, QUIETO);
}

onMounted(() => {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  alternar();
});
onUnmounted(() => {
  clearTimeout(tQuieto);
  clearTimeout(tCambio);
  clearTimeout(tCruce);
});
</script>

<style scoped>
/* ── El cruce del titular ──────────────────────────────────────────── */

/*
  Las dos palabras ocupan la misma celda: la que está fuera no empuja a la
  otra ni cambia el ancho del bloque. `inline-grid` en vez de posición
  absoluta pura para que el <h1> conserve la altura de una línea real.
*/
.mutante {
  position: relative;
  display: inline-grid;
  isolation: isolate;
}
.capa {
  grid-area: 1 / 1;
  transition:
    opacity 1.05s cubic-bezier(0.4, 0, 0.2, 1),
    filter 1.05s cubic-bezier(0.4, 0, 0.2, 1),
    transform 1.05s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}
.capa-abs {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: baseline;
  gap: 0.28em;
}
/* La que sale se desenfoca y sube apenas: es lo que la hace leer como humo
   y no como un apagón. */
.capa-fuera {
  opacity: 0;
  filter: blur(9px);
  transform: translateY(-0.035em) scale(0.992);
  pointer-events: none;
}
/* "by" va en el cuerpo y en gris: es una preposición, no parte del nombre. */
.capa-by {
  font-family: "Bespoke Sans", sans-serif;
  font-weight: 500;
  font-size: 0.32em;
  letter-spacing: 0;
  color: var(--gris, #6b6779);
  align-self: center;
}

/*
  El humo: una nube violeta detrás del texto que crece y se apaga durante el
  cruce. Va en z-index -1 para no tapar las letras y es inerte al puntero.
*/
.humo {
  position: absolute;
  z-index: -1;
  left: -8%;
  right: -8%;
  top: -60%;
  bottom: -60%;
  pointer-events: none;
  opacity: 0;
  transform: scale(0.85);
  background:
    radial-gradient(45% 55% at 30% 50%, color-mix(in srgb, var(--acento, #695ede) 42%, transparent), transparent 70%),
    radial-gradient(40% 50% at 68% 45%, color-mix(in srgb, var(--acento, #695ede) 30%, transparent), transparent 72%);
  filter: blur(38px);
  transition: opacity 0.6s ease-out, transform 1.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.humo-activo {
  opacity: 1;
  transform: scale(1.08);
}

@media (prefers-reduced-motion: reduce) {
  .capa { transition: none; }
  .humo { display: none; }
}
</style>
