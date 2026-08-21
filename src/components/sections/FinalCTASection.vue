<template>
  <section class="relative py-24 sm:py-32">
    <div class="mx-auto w-full max-w-[900px] px-6 text-center sm:px-8">
      <span
        class="inline-block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary font-bold mb-6"
      >
        {{ EVENTO.fechaCorta }} · Córdoba
      </span>

      <h2
        class="font-heading text-[clamp(1.9rem,4.2vw,3.4rem)] font-extrabold leading-[1.1] tracking-tighter text-slate-900"
      >
        El que no viene no se pierde una charla.
        <em class="font-light italic text-primary">Se pierde el acceso.</em>
      </h2>

      <p class="mx-auto mt-7 max-w-xl text-[1.05rem] leading-[1.7] text-slate-500">
        La agenda completa, los beneficios de los partners y tu reunión de diagnóstico se desbloquean
        cuando escaneás tu QR en la puerta. No hay otra forma de conseguirlos.
      </p>

      <a
        href="#registro"
        @click.prevent="ir('registro')"
        class="group mt-10 inline-flex items-center gap-2.5 rounded-xl bg-primary px-8 py-4 text-[1rem] font-bold text-white shadow-xl shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-[#5346c7]"
      >
        Reservar mi lugar
        <span
          class="inline-flex h-5 w-5 items-center justify-center rounded-lg bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5"
        >
          <svg width="10" height="10" viewBox="0 0 13 13" fill="none">
            <path
              d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </a>

      <p class="mt-6 text-[0.85rem] text-slate-400">
        Entrada gratuita · Registro obligatorio · No se transmite en vivo
      </p>
    </div>
  </section>
</template>

<script setup>
import { EVENTO } from "@/data/evento";

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
