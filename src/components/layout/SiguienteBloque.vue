<!--
  El pie de una vista interna: a dónde se sigue.

  Una vista que termina sin salida obliga a volver arriba y elegir de nuevo.
  Esto ofrece los otros cuatro bloques, sin el actual, para que el recorrido
  siga sin pasar por la cabecera. No lleva botón de reserva: el de la
  cabecera está fijo y visible en todo momento, y duplicarlo acá rompería la
  cuenta de dos CTAs.
-->
<template>
  <section class="border-t border-linea py-seccion">
    <div class="contenedor">
      <p class="rotulo text-gris-2">Seguir por</p>

      <div class="mt-7 grid gap-px bg-linea sm:grid-cols-2">
        <RouterLink
          v-for="b in otros"
          :key="b.ruta"
          :to="b.ruta"
          class="group flex flex-col gap-2 bg-noche p-7 transition-colors hover:bg-noche-3"
        >
          <span class="text-[1.15rem] font-extrabold uppercase leading-tight">
            {{ b.titulo }}
          </span>
          <span class="text-[15px] leading-[1.5] text-gris">{{ b.resumen }}</span>
          <span class="mt-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-acento-texto">
            Ver <span aria-hidden="true" class="inline-block transition-transform group-hover:translate-x-1">→</span>
          </span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { BLOQUES } from "@/data/evento";

const ruta = useRoute();
const otros = computed(() => BLOQUES.filter((b) => b.ruta !== ruta.path));
</script>
