<template>
  <section class="border-b border-linea py-24 sm:py-32">
    <div class="contenedor">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-acento-texto">{{ EVENTO.fechaCorta }} · Córdoba</p>
        </div>

        <div class="lg:col-span-9">
          <h2 class="titular max-w-[18ch] text-[clamp(2rem,4.6vw,3.6rem)]">
            Un día para volver al local con algo.
          </h2>

          <p class="mt-8 max-w-[56ch] text-[1.05rem] leading-[1.65] text-gris">
            Seis bloques sobre gastronomía y tecnología, demos en vivo, doscientos colegas del rubro
            y los beneficios de todos los partners. Un domingo, en Córdoba, sin costo.
          </p>

          <a href="#registro" class="btn mt-10" @click.prevent="ir('registro')">
            Reservar mi lugar
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 8h11M9 3.5L13.5 8 9 12.5"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>

          <p class="mt-6 text-[0.87rem] text-gris">
            Entrada gratuita · Registro obligatorio · No se transmite en vivo
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { EVENTO } from "@/data/evento";

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
