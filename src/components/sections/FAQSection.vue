<template>
  <section id="faq" class="relative bg-white py-24 sm:py-32">
    <div class="mx-auto w-full max-w-[1240px] px-6 sm:px-8">
      <div class="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
        <!-- Header -->
        <div>
          <span
            class="inline-block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary font-bold mb-5"
          >
            Preguntas
          </span>
          <h2
            class="font-heading text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.1] tracking-tighter text-slate-900"
          >
            Lo que
            <em class="font-light italic text-primary">siempre nos preguntan.</em>
          </h2>
          <p class="mt-6 text-[0.98rem] leading-[1.7] text-slate-500">
            ¿Te quedó algo afuera? Escribinos por WhatsApp y te lo respondemos.
          </p>
          <a
            :href="whatsappConsultas"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-5 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-primary hover:underline"
          >
            Preguntar por WhatsApp
            <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
              <path
                d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>

        <!-- Acordeón -->
        <div class="divide-y divide-slate-200 border-y border-slate-200">
          <div v-for="(item, i) in FAQ" :key="i">
            <button
              type="button"
              class="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-primary"
              :aria-expanded="abierto === i"
              :aria-controls="`faq-panel-${i}`"
              @click="toggle(i)"
            >
              <span
                class="font-heading text-[1.02rem] font-bold tracking-tight text-slate-900 sm:text-[1.1rem]"
                >{{ item.q }}</span
              >
              <span
                class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-slate-200 transition-all duration-300"
                :class="abierto === i ? 'rotate-45 border-primary bg-primary text-white' : 'text-slate-400'"
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 2v8M2 6h8"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
            </button>

            <div
              :id="`faq-panel-${i}`"
              class="grid transition-all duration-400 ease-out"
              :class="abierto === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
            >
              <div class="overflow-hidden">
                <p class="pb-6 pr-10 text-[0.95rem] leading-[1.7] text-slate-500">{{ item.a }}</p>
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
import { FAQ } from "@/data/evento";

const abierto = ref(0);

function toggle(i) {
  abierto.value = abierto.value === i ? -1 : i;
}

const whatsappConsultas =
  "https://wa.me/5491154596266?text=" +
  encodeURIComponent("Hola! Tengo una consulta sobre el evento de Deenex del 20 de septiembre.");
</script>
