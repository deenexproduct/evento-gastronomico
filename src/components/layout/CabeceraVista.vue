<!--
  El encabezado de una vista interna.

  Cumple tres funciones y ninguna es decorativa: dice dónde estás, deja
  volver a la home sin usar el botón del navegador, y repite la fecha y el
  lugar. El colchón de arriba sigue al alto real de la cabecera: 117px en
  teléfono, donde las pestañas van en su propio renglón, y 73px de 640 para
  arriba. Lo tercero importa porque a una vista interna se puede llegar por
  un link directo, sin haber pasado nunca por la home: sin la fecha acá, esa
  persona lee la página entera sin saber cuándo es el evento.
-->
<template>
  <header class="border-b border-linea pb-10 pt-[140px] sm:pt-[112px] lg:pt-[124px]">
    <div class="contenedor">
      <RouterLink
        to="/"
        class="inline-flex min-h-[44px] items-center gap-2 text-[0.85rem] font-medium text-gris transition-colors hover:text-white"
      >
        <span aria-hidden="true">←</span> Volver al resumen
      </RouterLink>

      <p v-if="rotulo" class="rotulo mt-6 text-acento-texto">{{ rotulo }}</p>

      <h1 class="titulo mt-4 max-w-[18ch] text-[clamp(2.1rem,6vw,3.6rem)]">
        <slot name="titulo">{{ titulo }}</slot>
      </h1>

      <p v-if="$slots.bajada" class="lectura mt-5 text-[17px] text-gris">
        <slot name="bajada" />
      </p>

      <p class="rotulo mt-8 text-gris-2">
        {{ EVENTO.fechaBreve }} · {{ EVENTO.venue }} · {{ EVENTO.ciudad }}
      </p>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { EVENTO } from "@/data/evento";

defineProps({
  titulo: { type: String, default: "" },
  rotulo: { type: String, default: "" },
});
</script>
