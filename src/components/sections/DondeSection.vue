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
      <h2 class="titulo mt-4 max-w-[20ch] text-[clamp(1.9rem,5vw,3rem)]">
        Un salón propio, con entrada por lista
      </h2>

      <div class="mt-10 grid gap-4 lg:grid-cols-3">
        <div v-for="d in datos" :key="d.r" class="tarjeta flex flex-col gap-1 p-6">
          <p class="text-[11px] font-semibold uppercase tracking-[0.12em] text-gris-2">
            {{ d.r }}
          </p>
          <p class="mt-1 text-[1.05rem] font-semibold leading-snug">{{ d.v }}</p>
          <p v-if="d.n" class="text-[14px] leading-[1.5] text-gris">{{ d.n }}</p>
        </div>
      </div>

      <!--
        El dato de color, y va como caja aparte: es un extra que suma, no una
        característica del evento. Mezclarlo con la dirección lo convertiría en
        una promesa del mismo peso que el horario, y no lo es.
      -->
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
import { EVENTO } from "@/data/evento";

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
