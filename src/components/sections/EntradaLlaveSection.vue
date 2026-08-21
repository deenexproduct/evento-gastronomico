<template>
  <section id="tu-entrada" class="relative py-24 sm:py-32">
    <div class="mx-auto w-full max-w-[1240px] px-6 sm:px-8">
      <div class="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
        <!-- Copy -->
        <div>
          <span
            class="inline-block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary font-bold mb-5"
          >
            Tu entrada
          </span>
          <h2
            class="font-heading text-[clamp(1.8rem,3.6vw,3rem)] font-extrabold leading-[1.1] tracking-tighter text-slate-900"
          >
            No es un papel.
            <em class="font-light italic text-primary">Es una llave.</em>
          </h2>
          <p class="mt-6 text-[1.05rem] leading-[1.7] text-slate-500">
            Registrarte te da el lugar. Escanear el QR en la puerta te abre lo que hay adentro: la
            agenda completa del día y tu reunión de diagnóstico.
          </p>
          <p class="mt-4 text-[1.05rem] leading-[1.7] text-slate-500">
            El que no viene
            <span class="font-semibold text-slate-900">no se pierde una charla</span> — se pierde el
            acceso.
          </p>

          <a
            href="#registro"
            @click.prevent="ir('registro')"
            class="mt-9 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-[0.95rem] font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-[#5346c7]"
          >
            Quiero mi lugar
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

        <!-- Pasos -->
        <div class="relative">
          <div
            class="absolute left-[27px] top-8 bottom-8 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent"
          ></div>

          <div class="space-y-4">
            <div
              v-for="paso in PASOS_ENTRADA"
              :key="paso.n"
              class="group relative flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-slate-200/60"
            >
              <span
                class="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/8 font-heading text-[1.25rem] font-black text-primary ring-4 ring-white transition-colors group-hover:bg-primary group-hover:text-white"
              >
                {{ paso.n }}
              </span>
              <div class="min-w-0 pt-1">
                <h3 class="font-heading text-[1.05rem] font-bold tracking-tight text-slate-900">
                  {{ paso.titulo }}
                </h3>
                <p class="mt-2 text-[0.9rem] leading-[1.6] text-slate-500">{{ paso.texto }}</p>
              </div>
            </div>
          </div>

          <!-- Nota QR -->
          <div
            class="mt-5 flex items-start gap-4 rounded-2xl border border-slate-900/10 bg-slate-900 p-6"
          >
            <svg
              class="mt-0.5 h-7 w-7 shrink-0 text-primary-light"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <path d="M14 14h3v3h-3zM18 18h3v3h-3z" />
            </svg>
            <p class="text-[0.88rem] leading-[1.6] text-slate-400">
              El QR llega a tu email apenas te registrás. Guardalo:
              <span class="font-semibold text-white">sin QR no hay ingreso</span>, y con él se abre
              todo lo demás.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PASOS_ENTRADA } from "@/data/evento";

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
