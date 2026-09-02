<!--
  El podcast, con sección propia.

  Venía como un hito más de una lista y como una tarjeta dentro de "qué es":
  en los dos lugares quedaba al nivel de un dato de logística. Es lo único del
  día que no le pasa a todo el mundo —se graba a puertas cerradas— así que
  merece parar el scroll, no compartir fila.

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
          <p class="rotulo text-acento-texto">Fuera de programa</p>

          <h2 class="titulo mt-4 max-w-[17ch] text-[clamp(1.9rem,5vw,3rem)]">
            Ese día también se graba el podcast
          </h2>

          <p class="mt-6 max-w-[56ch] text-[1.05rem] leading-[1.6] text-gris">
            <span class="texto-deenex font-bold">Alan Tapia</span> se sienta con otros empresarios
            del rubro, a puertas cerradas, a hablar de lo que la tecnología está moviendo: qué
            mercado se abre, qué se pone difícil y cómo responde el negocio. No es una entrevista
            ni una charla del escenario.
          </p>

          <ul class="mt-8 grid gap-3 sm:grid-cols-3">
            <li v-for="p in puntos" :key="p" class="punto-podcast">{{ p }}</li>
          </ul>

          <p class="mt-7 text-[14px] leading-[1.55] text-gris-2">
            Se anuncia con la grilla final quiénes se sientan y en qué momento del día.
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
  "Entre pares, sin escenario",
  "Se graba ese mismo día",
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
