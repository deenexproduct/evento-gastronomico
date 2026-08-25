<template>
  <!--
    Tres tramos con nombre, separados por las pausas reales del día.

    La hora gigante no se elimina: se muda del bloque al tramo. Quedan tres
    números grandes en magenta en vez de siete, que es más jerarquía y no
    menos. Los bloques bajan a filas densas con acordeón, reusando el patrón
    de FAQSection.

    OJO CON LA VARIANTE CLARA (?claro):
    · Los divisores internos van con border-white/10, nunca border-linea:
      border-linea no está pisado en html.claro y queda casi negro sobre
      blanco. El border-b de la <section> sí queda en border-linea, para no
      romper el ritmo con el resto de las secciones.
    · Prohibido hover:bg-white/N. La regla html.claro [class*="bg-white/"]
      matchea por substring y no entiende de variantes: el fondo quedaría
      aplicado siempre, no solo al pasar el mouse. Acá el hover es solo color.
    · No se usa .chip: su fondo entra por @apply y html.claro no lo alcanza.
  -->
  <section id="jornada" class="border-b border-linea py-16 sm:py-24">
    <div class="contenedor">
      <!-- ── Encabezado ──────────────────────────────────────────────── -->
      <div class="lg:flex lg:items-end lg:justify-between lg:gap-12">
        <div>
          <p class="rotulo text-acento-texto">La jornada</p>
          <h2 class="titulo mt-5 max-w-[16ch] text-[clamp(1.9rem,5vw,3.2rem)]">
            Nueve horas, en tres tramos.
          </h2>
          <p class="lectura mt-6 text-gris">
            Track único: no hay salas paralelas ni hay que elegir. Siete bloques con degustación
            entre medio y stands abiertos todo el día. Tocá cualquiera para ver de qué va.
          </p>
        </div>

        <button
          type="button"
          class="btn-linea mt-6 min-h-[46px] shrink-0 px-6 text-[13px] lg:mt-0"
          :aria-pressed="todoAbierto"
          @click="alternarTodo"
        >
          {{ todoAbierto ? "Cerrar el detalle" : `Abrir los ${TEMAS.length} bloques` }}
        </button>
      </div>

      <!-- ── El día en una cinta y tres celdas ────────────────────────── -->
      <div class="mt-9 sm:mt-12">
        <!-- Cinta proporcional a los minutos reales. Es figura, no control. -->
        <div
          class="cinta flex h-2.5 w-full gap-[3px] overflow-hidden rounded-full sm:h-3.5"
          aria-hidden="true"
        >
          <span
            v-for="s in cinta"
            :key="s.id"
            class="cinta-seg"
            :class="s.tipo === 'tramo' ? 'cinta-tramo' : 'cinta-pausa'"
            :style="{ flex: `${s.min} 1 0%` }"
          ></span>
        </div>

        <!-- Tira de resumen: la forma del día sin un solo tap, y navegable
             para el que solo puede venir medio día. -->
        <ul
          class="mt-3 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:mt-4"
        >
          <li v-for="t in tramos" :key="t.id" class="bg-noche">
            <!-- block h-full: el <a> tiene que llegar al mínimo táctil. -->
            <a :href="`#tramo-${t.id}`" class="block h-full px-3 py-3.5 sm:px-5 sm:py-5">
              <span class="rotulo block text-acento-texto">{{ t.rotulo }}</span>
              <span class="hora mt-1.5 block text-[clamp(1.05rem,3.6vw,1.7rem)]">{{ t.desde }}</span>
              <span
                class="mt-1.5 block text-[11px] font-bold uppercase tracking-[0.08em] text-gris sm:text-[12px]"
              >
                {{ t.bloques.length }} bloques
              </span>
            </a>
          </li>
        </ul>
      </div>

      <!-- ── El día ───────────────────────────────────────────────────── -->
      <div class="mt-10 sm:mt-14">
        <!-- La apertura: hasta acá vivía en un párrafo gris debajo de la
             lista, o sea donde nadie la leía. -->
        <div class="costura">
          <Pictograma
            :nombre="TIPOS_BLOQUE[BORDES.apertura.tipo].icono"
            :tam="15"
            :grosor="2"
            class="shrink-0 text-acento-texto"
          />
          <span class="tabular-nums text-acento-texto">{{ etiqueta(BORDES.apertura) }}</span>
          <span class="text-white">{{ BORDES.apertura.titulo }}</span>
          <span class="hidden font-medium normal-case tracking-normal sm:inline">
            — {{ BORDES.apertura.detalle }}
          </span>
        </div>

        <template v-for="t in tramos" :key="t.id">
          <!-- Pausa que separa un tramo del siguiente -->
          <div v-if="costuraAntes(t.id)" class="costura">
            <Pictograma
              :nombre="TIPOS_BLOQUE.pausa.icono"
              :tam="15"
              :grosor="2"
              class="shrink-0 text-acento-texto"
            />
            <span class="tabular-nums text-acento-texto">{{ etiqueta(costuraAntes(t.id)) }}</span>
            <span class="text-white">{{ costuraAntes(t.id).titulo }}</span>
            <span
              v-if="costuraAntes(t.id).detalle"
              class="hidden font-medium normal-case tracking-normal sm:inline"
            >
              — {{ costuraAntes(t.id).detalle }}
            </span>
          </div>

          <!-- Banda del tramo -->
          <div
            :id="`tramo-${t.id}`"
            class="grid scroll-mt-24 gap-6 border-t border-white/10 py-7 sm:py-9 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-12 lg:py-11"
          >
            <!-- Identidad del tramo: fila compacta en mobile, columna en lg -->
            <div>
              <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 lg:block">
                <time
                  :datetime="iso(t.desde)"
                  class="hora text-[1.5rem] text-acento-texto lg:text-[clamp(2.2rem,3.4vw,3.6rem)]"
                  >{{ t.desde }}</time
                >
                <p class="rotulo text-gris lg:mt-3">{{ t.rotulo }}</p>
              </div>
              <h3 class="titulo mt-1.5 text-[1.1rem] lg:mt-2 lg:text-[1.35rem]">{{ t.nombre }}</h3>
              <p
                class="mt-2 max-w-[40ch] text-[13px] leading-[1.45] text-gris lg:mt-3 lg:text-[14px]"
              >
                {{ t.ritmo }}
              </p>
            </div>

            <!-- Las piezas del tramo: bloques y degustaciones, en orden -->
            <ol class="border-t border-white/10">
              <li v-for="p in t.piezas" :key="p.id" class="border-b border-white/10 last:border-b-0">
                <!-- Degustación corta: banda fina, sin botón -->
                <div
                  v-if="p.clase === 'hueco'"
                  class="flex items-center gap-x-2.5 py-2.5 pl-[70px] text-[11px] font-bold uppercase tracking-[0.12em] text-gris lg:pl-[128px] lg:text-[12px]"
                >
                  <Pictograma
                    :nombre="TIPOS_BLOQUE.pausa.icono"
                    :tam="13"
                    :grosor="2"
                    class="shrink-0"
                  />
                  <span class="tabular-nums">{{ etiqueta(p) }}</span>
                  <span>{{ p.titulo }}</span>
                </div>

                <!-- Bloque de contenido -->
                <template v-else>
                  <h4>
                    <button
                      type="button"
                      class="grid w-full grid-cols-[58px_minmax(0,1fr)_20px] items-start gap-x-3 py-4 text-left transition-colors hover:text-acento-texto lg:grid-cols-[104px_minmax(0,1fr)_248px_24px] lg:items-center lg:gap-x-6 lg:py-5"
                      :aria-expanded="abierto(p.id)"
                      :aria-controls="`bloque-${p.id}`"
                      @click="alternar(p.id)"
                    >
                      <span class="flex flex-col leading-none">
                        <time
                          :datetime="iso(p.hora)"
                          class="hora text-[1.2rem] text-acento-texto lg:text-[1.75rem]"
                        >
                          {{ p.hora }}
                        </time>
                        <span
                          v-if="AGENDA_PUBLICA"
                          class="mt-1.5 text-[11px] font-bold tabular-nums text-gris lg:text-[12px]"
                        >
                          <span aria-hidden="true">{{ p.dur }}&#39;</span>
                          <span class="sr-only">{{ p.dur }} minutos</span>
                        </span>
                      </span>

                      <span class="min-w-0">
                        <!-- El tipo solo cuando NO es charla: cinco de siete
                             son charla, y repetir la etiqueta cinco veces la
                             vacía de significado. Mostrada dos veces, la demo
                             y la mesa saltan solas. -->
                        <span
                          v-if="p.tipo !== 'charla'"
                          class="mb-1.5 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-acento-texto lg:text-[11px]"
                        >
                          <Pictograma
                            :nombre="TIPOS_BLOQUE[p.tipo].icono"
                            :tam="13"
                            :grosor="2"
                            class="shrink-0"
                          />
                          {{ TIPOS_BLOQUE[p.tipo].label }}
                        </span>

                        <span class="titulo block text-[15px] leading-[1.15] lg:text-[1.125rem]">
                          {{ p.titulo }}
                        </span>

                        <span
                          class="mt-1.5 block text-[12px] font-bold uppercase leading-[1.3] tracking-[0.05em] text-acento-texto lg:hidden"
                        >
                          {{ p.quien }}
                        </span>
                      </span>

                      <!-- En lg, quien va en columna propia. display:none saca
                           al gemelo del árbol de accesibilidad: no se duplica. -->
                      <span
                        class="hidden text-[12.5px] font-bold uppercase leading-[1.35] tracking-[0.05em] text-acento-texto lg:block"
                      >
                        {{ p.quien }}
                      </span>

                      <span
                        class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center text-[1.25rem] leading-none text-acento-texto transition-transform duration-300 lg:mt-0 lg:h-6 lg:w-6 lg:text-[1.4rem]"
                        :class="abierto(p.id) ? 'rotate-45' : ''"
                        aria-hidden="true"
                        >+</span
                      >
                    </button>
                  </h4>

                  <div
                    :id="`bloque-${p.id}`"
                    :inert="!abierto(p.id)"
                    class="grid transition-all duration-300 ease-out"
                    :class="abierto(p.id) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
                  >
                    <div class="overflow-hidden">
                      <div class="pb-5 pl-[70px] pr-2 lg:pb-6 lg:pl-[128px]">
                        <!--
                          Acá iba un "Después, 15' de degustación". Se quitó:
                          la fila de la degustación viene justo abajo y decía
                          lo mismo dos veces seguidas.
                        -->
                        <p class="max-w-[62ch] text-[15px] leading-[1.55] text-gris lg:text-[16px]">
                          {{ p.punta }}
                        </p>
                      </div>
                    </div>
                  </div>
                </template>
              </li>
            </ol>
          </div>
        </template>

        <!-- El cierre, que hasta acá no figuraba en ningún lado -->
        <div class="costura border-b">
          <Pictograma
            :nombre="TIPOS_BLOQUE[BORDES.cierre.tipo].icono"
            :tam="15"
            :grosor="2"
            class="shrink-0 text-acento-texto"
          />
          <span class="tabular-nums text-acento-texto">{{ etiqueta(BORDES.cierre) }}</span>
          <span class="text-white">{{ BORDES.cierre.titulo }}</span>
          <span class="hidden font-medium normal-case tracking-normal sm:inline">
            — {{ BORDES.cierre.detalle }}
          </span>
        </div>
      </div>

      <p class="mt-8 max-w-[68ch] text-[16px] text-gris">
        El orden puede moverse hasta la semana del evento. La grilla final
        <span class="font-bold text-white">la reciben primero los inscriptos</span>.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { EVENTO, TEMAS, TRAMOS, PAUSAS, BORDES, TIPOS_BLOQUE, AGENDA_PUBLICA } from "@/data/evento";
