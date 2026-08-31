<template>
  <!--
    `enPie` es la variante que usa el pie: sin el contenedor propio —el pie ya
    tiene el suyo y anidarlos duplicaba el padding lateral— y sin el borde de
    abajo, que se juntaba con el del copyright y dibujaba dos lineas seguidas.
  -->
  <section id="faq" :class="enPie ? '' : 'border-b border-linea py-20 sm:py-28'">
    <div :class="enPie ? '' : 'contenedor'">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <p class="rotulo text-gris">Preguntas</p>
          <h2 class="titulo mt-5 max-w-[16ch] text-[clamp(1.9rem,3.6vw,2.8rem)]">
            Lo que siempre nos preguntan.
          </h2>
        </div>

        <div class="lg:col-span-8">
          <div class="border-t border-linea">
            <div v-for="(item, i) in FAQ" :key="i" class="border-b border-linea">
              <h3>
                <button
                  type="button"
                  class="presionable flex w-full items-start justify-between gap-4 py-5 text-left sm:gap-6 transition-colors hover:text-acento-texto"
                  :aria-expanded="abierto === i"
                  :aria-controls="`faq-panel-${i}`"
                  @click="toggle(i)"
                >
                  <span class="min-w-0 text-[1rem] font-semibold tracking-[-0.02em] sm:text-[1.08rem]">
                    {{ item.q }}
                  </span>
                  <span
                    class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center text-[1.3rem] leading-none text-acento-texto transition-transform duration-300"
                    :class="abierto === i ? 'rotate-45' : ''"
                    aria-hidden="true"
                    >+</span
                  >
                </button>
              </h3>

              <!--
                inert: el panel cerrado mide cero de alto, pero el texto sigue
                siendo visible para el lector de pantalla y para Ctrl+F. Sin
                esto se leen las diez respuestas seguidas mientras cada botón
                dice aria-expanded="false", que es justo lo contrario.
                Se usa inert y no `hidden` para no perder la transición.
              -->
              <div
                :id="`faq-panel-${i}`"
                :inert="abierto !== i"
                class="grid transition-all duration-300 ease-out"
                :class="abierto === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
              >
                <div class="overflow-hidden">
                  <p class="max-w-[70ch] pb-6 pr-8 text-[0.97rem] leading-[1.68] text-gris">
                    {{ item.a }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ enPie: { type: Boolean, default: false } });

import { ref } from "vue";
import { FAQ } from "@/data/evento";

/**
 * Ningún panel abierto de entrada.
 *
 * Venía abierto el primero —"¿De qué se habla exactamente?"—, que es
 * justo el que menos falta hace: su respuesta es la jornada contada en
 * prosa, once secciones después de haberla mostrado en siete cuadrados con
 * hora y título. Y ocupaba media pantalla de teléfono empujando hacia abajo
 * las otras nueve preguntas, que son las que el lector vino a buscar.
 */
const abierto = ref(-1);

function toggle(i) {
  abierto.value = abierto.value === i ? -1 : i;
}

</script>
