<template>
  <!--
    El salón, silla por silla.

    Reemplaza la barra de progreso de 8px: el argumento central de la landing
    —"el cupo es el del salón, no una fase de venta"— se afirma hoy en doce
    componentes con palabras y se ilustra con una barra que tiene cualquier
    plantilla. Dibujado, se entiende en medio segundo y además es literalmente
    cierto: cada celda es una butaca.

    200 celdas con 12 nodos, no con 200: un <pattern> de una celda repetida y
    un <mask> que la recorta. Los rectángulos de abajo son dos —las filas
    llenas y el resto de la fila cortada— y el patrón los pica en butacas.
    Con un elemento por silla serían +200 nodos sobre los 751 del documento.

    TEMA CLARO: no estrena una sola clase de Tailwind y por lo tanto no puede
    abrir una fuga. El magenta entra por var(--acento), que html.claro ya da
    vuelta (#FF0054 → #E00049), y el gris de la silla libre por
    var(--silla-libre), que se define en los dos bloques de :root que ya
    existen. Ni bg-white/N (matchea por substring), ni bg-acento/N (variante
    con opacidad, otra clase), ni @apply de color (se inlinea y no lo alcanza
    ningún selector). Verificado midiendo píxeles en los dos temas.

    NO SE MUEVE SOLO: el llenado lo anima el padre pasando `tomadas` desde
    useContador, que ya consulta prefers-reduced-motion y ya trae el respaldo
    de 2s por setTimeout. Este componente no agrega un @keyframes ni una
    transition, así que no hay nada nuevo que sumar al bloque de
    prefers-reduced-motion de main.css.
  -->
  <svg
    class="salon"
    :viewBox="`0 0 ${ancho} ${alto}`"
    preserveAspectRatio="xMidYMid meet"
    role="img"
    :aria-label="rotulo"
  >
    <defs>
      <!-- Los ids se generan por instancia: la pieza se usa en #registro y en
           el panel del hero, y dos <mask id="m"> en el mismo documento hacen
           que la segunda instancia use el recorte de la primera. -->
      <pattern :id="idPatron" :width="PASO" :height="PASO" patternUnits="userSpaceOnUse">
        <rect :width="CELDA" :height="CELDA" rx="1" fill="#fff" />
      </pattern>
      <mask :id="idMascara">
        <rect width="100%" height="100%" :fill="`url(#${idPatron})`" />
      </mask>
    </defs>

    <g :mask="`url(#${idMascara})`">
      <rect class="salon-libre" width="100%" height="100%" />
      <template v-if="llenas > 0">
        <!-- Las filas completas. -->
        <rect class="salon-lleno" x="0" y="0" width="100%" :height="filasLlenas * PASO" />
        <!-- El resto de la fila cortada. El corte cae en el borde de la celda
             porque el ancho es múltiplo del paso: la butaca 85 queda entera y
             la 86 queda entera sin pintar. Verificado por píxel. -->
        <rect
          v-if="resto > 0"
          class="salon-lleno"
          x="0"
          :y="filasLlenas * PASO"
          :width="resto * PASO"
          :height="CELDA"
        />
      </template>
    </g>

    <!-- Las que se lleva el próximo mensaje. Van FUERA del <g> enmascarado:
         el anillo es más grande que la celda y el patrón se lo comería. -->
    <rect
      v-for="n in proximas"
      :key="n"
      class="salon-proxima"
      :x="(n - 1) % cols * PASO - 1.4"
      :y="Math.floor((n - 1) / cols) * PASO - 1.4"
      :width="CELDA + 2.8"
      :height="CELDA + 2.8"
      rx="2.2"
    />
  </svg>
</template>

<script setup>
import { computed, useId } from "vue";

const props = defineProps({
  total: { type: Number, default: 200 },
  /** Cuántas están tomadas. El padre la anima con useContador. */
  tomadas: { type: Number, default: 0 },
  /** Números de butaca a marcar con anillo. [] si no hay dato real. */
  proximas: { type: Array, default: () => [] },
  cols: { type: Number, default: 20 },
  rotulo: { type: String, required: true },
});

const PASO = 11;
const CELDA = 8; // 8 de butaca + 3 de pasillo

const filas = computed(() => Math.ceil(props.total / props.cols));
const ancho = computed(() => props.cols * PASO - (PASO - CELDA));
const alto = computed(() => filas.value * PASO - (PASO - CELDA));

/** Acotado a [0, total]: el endpoint de cupo puede devolver cualquier cosa. */
const llenas = computed(() => Math.min(Math.max(props.tomadas, 0), props.total));
const filasLlenas = computed(() => Math.floor(llenas.value / props.cols));
const resto = computed(() => llenas.value % props.cols);

const uid = useId();
const idPatron = `salon-p-${uid}`;
const idMascara = `salon-m-${uid}`;
</script>
