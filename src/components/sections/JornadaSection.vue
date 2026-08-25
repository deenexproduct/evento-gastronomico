<template>
  <!--
    Los siete bloques como cuadrados iguales, todos a la vista al mismo tiempo.

    El detalle NO se abre dentro de la grilla: se abre en un panel debajo. Si
    se expandiera en el lugar, la grilla cambiaría de alto y dejaría de verse
    entera — que es justamente lo que se pide. Así la grilla queda quieta.

    OJO CON LA VARIANTE CLARA (?claro):
    · Los divisores van con border-white/10, nunca border-linea: border-linea
      no está pisado en html.claro y queda casi negro sobre blanco.
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
            <!-- Fila de arriba: la hora, que es la firma gráfica de la sección -->
            <span class="flex items-start justify-between gap-2">
              <time
                :datetime="iso(b.hora)"
                class="hora text-[1.35rem] leading-none text-acento-texto sm:text-[1.7rem]"
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
            <span class="mt-auto block">
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
        <p class="mt-3 max-w-[68ch] text-[15px] leading-[1.55] text-gris sm:text-[16px]">
          {{ actual.punta }}
        </p>
      </div>

      <!-- Lo que no es bloque y sin embargo es parte del día: acreditación,
           pausas y cierre. Va acá abajo y no arriba porque entre el título y
           la grilla no puede haber nada que la empuje fuera de la pantalla. -->
      <ul
        class="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-white/10 pt-5 text-[11px] font-bold uppercase tracking-[0.1em] text-gris sm:text-[12px]"
      >
        <li v-for="c in contexto" :key="c.id" class="flex items-center gap-1.5">
          <Pictograma :nombre="TIPOS_BLOQUE[c.tipo].icono" :tam="13" :grosor="2" class="shrink-0" />
          <span class="tabular-nums text-acento-texto">{{ c.etiqueta }}</span>
          <span>{{ c.titulo }}</span>
        </li>
      </ul>

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
import { EVENTO, TEMAS, PAUSAS, BORDES, TIPOS_BLOQUE, AGENDA_PUBLICA } from "@/data/evento";
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

/**
 * Lo que no es bloque y sin embargo es parte del día: la acreditación, las
 * pausas y el cierre. Va en una línea propia para no romper el cuadriculado.
 * Las degustaciones cortas se agrupan en una sola entrada — cuatro renglones
 * repitiendo "15' Degustación" es ruido.
 */
const contexto = computed(() => {
  const cortas = huecos.filter((h) => h.titulo === "Degustación");
  const grandes = huecos.filter((h) => h.titulo !== "Degustación");
  const etiqueta = (h) => (AGENDA_PUBLICA ? h.hora : `${h.min}'`);
  return [
    { ...BORDES.apertura, etiqueta: BORDES.apertura.hora },
    ...(cortas.length
      ? [
          {
            id: "degustaciones",
            tipo: "pausa",
            etiqueta: `${cortas.length}×${cortas[0].min}'`,
            titulo: "Degustación entre bloques",
          },
        ]
      : []),
    ...grandes.map((h) => ({ ...h, etiqueta: etiqueta(h) })),
    { ...BORDES.cierre, etiqueta: BORDES.cierre.hora },
  ];
});

// El detalle vive en un panel único debajo de la grilla, así la grilla no
// cambia de alto al elegir y se sigue viendo entera.
const elegido = ref(TEMAS[0].id);
const actual = computed(() => TEMAS.find((t) => t.id === elegido.value) || TEMAS[0]);
const elegir = (id) => (elegido.value = id);
</script>
