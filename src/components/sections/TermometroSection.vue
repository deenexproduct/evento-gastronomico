<template>
  <!--
    El termómetro. Seis cosas que un dueño de cadena o tiene resueltas o no.

    NO es un formulario: no valida, no envía, no guarda en ningún servidor y no
    tiene un solo <input>. Es el mismo patrón del selector de locales de
    #registro —botones que reescriben el mensaje de WhatsApp— que ya está
    aprobado y testeado.

    TEMA CLARO: no estrena una sola regla. Los dos estados del botón copian
    literalmente el selector de locales, que ya funciona en claro:
    bg-acento-boton (pisado en la línea 302 de main.css), border-white/15 y
    bg-white/5 (pisados por substring), text-gris (pisado). Prohibido
    hover:bg-white/N: html.claro matchea [class*="bg-white/"] por SUBSTRING y
    el fondo quedaría aplicado siempre. Acá el hover es de borde.
  -->
  <section id="termometro" class="py-16 sm:py-24">
    <div class="contenedor">
      <div class="lg:flex lg:items-end lg:justify-between lg:gap-12">
        <div>
          <p class="rotulo text-acento-texto">Seis preguntas</p>
          <h2 class="titulo mt-4 max-w-[18ch] text-[clamp(1.55rem,4.6vw,3rem)]">
            Cuáles de los siete bloques son para vos.
          </h2>
        </div>
        <p class="mt-4 max-w-[42ch] text-[15px] leading-[1.5] text-gris lg:mt-0 lg:text-right">
          Marcá lo que no tenés resuelto. No se envía nada y no se guarda nada: el resultado queda
          en esta pantalla y se escribe solo en tu mensaje de WhatsApp.
        </p>
      </div>

      <ul class="mt-8 grid gap-px bg-linea sm:mt-10">
        <li
          v-for="(t, i) in TERMOMETRO"
          :key="t.id"
          class="flex flex-col gap-3 bg-noche-2 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
        >
          <p class="flex min-w-0 items-start gap-4 text-[16px] leading-[1.4] sm:text-[17px]">
            <span class="hora w-[2rem] shrink-0 pt-0.5 text-[1.4rem] text-acento-texto">
              {{ String(i + 1).padStart(2, "0") }}
            </span>
            <span class="min-w-0">{{ t.afirmacion }}</span>
          </p>

          <div class="flex shrink-0 gap-2 pl-[3rem] sm:pl-0" role="group" :aria-label="t.afirmacion">
            <button
              type="button"
              :aria-pressed="!marcados.includes(t.id)"
              class="inline-flex min-h-[44px] items-center rounded-full border px-4 text-[13px] font-bold uppercase tracking-[0.06em] transition-colors"
              :class="
                !marcados.includes(t.id)
                  ? 'border-white/40 bg-white/5'
                  : 'border-white/15 bg-white/5 text-gris hover:border-white/40'
              "
              @click="marcados.includes(t.id) && marcar(t.id)"
            >
              Lo tengo
            </button>
            <button
              type="button"
              :aria-pressed="marcados.includes(t.id)"
              class="inline-flex min-h-[44px] items-center rounded-full border px-4 text-[13px] font-bold uppercase tracking-[0.06em] transition-colors"
              :class="
                marcados.includes(t.id)
                  ? 'border-transparent bg-acento-boton'
                  : 'border-white/15 bg-white/5 text-gris hover:border-white/40'
              "
              @click="marcar(t.id)"
            >
              No
            </button>
          </div>
        </li>
      </ul>

      <!--
        El resultado. aria-live porque el cambio ocurre lejos del botón que lo
        provoca. Aparece DEBAJO de la lista, así lo que se corre es lo de abajo
        y no lo que la persona está mirando: sin eso el CLS se dispara y además
        se le mueve el pulgar de lugar.
      -->
      <div v-if="hayEleccion" class="tarjeta mt-4 p-6 sm:p-8" aria-live="polite">
        <p class="rotulo text-gris">{{ marcados.length }} de {{ TERMOMETRO.length }} marcadas</p>
        <h3 class="titulo mt-3 max-w-[26ch] text-[clamp(1.3rem,3.4vw,2rem)]">
          {{ bloques.length === 1 ? "Un bloque del día es para vos" : `${bloques.length} bloques del día son para vos` }}
        </h3>
        <ul class="mt-6 grid gap-2.5 sm:grid-cols-2">
          <li v-for="b in bloques" :key="b.id" class="tarjeta flex items-baseline gap-3 p-4">
            <time class="hora shrink-0 text-[1.2rem] text-acento-texto">{{ b.hora }}</time>
            <span class="titulo min-w-0 text-[13.5px] leading-[1.15]">{{ b.titulo }}</span>
          </li>
        </ul>
        <p class="mt-5 max-w-[56ch] text-[14px] leading-[1.5] text-gris">
          Los otros {{ 7 - bloques.length }} no se van a ningún lado: es track único y entran en la
          misma entrada. Lo que marcaste ya está escrito en tu mensaje de WhatsApp.
        </p>
        <a
          :href="enlaceReserva"
          target="_blank"
          rel="noopener noreferrer"
          class="btn mt-7 w-full sm:w-auto"
        >
          {{ agotado ? "Anotarme en la lista" : "Quiero mi lugar" }}
          <span class="sr-only"> (abre WhatsApp en una pestaña nueva)</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { TERMOMETRO, linkWaReserva } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";
import { useTuDomingo } from "@/composables/useTuDomingo";

// Destructuring en la forma exacta que exige cupo-coherencia.test.js: este
// componente dice "Quiero mi lugar", que está en el regex OFRECE_LUGAR, así
// que el test estático lo audita. Nace cubierto.
const { agotado } = useCupo();
const { marcados, temas, bloques, hayEleccion, personas, marcar } = useTuDomingo();

const enlaceReserva = computed(() =>
  linkWaReserva({ temas: temas.value, personas: personas.value, agotado: agotado.value })
);
</script>
