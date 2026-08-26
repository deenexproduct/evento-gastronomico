<template>
  <section id="faq" class="border-b border-linea py-20 sm:py-28">
    <div class="contenedor">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <p class="rotulo text-acento-texto">Preguntas</p>
          <h2 class="titulo mt-5 max-w-[16ch] text-[clamp(1.7rem,3.2vw,2.4rem)]">
            Lo que siempre nos preguntan.
          </h2>
          <p class="mt-6 text-[0.95rem] leading-[1.6] text-gris">
            ¿Te quedó algo afuera? Escribinos y te lo respondemos.
          </p>
          <a
            :href="whatsappConsultas"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-2 inline-flex min-h-[44px] items-center text-[0.9rem] font-semibold text-acento-texto underline underline-offset-4"
          >
            Preguntar por WhatsApp
          <span class="sr-only"> (abre en una pestaña nueva)</span></a>
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
import { ref } from "vue";
import { FAQ, linkWa } from "@/data/evento";

const abierto = ref(0);

function toggle(i) {
  abierto.value = abierto.value === i ? -1 : i;
}

const whatsappConsultas = linkWa("consulta");
</script>
