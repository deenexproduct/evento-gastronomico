<template>
  <!--
    Los siete bloques como cuadrados iguales, todos a la vista al mismo tiempo.

    El detalle NO se abre DENTRO de un cuadrado: si se expandiera en el lugar,
    ese cuadrado cambiaría de proporción y la grilla de alto, y dejaría de
    verse entera — que es justamente lo que se pide. El detalle es un panel
    aparte que se COLOCA dentro de la grilla (ver .panel-jornada): los siete
    cuadrados nunca cambian de tamaño.

    OJO CON LA VARIANTE CLARA (?claro):
    · border-linea ya está pisado en el tema claro, así que sirve; los
      divisores de acá quedaron en border-white/10 y funcionan igual.
    · Prohibido hover:bg-white/N. La regla html.claro [class*="bg-white/"]
      matchea por substring y no entiende de variantes: el fondo quedaría
      aplicado siempre, no solo al pasar el mouse. Acá el hover es de borde.
    · No se usa .chip: su fondo entra por @apply y html.claro no lo alcanza.
  -->
  <section id="jornada" class="border-b border-linea py-16 sm:py-24">
    <div class="contenedor">
      <!-- ── Encabezado ──────────────────────────────────────────────── -->
      <div class="lg:flex lg:items-end lg:justify-between lg:gap-12">
        <div>
          <p class="rotulo text-gris">La jornada</p>
          <h2 class="titulo mt-4 max-w-[18ch] text-[clamp(1.55rem,4.6vw,3rem)]">
            Siete bloques, ninguno de teoría.
          </h2>
        </div>
        <p
          class="mt-4 hidden max-w-[46ch] text-[15px] leading-[1.5] text-gris lg:mt-0 lg:block lg:text-right"
        >
          Track único: no hay salas paralelas ni hay que elegir. Tocá un bloque para ver de qué va.
        </p>
      </div>

      <!-- ── La forma del día ─────────────────────────────────────────── -->
      <!-- Cinta proporcional a los minutos reales, con las pausas incluidas:
           es lo que sostiene el "nueve horas" del título, porque los siete
           bloques por sí solos no las cubren. Es figura, no control. -->
      <div class="mt-6 sm:mt-7">
        <div
          class="cinta flex h-2 w-full gap-[3px] overflow-hidden rounded-full sm:h-2.5"
          aria-hidden="true"
        >
          <span
            v-for="s in cinta"
            :key="s.id"
            class="cinta-seg"
            :class="s.tipo === 'bloque' ? 'cinta-tramo' : 'cinta-pausa'"
            :style="{ flex: `${s.min} 1 0%` }"
          ></span>
        </div>

        <!--
          Sin esta línea la cinta es una decoración indescifrable: nadie
          adivina que las barras son bloques y los huecos, degustaciones.
          Dice lo que se ve, y de paso sostiene el "nueve horas" del título.
        -->
        <!-- En teléfono va en una sola línea: con dos, la grilla se caía fuera
             de la pantalla, que es justo lo que esta sección tiene que evitar. -->
        <div
          class="mt-2 flex items-center justify-between gap-x-4 text-[11px] font-bold uppercase tracking-[0.1em] text-gris sm:text-[12px]"
        >
          <span class="flex items-center gap-x-4">
            <span class="flex items-center gap-1.5">
              <span class="h-2 w-4 shrink-0 rounded-full cinta-tramo" aria-hidden="true"></span>
              <span class="whitespace-nowrap">7 bloques</span>
            </span>
            <span class="hidden items-center gap-1.5 sm:flex">
              <span class="h-2 w-4 shrink-0 rounded-full cinta-pausa" aria-hidden="true"></span>
              <span class="whitespace-nowrap">degustación entre medio</span>
            </span>
          </span>
          <span class="whitespace-nowrap tabular-nums text-gris-2">puertas 8:30 · charlas 10 a 18</span>
        </div>
      </div>

      <!-- ── Los siete cuadrados ──────────────────────────────────────── -->
      <!--
        El panel de detalle es una CELDA MÁS de esta grilla, no un hermano de
        abajo. Sigue estando fuera de los cuadrados —ninguno cambia de alto ni
        de proporción al elegir, el aspect-ratio 1/1 no se toca— pero se
        coloca donde se lo puede ver:

        · Debajo de 1280 ocupa una fila entera JUSTO DEBAJO de la fila del
          cuadrado tocado: la respuesta nace a 10px del borde de lo que el dedo
          acaba de tocar, en vez de 736px por debajo del pliegue. La sección no
          cambia de alto total: el panel ya ocupaba ese alto, antes al final.
        · De 1280 para arriba se va a la quinta columna y se queda al lado. Ahí
          los siete cuadrados Y la respuesta entran juntos en una pantalla —el
          pedido del cliente cumplido de verdad por primera vez— y la sección
          pasa de 1314px a 892px.

        El orden lo da `order` (ver ordenPanel): la colocación automática de
        CSS Grid respeta el orden modificado por `order`, así que un elemento
        a ancho completo empuja al que sigue a una fila nueva sin que haya que
        calcular filas a mano.
      -->
      <ul
        class="grilla-jornada mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3 md:grid-cols-3 lg:grid-cols-4"
      >
        <li v-for="(b, i) in TEMAS" :key="b.id" :style="{ order: i * 2 }">
          <button
            type="button"
            class="cuadro"
            :class="elegido === b.id ? 'cuadro-activo' : ''"
            :aria-pressed="elegido === b.id"
            @click="elegir(b.id)"
          >

            <!-- Fila de arriba: el orden del día y el tipo, si no es charla -->
            <span class="relative flex items-start justify-between gap-2">
              <!--
                Un solo número por cuadro. Antes eran tres —la hora, la hora
                otra vez en grande de fondo, y el orden 01-07— y solo este
                informa: el de fondo repetía la hora sin los minutos, y el
                orden ya lo da la posición en la grilla. Ahora ocupa el
                tamaño que gastaban los tres.
              -->
              <time
                :datetime="iso(b.hora)"
                class="hora text-[2rem] leading-none text-acento-texto sm:text-[2.6rem]"
                >{{ b.hora }}</time
              >
              <!-- El tipo solo cuando no es charla: cinco de siete lo son, y
                   repetir la etiqueta cinco veces la vacía de significado. -->
              <Pictograma
                v-if="b.tipo !== 'charla'"
                :nombre="TIPOS_BLOQUE[b.tipo].icono"
                :tam="16"
                :grosor="2"
                class="mt-0.5 shrink-0 text-acento-texto"
              />
            </span>

            <!-- Fila de abajo: el gancho y quién lo da -->
            <span class="relative mt-auto block">
              <span
                v-if="b.tipo !== 'charla'"
                class="mb-1.5 block text-[10px] font-black uppercase tracking-[0.14em] text-acento-texto"
              >
                {{ TIPOS_BLOQUE[b.tipo].label }}
              </span>
              <span class="titulo block text-[13.5px] leading-[1.15] sm:text-[15px]">
                {{ b.titulo }}
              </span>
              <!-- `quien` en gris y no en magenta: el acento es de la hora. Con
                   siete nombres pintados también, el color deja de señalar.

                   SE OCULTA EN LOS DOS EXTREMOS, Y LAS DOS VECES POR LA MISMA
                   RAZÓN MEDIDA: no entra. Debajo de 640px el cuadrado mide
                   163px. De 1280 para arriba mide 195, porque la quinta
                   columna se lleva el ancho del panel, y ahí los bloques 5 y 7
                   recortaban 47 y 19px de este renglón — el nombre salía
                   cortado a la mitad de una palabra.
                   No se pierde nada: el nombre vive en el panel de detalle, y
                   de 1280 para arriba ese panel está SIEMPRE a la vista, al
                   lado de la grilla. Los dos lugares están atados: si alguna
                   vez se saca del panel, hay que devolverlo acá. -->
              <span
                class="mt-2 hidden text-[11px] font-bold uppercase leading-[1.3] tracking-[0.04em] text-gris sm:block sm:text-[12px] xl:hidden"
              >
                {{ b.quien }}
              </span>
            </span>
          </button>
        </li>

        <!--
          La última fila queda con tres bloques y un hueco. En vez de dejarlo
          vacío entran las dos puntas del día —acreditación y cierre—, que
          desde que se sacó la línea de contexto no figuraban en ningún lado.
          Sin borde sólido ni fondo: no es un bloque que se toque.
        -->
        <li class="hidden lg:block" :style="{ order: 99 }">
          <div class="cuadro-puntas">
            <div v-for="b in [BORDES.apertura, BORDES.cierre]" :key="b.id" class="flex gap-3">
              <Pictograma
                :nombre="TIPOS_BLOQUE[b.tipo].icono"
                :tam="15"
                :grosor="2"
                class="mt-1 shrink-0 text-acento-texto"
              />
              <span class="min-w-0">
                <span class="hora block text-[1.05rem] text-acento-texto">{{ b.hora }}</span>
                <span
                  class="mt-1 block text-[11px] font-bold uppercase leading-[1.3] tracking-[0.04em] text-gris"
                  >{{ b.titulo }}</span
                >
              </span>
            </div>
          </div>
        </li>
        <!-- ── El detalle del elegido: fuera de los cuadrados, dentro de la
             grilla. `order` lo manda a la fila del cuadrado tocado; el
             min-height evita que la grilla salte de alto al cambiar de
             bloque, porque las puntas van de 12 a 35 palabras. -->
        <li
          ref="panel"
          class="panel-jornada tarjeta p-5 sm:p-7"
          :style="{ order: ordenPanel }"
          aria-live="polite"
          :aria-label="`Detalle del bloque de las ${actual.hora}`"
        >
        <p class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <time :datetime="iso(actual.hora)" class="hora text-[1.15rem] text-acento-texto">{{
            actual.hora
          }}</time>
          <span class="rotulo text-gris">{{ TIPOS_BLOQUE[actual.tipo].label }}</span>
        </p>
        <h3 class="titulo mt-3 max-w-[30ch] text-[1.1rem] sm:text-[1.35rem]">
          {{ actual.titulo }}
        </h3>
        <!--
          Quién lo da. Es el único lugar donde aparece en teléfono, porque en
          un cuadro de 163px no entra: sin esto, abajo de 640px no había un
          solo nombre de orador en toda la página antes de pedir el contacto.
        -->
          <p class="rotulo mt-3 text-gris">{{ actual.quien }}</p>
          <p class="mt-3 max-w-[68ch] text-[15px] leading-[1.55] text-gris sm:text-[16px]">
            {{ actual.punta }}
          </p>
        </li>
      </ul>

      <p class="mt-4 text-[13px] leading-[1.45] text-gris lg:hidden">
        Track único, sin salas paralelas. Tocá cualquier bloque para ver de qué va.
      </p>

      <p class="mt-6 max-w-[68ch] text-[15px] text-gris">
        El orden puede moverse hasta la semana del evento. La grilla final
        <span class="font-bold text-white">la reciben primero los que ya reservaron</span>.
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { EVENTO, TEMAS, PAUSAS, BORDES, TIPOS_BLOQUE } from "@/data/evento";
import Pictograma from "@/components/ui/Pictograma.vue";

