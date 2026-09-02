<template>
  <!--
    Barra de partners inmediatamente después del hero, como hace el referente
    con sus "Main partners". Es prueba social temprana: dice quién respalda el
    evento antes de que el visitante tenga que leer nada.

    Sin archivo de logo se muestra el nombre en tipografía. Un nombre bien
    puesto se lee mejor que un recuadro vacío esperando una imagen.

    El logo va más alto que el cuerpo del nombre a propósito. Una marca real
    gasta parte de su alto en aire y en el ícono; el nombre tipografiado son
    puras versales, que ocupan todo. Al mismo alto de caja el logo se lee
    chico al lado del texto. Cuando entren los tres esto se vuelve a emparejar.
  -->
  <section id="respaldan" class="border-y border-white/10 bg-noche-2 py-10 sm:py-12">
    <div class="contenedor">
      <p class="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-gris-2">
        Participan
      </p>

      <!--
        La lista va DOS veces: la segunda es la que evita el salto cuando el
        bucle vuelve al principio. La copia es aria-hidden para que un lector
        de pantalla no anuncie ocho marcas donde hay cuatro.
      -->
      <div class="marco-logos mt-8">
        <div class="cinta-logos">
          <div
            v-for="(vuelta, v) in 2"
            :key="v"
            class="flex shrink-0 items-center gap-x-12 pr-12 sm:gap-x-16 sm:pr-16"
            :aria-hidden="v === 1 ? 'true' : undefined"
          >
            <template v-for="p in partnersBarra" :key="p.nombre + v">
              <img
                v-if="p.src"
                :src="p.src"
                :alt="v === 0 ? p.nombre : ''"
                class="h-11 w-auto max-w-[170px] shrink-0 object-contain opacity-70 logo-sponsor brightness-0 invert transition-opacity duration-200 hover:opacity-100 sm:h-[3.25rem]"
                loading="lazy"
              />
              <span
                v-else
                class="shrink-0 whitespace-nowrap text-[1.05rem] font-extrabold uppercase tracking-[-0.01em] text-white/75 transition-colors duration-200 hover:text-white sm:text-[1.25rem]"
              >
                {{ p.nombre }}
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PARTNERS } from "@/data/evento";

const archivos = import.meta.glob("@/assets/images/partners/*", {
  eager: true,
  import: "default",
});

const partners = PARTNERS.map((p) => {
  const clave = p.logo ? Object.keys(archivos).find((k) => k.endsWith(`/${p.logo}`)) : null;
  return { ...p, src: clave ? archivos[clave] : "" };
});

// La barra son puros nombres de empresa. El que no lo es queda afuera de acá
// y sigue teniendo su tarjeta en #partners, que es donde se explica qué es.
const partnersBarra = partners.filter((p) => p.enBarra !== false);
</script>

<style scoped>
/*
  Los logos se desplazan solos, en bucle lento.

  Con cuatro marcas la fila quedaba corta y centrada: se leía como un pie de
  página y no como una franja de respaldo. El movimiento le da vida a la
  primera pantalla y sugiere que la lista sigue creciendo, que es exactamente
  lo que pasa: quedan cinco rubros por cerrar.

  Se pausa al pasar el mouse, para poder mirar un logo sin perseguirlo.
*/
@keyframes desfile {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.cinta-logos {
  display: flex;
  width: max-content;
  animation: desfile 38s linear infinite;
}
.cinta-logos:hover { animation-play-state: paused; }

/* Se difumina en los bordes: sin esto los logos entran y salen de golpe
   contra el borde del contenedor. */
.marco-logos {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .cinta-logos {
    animation: none;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
  .marco-logos { -webkit-mask-image: none; mask-image: none; }
}
</style>
