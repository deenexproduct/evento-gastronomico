<template>
  <section id="lugar" class="bg-ink text-white">
    <div class="grid lg:grid-cols-[.9fr_1.1fr]">
      <!-- Datos -->
      <div class="border-b-[3px] border-white/20 p-8 sm:p-12 lg:border-b-0 lg:border-r-[3px]">
        <p class="kicker text-lima">Cómo llegar</p>
        <h2 class="titular mt-6 text-[clamp(2rem,5.4vw,3.6rem)]">
          {{ EVENTO.venue }},<br /><span class="text-lima">Córdoba.</span>
        </h2>

        <dl class="mt-10 grid gap-[3px] bg-white/20">
          <div v-for="d in DATOS" :key="d.label" class="bg-ink py-5">
            <dt class="kicker text-white/40">{{ d.label }}</dt>
            <dd class="titular mt-2 text-[clamp(1.1rem,2.4vw,1.5rem)]">{{ d.valor }}</dd>
          </div>
        </dl>
      </div>

      <!-- Mapa -->
      <div class="relative min-h-[420px]">
        <iframe
          :src="mapaSrc"
          class="absolute inset-0 h-full w-full"
          style="border: 0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Ubicación del evento en Córdoba"
        ></iframe>
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
  encodeURIComponent(`${EVENTO.venue}, Córdoba, Argentina`) +
  "&z=14&output=embed";
</script>