const aMin = (h) => {
  const [a, b] = h.split(":").map(Number);
  return a * 60 + b;
};
const aHora = (m) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const iso = (h) => `${EVENTO.fechaISO.slice(0, 10)}T${h.padStart(5, "0")}:00-03:00`;

/**
 * Los huecos se DERIVAN POR RESTA: la duración de cada pausa es la diferencia
 * entre el fin de un bloque (hora + dur) y el arranque del siguiente. Ninguna
 * se escribe a mano, así que si mañana se mueve un horario la sección se
 * corrige sola en vez de mentir. No reemplazar por duraciones fijas.
 */
const huecos = [];
TEMAS.forEach((t, i) => {
  const sig = TEMAS[i + 1];
  if (!sig) return;
  const fin = aMin(t.hora) + t.dur;
  const min = aMin(sig.hora) - fin;
  if (min <= 0) return;
  const hora = aHora(fin);
  huecos.push({
    id: `h-${hora}`,
    tipo: "pausa",
    hora,
    min,
    titulo: PAUSAS[hora]?.titulo || "Degustación",
  });
});

/**
 * La cinta alterna bloque y pausa en el orden real del día. Los siete bloques
 * cubren siete horas: sin las pausas, el "nueve horas" del título no se
 * sostiene en ningún lado de la sección.
 *
 * `flex: {min} 1 0%` con basis 0 reparte el ancho en proporción exacta a los
 * minutos; con un basis distinto de 0 la proporción deja de ser exacta.
 */