import Pictograma from "@/components/ui/Pictograma.vue";

const aMin = (h) => {
  const [a, b] = h.split(":").map(Number);
  return a * 60 + b;
};
const aHora = (m) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const iso = (h) => `${EVENTO.fechaISO.slice(0, 10)}T${h.padStart(5, "0")}:00-03:00`;

/**
 * Los siete bloques más los huecos DERIVADOS POR RESTA.
 *
 * Ningún hueco se escribe a mano: su duración es la diferencia entre el fin
 * de un bloque (hora + dur) y el arranque del siguiente. Si mañana se mueve
 * un horario, la pausa y el ancho de la cinta se recalculan solos y es
 * imposible que la sección mienta. No reemplazar por duraciones a mano.
 */
const SECUENCIA = [];
TEMAS.forEach((t, i) => {
  const fin = aMin(t.hora) + t.dur;
  SECUENCIA.push({ clase: "bloque", ...t, fin });
  const sig = TEMAS[i + 1];
  if (!sig) return;
  const ini = aMin(sig.hora);
  if (ini <= fin) return;
  const hora = aHora(fin);
  SECUENCIA.push({
    clase: "hueco",
    id: `h-${hora}`,
    tipo: "pausa",
    hora,
    min: ini - fin,
    tramo: t.tramo, // el tramo que cierra
    tramoSig: sig.tramo, // el que abre
    borde: t.tramo !== sig.tramo,
    titulo: PAUSAS[hora]?.titulo || "Degustación",
    detalle: PAUSAS[hora]?.detalle || "",
  });
});

