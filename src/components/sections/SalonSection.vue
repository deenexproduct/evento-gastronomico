<template>
  <section id="salon" class="relative bg-ink">
    <!-- Foto a sangre -->
    <div class="relative h-[52vh] min-h-[340px] w-full overflow-hidden border-y-[3px] border-lima">
      <FotoSlot
        :src="fotoSalon"
        alt="Salón del Hotel Quinto Centenario, sede del evento"
        etiqueta="Foto del salón — Hotel Quinto Centenario"
        oscuro
      />

      <!-- Placa sobre la foto -->
      <div class="absolute inset-x-0 bottom-0 p-5 sm:p-8">
        <div class="inline-block max-w-full bg-lima px-5 py-4 text-ink sm:px-7 sm:py-5">
          <p class="kicker opacity-60">El lugar</p>
          <p class="titular mt-1.5 text-[clamp(1.5rem,4.2vw,2.6rem)]">
            {{ EVENTO.venue }}
          </p>
          <p class="mt-1.5 text-[0.9rem] font-semibold">
            Salón propio de 200 m² · Córdoba · {{ EVENTO.horario }}
          </p>
        </div>
      </div>
    </div>

    <!-- Contexto -->
    <div class="grid gap-[3px] bg-white/20 sm:grid-cols-3">
      <div v-for="d in CONTEXTO" :key="d.titulo" class="bg-ink p-8">
        <p class="titular text-[clamp(1.6rem,3.4vw,2.2rem)] text-lima">{{ d.dato }}</p>
        <h3 class="kicker mt-4 text-white">{{ d.titulo }}</h3>
        <p class="mt-2.5 text-[0.92rem] leading-[1.55] text-white/55">{{ d.texto }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { EVENTO, FOTOS } from "@/data/evento";
import FotoSlot from "@/components/ui/FotoSlot.vue";

const archivos = import.meta.glob("@/assets/images/lugar/*", { eager: true, import: "default" });

const fotoSalon = computed(() => {
  if (!FOTOS.salon) return "";
  const clave = Object.keys(archivos).find((k) => k.endsWith(`/${FOTOS.salon}`));
  return clave ? archivos[clave] : "";
});

const CONTEXTO = [
  {
    dato: "200 m²",
    titulo: "Una sala propia y cerrada",
    texto: "No compartimos salón con nadie. El cupo del evento es, literalmente, el del salón.",
  },
  {
    dato: EVENTO.eventoMadreCirculacion,
    titulo: `Circulan por ${EVENTO.eventoMadre}`,
    texto:
      "Nuestra sala está adentro de un evento multisala por el que pasa esa cantidad de gente durante el día.",
  },
  {
    dato: "Córdoba",
    titulo: EVENTO.direccion,
    texto:
      "En Córdoba capital, con todo el movimiento del evento madre alrededor de nuestra sala.",
  },
];
</script>
