<template>
  <!--
    Los datos van en el orden real de la ansiedad logística: dónde es, cómo
    llego, dónde dejo el auto, a qué hora aparezco. "Dónde estaciono" está
    documentado como causa de ausencia en eventos gratuitos.
  -->
  <section id="lugar" class="py-seccion">
    <div class="contenedor">
      <div class="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p class="rotulo text-acento-texto">Cómo llegar</p>
          <h2 class="titulo mt-4 text-[clamp(1.9rem,5.6vw,3.2rem)]">
            {{ EVENTO.venue }}, Córdoba
          </h2>
          <p class="mt-5 max-w-[44ch] text-[17px] text-gris">
            Salón propio de 200 m² dentro del centro de convenciones. El cupo del evento es,
            literalmente, la capacidad de la sala.
          </p>

          <dl class="mt-10 grid gap-3">
            <div v-for="d in DATOS" :key="d.label" class="tarjeta flex items-start gap-4 p-5">
              <span
                class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-acento/12 text-acento-texto"
              >
                <Pictograma :nombre="d.icono" :tam="19" />
              </span>
              <div class="min-w-0">
                <dt class="text-[13px] font-black uppercase tracking-[0.1em] text-gris">
                  {{ d.label }}
                </dt>
                <dd class="mt-1 text-[17px] font-bold leading-snug">{{ d.valor }}</dd>
                <p v-if="d.nota" class="mt-1 text-[14px] leading-snug text-gris">{{ d.nota }}</p>
              </div>
            </div>
          </dl>

          <a
            :href="comoLlegar"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-linea mt-8"
          >
            Abrir en Google Maps
            <Pictograma nombre="flecha" :tam="17" />
          </a>
        </div>

        <!-- Mapa -->
        <div class="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10 lg:min-h-full">
          <iframe
            :src="mapaSrc"
            class="absolute inset-0 h-full w-full"
            style="border: 0; filter: grayscale(1) invert(0.92) contrast(0.9)"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Ubicación del evento en Córdoba"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { EVENTO } from "@/data/evento";
import Pictograma from "@/components/ui/Pictograma.vue";

const DATOS = [
  {
    icono: "lugar",
    label: "Dirección",
    valor: `${EVENTO.direccion}, Córdoba capital`,
    nota: "Confirmar con producción antes de publicar.",
  },
  {
    icono: "calendario",
    label: "Cuándo",
    valor: "Domingo 20 de septiembre de 2026",
  },
  {
    icono: "reloj",
    label: "Horario",
    valor: "De 9 a 18 h",
    nota: "Acreditación desde las 8:30. Entrás y salís cuando quieras.",
  },
  {
    icono: "entrada",
    label: "Entrada",
    valor: "Sin costo, con registro previo",
    nota: "El código de acceso llega por mail y se escanea en la puerta.",
  },
];

const comoLlegar =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(`${EVENTO.venue}, ${EVENTO.direccion}, Córdoba, Argentina`);

const mapaSrc =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(`${EVENTO.venue}, ${EVENTO.direccion}, Córdoba, Argentina`) +
  "&z=15&output=embed";
</script>
