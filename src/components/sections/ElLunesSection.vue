<template>
  <!-- Verbo + resultado tangible. Sin adjetivos, sin marketinés. -->
  <section id="el-lunes" class="border-b border-linea py-16 sm:py-24">
    <div class="contenedor">
      <div class="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <div>
          <p class="rotulo text-acento-texto">Con qué volvés</p>
          <h2 class="titulo mt-5 max-w-[14ch] text-[clamp(1.9rem,5vw,3.2rem)]">
            Lo que te llevás al local el lunes.
          </h2>
        </div>

        <ul class="grid gap-px bg-linea">
          <li
            v-for="(item, i) in EL_LUNES"
            :key="i"
            class="flex items-start gap-5 bg-noche py-5"
          >
            <span class="hora w-[2.2rem] shrink-0 pt-1 text-[1.6rem] text-acento-texto">
              {{ String(i + 1).padStart(2, "0") }}
            </span>
            <span class="text-[17px] leading-[1.45] sm:text-[18px]">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { EL_LUNES } from "@/data/evento";
</script>
