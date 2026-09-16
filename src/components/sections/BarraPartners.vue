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
import { PARTNERS, SPEAKERS } from "@/data/evento";

const archivos = import.meta.glob("@/assets/images/partners/*", {
  eager: true,
  import: "default",
});

function conLogo(nombre, logo) {
  const clave = logo ? Object.keys(archivos).find((k) => k.endsWith(`/${logo}`)) : null;
  return { nombre, logo, src: clave ? archivos[clave] : "" };
}

/*
  LA BARRA LA ARMAN LOS ORADORES, y después los partners que no mandan ninguno.

  Salía sólo de PARTNERS, que es el padrón de sponsors, y quedó corta: hoy
  suben al escenario siete empresas y la mayoría no está en ese padrón. La
  franja dice "PARTICIPAN" arriba, así que la respuesta honesta a esa palabra
  es quién está en la grilla, no quién firmó un contrato de sponsoreo.

  El orden es el de SPEAKERS, o sea el mismo en que la página los presenta más
  abajo: el que ya vio la barra reconoce las tarjetas, y al revés.

  SE DEDUPLICA POR NOMBRE porque hay empresas en las dos listas —Bistrosoft y
  I+DIoT Lab mandan orador Y son sponsors—, y una marca repetida en una cinta
  que da vueltas se lee como un error de carga, no como énfasis.

  Sin archivo de logo va el nombre en tipografía, que es lo que esta barra hace
  desde siempre: un nombre bien puesto se lee mejor que un hueco esperando una
  imagen.
*/
const partnersBarra = (() => {
  const salida = [];
  const vistas = new Set();

  for (const s of SPEAKERS) {
    if (!s.empresa || vistas.has(s.empresa)) continue;
    vistas.add(s.empresa);
    salida.push(conLogo(s.empresa, s.logo));
  }

  // Y los del padrón que no subieron al escenario. `enBarra: false` sigue
  // mandando: lo usa el que no es el nombre de una empresa y en una barra de
  // puros nombres se leería como una que no existe.
  for (const p of PARTNERS) {
    if (p.enBarra === false || vistas.has(p.nombre)) continue;
    vistas.add(p.nombre);
    salida.push(conLogo(p.nombre, p.logo));
  }

  return salida;
})();
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
