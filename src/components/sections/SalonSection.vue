<template>
  <section id="salon" class="border-b border-linea py-20 sm:py-28">
    <div class="contenedor">
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-violeta-texto">El salón</p>
        </div>
        <div class="lg:col-span-9">
          <h2 class="titular max-w-[18ch] text-[clamp(1.9rem,4vw,3.2rem)]">
            Una sala propia para doscientos dueños.
          </h2>
        </div>
      </div>

      <div class="mt-12 aspect-[16/7] w-full overflow-hidden bg-papel-2">
        <FotoSlot
          :src="fotoSalon"
          :alt="`Salón del ${EVENTO.venue}, sede del evento`"
          etiqueta="Foto del salón — Hotel Quinto Centenario"
        />
      </div>

      <dl class="mt-10 grid gap-x-8 border-t border-linea sm:grid-cols-3">
        <div
          v-for="(d, i) in CONTEXTO"
          :key="d.titulo"
          class="border-linea py-8"
          :class="i > 0 ? 'sm:border-l sm:pl-8' : ''"
        >
          <dd class="titular text-[clamp(1.5rem,2.8vw,2rem)] text-violeta-texto">{{ d.dato }}</dd>
          <dt class="rotulo mt-2.5">{{ d.titulo }}</dt>
          <p class="mt-2 max-w-[36ch] text-[0.92rem] leading-[1.6] text-gris">{{ d.texto }}</p>
        </div>
      </dl>
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
    texto: "GastroTech no comparte salón con nadie. El cupo del evento es, literalmente, el del salón.",
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
    texto: "En Córdoba capital, con todo el movimiento del evento madre alrededor de la sala.",
  },
];
</script>
