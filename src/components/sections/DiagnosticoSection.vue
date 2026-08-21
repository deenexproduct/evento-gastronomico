<template>
  <section id="diagnostico" class="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
    <!-- Background -->
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -left-24 top-0 h-[520px] w-[520px] rounded-full bg-primary/25 blur-[130px]"
      ></div>
      <div
        class="absolute -right-20 bottom-0 h-[440px] w-[440px] rounded-full bg-violet-500/15 blur-[120px]"
      ></div>
      <div class="diag-grid absolute inset-0"></div>
    </div>

    <div class="relative z-10 mx-auto w-full max-w-[1240px] px-6 sm:px-8">
      <!-- Header -->
      <div class="max-w-4xl">
        <span
          class="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary-light"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-primary-light animate-pulse"></span>
          Lo que te llevás · para todos, sin excepción
        </span>

        <h2
          class="mt-7 font-heading text-[clamp(1.9rem,4.2vw,3.4rem)] font-extrabold leading-[1.1] tracking-tighter text-white"
        >
          No es un evento al que venís.
          <em class="font-light italic text-primary-light">Es un diagnóstico que te llevás.</em>
        </h2>

        <p class="mt-7 max-w-2xl text-[1.08rem] leading-[1.75] text-slate-400">
          {{ DIAGNOSTICO.bajada }}
        </p>
      </div>

      <!-- Los 4 puntos -->
      <div class="mt-16">
        <p
          class="font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-slate-500"
        >
          Qué se analiza
        </p>

        <div class="mt-6 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(p, i) in DIAGNOSTICO.puntos"
            :key="p.titulo"
            class="group relative bg-slate-900 p-7 transition-colors duration-300 hover:bg-slate-800/80"
          >
            <span
              class="font-mono text-[0.7rem] font-bold tracking-widest text-primary-light/60 transition-colors group-hover:text-primary-light"
            >
              0{{ i + 1 }}
            </span>
            <h3 class="mt-4 font-heading text-[1.1rem] font-bold tracking-tight text-white">
              {{ p.titulo }}
            </h3>
            <p class="mt-3 text-[0.9rem] leading-[1.65] text-slate-400">{{ p.texto }}</p>
          </div>
        </div>
      </div>

      <!-- Cierre + CTA -->
      <div
        class="mt-8 flex flex-col gap-7 rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-9 lg:flex-row lg:items-center lg:justify-between"
      >
        <p class="max-w-2xl text-[1rem] leading-[1.7] text-slate-300">
          {{ DIAGNOSTICO.cierre }}
        </p>

        <a
          href="#registro"
          @click.prevent="ir('registro')"
          class="group inline-flex shrink-0 items-center gap-2.5 self-start rounded-xl bg-white px-6 py-4 text-[0.95rem] font-bold text-slate-900 transition-all hover:-translate-y-0.5 hover:bg-slate-100 lg:self-auto"
        >
          Quiero mi diagnóstico
          <span
            class="inline-flex h-5 w-5 items-center justify-center rounded-lg bg-slate-900/10 transition-transform duration-300 group-hover:translate-x-0.5"
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
      </div>
    </div>
  </section>
</template>

<script setup>
import { DIAGNOSTICO } from "@/data/evento";

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>

<style scoped>
.diag-grid {
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 75% 65% at 25% 35%, black 20%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 75% 65% at 25% 35%, black 20%, transparent 100%);
}
</style>
