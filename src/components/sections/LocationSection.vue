<template>
  <section id="lugar" class="border-b border-linea py-20 sm:py-28">
    <div class="contenedor">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-acento-texto">Cómo llegar</p>
        </div>

        <div class="lg:col-span-4">
          <h2 class="titular text-[clamp(1.7rem,3.2vw,2.5rem)]">
            {{ EVENTO.venue }}, Córdoba.
          </h2>

          <dl class="mt-8 border-t border-linea">
            <div v-for="d in DATOS" :key="d.label" class="border-b border-linea py-4">
              <dt class="rotulo text-gris">{{ d.label }}</dt>
              <dd class="mt-1.5 text-[0.98rem] font-medium">{{ d.valor }}</dd>
            </div>
          </dl>
        </div>

        <div class="lg:col-span-5">
          <div class="h-full min-h-[340px] w-full border border-linea">
            <iframe
              :src="mapaSrc"
              class="h-full min-h-[340px] w-full"
              style="border: 0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Ubicación del evento en Córdoba"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { EVENTO } from "@/data/evento";

const DATOS = [
  { label: "Dirección", valor: `${EVENTO.direccion}, Córdoba` },
  { label: "Fecha", valor: EVENTO.fechaLarga },
  { label: "Horario", valor: `${EVENTO.horario} · puertas 9:00` },
  { label: "Entrada", valor: "Gratuita con registro previo" },
];

// Mapa embebido sin API key: modo `q` de Google Maps.
const mapaSrc =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(`${EVENTO.venue}, ${EVENTO.direccion}, Córdoba, Argentina`) +
  "&z=15&output=embed";
</script>
