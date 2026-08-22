<template>
  <!--
    Estructura del referente: tira de fecha y sede sobre el título, título
    gigante en peso 900, bajada corta, barra de progreso de cupo y dos CTAs.
    La diferencia: su barra empuja fases de precio y la nuestra empuja el
    límite físico del salón, que es un dato y no un recurso de venta.
  -->
  <section id="hero" class="relative overflow-hidden pt-[104px]">
    <!-- Halo del acento, contenido y barato: sin JS ni imágenes -->
    <div
      class="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[130px]"
      style="background: radial-gradient(circle, #FF0054 0%, transparent 70%)"
      aria-hidden="true"
    ></div>

    <div class="contenedor relative py-14 sm:py-20">
      <p class="rotulo text-acento-texto">Edición 01 · Jornada de gastronomía y tecnología</p>

      <p class="mt-7 text-[14px] font-bold uppercase tracking-[0.14em] text-gris sm:text-[16px]">
        20 de septiembre 2026 &nbsp;|&nbsp; {{ EVENTO.venue }}, Córdoba
      </p>

      <h1 class="display mt-4 max-w-[13ch] text-[clamp(2.6rem,9vw,5.8rem)]">
        Gastronomía y tecnología
      </h1>

      <p class="mt-6 max-w-[46ch] text-[18px] font-semibold text-gris sm:text-[21px]">
        Nueve horas para bajar costos, ordenar la operación y vender más.
        <span class="text-white">Para dueños de marcas y restaurantes.</span>
      </p>

      <!-- Escasez con razón física, no con fases de precio -->
      <div class="mt-10 max-w-[520px] tarjeta p-5 sm:p-6">
        <!-- El punto que late: el referente lo usa como señal de "esto está vivo" -->
        <p class="flex items-center gap-2 text-[13px] font-black uppercase tracking-[0.12em]">
          <span class="relative flex h-2 w-2">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-acento opacity-70"
            ></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-acento"></span>
          </span>
          <span class="text-acento-texto">Registro abierto</span>
        </p>

        <div class="mt-4 flex items-baseline justify-between gap-4">
          <p class="rotulo text-white">{{ porcentaje }}% del salón tomado</p>
          <p class="text-[14px] font-bold tabular-nums text-gris">
            {{ ocupados }} / {{ total }}
          </p>
        </div>

        <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            class="h-full rounded-full bg-acento transition-[width] duration-[1200ms] ease-out"
            :style="{ width: ancho + '%' }"
          ></div>
        </div>

        <p class="mt-3 text-[15px] leading-[1.45] text-gris">
          El cupo es el del salón, no una fase de venta. Cuando entren
          {{ total }}, se cierra el registro.
        </p>
      </div>

      <div class="mt-9 flex flex-wrap items-center gap-3">
        <a href="#registro" class="btn" @click.prevent="ir('registro')">Quiero mi lugar</a>
        <a href="#jornada" class="btn-linea" @click.prevent="ir('jornada')">Ver el programa</a>
      </div>

      <p class="mt-5 text-[15px] text-gris">
        Entrada sin costo con inscripción previa · El código de acceso te llega por mail
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { EVENTO } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";

const { total, ocupados, porcentaje } = useCupo();

const ancho = ref(0);
onMounted(() => setTimeout(() => (ancho.value = Math.max(porcentaje.value, 3)), 400));
watch(porcentaje, (v) => {
  if (ancho.value > 0) ancho.value = Math.max(v, 3);
});

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
