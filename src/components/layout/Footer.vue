<template>
  <footer class="border-t-[3px] border-lima bg-ink text-white">
    <div class="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr_auto]">
      <div>
        <p class="titular text-[clamp(1.4rem,3vw,2rem)] text-lima">El evento de Deenex</p>
        <p class="mt-4 max-w-[42ch] text-[0.92rem] leading-[1.6] text-white/55">
          Una jornada de innovación, tecnología y marketing para el mercado gastronómico.
          {{ EVENTO.fechaLarga }}, {{ EVENTO.venue }}, Córdoba.
        </p>
      </div>

      <nav class="flex flex-wrap gap-x-12 gap-y-7">
        <div>
          <p class="kicker text-white/35">El evento</p>
          <ul class="mt-4 space-y-2.5">
            <li v-for="l in enlaces" :key="l.id">
              <a
                :href="`#${l.id}`"
                class="text-[0.9rem] font-semibold text-white/70 transition-colors hover:text-lima"
                @click.prevent="ir(l.id)"
                >{{ l.label }}</a
              >
            </li>
          </ul>
        </div>
        <div>
          <p class="kicker text-white/35">Contacto</p>
          <ul class="mt-4 space-y-2.5">
            <li>
              <a
                :href="whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[0.9rem] font-semibold text-white/70 transition-colors hover:text-lima"
                >WhatsApp</a
              >
            </li>
            <li>
              <a
                href="https://deenex.tech/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[0.9rem] font-semibold text-white/70 transition-colors hover:text-lima"
                >deenex.tech</a
              >
            </li>
          </ul>
        </div>
      </nav>

      <a href="#registro" class="btn-cartel self-start text-[0.85rem]" @click.prevent="ir('registro')">
        Reservar mi lugar
      </a>
    </div>

    <div
      class="flex flex-col items-center justify-between gap-3 border-t-[3px] border-white/15 px-8 py-6 sm:flex-row"
    >
      <span class="kicker text-white/35">© {{ anio }} Deenex Technologies · Córdoba</span>
      <span class="kicker text-white/35">{{ EVENTO.fechaCorta }}</span>
    </div>
  </footer>
</template>

<script setup>
import { EVENTO, WHATSAPP_ORGANIZADOR } from "@/data/evento";

const anio = new Date().getFullYear();

const enlaces = [
  { id: "temas", label: "De qué se habla" },
  { id: "jornada", label: "La jornada" },
  { id: "speakers", label: "Quiénes hablan" },
  { id: "para-quien", label: "Para quién es" },
  { id: "lugar", label: "El lugar" },
  { id: "faq", label: "Preguntas" },
];

const whatsapp =
  `https://wa.me/${WHATSAPP_ORGANIZADOR}?text=` +
  encodeURIComponent("Hola! Tengo una consulta sobre el evento de Deenex del 20 de septiembre.");

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
