<template>
  <section id="jornada" class="border-b border-linea bg-white/5 py-20 sm:py-28">
    <div class="contenedor">
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-acento-texto">La jornada</p>
        </div>
        <div class="lg:col-span-9">
          <h2 class="titular max-w-[18ch] text-[clamp(1.9rem,4vw,3.2rem)]">
            Entrás cuando podés, te quedás lo que te sirve.
          </h2>
          <p class="mt-6 max-w-[58ch] text-[1.02rem] leading-[1.65] text-gris">
            Nueve horas de punta a punta, sin butaca asignada ni almuerzo servido: rondas de
            degustación entre bloques, stands abiertos todo el día y networking de cierre.
          </p>
        </div>
      </div>

      <!-- Grilla con horarios, cuando esté cerrada -->
      <ol v-if="AGENDA_PUBLICA" class="mt-14 border-t border-linea">
        <li
          v-for="(item, i) in AGENDA"
          :key="i"
          class="grid gap-x-8 gap-y-2 border-b border-linea py-6 lg:grid-cols-12"
          :class="item.tipo === 'destacado' ? 'bg-white/5/60' : ''"
        >
          <div class="lg:col-span-2">
            <p class="text-[0.95rem] font-semibold tabular-nums">{{ item.hora }}</p>
            <p class="rotulo mt-1 text-gris">{{ item.dur }}</p>
          </div>
          <div class="lg:col-span-10">
            <p v-if="item.quien" class="rotulo text-acento-texto">{{ item.quien }}</p>
            <h3 class="titular mt-1 text-[1.15rem]">{{ item.titulo }}</h3>
            <p v-if="item.detalle" class="mt-1.5 max-w-[58ch] text-[0.93rem] leading-[1.6] text-gris">
              {{ item.detalle }}
            </p>
          </div>
        </li>
      </ol>

      <!-- Línea de tiempo del día, mientras el orden no se cierra -->
      <ol v-else class="relative mt-14 pl-8 sm:pl-10">
        <span class="absolute left-[5px] top-3 bottom-3 w-px bg-linea" aria-hidden="true"></span>

        <li v-for="(b, i) in AGENDA_BLOQUES" :key="b.franja" class="relative pb-11 last:pb-0">
          <span
            class="absolute -left-8 top-1.5 h-[11px] w-[11px] rounded-full border-2 sm:-left-10"
            :class="i < 2 ? 'border-acento bg-acento' : 'border-acento bg-white'"
            aria-hidden="true"
          ></span>

          <p class="rotulo text-acento-texto">{{ b.franja }}</p>
          <h3 class="titular mt-2 text-[clamp(1.2rem,2.2vw,1.6rem)]">{{ b.titulo }}</h3>
          <ul class="mt-3 space-y-1.5">
            <li
              v-for="(item, j) in b.items"
              :key="j"
              class="max-w-[56ch] text-[0.95rem] leading-[1.6] text-gris"
            >
              {{ item }}
            </li>
          </ul>
        </li>
      </ol>

      <p
        v-if="!AGENDA_PUBLICA"
        class="mt-10 max-w-[62ch] border-t border-linea pt-6 text-[0.93rem] leading-[1.6] text-gris"
      >
        <span class="font-semibold text-white">La grilla con horarios se publica cuando esté cerrada.</span>
        Se están sumando más voces al escenario, así que el orden todavía se mueve. Los que estén
        registrados la reciben primero.
      </p>

      <dl class="mt-12 grid gap-x-8 border-t border-linea sm:grid-cols-3">
        <div v-for="(d, i) in DETALLES" :key="d.titulo" class="border-linea py-8" :class="i > 0 ? 'sm:border-l sm:pl-8' : ''">
          <dd class="titular text-[clamp(1.6rem,3vw,2.2rem)] text-acento-texto">{{ d.numero }}</dd>
          <dt class="rotulo mt-2.5">{{ d.titulo }}</dt>
          <p class="mt-2 text-[0.92rem] leading-[1.6] text-gris">{{ d.texto }}</p>
        </div>
      </dl>
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
