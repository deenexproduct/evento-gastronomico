<!--
  El podcast, con sección propia.

  Se presenta como lo que es para el que lee: un podcast que se graba adentro
  del evento, con referentes del rubro. Decía "el podcast de Deenex" y "Deenex
  abre su podcast", que es la misma postura que se sacó del hero —la empresa
  como sujeto de lo que pasa—, y encima en la sección donde más ajena suena:
  el lector no puede entrar a una sala que se presenta como de otro.

  Quién lo produce no se esconde: sigue dicho abajo, donde se cuenta por dónde
  sale después. Lo que cambia es que ya no abre la sección.

  Va DESPUÉS de la jornada a propósito: primero el lector sabe qué se va a
  hablar en el escenario, y recién entonces se le cuenta que además hay algo
  que no está en la grilla.

  Sobre los nombres: sólo Alan está confirmado. La grilla del 30/08 dejó el
  podcast fuera del programa y todavía no tiene franja, ni conductor, ni los
  otros invitados — publicar una hora o un nombre sería prometer algo que no
  está decidido.
-->
<template>
  <section id="podcast" class="py-seccion">
    <div class="contenedor">
      <div class="marco">
        <span class="halo" aria-hidden="true"></span>

        <div class="relative">
          <p class="rotulo text-acento-texto">Podcast</p>

          <h2 class="titulo mt-4 max-w-[19ch] text-[clamp(1.4rem,4.4vw,2.85rem)]">
            Un podcast con referentes, grabado ahí adentro
          </h2>

          <p class="mt-6 max-w-[58ch] text-[1.05rem] leading-[1.6] text-gris">
            Una sala privada, dentro del evento, donde
            <span class="texto-deenex font-bold">referentes del rubro</span> se sientan a conversar
            sobre el impacto de la tecnología en la gastronomía y sobre lo que va apareciendo
            alrededor. Conduce Alan Tapia.
          </p>

          <ul class="mt-8 grid gap-3 sm:grid-cols-3">
            <li v-for="p in puntos" :key="p" class="punto-podcast">{{ p }}</li>
          </ul>

          <!--
            "el programa final" y no "la grilla final": la página dejó de
            publicar el cronograma hora por hora, y prometer una grilla que
            nunca se va a ver deja al lector esperando algo que no llega.
          -->
          <p class="mt-7 text-[14px] leading-[1.55] text-gris-2">
            Los invitados y el momento del día se anuncian con el programa final.
          </p>

          <!--
            LA EDICIÓN ANTERIOR, ADENTRO DE ESTE MISMO MARCO.

            Estuvo un rato como sección propia debajo y estaba mal leído: acá
            el material no es del evento en general sino DE ESTE PODCAST, y
            separarlo lo convertía en dos cosas distintas que se explican dos
            veces. Adentro del marco es lo que es: la sección promete una sala
            donde pasa algo, y abajo muestra esa misma sala la vez anterior.

            El filete de arriba lo separa sin abrirle una sección: es el mismo
            bloque, dos momentos.
          -->
          <div v-if="hayExpo" class="mt-10 border-t border-acento/20 pt-8">
            <p class="rotulo text-gris-2">Edición {{ EXPO.edicion }}</p>
            <p class="mt-3 max-w-[52ch] text-[15px] leading-[1.55] text-gris">
              Así se grabó la vez anterior.
            </p>

            <!--
              Se sale del padding del marco con márgenes negativos para que el
              carrusel llegue al borde: encerrado adentro no se lee como algo
              que se desliza. El padding se devuelve por dentro para que la
              primera pieza arranque alineada con el texto.

              LOS NÚMEROS SON LOS DEL MARCO, no unos parecidos: 1.75rem en
              teléfono y 3rem de 640 para arriba, que es lo que dice .marco
              abajo en este mismo archivo. Con 2rem —que fue el primer intento—
              el carrusel se salía 4px de más y la primera pieza arrancaba en
              17px mientras el texto arrancaba en 49: cortada contra el borde
              en vez de alineada con el rótulo. El overflow:hidden del marco la
              recortaba y se leía como un error de carga.

              Y EL scroll-pl NO SOBRA. Con snap-mandatory y sin él, el navegador
              alinea al borde del contenedor y no al del padding, así que la
              galería aparecía YA CORRIDA 28px al cargar la página —medido:
              scrollLeft 28 en reposo, la primera pieza en 21 con el rótulo en
              49—. Se leía como si alguien la hubiera deslizado antes de llegar.
            -->
            <div
              class="-mx-7 mt-6 flex snap-x snap-mandatory scroll-pl-7 gap-3 overflow-x-auto px-7 pb-3 sm:-mx-12 sm:scroll-pl-12 sm:px-12"
              style="scrollbar-width: thin"
            >
              <figure
                v-for="pieza in piezas"
                :key="pieza.archivo"
                class="w-[68vw] max-w-[260px] shrink-0 snap-start sm:w-[260px]"
              >
                <!--
                  Todas al mismo recorte 4:3, sean foto o video: sin un ratio
                  fijo una vertical al lado de una horizontal descalibra la
                  fila entera.
                -->
                <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-acento/10">
                  <!--
                    preload="none" y poster: el .mp4 no se baja hasta que
                    alguien toca play, así que en la primera carga sólo pesan
                    las imágenes. Sin poster el navegador pinta un rectángulo
                    negro, y una fila de rectángulos negros se lee peor que no
                    tener nada.
                  -->
                  <video
                    v-if="pieza.tipo === 'video'"
                    :src="pieza.src"
                    :poster="pieza.posterSrc || undefined"
                    class="h-full w-full object-cover"
                    playsinline
                    preload="none"
                    controls
                  ></video>
                  <img
                    v-else
                    :src="pieza.src"
                    :alt="pieza.texto || `Foto de la edición ${EXPO.edicion}`"
                    class="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <span
                    v-if="pieza.tipo === 'video'"
                    class="pointer-events-none absolute right-2 top-2 rounded-full bg-noche/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm"
                  >
                    Video
                  </span>
                </div>
                <figcaption v-if="pieza.texto" class="mt-2 text-[13px] leading-[1.4] text-gris-2">
                  {{ pieza.texto }}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { EXPO } from "@/data/evento";

