<template>
  <!--
    Una sola sección para el día: primero cómo transcurre, después cómo lo
    recortás si no podés estar las nueve horas. Antes eran dos secciones
    pegadas resolviendo la misma objeción.
  -->
  <section id="jornada" class="border-b border-linea bg-papel-2 py-20 sm:py-28">
    <div class="contenedor">
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-violeta-texto">La jornada</p>
        </div>
        <div class="lg:col-span-9">
          <h2 class="titular max-w-[20ch] text-[clamp(1.9rem,4vw,3.2rem)]">
            Es domingo y trabajás. Ya lo sabemos.
          </h2>
          <p class="mt-6 max-w-[58ch] text-[1.02rem] leading-[1.65] text-gris">
            Por eso dura nueve horas y nadie controla la butaca: entrás cuando podés y te vas cuando
            tenés que irte. Sin almuerzo servido, con rondas de degustación entre bloques y los
            stands abiertos todo el día.
          </p>
        </div>
      </div>

      <!-- Cómo transcurre -->
      <div class="mt-14 grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-gris">Cómo transcurre</p>
        </div>

        <div class="lg:col-span-9">
          <!-- Grilla con horarios, cuando esté cerrada -->
          <ol v-if="AGENDA_PUBLICA" class="border-t border-linea">
            <li
              v-for="(item, i) in AGENDA"
              :key="i"
              class="grid gap-x-8 gap-y-2 border-b border-linea py-6 lg:grid-cols-10"
              :class="item.tipo === 'destacado' ? 'bg-violeta-tinte/60' : ''"
            >
              <div class="lg:col-span-2">
                <p class="text-[0.95rem] font-semibold tabular-nums">{{ item.hora }}</p>
                <p class="rotulo mt-1 text-gris">{{ item.dur }}</p>
              </div>
              <div class="lg:col-span-8">
                <p v-if="item.quien" class="rotulo text-violeta-texto">{{ item.quien }}</p>
                <h3 class="titular mt-1 text-[1.15rem]">{{ item.titulo }}</h3>
                <p v-if="item.detalle" class="mt-1.5 max-w-[58ch] text-[0.93rem] leading-[1.6] text-gris">
                  {{ item.detalle }}
                </p>
              </div>
            </li>
          </ol>

          <!-- Línea de tiempo, mientras el orden no se cierra -->
          <ol v-else class="relative pl-8">
            <span class="absolute left-[5px] top-3 bottom-3 w-px bg-linea" aria-hidden="true"></span>

            <li v-for="(b, i) in AGENDA_BLOQUES" :key="b.franja" class="relative pb-9 last:pb-0">
              <span
                class="absolute -left-8 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-violeta"
                :class="i < 2 ? 'bg-violeta' : 'bg-papel-2'"
                aria-hidden="true"
              ></span>

              <p class="rotulo text-violeta-texto">{{ b.franja }}</p>
              <h3 class="titular mt-2 text-[clamp(1.15rem,2vw,1.45rem)]">{{ b.titulo }}</h3>
              <ul class="mt-2.5 space-y-1.5">
                <li
                  v-for="(item, j) in b.items"
                  :key="j"
                  class="max-w-[56ch] text-[0.94rem] leading-[1.6] text-gris"
                >
                  {{ item }}
                </li>
              </ul>
            </li>
          </ol>

          <p
            v-if="!AGENDA_PUBLICA"
            class="mt-8 max-w-[62ch] border-t border-linea pt-6 text-[0.93rem] leading-[1.6] text-gris"
          >
            <span class="font-semibold text-tinta">La grilla con horarios se publica cuando esté cerrada.</span>
            Se están sumando más voces al escenario, así que el orden todavía se mueve. Los que estén
            registrados la reciben primero.
          </p>
        </div>
      </div>

      <!-- Cómo lo recortás -->
      <div class="mt-16 grid gap-10 border-t border-linea pt-12 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-gris">Si no podés todo el día</p>
        </div>

        <div class="lg:col-span-9">
          <div class="grid gap-x-8 md:grid-cols-3">
            <article
              v-for="(r, i) in RECORRIDOS"
              :key="r.franja"
              class="flex flex-col border-linea pb-8"
              :class="i > 0 ? 'border-t pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0' : ''"
            >
              <div class="flex items-baseline justify-between gap-3">
                <p class="rotulo" :class="r.destacado ? 'text-violeta-texto' : 'text-gris'">
                  {{ r.franja }}
                </p>
                <p class="rotulo tabular-nums text-gris">{{ r.horario }}</p>
              </div>

              <h3 class="titular mt-3.5 text-[1.1rem]">{{ r.titulo }}</h3>

              <ul class="mt-4 flex-1 border-t border-linea">
                <li
                  v-for="(item, j) in r.lleva"
                  :key="j"
                  class="border-b border-linea py-2.5 text-[0.89rem] leading-snug text-gris"
                >
                  {{ item }}
                </li>
              </ul>

              <p
                class="mt-4 text-[0.89rem] leading-[1.55]"
                :class="r.destacado ? 'font-medium text-tinta' : 'text-gris'"
              >
                {{ r.nota }}
              </p>
            </article>
          </div>

          <p class="mt-9 max-w-[62ch] border-t border-linea pt-6 text-[0.95rem] leading-[1.6] text-gris">
            <span class="font-semibold text-tinta">Y si no podés vos, mandá a tu socio o a tu gerente.</span>
            El registro es por persona, pero lo que se cuenta se aplica sobre la marca.
          </p>
        </div>
      </div>

      <!-- Datos de la jornada -->
      <dl class="mt-14 grid gap-x-8 border-t border-linea sm:grid-cols-3">
        <div
          v-for="(d, i) in DETALLES"
          :key="d.titulo"
          class="border-linea py-8"
          :class="i > 0 ? 'sm:border-l sm:pl-8' : ''"
        >
          <dd class="titular text-[clamp(1.6rem,3vw,2.2rem)] text-violeta-texto">{{ d.numero }}</dd>
          <dt class="rotulo mt-2.5">{{ d.titulo }}</dt>
          <p class="mt-2 text-[0.92rem] leading-[1.6] text-gris">{{ d.texto }}</p>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup>
import { AGENDA, AGENDA_BLOQUES, AGENDA_PUBLICA, RECORRIDOS } from "@/data/evento";

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