/**
 * La línea de ritmo se deriva. Nunca se escribe una prosa que declare un
 * hecho calculable: si se agrega un bloque, la frase se corrige sola.
 */
function ritmo(bloques, huecos) {
  const durs = [...new Set(bloques.map((b) => b.dur))];
  const base =
    AGENDA_PUBLICA && durs.length === 1
      ? `${bloques.length} bloques de ${durs[0]}'`
      : `${bloques.length} bloques`;
  const deg = huecos.some((h) => h.titulo === "Degustación") ? ", con degustación entre medio" : "";
  const remate = bloques[bloques.length - 1].tipo === "mesa" ? " Cierra la mesa redonda." : "";
  return `${base}${deg}.${remate}`;
}

/**
 * Los tramos se construyen a partir de los datos, no de TRAMOS. Si alguien
 * agrega un bloque con un tramo que no está declarado, el bloque se renderiza
 * igual con el rótulo vacío — que se ve. Nunca desaparece en silencio.
 */
const orden = [];
const grupos = new Map();
for (const p of SECUENCIA) {
  if (p.clase === "hueco" && p.borde) continue; // las pausas grandes van entre bandas
  if (!grupos.has(p.tramo)) {
    grupos.set(p.tramo, []);
    orden.push(p.tramo);
  }
  grupos.get(p.tramo).push(p);
}

