<!--
  El índice del detalle, dentro de la home.

  Es lo que convierte a la home en un resumen y no en un recorte: acá se ve,
  de un vistazo, todo lo que el evento tiene para contar y adónde está cada
  cosa. Sin esto, el que no mira la cabecera nunca se entera de que hay
  cuatro páginas más.

  Son tarjetas y no botones a propósito: navegan, no convierten. Los dos
  botones de la página siguen siendo el del hero y el de la reserva.
-->
<template>
  <section id="bloques" class="border-y border-linea py-seccion">
    <div class="contenedor">
      <p class="rotulo text-gris-2">El detalle</p>
      <h2 class="titulo mt-4 max-w-[20ch] text-[clamp(1.9rem,5vw,3rem)]">
        Todo lo demás, sin scrollear de más
      </h2>
      <p class="lectura mt-5 text-[17px] text-gris">
        Cada bloque es una página corta. Entrá por el que te interese: no hace
        falta leerlos en orden ni leerlos todos.
      </p>

      <div class="mt-12 grid gap-px bg-linea sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="(b, i) in BLOQUES"
          :key="b.ruta"
          :to="b.ruta"
          class="group flex flex-col gap-2 bg-noche p-7 transition-colors hover:bg-noche-3"
        >
          <span class="text-[13px] font-semibold uppercase tracking-[0.1em] text-gris-2 tabular-nums">
            {{ String(i + 1).padStart(2, "0") }}
          </span>
          <span class="mt-1 text-[1.2rem] font-extrabold uppercase leading-tight">
            {{ b.titulo }}
          </span>
          <span class="text-[15px] leading-[1.5] text-gris">{{ b.resumen }}</span>
          <span class="mt-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-acento-texto">
            Ver
            <span aria-hidden="true" class="inline-block transition-transform group-hover:translate-x-1">→</span>
          </span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { BLOQUES } from "@/data/evento";
</script>
