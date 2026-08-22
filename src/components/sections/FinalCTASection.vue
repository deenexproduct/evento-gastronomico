<template>
  <section class="bg-ink px-5 py-20 text-center text-white sm:px-8 sm:py-28">
    <p class="kicker text-lima">{{ EVENTO.fechaCorta }} · Córdoba</p>

    <h2 class="titular mx-auto mt-8 max-w-[16ch] text-[clamp(2.4rem,8.5vw,6.5rem)]">
      El que no viene no se pierde una charla.
      <span class="text-lima">Se pierde el acceso.</span>
    </h2>

    <p class="mx-auto mt-9 max-w-[54ch] text-[1.05rem] leading-[1.6] text-white/60">
      La agenda completa, los beneficios de los partners y tu reunión de diagnóstico se desbloquean
      cuando escaneás tu QR en la puerta. No hay otra forma de conseguirlos.
    </p>

    <a href="#registro" class="btn-cartel mt-12 text-[1.05rem]" @click.prevent="ir('registro')">
      Reservar mi lugar
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
        <path
          d="M2 8h11M9 3.5L13.5 8 9 12.5"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </a>

    <p class="kicker mt-10 text-white/35">
      Entrada gratuita · Registro obligatorio · No se transmite en vivo
    </p>
  </section>
</template>

<script setup>
import { EVENTO } from "@/data/evento";

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