const cinta = [];
TEMAS.forEach((t, i) => {
  cinta.push({ id: t.id, tipo: "bloque", min: t.dur });
  const h = huecos[i];
  if (h) cinta.push({ id: h.id, tipo: "pausa", min: h.min });
});

// El detalle vive en un panel único, fuera de los cuadrados: ninguno cambia
// de alto ni de proporción al elegir, así la grilla se sigue viendo entera.
const elegido = ref(TEMAS[0].id);
const actual = computed(() => TEMAS.find((t) => t.id === elegido.value) || TEMAS[0]);
const panel = ref(null);

function elegir(id) {
  elegido.value = id;
  acercar();
}

/**
 * El acercamiento mínimo, y sólo cuando hace falta.
 *
 * Con el panel dentro de la grilla la respuesta nace 10px debajo de la fila
 * tocada. Pero si esa fila estaba al pie de la pantalla, nace justo afuera:
 * medido a 393x664, tocando un bloque de la tercera fila el panel queda
 * 196px por debajo del pliegue. Esto lo corrige, acotado a propósito:
 *
 * · No corre de 1280 para arriba: ahí el panel ya está al lado y quieto.
 * · No corre si ya se ve más de la mitad. Que la página se mueva sola bajo
 *   el pulgar es el movimiento con peor prensa que existe; se usa cuando es
 *   la diferencia entre ver la respuesta y no verla.
 * · Nunca desplaza más que el alto del propio panel. Un scrollIntoView acá
 *   puede recorrer media sección y dejar al que tocó mirando pasar la
 *   página — es el mismo motivo por el que el router usa 'auto' y no
 *   'smooth' cuando se entra de afuera.
 * · Con prefers-reduced-motion salta sin animar, pero SALTA: no mostrar lo
 *   que la persona acaba de pedir no es una mejora de accesibilidad. Hay que
 *   consultarlo a mano porque un behavior:"smooth" explícito le gana al
 *   `scroll-behavior: auto` que main.css declara en esa media query.
 */
