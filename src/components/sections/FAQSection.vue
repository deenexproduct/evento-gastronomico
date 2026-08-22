<template>
  <section id="faq" class="border-b border-linea py-20 sm:py-28">
    <div class="contenedor">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-acento-texto">Preguntas</p>
          <h2 class="titular mt-5 max-w-[14ch] text-[clamp(1.7rem,3.2vw,2.4rem)]">
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
          </a>
        </div>

        <div class="lg:col-span-9">
          <div class="border-t border-linea">
            <div v-for="(item, i) in FAQ" :key="i" class="border-b border-linea">
              <h3>
                <button
                  type="button"
                  class="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-acento-texto"
                  :aria-expanded="abierto === i"
                  :aria-controls="`faq-panel-${i}`"
                  @click="toggle(i)"
                >
                  <span class="text-[1rem] font-semibold tracking-[-0.02em] sm:text-[1.08rem]">
                    {{ item.q }}
                  </span>
                  <span
                    class="mt-0.5 shrink-0 text-[1.3rem] leading-none text-acento-texto transition-transform duration-300"
                    :class="abierto === i ? 'rotate-45' : ''"
                    aria-hidden="true"
                    >+</span
                  >
                </button>
              </h3>

              <div
                :id="`faq-panel-${i}`"
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
import { FAQ, WHATSAPP_ORGANIZADOR } from "@/data/evento";

const abierto = ref(0);

function toggle(i) {
  abierto.value = abierto.value === i ? -1 : i;
}

const whatsappConsultas =
  `https://wa.me/${WHATSAPP_ORGANIZADOR}?text=` +
  encodeURIComponent("Hola! Tengo una consulta sobre el evento de Deenex del 20 de septiembre.");
</script>
