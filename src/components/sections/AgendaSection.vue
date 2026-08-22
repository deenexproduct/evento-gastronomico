<template>
  <section id="jornada" class="bg-ink text-white">
    <div class="px-5 py-16 sm:px-8 sm:py-20">
      <p class="kicker text-lima">La jornada</p>
      <h2 class="titular mt-6 max-w-[14ch] text-[clamp(2.4rem,8vw,6rem)]">
        Nueve horas,<br /><span class="contorno text-white">de punta</span> a punta.
      </h2>
      <p class="mt-8 max-w-[52ch] text-[1.02rem] leading-[1.6] text-white/60">
        Bloques de charla con degustación entre uno y otro. Puertas a las 9, primera charla a las
        10, corte a las 18. No hay almuerzo servido: hay rondas de degustación, stands y networking.
      </p>
    </div>

    <!-- Grilla con horarios (cuando esté cerrada) -->
    <ol v-if="AGENDA_PUBLICA" class="grid gap-[3px] bg-white/20">
      <li
        v-for="(item, i) in AGENDA"
        :key="i"
        class="grid grid-cols-[76px_1fr] gap-5 px-5 py-5 sm:grid-cols-[120px_1fr] sm:gap-8 sm:px-8"
        :class="item.tipo === 'destacado' ? 'bg-lima text-ink' : 'bg-ink'"
      >
        <div>
          <div class="titular text-[1.3rem] tabular-nums">{{ item.hora }}</div>
          <div class="kicker mt-1 opacity-45">{{ item.dur }}</div>
        </div>
        <div>
          <p v-if="item.quien" class="kicker" :class="item.tipo === 'destacado' ? '' : 'text-lima'">
            {{ item.quien }}
          </p>
          <h3 class="titular mt-1 text-[clamp(1.1rem,2.4vw,1.6rem)]">{{ item.titulo }}</h3>
          <p v-if="item.detalle" class="mt-2 max-w-[54ch] text-[0.92rem] leading-[1.55] opacity-60">
            {{ item.detalle }}
          </p>
        </div>
      </li>
    </ol>

    <!-- Estructura del día (mientras el orden no está cerrado) -->
    <template v-else>
      <div class="grid gap-[3px] bg-white/20 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(bloque, i) in AGENDA_BLOQUES"
          :key="bloque.franja"
          class="flex min-h-[300px] flex-col p-8"
          :class="i === 3 ? 'bg-lima text-ink' : 'bg-ink text-white'"
        >
          <p class="kicker" :class="i === 3 ? 'opacity-60' : 'text-lima'">{{ bloque.franja }}</p>
          <h3 class="titular mt-4 text-[clamp(1.4rem,3vw,2rem)]">{{ bloque.titulo }}</h3>
          <ul class="mt-6 space-y-3.5">
            <li
              v-for="(item, j) in bloque.items"
              :key="j"
              class="flex gap-3 text-[0.92rem] leading-[1.5]"
              :class="i === 3 ? 'text-ink/75' : 'text-white/60'"
            >
              <span class="mt-[7px] h-[6px] w-[6px] shrink-0" :class="i === 3 ? 'bg-ink' : 'bg-lima'"></span>
              {{ item }}
            </li>
          </ul>
        </article>
      </div>

      <div class="border-t-[3px] border-white/20 bg-ink px-5 py-8 sm:px-8">
        <p class="kicker text-fuego">Grilla con horarios · próximamente</p>
        <p class="mt-3 max-w-[62ch] text-[0.98rem] leading-[1.6] text-white/60">
          Se están sumando más voces al escenario, así que el orden todavía se mueve.
          <span class="font-bold text-white">Los que estén registrados la reciben primero.</span>
        </p>
      </div>
    </template>

    <!-- Datos de la jornada -->
    <div class="grid gap-[3px] border-t-[3px] border-white/20 bg-white/20 sm:grid-cols-3">
      <div v-for="d in DETALLES" :key="d.titulo" class="bg-ink p-8">
        <div class="titular text-[clamp(2rem,4.6vw,3rem)] text-lima">{{ d.numero }}</div>
        <h3 class="kicker mt-3">{{ d.titulo }}</h3>
        <p class="mt-2 text-[0.9rem] leading-[1.55] text-white/55">{{ d.texto }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { AGENDA, AGENDA_BLOQUES, AGENDA_PUBLICA } from "@/data/evento";

const DETALLES = [
  {
    numero: "4+1",
    titulo: "Rondas de degustación",
    texto: "Entre charla y charla, más una ronda larga al mediodía. Proveedores confirmados.",
  },
  {
    numero: "45'",
    titulo: "Por bloque de charla",
    texto: "Tiempo real para desarrollar un tema, no una ronda de presentaciones.",
  },
  {
    numero: "18h",
    titulo: "Networking de cierre",
    texto: "Vino, cerveza y café con todos los que estuvieron en la sala.",
  },
];
</script>
