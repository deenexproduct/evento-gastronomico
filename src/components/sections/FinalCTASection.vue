<template>
  <!--
    Firma de cierre. El argumento de valor ya lo dio VolvesConSection justo
    arriba: acá solo queda la marca, la fecha y la última puerta de entrada.
  -->
  <section class="border-b border-linea py-20 sm:py-24">
    <div class="contenedor">
      <div class="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
        <div>
          <p class="titular text-[clamp(2.4rem,6vw,4.6rem)]">
            <span class="text-violeta-texto">{{ EVENTO.nombre }}</span>
          </p>
          <p class="mt-3 max-w-[26ch] text-[clamp(1.05rem,2vw,1.5rem)] font-medium leading-[1.3] tracking-[-0.02em]">
            {{ EVENTO.bajada }}
          </p>
        </div>

        <dl class="grid gap-x-10 gap-y-5 sm:grid-cols-3 lg:pb-2">
          <div v-for="d in FIRMA" :key="d.rotulo">
            <dt class="rotulo text-gris">{{ d.rotulo }}</dt>
            <dd class="mt-1.5 text-[0.98rem] font-medium">{{ d.valor }}</dd>
          </div>
        </dl>
      </div>

      <div class="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-linea pt-8">
        <a href="#registro" class="btn" @click.prevent="ir('registro')">
          Reservar mi lugar
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M2 8h11M9 3.5L13.5 8 9 12.5"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
        <p class="text-[0.9rem] text-gris">
          Entrada gratuita · Registro obligatorio · No se transmite en vivo
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { EVENTO } from "@/data/evento";

const FIRMA = [
  { rotulo: "Cuándo", valor: `${EVENTO.fechaCorta} · ${EVENTO.horario}` },
  { rotulo: "Dónde", valor: `${EVENTO.venue}, Córdoba` },
  { rotulo: "Organiza", valor: EVENTO.organiza },
];

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
