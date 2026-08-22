<template>
  <section id="que-te-llevas" class="border-b border-linea py-20 sm:py-28">
    <div class="contenedor">
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-violeta-texto">Qué te llevás</p>
        </div>
        <div class="lg:col-span-9">
          <h2 class="titular max-w-[18ch] text-[clamp(1.9rem,4vw,3.2rem)]">
            Lo que te llevás de la sala.
          </h2>
          <p class="mt-6 max-w-[58ch] text-[1.02rem] leading-[1.65] text-gris">
            Sin entrada premium ni lista especial: el que está en la sala accede exactamente a lo
            mismo que el de al lado.
          </p>
        </div>
      </div>

      <div class="mt-14 grid gap-x-8 border-t border-linea sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(b, i) in BENEFICIOS"
          :key="b.n"
          class="border-linea py-8"
          :class="[i > 0 ? 'lg:border-l lg:pl-8' : '', i === 1 ? 'sm:border-l sm:pl-8 lg:pl-8' : '', i === 3 ? 'sm:border-l sm:pl-8' : '', i < 2 ? 'border-b sm:border-b lg:border-b-0' : '']"
        >
          <p class="rotulo text-violeta-texto">{{ b.n }} · {{ b.kicker }}</p>
          <h3 class="titular mt-4 text-[1.15rem]">{{ b.titulo }}</h3>
          <p class="mt-3 text-[0.93rem] leading-[1.62] text-gris">{{ b.texto }}</p>
        </article>
      </div>

      <!-- El diagnóstico, en detalle pero sin protagonismo -->
      <div class="mt-14 grid gap-8 border-t border-linea pt-10 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-violeta-texto">El diagnóstico, en detalle</p>
        </div>
        <div class="lg:col-span-4">
          <h3 class="titular text-[1.3rem]">Opcional, sin costo y a pedido.</h3>
          <p class="mt-4 max-w-[42ch] text-[0.95rem] leading-[1.62] text-gris">
            {{ DIAGNOSTICO.bajada }}
          </p>
        </div>
        <div class="lg:col-span-5">
          <p class="rotulo text-gris">Qué se mira</p>
          <ul class="mt-4 border-t border-linea">
            <li
              v-for="(p, i) in DIAGNOSTICO.puntos"
              :key="i"
              class="border-b border-linea py-3 text-[0.93rem] leading-snug text-gris"
            >
              {{ p }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { BENEFICIOS, DIAGNOSTICO } from "@/data/evento";
</script>
