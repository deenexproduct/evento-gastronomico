<template>
  <!--
    El cierre de la página: la contracara concreta de la apertura aspiracional.
    Acá no se promete nada, se inventaría lo que efectivamente se lleva.
  -->
  <section id="volves-con" class="border-b border-linea bg-white/5 py-20 sm:py-28">
    <div class="contenedor">
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-violeta">El balance del día</p>
        </div>
        <div class="lg:col-span-9">
          <h2 class="titular max-w-[18ch] text-[clamp(1.9rem,4.2vw,3.4rem)]">
            Con qué volvés al local el lunes.
          </h2>
          <p class="mt-6 max-w-[58ch] text-[1.05rem] leading-[1.65] text-gris">
            Un evento se mide por lo que te queda cuando termina. Esto es todo lo que se lleva el
            que estuvo en la sala, sin excepción y sin costo.
          </p>
        </div>
      </div>

      <ol class="mt-14 border-t border-linea">
        <li
          v-for="v in VOLVES_CON"
          :key="v.n"
          class="grid gap-x-8 gap-y-2 border-b border-linea py-6 lg:grid-cols-12"
        >
          <span class="rotulo text-violeta lg:col-span-1">{{ v.n }}</span>
          <h3 class="titular text-[1.12rem] lg:col-span-5">{{ v.titulo }}</h3>
          <p class="max-w-[52ch] text-[0.95rem] leading-[1.62] text-gris lg:col-span-6">
            {{ v.texto }}
          </p>
        </li>
      </ol>

      <!-- Cierre -->
      <div class="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
        <p class="max-w-[46ch] text-[1.15rem] leading-[1.5] text-white lg:col-span-7">
          Entrás con una duda sobre tu negocio y salís con una lista de cosas para hacer. Ese es
          todo el trato.
        </p>

        <div class="lg:col-span-5">
          <a href="#registro" class="btn w-full" @click.prevent="ir('registro')">
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
          <p class="mt-3 text-center text-[0.85rem] text-gris">
            {{ agotado ? "Cupo completo · lista de espera" : `Quedan ${restantes} de ${total} lugares` }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { VOLVES_CON } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";

const { total, restantes, agotado } = useCupo();

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
