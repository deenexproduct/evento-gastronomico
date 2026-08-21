<template>
  <section id="speakers" class="relative py-24 sm:py-32">
    <div class="mx-auto w-full max-w-[1240px] px-6 sm:px-8">
      <!-- Header -->
      <div class="max-w-3xl">
        <span
          class="inline-block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary font-bold mb-5"
        >
          Quiénes hablan
        </span>
        <h2
          class="font-heading text-[clamp(1.8rem,3.6vw,3rem)] font-extrabold leading-[1.1] tracking-tighter text-slate-900"
        >
          Las voces
          <em class="font-light italic text-primary">confirmadas.</em>
        </h2>
        <p class="mt-6 text-[1.05rem] leading-[1.7] text-slate-500 max-w-2xl">
          Alan Tapia es el hilo conductor de la jornada: abre, presenta a cada speaker, modera la
          mesa redonda y cierra. La grilla sigue creciendo — acá solo aparece lo que ya está
          cerrado.
        </p>
      </div>

      <!-- Alan, destacado -->
      <article
        class="mt-14 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] via-white to-white"
      >
        <div class="grid lg:grid-cols-[320px_1fr]">
          <!-- Foto -->
          <div class="relative min-h-[280px] lg:min-h-full">
            <img
              :src="fotoAlan"
              alt="Alan Tapia, founder y CEO de Deenex"
              class="absolute inset-0 h-full w-full object-cover object-top"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white/20"
            ></div>
          </div>

          <!-- Contenido -->
          <div class="p-8 sm:p-10">
            <span
              class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-primary"
            >
              Hilo conductor · 3 charlas
            </span>

            <h3
              class="mt-5 font-heading text-[clamp(1.6rem,2.6vw,2.2rem)] font-extrabold tracking-tighter text-slate-900"
            >
              {{ alan.nombre }}
            </h3>
            <p class="mt-1 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-slate-400">
              {{ alan.rol }}
            </p>

            <p class="mt-6 border-l-2 border-primary pl-5 font-heading text-[1.05rem] italic leading-[1.55] text-slate-700">
              “{{ alan.frase }}”
            </p>

            <p class="mt-6 text-[0.95rem] leading-[1.7] text-slate-500">{{ alan.bio }}</p>

            <div class="mt-7">
              <span class="font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-400">
                Sus tres bloques
              </span>
              <ul class="mt-3 space-y-2.5">
                <li
                  v-for="(charla, i) in alan.charlas"
                  :key="i"
                  class="flex items-start gap-3 text-[0.92rem] leading-snug text-slate-700"
                >
                  <span
                    class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-[0.6rem] font-bold text-primary"
                    >{{ i + 1 }}</span
                  >
                  {{ charla }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>

      <!-- Resto -->
      <div class="mt-5 grid gap-5 md:grid-cols-3">
        <article
          v-for="s in otros"
          :key="s.id"
          class="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-slate-200/60"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 font-heading text-[1.1rem] font-black text-white transition-colors group-hover:bg-primary"
          >
            {{ s.nombre.charAt(0) }}
          </div>

          <h3 class="mt-5 font-heading text-[1.2rem] font-extrabold tracking-tight text-slate-900">
            {{ s.nombre }}
          </h3>
          <p class="mt-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-slate-400">
            {{ s.rol }}
          </p>

          <p class="mt-5 text-[0.9rem] leading-[1.65] text-slate-500 flex-1">{{ s.bio }}</p>

          <div class="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
            <span
              v-for="(st, i) in s.stats"
              :key="i"
              class="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[0.72rem] font-semibold text-slate-600"
            >
              <span class="text-primary font-bold">{{ st.valor }}</span> {{ st.label }}
            </span>
          </div>
        </article>
      </div>

      <!-- Nota grilla abierta -->
      <p class="mt-8 flex items-center justify-center gap-2.5 text-center text-[0.88rem] text-slate-400">
        <span class="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
        Se están sumando más voces al escenario. Los anuncios salen a medida que se cierran.
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { SPEAKERS } from "@/data/evento";
import fotoAlan from "@/assets/images/speakers/alan-tapia.jpg";

const alan = computed(() => SPEAKERS.find((s) => s.id === "alan"));
const otros = computed(() => SPEAKERS.filter((s) => s.id !== "alan"));
</script>
