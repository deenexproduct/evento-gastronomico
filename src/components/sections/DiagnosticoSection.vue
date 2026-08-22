<template>
  <section id="diagnostico" class="bg-ink">
    <!-- Encabezado -->
    <div class="px-5 py-16 sm:px-8 sm:py-20">
      <p class="kicker text-lima">Lo que te llevás · para todos, sin excepción</p>
      <h2 class="titular mt-6 max-w-[16ch] text-[clamp(2.4rem,8vw,6rem)] text-white">
        No es un evento<br />al que venís.<br />
        <span class="text-lima">Es un diagnóstico<br />que te llevás.</span>
      </h2>
      <p class="mt-8 max-w-[54ch] text-[1.05rem] leading-[1.6] text-white/60 sm:text-[1.15rem]">
        {{ DIAGNOSTICO.bajada }}
      </p>
    </div>

    <!-- Los cuatro bloques -->
    <div class="grid gap-[3px] bg-white/20 sm:grid-cols-2">
      <article
        v-for="(p, i) in DIAGNOSTICO.puntos"
        :key="p.titulo"
        class="flex min-h-[280px] flex-col justify-between p-8 sm:p-10"
        :class="ESTILOS[i]"
      >
        <div>
          <p class="kicker opacity-60">0{{ i + 1 }} · Diagnóstico</p>
          <h3 class="titular mt-5 text-[clamp(1.8rem,4.4vw,2.8rem)]">{{ p.titulo }}</h3>
        </div>
        <p class="mt-8 max-w-[40ch] text-[0.98rem] leading-[1.55] opacity-80">{{ p.texto }}</p>
      </article>
    </div>

    <!-- Cierre -->
    <div
      class="flex flex-col gap-8 border-t-[3px] border-white/20 px-5 py-14 sm:px-8 lg:flex-row lg:items-center lg:justify-between"
    >
      <p class="max-w-[58ch] text-[1.02rem] leading-[1.6] text-white/70">
        {{ DIAGNOSTICO.cierre }}
      </p>
      <a href="#registro" class="btn-cartel shrink-0 self-start text-[0.95rem]" @click.prevent="ir('registro')">
        Quiero mi diagnóstico
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 8h11M9 3.5L13.5 8 9 12.5"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </div>
  </section>
</template>

<script setup>
import { DIAGNOSTICO } from "@/data/evento";

// Bloques de color pleno alternados: es el momento más gráfico de la página.
const ESTILOS = [
  "bg-white text-ink",
  "bg-lima text-ink",
  "bg-fuego text-white",
  "bg-ink text-white",
];

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
