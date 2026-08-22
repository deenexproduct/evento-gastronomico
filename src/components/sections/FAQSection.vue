<template>
  <section id="faq" class="bg-hueso text-ink">
    <div class="px-5 py-16 sm:px-8 sm:py-20">
      <p class="kicker opacity-50">Preguntas</p>
      <h2 class="titular mt-6 max-w-[13ch] text-[clamp(2.4rem,8vw,6rem)]">
        Lo que siempre <span class="text-fuego">nos preguntan.</span>
      </h2>
    </div>

    <div class="border-t-[3px] border-ink">
      <div v-for="(item, i) in FAQ" :key="i" class="border-b-[3px] border-ink">
        <button
          type="button"
          class="flex w-full items-start justify-between gap-6 px-5 py-6 text-left transition-colors sm:px-8"
          :class="abierto === i ? 'bg-lima' : 'hover:bg-ink/[0.04]'"
          :aria-expanded="abierto === i"
          :aria-controls="`faq-panel-${i}`"
          @click="toggle(i)"
        >
          <span class="titular text-[clamp(1.05rem,2.6vw,1.7rem)]">{{ item.q }}</span>
          <span
            class="mt-1 shrink-0 text-[1.5rem] leading-none transition-transform duration-300"
            :class="abierto === i ? 'rotate-45' : ''"
            >+</span
          >
        </button>

        <div
          :id="`faq-panel-${i}`"
          class="grid transition-all duration-300 ease-out"
          :class="abierto === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        >
          <div class="overflow-hidden">
            <p class="max-w-[70ch] px-5 pb-7 text-[1rem] leading-[1.65] text-ink/70 sm:px-8">
              {{ item.a }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-5 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <p class="text-[1rem] font-semibold">¿Te quedó algo afuera? Escribinos.</p>
      <a
        :href="whatsappConsultas"
        target="_blank"
        rel="noopener noreferrer"
        class="kicker shrink-0 border-b-2 border-fuego pb-1 text-fuego"
      >
        Preguntar por WhatsApp →
      </a>
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
