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
  <!--
    El colchón de arriba sigue al nav, no a tres números.

    Eran 140 / 112 / 124px fijos, y el aire real que dejaban sobre la barra era
    23 / 39 / 51px en cada tramo —más aire cuanto más grande la pantalla, que
    es lo buscado—. Lo que fallaba es el piso: a 320px el nav mide 161 y el
    colchón seguía siendo 140, así que el encabezado de la vista arrancaba 10px
    TAPADO. Con la fuente de respaldo del runner eso pasa también a 360.

    Cada tramo conserva su aire y su valor: con el nav en 117 / 73 / 73 las
    cuentas dan 140 / 112 / 124, exactamente lo que había.
  -->
  <header
    class="border-b border-linea pb-10 pt-[calc(var(--alto-nav,117px)+23px)] sm:pt-[calc(var(--alto-nav,73px)+39px)] lg:pt-[calc(var(--alto-nav,73px)+51px)]"
  >
    <div class="contenedor">
      <RouterLink
        to="/"
        class="inline-flex min-h-[44px] items-center gap-2 text-[0.85rem] font-medium text-gris transition-colors hover:text-white"
      >
        <span aria-hidden="true">←</span> Volver al resumen
      </RouterLink>

      <p v-if="rotulo" class="rotulo mt-6 text-acento-texto">{{ rotulo }}</p>

      <h1 class="titulo mt-4 max-w-[18ch] text-[clamp(1.7rem,5.2vw,3.1rem)]">
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