async function acercar() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(min-width: 1280px)").matches) return;
  await nextTick();
  const el = panel.value;
  if (!el) return;
  const r = el.getBoundingClientRect();
  const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
  if (r.height === 0 || visible / r.height > 0.5) return;
  // El tope de "no desplazar más que el alto del panel" vale cuando el panel
  // nace pegado a la fila tocada. En teléfono va DESPUÉS de los siete, para
  // que la grilla entre en una pantalla, y ahí ese tope se queda corto:
  // medido, tocando el primer bloque la respuesta quedaba fuera de la vista
  // por completo. El destino sigue siendo conocido y corto —el final de una
  // grilla de 808px—, así que ahí se permite llegar.
  const alFinal = columnas.value <= 2;
  const necesario = Math.round(r.bottom - window.innerHeight + 16);
  const falta = alFinal ? necesario : Math.min(necesario, Math.round(r.height));
  if (falta <= 0) return;
  const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollBy({ top: falta, behavior: suave ? "smooth" : "auto" });
}

/**
 * Cuántas columnas tiene la grilla ahora mismo. Se lee de matchMedia y no del
 * ancho de la ventana: son exactamente los mismos cortes que declara Tailwind
 * en las clases de arriba (grid-cols-2 / md:grid-cols-3 / lg:grid-cols-4), y
 * si se mueve uno hay que mover el otro. Dos listeners de media query, sin
 * listener de resize: no se dispara en cada píxel al arrastrar la ventana.
 *
 * Arranca en 2 (teléfono) porque es el caso del 100% del público que llega
 * por el link de WhatsApp, y porque en SSR/primer render no hay window.
 */
const columnas = ref(2);
const consultas = [];
function medirColumnas() {
  const [md, lg] = consultas;
  columnas.value = lg.matches ? 4 : md.matches ? 3 : 2;
}
onMounted(() => {
  consultas.push(window.matchMedia("(min-width: 768px)"), window.matchMedia("(min-width: 1024px)"));
  medirColumnas();
  consultas.forEach((c) => c.addEventListener("change", medirColumnas));
});
onBeforeUnmount(() => consultas.forEach((c) => c.removeEventListener("change", medirColumnas)));

/**
 * Dónde se coloca el panel dentro de la grilla.
 *
 * Cada cuadrado lleva `order: i * 2`, así queda un número impar libre entre
 * uno y el siguiente. El panel toma el impar que sigue al ÚLTIMO cuadrado de
 * la fila del elegido, de modo que la colocación automática de CSS Grid —que
 * respeta el orden modificado por `order`— lo baje a una fila nueva a ancho
 * completo y empuje al resto hacia abajo.
 *
 * De lg para arriba el panel se coloca a mano en la quinta columna (ver
 * .panel-jornada en main.css), así que este número deja de importar.
 */
const ordenPanel = computed(() => {
  // En teléfono el panel va DESPUÉS de los siete, no entre medio. Intercalado
  // parte la grilla al medio y los siete cuadrados dejan de entrar en una
  // pantalla, que es lo que se pidió de esta sección. Al final entran los
  // siete, y de que la respuesta se vea se encarga acercar().
  if (columnas.value <= 2) return TEMAS.length * 2;

  const i = Math.max(
    0,
    TEMAS.findIndex((t) => t.id === elegido.value)
  );
  const fila = Math.floor(i / columnas.value);
  const ultimo = Math.min((fila + 1) * columnas.value - 1, TEMAS.length - 1);
  return ultimo * 2 + 1;
});
</script>
