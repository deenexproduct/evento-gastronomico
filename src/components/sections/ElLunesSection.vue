<template>
  <!-- Verbo + resultado tangible. Sin adjetivos, sin marketinés. -->
  <section id="el-lunes" class="border-b border-linea py-16 sm:py-24">
    <div class="contenedor">
      <div class="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <div>
          <!--
            Decía "lo que te llevás al local el lunes". El lunes es un plazo
            que la página no controla y suena a promesa de resultado. El
            rótulo cambia junto con el titular: si solo cambiara el h2, la
            sección diría lo mismo dos veces seguidas con dos sinónimos.
          -->
          <template v-if="encabezado">
          <p class="rotulo text-gris">Seis cosas</p>
          <h2 class="titulo mt-5 max-w-[16ch] text-[clamp(1.4rem,4.4vw,2.85rem)]">
            Qué te llevás del evento.
          </h2>
          </template>
        </div>

        <ul class="grid gap-px bg-linea">
          <li
            v-for="(item, i) in EL_LUNES"
            :key="i"
            class="flex items-start gap-5 bg-noche px-5 py-5 sm:px-6"
          >
            <span class="hora w-[2.2rem] shrink-0 pt-1 text-[1.6rem] text-gris-2">
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
// La vista que la envuelve ya pone el titulo de la pagina: con los dos,
// el lector lee dos encabezados seguidos diciendo lo mismo.
defineProps({ encabezado: { type: Boolean, default: true } });

import { EL_LUNES } from "@/data/evento";
</script>
