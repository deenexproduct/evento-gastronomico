<template>
  <!--
    `enPie` es la variante que usa el pie: sin el contenedor propio —el pie ya
    tiene el suyo y anidarlos duplicaba el padding lateral— y sin el borde de
    abajo, que se juntaba con el del copyright y dibujaba dos lineas seguidas.
  -->
  <!--
    El aire del FAQ es a proposito mas suelto que el del resto —112px contra 96
    en escritorio— y eso se conserva: el clamp llega al mismo techo de 7rem.
    Lo que se le agrega es la curva, que no tenia.

    Cuando el ritmo general paso a clamp, esta seccion se quedo con el valor
    fijo y la relacion se dio vuelta: era el corte MAS APRETADO de la home
    —176px contra 192— y paso a ser el MAS SUELTO, 136 contra 112 a 375px y 170
    contra 116 a 640. Justo el ultimo bloque de la pagina, y justo en telefono.
    Con la misma curva vuelve a estar donde estaba: apenas mas suelto que sus
    vecinos en cualquier ancho, en vez de un 47% mas.
  -->
  <section
    id="faq"
    :class="enPie ? '' : 'border-b border-linea py-[clamp(4rem,10.5vw,7rem)]'"
  >
    <div :class="enPie ? '' : 'contenedor'">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <!--
            El coeficiente es 4.0vw y no 4.4, y desde lg la palabra no se parte.

            A 1024px —el ancho exacto donde arranca esta grilla de 12— la
            columna del titular mide 293px y "FRECUENTES" a 4.4vw pedía 284:
            nueve píxeles de margen sobre casi trescientos. Con `overflow-wrap:
            break-word`, que `.titulo` pone a propósito para que una palabra
            larga no desborde en teléfono, esos 9px son la diferencia entre un
            titular y "Preguntas frecuente / s". El runner del CI lo partió con
            su propia fuente; acá entraba por un pelo.

            Con 4.0vw el margen pasa de 9 a 35px, o sea aguanta una fuente 12%
            más ancha. Y el tope de 2.85rem se toca a 1140px en vez de a 1036,
            así que de ahí para arriba el titular mide exactamente lo mismo que
            antes: lo único que cambia es esa franja de cien píxeles.

            El overflow-wrap vuelve a normal desde lg porque ahí ya no hay
            riesgo de desborde y sí de corte: si algún día no entra, que se
            salga de la caja —eso se ve y se arregla— en vez de partirse en una
            letra suelta, que pasa desapercibido.
          -->
          <h2
            class="titulo max-w-[14ch] text-[clamp(1.4rem,4vw,2.85rem)] lg:[overflow-wrap:normal]"
          >
            Preguntas frecuentes
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
