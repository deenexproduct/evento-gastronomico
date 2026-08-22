<template>
  <!--
    "Es domingo y trabajo" es la objeción que más gente frena. En el FAQ está
    respondida con texto; acá se ve, en concreto, qué se lleva cada uno según
    cuándo pueda venir. Convierte una excusa en una decisión.
  -->
  <section id="recorridos" class="border-b border-linea py-20 sm:py-28">
    <div class="contenedor">
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-violeta-texto">Armá tu día</p>
        </div>
        <div class="lg:col-span-9">
          <h2 class="titular max-w-[20ch] text-[clamp(1.9rem,4vw,3.2rem)]">
            Es domingo y trabajás. Ya lo sabemos.
          </h2>
          <p class="mt-6 max-w-[58ch] text-[1.02rem] leading-[1.65] text-gris">
            Por eso el evento dura nueve horas y nadie controla la butaca. Entrás cuando podés y te
            vas cuando tenés que irte. Estas son las tres formas de hacerlo.
          </p>
        </div>
      </div>

      <div class="mt-14 grid gap-x-8 border-t border-linea md:grid-cols-3">
        <article
          v-for="(r, i) in RECORRIDOS"
          :key="r.franja"
          class="flex flex-col border-linea py-9"
          :class="i > 0 ? 'border-t md:border-l md:border-t-0 md:pl-8' : ''"
        >
          <div class="flex items-baseline justify-between gap-3">
            <p class="rotulo" :class="r.destacado ? 'text-violeta-texto' : 'text-gris'">
              {{ r.franja }}
            </p>
            <p class="rotulo tabular-nums text-gris">{{ r.horario }}</p>
          </div>

          <h3 class="titular mt-4 text-[1.15rem]">{{ r.titulo }}</h3>

          <ul class="mt-5 flex-1 border-t border-linea">
            <li
              v-for="(item, j) in r.lleva"
              :key="j"
              class="border-b border-linea py-2.5 text-[0.9rem] leading-snug text-gris"
            >
              {{ item }}
            </li>
          </ul>

          <p
            class="mt-5 text-[0.9rem] leading-[1.55]"
            :class="r.destacado ? 'font-medium text-tinta' : 'text-gris'"
          >
            {{ r.nota }}
          </p>
        </article>
      </div>

      <p class="mt-10 max-w-[62ch] border-t border-linea pt-6 text-[0.95rem] leading-[1.6] text-gris">
        <span class="font-semibold text-tinta">Y si no podés vos, mandá a tu socio o a tu gerente.</span>
        El registro es por persona, pero lo que se cuenta se aplica sobre la marca.
      </p>
    </div>
  </section>
</template>

<script setup>
import { RECORRIDOS } from "@/data/evento";
</script>
