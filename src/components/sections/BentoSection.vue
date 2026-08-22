<template>
  <!--
    El día en un vistazo. Reemplaza la franja de "cuántos asistentes vienen"
    que usa todo el rubro: con 200 no competimos contra los 24.000 de FITHEP.
    El eje es densidad de valor por hora. El tamaño del tile codifica
    jerarquía real, no decoración.
  -->
  <section id="vistazo" class="border-b border-linea py-16 sm:py-24">
    <div class="contenedor">
      <p class="rotulo text-violeta-texto">El día en un vistazo</p>
      <h2 class="titulo mt-5 max-w-[18ch] text-[clamp(1.9rem,5vw,3.2rem)]">
        Un domingo entero, sin relleno.
      </h2>

      <div class="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div
          v-for="b in BENTO"
          :key="b.label"
          class="flex flex-col justify-between border border-linea p-6 sm:p-7"
          :class="[
            b.peso === 'grande' ? 'col-span-2 row-span-2 bg-violeta text-white lg:col-span-2' : '',
            b.peso === 'medio' ? 'col-span-2 bg-papel-2' : '',
            b.peso === 'chico' ? 'bg-papel' : '',
          ]"
        >
          <div
            class="hora"
            :class="[
              b.peso === 'grande' ? 'text-[clamp(4rem,14vw,8rem)]' : 'text-[clamp(2rem,7vw,3.4rem)]',
              b.peso === 'grande' ? 'text-white' : 'text-violeta-texto',
            ]"
          >
            {{ b.dato }}
          </div>

          <div :class="b.peso === 'grande' ? 'mt-6' : 'mt-3'">
            <p
              class="text-[15px] font-bold uppercase tracking-[0.06em] sm:text-[16px]"
              :class="b.peso === 'grande' ? 'text-white' : 'text-tinta'"
            >
              {{ b.label }}
            </p>
            <p
              v-if="b.detalle"
              class="mt-3 max-w-[34ch] text-[16px] leading-[1.5]"
              :class="b.peso === 'grande' ? 'text-white/90' : 'text-gris'"
            >
              {{ b.detalle }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { BENTO } from "@/data/evento";
</script>
