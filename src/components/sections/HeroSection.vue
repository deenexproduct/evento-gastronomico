<template>
  <!--
    El hero tiene que cerrar solo: 64% del tráfico móvil no pasa de este
    viewport. Fecha, hora, sede, formato, precio y CTA tienen que estar acá.
  -->
  <section id="hero" class="border-b border-linea pt-[92px]">
    <div class="contenedor py-12 sm:py-16">
      <p class="rotulo text-violeta-texto">Jornada de gastronomía y tecnología · Edición 01</p>

      <h1 class="display mt-6 max-w-[15ch] text-[clamp(2.5rem,8.4vw,5.5rem)]">
        Nueve horas para bajar costos y vender más.
      </h1>

      <!-- Tira de logística: todo lo que decide el registro, en una línea -->
      <div
        class="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-linea py-4 text-[15px] font-semibold sm:text-[17px]"
      >
        <span>Domingo 20 de septiembre</span>
        <span class="text-gris/40" aria-hidden="true">·</span>
        <span>9 a 18 h</span>
        <span class="text-gris/40" aria-hidden="true">·</span>
        <span>{{ EVENTO.venue }}, Córdoba</span>
        <span class="text-gris/40" aria-hidden="true">·</span>
        <span class="text-violeta-texto">Presencial</span>
      </div>

      <p class="lectura mt-7 text-gris">
        Seis charlas y una mesa redonda sobre lo que ya está cambiando el negocio gastronómico:
        costos, datos, sistemas de venta y contenido. Para dueños de marcas y restaurantes.
      </p>

      <div class="mt-9 flex flex-wrap items-center gap-4">
        <a href="#registro" class="btn" @click.prevent="ir('registro')">Quiero mi lugar</a>
        <a
          href="#domingo"
          class="inline-flex min-h-[52px] items-center text-[16px] font-semibold text-violeta-texto underline underline-offset-4"
          @click.prevent="ir('domingo')"
        >
          ¿Por qué un domingo?
        </a>
      </div>

      <!-- Clarificador debajo del botón: +9% de conversión -->
      <p class="mt-4 text-[15px] text-gris">
        Gratis con inscripción previa · {{ total }} lugares · El código de acceso te llega por mail
      </p>
    </div>
  </section>
</template>

<script setup>
import { EVENTO } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";

const { total } = useCupo();

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
