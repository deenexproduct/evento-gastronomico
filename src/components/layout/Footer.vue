<template>
  <footer class="relative border-t border-slate-200 bg-white">
    <div class="mx-auto max-w-6xl px-6 py-12 sm:px-8">
      <div class="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <!-- Marca -->
        <div class="max-w-sm">
          <div class="flex items-center gap-2.5">
            <span class="h-2 w-2 rounded-full bg-primary"></span>
            <span class="font-heading text-[1rem] font-extrabold tracking-tight text-slate-900">
              El evento de Deenex
            </span>
          </div>
          <p class="mt-3 text-[0.88rem] leading-[1.6] text-slate-500">
            Una jornada de innovación, tecnología y marketing para el mercado gastronómico.
            {{ EVENTO.fechaLarga }}, {{ EVENTO.venue }}, Córdoba.
          </p>
        </div>

        <!-- Navegación -->
        <nav class="flex flex-wrap gap-x-10 gap-y-6">
          <div>
            <span
              class="font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-slate-400"
              >El evento</span
            >
            <ul class="mt-3 space-y-2">
              <li v-for="l in enlaces" :key="l.id">
                <a
                  :href="`#${l.id}`"
                  class="text-[0.85rem] text-slate-600 transition-colors hover:text-primary"
                  @click.prevent="ir(l.id)"
                  >{{ l.label }}</a
                >
              </li>
            </ul>
          </div>

          <div>
            <span
              class="font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-slate-400"
              >Contacto</span
            >
            <ul class="mt-3 space-y-2">
              <li>
                <a
                  :href="whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[0.85rem] text-slate-600 transition-colors hover:text-primary"
                  >WhatsApp</a
                >
              </li>
              <li>
                <a
                  href="https://deenex.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[0.85rem] text-slate-600 transition-colors hover:text-primary"
                  >deenex.tech</a
                >
              </li>
            </ul>
          </div>
        </nav>

        <!-- CTA -->
        <a
          href="#registro"
          @click.prevent="ir('registro')"
          class="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-slate-900 px-5 py-3 text-[0.85rem] font-bold text-white transition-colors hover:bg-primary"
        >
          Reservar mi lugar
          <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
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

      <div
        class="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-7 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-slate-400 sm:flex-row"
      >
        <span>© {{ anio }} Deenex Technologies · Córdoba</span>
        <span>{{ EVENTO.fechaCorta }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { EVENTO } from "@/data/evento";

const anio = new Date().getFullYear();

const enlaces = [
  { id: "diagnostico", label: "El diagnóstico" },
  { id: "que-te-llevas", label: "Qué más te llevás" },
  { id: "jornada", label: "La jornada" },
  { id: "speakers", label: "Quiénes hablan" },
  { id: "lugar", label: "El lugar" },
  { id: "faq", label: "Preguntas" },
];

const whatsapp =
  "https://wa.me/5491154596266?text=" +
  encodeURIComponent("Hola! Tengo una consulta sobre el evento de Deenex del 20 de septiembre.");

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
