<template>
  <section id="para-quien" class="relative bg-white py-24 sm:py-32">
    <div class="mx-auto w-full max-w-[1240px] px-6 sm:px-8">
      <div class="grid gap-14 lg:grid-cols-[1fr_380px] lg:gap-16">
        <!-- Sí -->
        <div>
          <span
            class="inline-block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary font-bold mb-5"
          >
            Para quién es
          </span>
          <h2
            class="font-heading text-[clamp(1.8rem,3.6vw,3rem)] font-extrabold leading-[1.1] tracking-tighter text-slate-900"
          >
            Una sala de
            <em class="font-light italic text-primary">decisores.</em>
          </h2>
          <p class="mt-6 max-w-2xl text-[1.05rem] leading-[1.7] text-slate-500">
            Dueños de marcas gastronómicas y dueños de restaurantes, con el mismo peso: la cadena
            de varios locales y el restaurante de uno solo. Córdoba capital y provincia.
          </p>

          <div class="mt-10 space-y-4">
            <div
              v-for="p in PUBLICO.si"
              :key="p.titulo"
              class="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-primary/30"
            >
              <span
                class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  class="text-primary"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M2 7.5l3.5 3.5L12 4" />
                </svg>
              </span>
              <div class="min-w-0">
                <h3 class="font-heading text-[1.02rem] font-bold tracking-tight text-slate-900">
                  {{ p.titulo }}
                </h3>
                <p class="mt-1.5 text-[0.9rem] leading-[1.6] text-slate-500">{{ p.texto }}</p>
              </div>
            </div>
          </div>

          <p class="mt-8 text-[0.95rem] leading-[1.7] text-slate-500">
            Hablamos de
            <span class="font-semibold text-slate-900">margen, tiempo y decisiones</span>. No es una
            charla introductoria sobre digitalización ni una feria de comida: es un evento de
            negocios.
          </p>
        </div>

        <!-- No -->
        <aside class="lg:pt-[4.5rem]">
          <div class="rounded-2xl border border-slate-200 bg-slate-50/70 p-7">
            <span
              class="font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-400"
            >
              Para quién no
            </span>
            <ul class="mt-5 space-y-4">
              <li
                v-for="(item, i) in PUBLICO.no"
                :key="i"
                class="flex items-start gap-3 text-[0.9rem] leading-[1.55] text-slate-500"
              >
                <span
                  class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-200"
                >
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 12 12"
                    fill="none"
                    class="text-slate-500"
                    stroke="currentColor"
                    stroke-width="2.2"
                    stroke-linecap="round"
                  >
                    <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" />
                  </svg>
                </span>
                {{ item }}
              </li>
            </ul>

            <p class="mt-6 border-t border-slate-200 pt-5 text-[0.85rem] leading-[1.6] text-slate-400">
              El cupo es de 200 y es real. Preferimos la sala llena de gente que decide antes que
              llena a secas.
            </p>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PUBLICO } from "@/data/evento";
</script>
