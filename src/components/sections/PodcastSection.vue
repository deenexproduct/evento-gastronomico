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

          <p class="mt-7 text-[14px] leading-[1.55] text-gris-2">
            Los invitados y el momento del día se anuncian con la grilla final.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
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
