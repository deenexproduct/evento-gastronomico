<template>
  <section id="que-te-llevas" class="relative py-24 sm:py-32">
    <div class="mx-auto w-full max-w-[1240px] px-6 sm:px-8">
      <!-- Header -->
      <div class="max-w-3xl">
        <span
          class="inline-block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary font-bold mb-5"
        >
          Además del diagnóstico
        </span>
        <h2
          class="font-heading text-[clamp(1.8rem,3.6vw,3rem)] font-extrabold leading-[1.1] tracking-tighter text-slate-900"
        >
          Lo otro que te llevás
          <em class="font-light italic text-primary">de la sala.</em>
        </h2>
        <p class="mt-6 text-[1.05rem] leading-[1.7] text-slate-500 max-w-2xl">
          Sin entrada premium ni lista especial: el que está en la sala accede exactamente a lo
          mismo que el de al lado.
        </p>
      </div>

      <!-- Grid -->
      <div class="mt-14 grid gap-4 sm:gap-5 md:grid-cols-3">
        <article
          v-for="b in BENEFICIOS"
          :key="b.n"
          class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-slate-200/60 sm:p-8"
        >
          <div class="relative flex items-start gap-5">
            <span class="shrink-0 pt-1 font-mono text-[0.7rem] font-bold tracking-widest text-slate-300">
              {{ b.n }}
            </span>
            <div class="min-w-0">
              <span
                class="mb-3 inline-block font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-400"
                >{{ b.kicker }}</span
              >
              <h3
                class="font-heading text-[1.15rem] font-extrabold leading-tight tracking-tight text-slate-900"
              >
                {{ b.titulo }}
              </h3>
              <p class="mt-3 text-[0.92rem] leading-[1.65] text-slate-500">{{ b.texto }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { BENEFICIOS } from "@/data/evento";
</script>
