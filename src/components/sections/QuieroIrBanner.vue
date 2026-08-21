<template>
  <section class="relative py-6">
    <div class="mx-auto w-full max-w-[1240px] px-6 sm:px-8">
      <div
        class="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/[0.08] via-white to-violet-100/40 p-8 sm:p-10"
      >
        <div
          class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        ></div>

        <div class="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
          <div class="max-w-2xl">
            <span
              class="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em]"
              :class="
                critico
                  ? 'border-rose-200 bg-rose-50 text-rose-600'
                  : 'border-primary/20 bg-primary/5 text-primary'
              "
            >
              <span
                class="h-1 w-1 rounded-full"
                :class="critico ? 'bg-rose-500 animate-pulse' : 'bg-primary'"
              ></span>
              {{ agotado ? "Cupo completo" : `Quedan ${restantes} de ${total} lugares` }}
            </span>

            <h2
              class="mt-4 font-heading text-[clamp(1.4rem,2.6vw,2.1rem)] font-extrabold leading-[1.15] tracking-tighter text-slate-900"
            >
              Faltan {{ diasRestantes }} días y el salón tiene un límite.
            </h2>
            <p class="mt-3 text-[0.98rem] leading-[1.6] text-slate-500">
              Registrarte lleva un minuto y te asegura la entrada, los beneficios de los partners y
              tu reunión de diagnóstico.
            </p>
          </div>

          <a
            href="#registro"
            @click.prevent="ir('registro')"
            class="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-6 py-4 text-[0.95rem] font-bold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-[#5346c7]"
          >
            Reservar mi lugar
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
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { EVENTO } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";

const { total, restantes, agotado, critico } = useCupo();

const diasRestantes = computed(() => {
  const diff = new Date(EVENTO.fechaISO).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86400000));
});

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
