<template>
  <section id="jornada" class="relative bg-white py-24 sm:py-32">
    <div class="mx-auto w-full max-w-[1240px] px-6 sm:px-8">
      <!-- Header -->
      <div class="max-w-3xl">
        <span
          class="inline-block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary font-bold mb-5"
        >
          La jornada
        </span>
        <h2
          class="font-heading text-[clamp(1.8rem,3.6vw,3rem)] font-extrabold leading-[1.1] tracking-tighter text-slate-900"
        >
          Nueve horas,
          <em class="font-light italic text-primary">de punta a punta.</em>
        </h2>
        <p class="mt-6 text-[1.05rem] leading-[1.7] text-slate-500 max-w-2xl">
          Bloques de charla con degustación entre uno y otro. Puertas a las 9, primera charla a las
          10, corte a las 18. No hay almuerzo servido: hay rondas de degustación, stands y
          networking.
        </p>
      </div>

      <!-- Timeline (agenda cerrada y publicada) -->
      <ol v-if="AGENDA_PUBLICA" class="mt-14 space-y-2">
        <li
          v-for="(item, i) in AGENDA"
          :key="i"
          class="grid grid-cols-[64px_1fr] gap-4 rounded-xl border p-4 sm:grid-cols-[90px_1fr] sm:gap-6 sm:p-5 transition-colors"
          :class="claseFila(item.tipo)"
        >
          <div class="text-right">
            <div class="font-mono text-[0.85rem] font-bold tabular-nums text-slate-900">
              {{ item.hora }}
            </div>
            <div class="font-mono text-[0.65rem] text-slate-400">{{ item.dur }}</div>
          </div>
          <div class="min-w-0">
            <div v-if="item.quien" class="font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-primary">
              {{ item.quien }}
            </div>
            <h3 class="font-heading text-[1rem] font-bold tracking-tight text-slate-900 sm:text-[1.08rem]">
              {{ item.titulo }}
            </h3>
            <p v-if="item.detalle" class="mt-1.5 text-[0.88rem] leading-[1.55] text-slate-500">
              {{ item.detalle }}
            </p>
          </div>
        </li>
      </ol>

      <!-- Estructura del día (mientras la agenda no se publica) -->
      <div v-else class="mt-14">
        <div class="grid gap-5 sm:grid-cols-2">
          <article
            v-for="bloque in AGENDA_BLOQUES"
            :key="bloque.franja"
            class="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-slate-200/60"
          >
            <span
              class="inline-block font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-primary"
              >{{ bloque.franja }}</span
            >
            <h3 class="mt-3 font-heading text-[1.2rem] font-extrabold tracking-tight text-slate-900">
              {{ bloque.titulo }}
            </h3>
            <ul class="mt-5 space-y-3">
              <li
                v-for="(item, i) in bloque.items"
                :key="i"
                class="flex items-start gap-3 text-[0.9rem] leading-[1.55] text-slate-600"
              >
                <span class="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40"></span>
                {{ item }}
              </li>
            </ul>
          </article>
        </div>

        <div
          class="mt-6 flex items-start gap-3.5 rounded-2xl border border-amber-200 bg-amber-50/60 p-5"
        >
          <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500"></span>
          <p class="text-[0.9rem] leading-[1.6] text-amber-900">
            <span class="font-bold">La grilla con horarios se publica cuando esté cerrada.</span>
            Se están sumando más voces al escenario, así que el orden todavía se mueve. Los que
            estén registrados la reciben primero.
          </p>
        </div>
      </div>

      <!-- Degustaciones -->
      <div class="mt-6 grid gap-4 sm:grid-cols-3">
        <div
          v-for="d in DETALLES"
          :key="d.titulo"
          class="rounded-2xl border border-slate-200 bg-slate-50/60 p-6"
        >
          <div class="font-heading text-[1.6rem] font-black tracking-tighter text-primary">
            {{ d.numero }}
          </div>
          <h3 class="mt-2 font-heading text-[0.98rem] font-bold tracking-tight text-slate-900">
            {{ d.titulo }}
          </h3>
          <p class="mt-1.5 text-[0.85rem] leading-[1.55] text-slate-500">{{ d.texto }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { AGENDA, AGENDA_BLOQUES, AGENDA_PUBLICA } from "@/data/evento";

const ESTILO_FILA = {
  charla: "border-slate-200 bg-white hover:border-primary/30",
  pausa: "border-transparent bg-slate-50/70",
  apertura: "border-slate-200 bg-white",
  cierre: "border-slate-200 bg-white",
  destacado: "border-primary/30 bg-primary/[0.04]",
};

function claseFila(tipo) {
  return ESTILO_FILA[tipo] ?? ESTILO_FILA.charla;
}

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
