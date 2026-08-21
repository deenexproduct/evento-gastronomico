<template>
  <section id="lugar" class="relative py-24 sm:py-32">
    <div class="mx-auto w-full max-w-[1240px] px-6 sm:px-8">
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
        <!-- Copy -->
        <div>
          <span
            class="inline-block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary font-bold mb-5"
          >
            El lugar
          </span>
          <h2
            class="font-heading text-[clamp(1.8rem,3.6vw,3rem)] font-extrabold leading-[1.1] tracking-tighter text-slate-900"
          >
            {{ EVENTO.venue }},
            <em class="font-light italic text-primary">Córdoba.</em>
          </h2>

          <p class="mt-6 text-[1.05rem] leading-[1.7] text-slate-500">
            Un salón propio de 200 m². El cupo del evento es, literalmente, el cupo del salón:
            entran 200 personas y no hay forma de estirarlo.
          </p>

          <p class="mt-4 text-[1.05rem] leading-[1.7] text-slate-500">
            Está dentro de <span class="font-semibold text-slate-900">{{ EVENTO.eventoMadre }}</span
            >, un evento multisala por el que circulan unas
            {{ EVENTO.eventoMadreCirculacion }} personas a lo largo de la jornada. Nuestro salón es
            una sala cerrada adentro de ese movimiento.
          </p>

          <!-- Datos -->
          <dl class="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-slate-200">
            <div v-for="d in DATOS" :key="d.label" class="bg-white p-6">
              <dt
                class="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-slate-400"
              >
                {{ d.label }}
              </dt>
              <dd class="mt-2 font-heading text-[1.05rem] font-bold tracking-tight text-slate-900">
                {{ d.valor }}
              </dd>
            </div>
          </dl>
        </div>

        <!-- Mapa -->
        <div class="relative">
          <div
            class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50"
          >
            <iframe
              :src="mapaSrc"
              class="h-[380px] w-full sm:h-[460px]"
              style="border: 0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Ubicación del evento en Córdoba"
            ></iframe>
          </div>

          <div
            class="absolute -bottom-5 left-5 right-5 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-xl shadow-slate-300/30 backdrop-blur-sm sm:left-8 sm:right-auto sm:max-w-[300px]"
          >
            <div class="flex items-start gap-3.5">
              <span
                class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  class="text-primary"
                  stroke="currentColor"
                  stroke-width="1.7"
                >
                  <path d="M10 18s6-5.2 6-9.4A6 6 0 004 8.6C4 12.8 10 18 10 18z" />
                  <circle cx="10" cy="8.4" r="2.1" />
                </svg>
              </span>
              <div class="min-w-0">
                <p class="font-heading text-[0.95rem] font-bold tracking-tight text-slate-900">
                  {{ EVENTO.venue }}
                </p>
                <p class="mt-0.5 text-[0.82rem] leading-snug text-slate-500">
                  Córdoba, Argentina · {{ EVENTO.horario }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { EVENTO } from "@/data/evento";

const DATOS = [
  { label: "Fecha", valor: EVENTO.fechaLarga },
  { label: "Horario", valor: `${EVENTO.horario} · puertas 9:00` },
  { label: "Salón", valor: `${EVENTO.salon} · 200 personas` },
  { label: "Entrada", valor: "Gratuita con registro previo" },
];

// Mapa embebido sin API key: modo `q` de Google Maps.
const mapaSrc =
  "https://www.google.com/maps?q=" +
  encodeURIComponent("Hotel Quinto Centenario, Córdoba, Argentina") +
  "&z=14&output=embed";
</script>
