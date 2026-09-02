<!--
  El podcast, con sección propia.

  Es una pieza de Deenex que se graba adentro del evento, no una actividad más
  de la grilla: por eso la sección lo dice desde el rótulo —"el podcast de
  Deenex"— y no como "algo que además pasa ese día". Para el sponsor y para el
  invitado, estar ahí adentro es parte de lo que se lleva.

  Va DESPUÉS de la jornada a propósito: primero el lector sabe qué se va a
  hablar en el escenario, y recién entonces se le cuenta que además hay algo
  que no está en la grilla.

  Dice que Alan está, y nada más sobre quiénes: es lo único confirmado. La
  grilla del 30/08 dejó el podcast fuera del programa y todavía no tiene
  franja, ni conductor, ni los otros invitados — publicar una hora o un nombre
  sería prometer algo que no está decidido.
-->
<template>
  <section id="podcast" class="py-seccion">
    <div class="contenedor">
      <div class="marco">
        <span class="halo" aria-hidden="true"></span>

        <div class="relative">
          <p class="rotulo text-acento-texto">El podcast de Deenex</p>

          <h2 class="titulo mt-4 max-w-[19ch] text-[clamp(1.4rem,4.4vw,2.85rem)]">
            Deenex abre su podcast y lo graba ahí adentro
          </h2>

          <p class="mt-6 max-w-[58ch] text-[1.05rem] leading-[1.6] text-gris">
            Una sala privada, dentro del evento, donde
            <span class="texto-deenex font-bold">Alan Tapia</span>, CEO y co-fundador de Deenex,
            se sienta con empresarios invitados a conversar sobre el impacto de la tecnología en
            el rubro gastronómico, y sobre lo que va apareciendo alrededor.
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
/* Los tres puntos no repiten lo que ya dice el párrafo de arriba: Alan y el
   "a puertas cerradas" están ahí, así que acá va lo que falta. */
const puntos = [
  "Sala privada, por invitación",
  "Conversación entre empresarios",
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
