<template>
  <!--
    El referente embebe reels verticales 9:16 dentro de la landing. Es lo que
    le da movimiento sin costo de producción extra, porque el material se
    genera igual para redes.

    Para enchufarlos: dejar los .mp4 en src/assets/video/ y completar REELS
    en evento.js. Mientras estén vacíos, la sección no se renderiza — no
    mostramos huecos de video, que se leen peor que no tener la sección.
  -->
  <section v-if="hayReels" id="reels" class="py-seccion">
    <div class="contenedor">
      <p class="rotulo text-gris">De qué se trata</p>
      <h2 class="titulo mt-4 max-w-[18ch] text-[clamp(1.9rem,5.6vw,3.2rem)]">
        Alan lo cuenta en un minuto
      </h2>
      <p class="lectura mt-5 text-[17px] text-gris">
        Sin vueltas: qué se va a hablar el 19 de septiembre y por qué te conviene estar.
      </p>

      <!-- Carrusel horizontal: en celular se desliza, no se apila -->
      <div
        class="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
        style="scrollbar-width: thin"
      >
        <figure
          v-for="r in reels"
          :key="r.archivo"
          class="w-[76vw] max-w-[300px] shrink-0 snap-start sm:w-[300px]"
        >
          <div class="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <video
              :src="r.src"
              :poster="r.poster"
              class="h-full w-full object-cover"
              playsinline
              muted
              loop
              preload="none"
              controls
            ></video>
          </div>
          <figcaption class="mt-3 text-[15px] font-semibold leading-snug">
            {{ r.titulo }}
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { REELS } from "@/data/evento";

const videos = import.meta.glob("@/assets/video/*", { eager: true, import: "default" });

function resolver(nombre) {
  if (!nombre) return "";
  const clave = Object.keys(videos).find((k) => k.endsWith(`/${nombre}`));
  return clave ? videos[clave] : "";
}

const reels = computed(() =>
  REELS.map((r) => ({ ...r, src: resolver(r.archivo), poster: resolver(r.poster) })).filter(
    (r) => r.src
  )
);
const hayReels = computed(() => reels.value.length > 0);
</script>