/*
  Las piezas de la edición anterior: fotos en assets/images/expo y videos en
  assets/video, resueltas con import.meta.glob para que entren al build con su
  hash. El dato sólo guarda el nombre del archivo.

  Se descarta lo que no tenga archivo de verdad: un nombre mal escrito —una
  extensión cambiada, una tilde— no puede dejar un hueco en la fila. Es
  preferible una pieza menos que un recuadro vacío.
*/
const imagenes = import.meta.glob("@/assets/images/expo/*", { eager: true, import: "default" });
const videos = import.meta.glob("@/assets/video/*", { eager: true, import: "default" });

function resolver(mapa, nombre) {
  if (!nombre) return "";
  const clave = Object.keys(mapa).find((k) => k.endsWith(`/${nombre}`));
  return clave ? mapa[clave] : "";
}

const piezas = computed(() =>
  (EXPO.piezas || [])
    .map((p) => ({
      ...p,
      src: resolver(p.tipo === "video" ? videos : imagenes, p.archivo),
      posterSrc: resolver(imagenes, p.poster),
    }))
    .filter((p) => p.src)
);
const hayExpo = computed(() => piezas.value.length > 0);

/* Los tres puntos no repiten lo que ya dice el párrafo de arriba: la sala
   privada y quién conduce están ahí, así que acá va lo que falta.

   El tercero es el único lugar de la sección donde se nombra a Deenex, y
   corresponde: es un dato verificable —por dónde sale el episodio después— y
   no la autoría del espacio. */
const puntos = [
  "Sala privada, por invitación",
  "Conversación entre referentes del rubro",
  "Después sale por los canales de Deenex",
];
</script>

<style scoped>
/*
  Una sola caja ancha en vez de la grilla del resto de la página: el cambio de
  ritmo es lo que hace que la sección se lea como un aparte y no como el
  siguiente ítem de una lista.
*/
.marco {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid color-mix(in srgb, var(--acento, #695ede) 24%, transparent);
  background: color-mix(in srgb, var(--acento, #695ede) 5%, transparent);
  padding: 2.25rem 1.75rem;
}
@media (min-width: 640px) {
  .marco { padding: 3.25rem 3rem; }
}

/* El mismo humo violeta del titular, quieto: liga las dos piezas sin repetir
   la animación, que acá distraería del texto. */
.halo {
  position: absolute;
  z-index: 0;
  top: -40%;
  right: -15%;
  width: 34rem;
  height: 34rem;
  pointer-events: none;
  border-radius: 999px;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--acento, #695ede) 30%, transparent),
    transparent 68%
  );
  filter: blur(46px);
}

.punto-podcast {
  padding: 0.85rem 1.1rem;
  border-radius: 12px;
  border: 1px solid var(--linea, #e7e4f0);
  background: var(--papel, #fff);
  font-size: 0.95rem;
  line-height: 1.4;
  font-weight: 500;
}
</style>