const tramos = orden.map((id) => {
  const piezas = grupos.get(id);
  const bloques = piezas.filter((p) => p.clase === "bloque");
  const huecos = piezas.filter((p) => p.clase === "hueco");
  const meta = TRAMOS.find((t) => t.id === id) || { id, rotulo: "", nombre: "" };
  const ultimo = bloques[bloques.length - 1];
  return {
    ...meta,
    piezas,
    bloques,
    huecos,
    desde: bloques[0].hora,
    min: ultimo.fin - aMin(bloques[0].hora),
    ritmo: ritmo(bloques, huecos),
  };
});

const costuras = SECUENCIA.filter((p) => p.clase === "hueco" && p.borde);
const costuraAntes = (id) => costuras.find((c) => c.tramoSig === id);

/**
 * La cinta: cinco segmentos (tramo · pausa · tramo · pausa · tramo).
 * `flex: {min} 1 0%` con basis 0 reparte el ancho en proporción exacta a los
 * minutos; con un basis distinto de 0 la proporción deja de ser exacta.
 */
const cinta = [];
tramos.forEach((t) => {
  cinta.push({ id: t.id, tipo: "tramo", min: t.min });
  const c = costuras.find((x) => x.tramo === t.id);
  if (c) cinta.push({ id: c.id, tipo: "pausa", min: c.min });
});

/**
 * Mientras la agenda no sea pública, las pausas publican duración y no hora:
 * "15'" no compromete un orden que todavía puede moverse. Los bordes (8:30 y
 * 18:00) publican siempre hora, porque ya están al aire en otras secciones.
 */
const etiqueta = (p) => (p.min && !AGENDA_PUBLICA ? `${p.min}'` : p.hora);

// Acordeón: mismo patrón que FAQSection (aria-expanded + aria-controls +
// inert + grid-rows-[0fr]→[1fr]). El primero arranca abierto, que enseña que
// el título se toca sin gastar un tap.
const abiertos = ref(new Set([TEMAS[0].id]));
const abierto = (id) => abiertos.value.has(id);
const todoAbierto = computed(() => abiertos.value.size === TEMAS.length);

function alternar(id) {
  const s = new Set(abiertos.value); // Set nuevo: Vue no trackea .add()
  s.has(id) ? s.delete(id) : s.add(id);
  abiertos.value = s;
}

function alternarTodo() {
  if (!todoAbierto.value) {
    abiertos.value = new Set(TEMAS.map((t) => t.id));
    return;
  }
  abiertos.value = new Set();
  // Cerrar siete paneles de golpe corre ~700px bajo el cursor.
  document.getElementById("jornada")?.scrollIntoView({
    block: "start",
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
}
</script>
