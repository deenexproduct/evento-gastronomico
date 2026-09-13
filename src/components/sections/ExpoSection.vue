<template>
  <!--
    La edición anterior, en fotos y video.

    Va después del podcast porque a esa altura el lector ya entendió qué es el
    evento; lo que le falta es creer que va a pasar. Una galería de algo que ya
    ocurrió es la prueba que no se puede discutir: no promete, muestra.

    NO SE MONTA SI NO HAY PIEZAS, y la condición vive en el v-if de HomeView
    para que una sección vacía ni siquiera entre al árbol. Es la misma regla
    que traía la sección de reels antes de eliminarse —"no mostramos huecos de
    video, que se leen peor que no tener la sección"— y vale igual acá.

    CARRUSEL Y NO GRILLA. Las fotos de un evento son muchas y desparejas; una
    grilla obliga a elegir cuántas entran y deja filas a medio llenar cada vez
    que se suma una. Deslizando de costado entran las que sean, y en teléfono
    es el gesto natural. El snap deja cada pieza calzada al borde en vez de
    cortada por la mitad.
  -->
  <section id="expo" class="border-b border-linea py-seccion">
    <div class="contenedor">
      <p class="rotulo text-acento-texto">La edición anterior</p>
      <h2 class="titulo mt-4 max-w-[18ch] text-[clamp(1.4rem,4.4vw,2.85rem)]">
        Edición {{ EXPO.edicion }}
      </h2>
      <p class="lectura mt-5 text-[17px] text-gris">
        Así fue la vez anterior: la sala llena, los que hablaron y lo que se
        armó entre bloque y bloque.
      </p>

      <!--
        El overflow va con su propio padding y márgenes negativos para que la
        primera y la última pieza puedan tocar el borde de la pantalla en
        teléfono, en vez de quedar encerradas en el contenedor: un carrusel que
        no llega al borde no se lee como deslizable.
      -->
      <div
        class="mt-10 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0"
        style="scrollbar-width: thin"
      >
        <figure
          v-for="p in piezas"
          :key="p.archivo"
          class="w-[78vw] max-w-[340px] shrink-0 snap-start sm:w-[340px]"
        >
          <!--
            Todas las piezas entran al mismo recorte 4:3, sean foto o video y
            vengan como vengan. Sin un ratio fijo, una foto vertical al lado de
            una horizontal descalibra la fila entera y el carrusel se lee como
            un montón de recortes sueltos.
          -->
          <div class="relative aspect-[4/3] overflow-hidden rounded-2xl bg-acento/10">
            <!--
              preload="none" y poster: el .mp4 no se descarga hasta que alguien
              toca play, así que lo que pesa en la primera carga es sólo la
              imagen. Sin poster el navegador pinta un rectángulo negro, y una
              galería de rectángulos negros se lee peor que no tener galería.
            -->
            <video
              v-if="p.tipo === 'video'"
              :src="p.src"
              :poster="p.posterSrc || undefined"
              class="h-full w-full object-cover"
              playsinline
              preload="none"
              controls
            ></video>
            <img
              v-else
              :src="p.src"
              :alt="p.texto || `Foto de la edición ${EXPO.edicion}`"
              class="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />

            <!--
              El distintivo de video va sobre la esquina y no sobre el centro:
              en el centro tapa justo lo que la miniatura tiene para mostrar, y
              además compite con el botón de play que el navegador dibuja solo.
            -->
            <span
              v-if="p.tipo === 'video'"
              class="pointer-events-none absolute right-3 top-3 rounded-full bg-noche/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm"
            >
              Video
            </span>
          </div>

          <figcaption v-if="p.texto" class="mt-3 text-[15px] leading-[1.45] text-gris">
            {{ p.texto }}
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { EXPO } from "@/data/evento";

/*
  Fotos y videos se resuelven con import.meta.glob, igual que los logos y los
  retratos: entran al build con su hash y el dato sólo guarda el nombre del
  archivo. Son dos carpetas porque son dos tipos de peso muy distintos y
  conviene verlos separados al mirar qué está pesando.
*/
const imagenes = import.meta.glob("@/assets/images/expo/*", { eager: true, import: "default" });
const videos = import.meta.glob("@/assets/video/*", { eager: true, import: "default" });

function resolver(mapa, nombre) {
  if (!nombre) return "";
  const clave = Object.keys(mapa).find((k) => k.endsWith(`/${nombre}`));
  return clave ? mapa[clave] : "";
}

/*
  Se descarta lo que no tenga archivo de verdad.

  Un nombre mal escrito en el dato —una extensión cambiada, una tilde— no puede
  dejar un hueco en la galería: la pieza directamente no se muestra. Es
  preferible una galería con una foto menos que una con un recuadro vacío, y es
  la misma decisión que tomaba la sección de reels.
*/
const piezas = computed(() =>
  (EXPO.piezas || [])
    .map((p) => ({
      ...p,
      src: resolver(p.tipo === "video" ? videos : imagenes, p.archivo),
      posterSrc: resolver(imagenes, p.poster),
    }))
    .filter((p) => p.src)
);
</script>
