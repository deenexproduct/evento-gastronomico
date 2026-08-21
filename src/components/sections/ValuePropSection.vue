<template>
  <section id="que-te-llevas" class="relative py-24 sm:py-32">
    <div class="mx-auto w-full max-w-[1240px] px-6 sm:px-8">
      <!-- Header -->
      <div class="max-w-3xl">
        <span
          class="inline-block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary font-bold mb-5"
        >
          Qué te llevás
        </span>
        <h2
          class="font-heading text-[clamp(1.8rem,3.6vw,3rem)] font-extrabold leading-[1.1] tracking-tighter text-slate-900"
        >
          Salís con un diagnóstico,
          <em class="font-light italic text-primary">no con apuntes.</em>
        </h2>
        <p class="mt-6 text-[1.05rem] leading-[1.7] text-slate-500 max-w-2xl">
          Todo el que entra se lleva las cuatro cosas. No hay entrada premium ni lista especial:
          el que está en la sala accede a lo mismo.
        </p>
      </div>

      <!-- Grid -->
      <div class="mt-14 grid gap-4 sm:gap-5 lg:grid-cols-12">
        <article
          v-for="b in BENEFICIOS"
          :key="b.n"
          class="group relative overflow-hidden rounded-2xl border p-7 sm:p-8 transition-all duration-500 hover:-translate-y-1"
          :class="
            b.destacado
              ? 'lg:col-span-12 border-primary/25 bg-gradient-to-br from-primary/[0.07] via-white to-white hover:shadow-xl hover:shadow-primary/10'
              : 'lg:col-span-4 border-slate-200 bg-white hover:border-primary/30 hover:shadow-lg hover:shadow-slate-200/60'
          "
        >
          <div
            v-if="b.destacado"
            class="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
          ></div>

          <div class="relative flex items-start gap-5">
            <span
              class="font-mono text-[0.7rem] font-bold tracking-widest shrink-0 pt-1"
              :class="b.destacado ? 'text-primary' : 'text-slate-300'"
              >{{ b.n }}</span
            >
            <div class="min-w-0">
              <span
                class="inline-block font-mono text-[0.62rem] uppercase tracking-[0.18em] font-bold mb-3"
                :class="b.destacado ? 'text-primary' : 'text-slate-400'"
                >{{ b.kicker }}</span
              >
              <h3
                class="font-heading font-extrabold tracking-tight text-slate-900 leading-tight"
                :class="b.destacado ? 'text-[clamp(1.4rem,2.4vw,2rem)]' : 'text-[1.15rem]'"
              >
                {{ b.titulo }}
              </h3>
              <p
                class="mt-3 leading-[1.65] text-slate-500"
                :class="b.destacado ? 'text-[1.02rem] max-w-2xl' : 'text-[0.92rem]'"
              >
                {{ b.texto }}
              </p>

              <div
                v-if="b.destacado"
                class="mt-6 inline-flex items-center gap-2.5 rounded-xl border border-primary/20 bg-white/70 px-4 py-2.5"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
                <span class="text-[0.82rem] font-semibold text-slate-700">
                  No se consigue de ninguna otra forma
                </span>
              </div>
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
