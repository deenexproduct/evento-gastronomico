<template>
  <!--
    Dos públicos que no son el asistente y que hasta acá no tenían dónde
    entrar: la marca que quiere un stand y el medio que quiere cubrirlo.
    Van juntos y al final, subordinados al registro, para no competir con el
    CTA principal — el error documentado de las ferias del rubro es escribir
    el home para el expositor.
  -->
  <section id="sumarse" class="bg-noche-2 py-seccion">
    <div class="contenedor">
      <p class="rotulo text-acento-texto">No venís como asistente</p>
      <h2 class="titulo mt-4 max-w-[18ch] text-[clamp(2rem,5.6vw,3.4rem)]">
        Sumate de otra forma
      </h2>

      <div class="mt-12 grid gap-4 lg:grid-cols-2">
        <!-- Partners -->
        <article class="tarjeta flex flex-col p-8">
          <span class="chip self-start border-acento/50 text-acento-texto">Marcas</span>
          <h3 class="mt-5 text-[1.5rem] font-black uppercase leading-[1.1]">
            Quiero ser partner
          </h3>
          <p class="mt-4 text-[16px] leading-[1.55] text-gris">
            Stand en el salón, demo en vivo dentro del programa y un beneficio para los que
            estén ese día. Los partners no se anuncian hasta estar cerrados por escrito.
          </p>

          <ul class="mt-7 grid gap-px bg-white/10">
            <li v-for="i in INCLUYE_PARTNER" :key="i" class="flex gap-3 bg-noche-2 py-3 text-[15px] leading-snug">
              <span class="shrink-0 text-acento-texto">—</span>
              {{ i }}
            </li>
          </ul>

          <p class="mt-6 text-[14px] leading-[1.5] text-gris-2">
            Los niveles y las condiciones se arman según lo que aporte cada marca. Se conversa uno
            por uno.
          </p>

          <a
            :href="whatsappPartner"
            target="_blank"
            rel="noopener noreferrer"
            class="btn mt-7 w-full"
          >
            Hablar de partnership
          <span class="sr-only"> (abre en una pestaña nueva)</span></a>
        </article>

        <!-- Prensa -->
        <article class="tarjeta flex flex-col p-8">
          <span class="chip self-start border-white/15 text-gris">Medios</span>
          <h3 class="mt-5 text-[1.5rem] font-black uppercase leading-[1.1]">Prensa</h3>
          <p class="mt-4 text-[16px] leading-[1.55] text-gris">
            Acreditación para medios del rubro gastronómico y de Córdoba. Alan Tapia queda
            disponible para entrevistas antes y durante la jornada.
          </p>

          <ul class="mt-7 grid gap-px bg-white/10">
            <li v-for="i in INCLUYE_PRENSA" :key="i" class="flex gap-3 bg-noche-2 py-3 text-[15px] leading-snug">
              <span class="shrink-0 text-acento-texto">—</span>
              {{ i }}
            </li>
          </ul>

          <p class="mt-6 text-[14px] leading-[1.5] text-gris-2">
            El tema de fondo: cómo se está reconvirtiendo la gastronomía cordobesa. El evento es el
            lugar donde se ve.
          </p>

          <a
            :href="whatsappPrensa"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-linea mt-7 w-full"
          >
            Pedir acreditación
          <span class="sr-only"> (abre en una pestaña nueva)</span></a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { linkWa } from "@/data/evento";

const INCLUYE_PARTNER = [
  "Stand en el salón durante toda la jornada",
  "Demo en vivo dentro del programa",
  "Tu marca en la comunicación del evento",
  "Un día entero cara a cara con dueños de cadenas, sin público general",
];

const INCLUYE_PRENSA = [
  "Acreditación para el 20 de septiembre",
  "Gacetilla y material fotográfico",
  "Entrevistas con Alan Tapia y los oradores",
  "Acceso a la mesa redonda de cierre",
];

const whatsappPartner = linkWa("partner");
const whatsappPrensa = linkWa("prensa");
</script>
