<!--
  Dónde, a qué hora y qué más entra con la acreditación.

  Vivía dentro de /que-es, a dos clics: es información que se busca cuando ya
  se decidió ir, y tenerla escondida hace que la duda —«¿a qué hora abre?»,
  «¿dónde queda?»— se resuelva por WhatsApp o no se resuelva.

  El acceso a Córdoba Corazón de Moda se publica como acceso incluido y en
  tono positivo, nunca como asistencia propia: las 20.000 personas son de ese
  evento, no de éste. Es la regla del brief y acá se cumple al pie.
-->
<template>
  <section id="donde" class="border-b border-linea py-seccion">
    <div class="contenedor">
      <p class="rotulo text-acento-texto">Dónde y a qué hora</p>
      <h2 class="titulo mt-4 max-w-[20ch] text-[clamp(1.4rem,4.4vw,2.85rem)]">
        Un salón propio, con entrada por lista
      </h2>

      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="d in datos" :key="d.r" class="tarjeta flex flex-col gap-1 p-6">
          <p class="text-[11px] font-semibold uppercase tracking-[0.12em] text-gris-2">
            {{ d.r }}
          </p>
          <p class="mt-1 text-[1.05rem] font-semibold leading-snug">{{ d.v }}</p>
          <p v-if="d.n" class="text-[14px] leading-[1.5] text-gris">{{ d.n }}</p>
        </div>

        <!--
          El cuarto es el único que hace algo: abre el mapa. Va con el resto y
          no como botón suelto porque es utilidad, no conversión — los dos CTA
          de la página siguen siendo reservar y ser sponsor.
        -->
        <a
          :href="comoLlegar"
          target="_blank"
          rel="noopener noreferrer"
          class="tarjeta tarjeta-mapa flex flex-col gap-1 p-6"
        >
          <p class="text-[11px] font-semibold uppercase tracking-[0.12em] text-gris-2">
            Cómo llegar
          </p>
          <p class="mt-1 flex items-center gap-2 text-[1.05rem] font-semibold leading-snug">
            Abrir en Maps
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </p>
          <p class="text-[14px] leading-[1.5] text-gris">
            Te lleva a la puerta del hotel, con el recorrido desde donde estés.
            <span class="sr-only">(abre en una pestaña nueva)</span>
          </p>
        </a>
      </div>

      <!--
        El dato de color, y va como caja aparte: es un extra que suma, no una
        característica del evento. Mezclarlo con la dirección lo convertiría en
        una promesa del mismo peso que el horario, y no lo es.
      -->
      <!--
        El domingo. Se publica lo que está decidido —que existe, para quién es
        y que se reserva igual— y nada más: conductora, programa y oradores no
        están definidos, así que la página no los promete.
      -->
      <div class="cortesia mt-4">
        <p class="text-[11px] font-semibold uppercase tracking-[0.12em] text-acento-texto">
          {{ DOMINGO.fechaLarga }}
        </p>
        <p class="mt-2.5 max-w-[46ch] text-[1.05rem] font-semibold leading-[1.35]">
          {{ DOMINGO.titulo }}
        </p>
        <p class="mt-2.5 max-w-[62ch] text-[15px] leading-[1.55] text-gris">
          {{ DOMINGO.bajada }}
        </p>
      </div>

      <div class="cortesia mt-4">
        <p class="text-[11px] font-semibold uppercase tracking-[0.12em] text-acento-texto">
          Además
        </p>
        <p class="mt-2.5 max-w-[46ch] text-[1.05rem] font-semibold leading-[1.35]">
          Tu acreditación también te habilita Córdoba Corazón de Moda
        </p>
        <p class="mt-2.5 max-w-[62ch] text-[15px] leading-[1.55] text-gris">
          Es el evento que ocupa el resto del centro de convenciones ese mismo día, y por el que
          circulan más de 20.000 personas. Entrás con la misma credencial, sin trámite aparte.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { EVENTO, DOMINGO } from "@/data/evento";

const comoLlegar =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(`${EVENTO.venue}, ${EVENTO.direccion}, ${EVENTO.ciudad}, Argentina`);

const datos = [
  {
    r: "Dónde",
    v: EVENTO.venue,
    n: `${EVENTO.direccion}, ${EVENTO.ciudad} capital`,
  },
  {
    r: "Cuándo abre",
    v: `${EVENTO.puertas} · acreditación`,
    n: `Las charlas arrancan ${EVENTO.horario.split(" a ")[0]} y el día cierra 18:05.`,
  },
  {
    r: "Cómo se entra",
    v: "Por lista",
    n: "Sin reserva previa no hay ingreso. En la puerta alcanza con tu nombre.",
  },
];
</script>

<style scoped>
.tarjeta-mapa { text-decoration: none; color: inherit; }
.tarjeta-mapa:hover { border-color: color-mix(in srgb, var(--acento, #695ede) 45%, transparent); }

.cortesia {
  border: 1px solid color-mix(in srgb, var(--acento, #695ede) 28%, transparent);
  background: color-mix(in srgb, var(--acento, #695ede) 5%, transparent);
  border-radius: 16px;
  padding: 1.5rem;
}
@media (min-width: 640px) {
  .cortesia { padding: 1.75rem 2rem; }
}
</style>
