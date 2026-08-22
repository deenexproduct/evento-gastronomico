<template>
  <section id="tu-entrada" class="bg-lima text-ink">
    <div class="px-5 py-16 sm:px-8 sm:py-20">
      <p class="kicker opacity-60">Tu entrada</p>
      <h2 class="titular mt-6 max-w-[12ch] text-[clamp(2.6rem,9vw,7rem)]">
        No es un papel.<br /><span class="contorno text-ink">Es una llave.</span>
      </h2>

      <div class="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <p class="max-w-[46ch] text-[1.1rem] leading-[1.55] text-ink/80 sm:text-[1.25rem]">
          Registrarte te da el lugar. Escanear el QR en la puerta te abre lo que hay adentro: la
          agenda completa del día y la grilla con los beneficios de todos los partners.
        </p>
        <p class="max-w-[46ch] self-end text-[1.1rem] font-bold leading-[1.4] sm:text-[1.35rem]">
          Son 200 lugares y la puerta se controla. El que llega sin haberse registrado, no entra.
        </p>
      </div>
    </div>

    <!-- Los tres pasos -->
    <div class="grid gap-[3px] border-t-[3px] border-ink bg-ink md:grid-cols-3">
      <article
        v-for="paso in PASOS_ENTRADA"
        :key="paso.n"
        class="flex min-h-[250px] flex-col justify-between bg-lima p-8"
      >
        <span class="titular text-[clamp(3rem,7vw,5rem)] leading-none">0{{ paso.n }}</span>
        <div>
          <h3 class="titular text-[clamp(1.2rem,2.6vw,1.6rem)]">{{ paso.titulo }}</h3>
          <p class="mt-3 text-[0.93rem] leading-[1.55] text-ink/70">{{ paso.texto }}</p>
        </div>
      </article>
    </div>

    <!-- Nota QR -->
    <div class="flex flex-col gap-6 border-t-[3px] border-ink bg-ink p-8 text-white sm:flex-row sm:items-center sm:p-10">
      <svg class="h-12 w-12 shrink-0 text-lima" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <path d="M14 14h3v3h-3zM18 18h3v3h-3zM14 20h2M20 14h1" />
      </svg>
      <p class="max-w-[62ch] text-[1rem] leading-[1.6] text-white/70">
        El QR llega a tu email apenas te registrás.
        <strong class="font-extrabold text-lima">Guardalo en el celular</strong> — no hace falta
        imprimirlo, y con eso ya tenés todo resuelto en la puerta.
      </p>
    </div>
  </section>
</template>

<script setup>
import { PASOS_ENTRADA } from "@/data/evento";
</script>
