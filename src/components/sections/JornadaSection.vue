<template>
  <!--
    Los siete bloques como cuadrados iguales, todos a la vista al mismo tiempo.

    El detalle NO se abre dentro de la grilla: se abre en un panel debajo. Si
    se expandiera en el lugar, la grilla cambiaría de alto y dejaría de verse
    entera — que es justamente lo que se pide. Así la grilla queda quieta.

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
          <p class="rotulo text-acento-texto">La jornada</p>
          <h2 class="titulo mt-4 max-w-[18ch] text-[clamp(1.55rem,4.6vw,3rem)]">
            Nueve horas, siete bloques.
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
          <span class="whitespace-nowrap tabular-nums text-gris-2">8:30 a 18:00</span>
        </div>
      </div>

      <!-- ── Los siete cuadrados ──────────────────────────────────────── -->
      <ul class="mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
        <li v-for="b in TEMAS" :key="b.id">
          <button
            type="button"
            class="cuadro"
            :class="elegido === b.id ? 'cuadro-activo' : ''"
            :aria-pressed="elegido === b.id"
            @click="elegir(b.id)"
          >
            <!--
              La hora repetida en grande y tenue, detrás. Llena el hueco que
              dejaba el cuadrado —hora arriba, título abajo y un vacío en el
              medio— y hace que la grilla se lea como una línea de tiempo
              aunque las piezas estén sueltas. aria-hidden porque es la misma
              hora que ya anuncia el <time> de al lado.
            -->
            <span class="cuadro-hora-fondo" aria-hidden="true">{{ b.hora.split(":")[0] }}</span>

            <!-- Fila de arriba: el orden del día y el tipo, si no es charla -->
            <span class="relative flex items-start justify-between gap-2">
              <span class="flex items-baseline gap-2">
                <span
                  class="text-[11px] font-black tabular-nums tracking-[0.1em] text-gris-2 sm:text-[12px]"
                  aria-hidden="true"
                  >{{ String(TEMAS.indexOf(b) + 1).padStart(2, "0") }}</span
                >
                <time
                  :datetime="iso(b.hora)"
                  class="hora text-[1.3rem] leading-none text-acento-texto sm:text-[1.55rem]"
                  >{{ b.hora }}</time
                >
              </span>
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
                   Oculto en teléfono: en un cuadro de 163px no entra junto al
                   título y desbordaba. Ahí el nombre vive en el detalle. -->
              <span
                class="mt-2 hidden text-[11px] font-bold uppercase leading-[1.3] tracking-[0.04em] text-gris sm:block sm:text-[12px]"
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
        <li class="hidden lg:block">
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
      </ul>

      <!-- ── El detalle del elegido, fuera de la grilla ────────────────── -->
      <div
        class="tarjeta mt-2.5 p-5 sm:mt-3 sm:p-7"
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
      </div>

      <p class="mt-4 text-[13px] leading-[1.45] text-gris lg:hidden">
        Track único, sin salas paralelas. Tocá cualquier bloque para ver de qué va.
      </p>

      <p class="mt-6 max-w-[68ch] text-[15px] text-gris">
        El orden puede moverse hasta la semana del evento. La grilla final
        <span class="font-bold text-white">la reciben primero los inscriptos</span>.
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
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

// El detalle vive en un panel único debajo de la grilla, así la grilla no
// cambia de alto al elegir y se sigue viendo entera.
const elegido = ref(TEMAS[0].id);
const actual = computed(() => TEMAS.find((t) => t.id === elegido.value) || TEMAS[0]);
const elegir = (id) => (elegido.value = id);
</script>
