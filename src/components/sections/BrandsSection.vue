<template>
  <section id="partners" class="relative py-24 sm:py-32">
    <div class="mx-auto w-full max-w-[1240px] px-6 sm:px-8">
      <!-- Header -->
      <div class="max-w-3xl">
        <span
          class="inline-block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary font-bold mb-5"
        >
          Partners
        </span>
        <h2
          class="font-heading text-[clamp(1.8rem,3.6vw,3rem)] font-extrabold leading-[1.1] tracking-tighter text-slate-900"
        >
          Los que ya están
          <em class="font-light italic text-primary">adentro.</em>
        </h2>
        <p class="mt-6 text-[1.05rem] leading-[1.7] text-slate-500 max-w-2xl">
          Cada partner llega con un beneficio exclusivo para los que estén en la sala ese día. La
          lista sigue abierta: se anuncian a medida que se cierran.
        </p>
      </div>

      <!-- Partners cerrados -->
      <div class="mt-14 grid gap-5 md:grid-cols-3">
        <article
          v-for="p in PARTNERS"
          :key="p.nombre"
          class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-slate-200/60"
        >
          <span
            class="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[0.58rem] font-bold uppercase tracking-[0.14em] text-emerald-700"
          >
            <span class="h-1 w-1 rounded-full bg-emerald-500"></span>
            {{ p.tipo }}
          </span>

          <h3 class="mt-5 font-heading text-[1.35rem] font-extrabold tracking-tight text-slate-900">
            {{ p.nombre }}
          </h3>
          <p class="mt-3 text-[0.9rem] leading-[1.65] text-slate-500">{{ p.aporte }}</p>
        </article>
      </div>

      <!-- Slot abierto -->
      <div
        class="mt-5 flex flex-col items-start justify-between gap-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-7 sm:flex-row sm:items-center"
      >
        <div>
          <h3 class="font-heading text-[1.1rem] font-bold tracking-tight text-slate-900">
            Hay más partners en camino.
          </h3>
          <p class="mt-1.5 text-[0.9rem] leading-[1.6] text-slate-500">
            Stands, activaciones y beneficios que se suman semana a semana. ¿Querés que tu marca
            esté en la sala?
          </p>
        </div>
        <a
          :href="whatsappPartners"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-[0.88rem] font-semibold text-slate-700 transition-all hover:border-primary/40 hover:text-primary"
        >
          Quiero ser partner
          <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
            <path
              d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>

      <!-- Prueba social -->
      <div class="mt-20 border-t border-slate-200 pt-14">
        <p
          class="text-center font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-400"
        >
          Marcas que ya trabajan con Deenex
        </p>

        <div class="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14">
          <img
            v-for="logo in logos"
            :key="logo.src"
            :src="logo.src"
            :alt="logo.alt"
            class="h-8 w-auto max-w-[130px] object-contain opacity-45 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PARTNERS, MARCAS_LOGOS } from "@/data/evento";

const archivos = import.meta.glob("@/assets/images/brands/*", { eager: true, import: "default" });

const logos = MARCAS_LOGOS.map((nombre) => {
  const clave = Object.keys(archivos).find((k) => k.endsWith(`/${nombre}`));
  return {
    src: clave ? archivos[clave] : "",
    alt: nombre.replace(/\.\w+$/, "").replace(/[-_]/g, " "),
  };
}).filter((l) => l.src);

const whatsappPartners =
  "https://wa.me/5491154596266?text=" +
  encodeURIComponent(
    "Hola Alan! Me interesa ser partner del evento de Deenex del 20 de septiembre en Córdoba. Mi marca es ____."
  );
</script>
