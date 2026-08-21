<template>
  <section
    id="hero"
    :class="{ 'hero-ready': ready }"
    class="hero-section relative flex min-h-[100svh] flex-col overflow-hidden pt-32 pb-20 sm:pt-40"
  >
    <!-- Background -->
    <div class="pointer-events-none absolute inset-0 z-0">
      <div class="hero-dot-grid absolute inset-0 z-0"></div>
      <div class="orb orb-1 absolute rounded-full bg-primary/10 blur-[120px]"></div>
      <div class="orb orb-2 absolute rounded-full bg-violet-400/10 blur-[140px]"></div>
      <div class="orb orb-3 absolute rounded-full bg-indigo-300/8 blur-[100px]"></div>
    </div>

    <div class="relative z-10 mx-auto flex w-full max-w-[1240px] flex-1 flex-col px-6 sm:px-8">
      <!-- Pills -->
      <div
        :class="{ 'animate-rise': ready, 'opacity-0': !ready }"
        class="mb-7 flex flex-wrap items-center justify-center gap-2.5"
        style="animation-delay: 0.05s"
      >
        <span class="pill pill-neutral">Córdoba · Argentina</span>
        <span class="pill pill-neutral">{{ EVENTO.fechaCorta }} · {{ EVENTO.horario }}</span>
        <span class="pill pill-primary">Solo {{ total }} lugares</span>
        <span class="pill pill-neutral">{{ EVENTO.venue }}</span>
        <span
          class="pill"
          :class="critico || agotado ? 'pill-rose' : 'pill-emerald'"
        >
          <span
            class="h-1.5 w-1.5 rounded-full"
            :class="critico || agotado ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'"
          ></span>
          {{ agotado ? "Cupo completo · lista de espera" : `Quedan ${restantes} lugares` }}
        </span>
      </div>

      <!-- Headline -->
      <h1
        :class="{ 'animate-rise': ready, 'opacity-0': !ready }"
        class="text-center font-heading text-[clamp(1.9rem,4.9vw,4rem)] leading-[1.08] tracking-tighter text-slate-900 max-w-5xl mx-auto"
        style="animation-delay: 0.15s"
      >
        <span class="block font-extrabold">
          No venís a <em class="font-light italic text-slate-400">escuchar charlas</em>.
        </span>
        <span class="block font-extrabold">
          Te vas con un <em class="font-light italic text-primary">diagnóstico</em>
        </span>
        <span class="block font-extrabold">de tu negocio.</span>
        <span
          class="block mt-6 text-[clamp(1rem,1.6vw,1.5rem)] font-medium leading-snug text-slate-500 tracking-tight"
        >
          Una jornada de innovación, tecnología y marketing para el mercado gastronómico.
        </span>
      </h1>

      <!-- Sub -->
      <p
        :class="{ 'animate-rise': ready, 'opacity-0': !ready }"
        class="mx-auto mt-7 max-w-[660px] text-center text-[1.05rem] sm:text-[1.15rem] font-medium leading-[1.6] text-slate-500"
        style="animation-delay: 0.28s"
      >
        {{ EVENTO.fechaLarga }}, en el {{ EVENTO.venue }} de Córdoba.
        <span class="font-semibold text-slate-900"
          >Hasta {{ total }} dueños de marcas gastronómicas y restaurantes</span
        >
        en la misma sala. Entrada gratuita, registro obligatorio.
      </p>

      <!-- CTAs -->
      <div
        :class="{ 'animate-rise': ready, 'opacity-0': !ready }"
        class="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        style="animation-delay: 0.4s"
      >
        <a
          href="#registro"
          @click.prevent="ir('registro')"
          class="btn-primary group inline-flex items-center gap-2 bg-primary text-white font-semibold rounded-xl px-5 py-3 sm:px-6 sm:py-3.5 text-[0.9rem] sm:text-[0.95rem] transition-all hover:bg-[#5346c7] shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 relative overflow-hidden"
        >
          <span class="btn-shimmer"></span>
          Reservar mi lugar
          <span
            class="inline-flex items-center justify-center w-5 h-5 rounded-lg bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5"
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

        <a
          href="#jornada"
          @click.prevent="ir('jornada')"
          class="group inline-flex items-center gap-2 px-3 py-3 sm:px-4 sm:py-3.5 text-[0.9rem] sm:text-[0.95rem] font-semibold text-slate-600 hover:text-primary transition-colors"
        >
          Ver cómo es el día
          <svg
            width="12"
            height="12"
            viewBox="0 0 13 13"
            fill="none"
            class="transition-transform duration-300 group-hover:translate-x-0.5"
          >
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

      <!-- Cupo -->
      <div
        :class="{ 'animate-rise': ready, 'opacity-0': !ready }"
        class="mx-auto mt-12 w-full max-w-[460px]"
        style="animation-delay: 0.5s"
      >
        <div
          class="flex items-center justify-between mb-2.5 font-mono text-[0.68rem] uppercase tracking-[0.14em]"
        >
          <span class="text-slate-400">Lugares tomados</span>
          <span class="font-bold" :class="critico ? 'text-rose-500' : 'text-primary'"
            >{{ ocupados }} / {{ total }}</span
          >
        </div>
        <div class="h-1 bg-slate-200 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-[width] duration-[1600ms] ease-out"
            :class="
              critico
                ? 'bg-gradient-to-r from-rose-500 to-orange-400'
                : 'bg-gradient-to-r from-primary to-violet-400'
            "
            :style="{ width: barra + '%' }"
          ></div>
        </div>
        <p class="mt-2.5 text-center text-[0.72rem] text-slate-400">
          El cupo es el del salón. Cuando se llena, se cierra.
        </p>
      </div>

      <!-- Stats -->
      <div
        :class="{ 'animate-rise': ready, 'opacity-0': !ready }"
        class="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 pt-10 border-t border-slate-200/70"
        style="animation-delay: 0.6s"
        ref="statsRef"
      >
        <div v-for="(stat, i) in stats" :key="i" class="text-center">
          <div
            class="font-heading font-black text-primary text-[clamp(1.7rem,3.6vw,2.6rem)] leading-none tracking-tighter mb-1.5"
          >
            <span v-if="stat.prefix" class="text-[0.65em] opacity-75">{{ stat.prefix }}</span>
            <span class="tabular-nums">{{ displayValues[i] }}</span>
            <span v-if="stat.suffix" class="text-[0.65em] opacity-75">{{ stat.suffix }}</span>
          </div>
          <div class="text-[0.7rem] uppercase tracking-[0.14em] text-slate-500 font-bold">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, watch } from "vue";
import { EVENTO } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";

const ready = ref(false);
const statsRef = ref(null);
const hasAnimated = ref(false);

const { total, ocupados, restantes, porcentaje, agotado, critico } = useCupo();

// La barra nunca arranca en cero visual: da sensación de sala que se está llenando.
const barra = ref(0);
const objetivoBarra = computed(() => Math.max(porcentaje.value, 4));

const stats = [
  { prefix: "", value: 8, suffix: "h", label: "de jornada" },
  { prefix: "", value: 6, suffix: "+", label: "voces en escenario" },
  { prefix: "", value: 200, suffix: "", label: "lugares, no más" },
  { prefix: "", value: 100, suffix: "%", label: "dueños en la sala" },
];

const displayValues = reactive(stats.map(() => "0"));

function animateCounter(index, target, duration = 1800) {
  const startTime = performance.now();
  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const value = Math.round(target * eased);
    displayValues[index] = value >= 1000 ? value.toLocaleString("es-AR") : String(value);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

let observer = null;

onMounted(() => {
  setTimeout(() => (ready.value = true), 200);
  setTimeout(() => (barra.value = objetivoBarra.value), 900);

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !hasAnimated.value) {
        hasAnimated.value = true;
        stats.forEach((stat, i) => setTimeout(() => animateCounter(i, stat.value), i * 120));
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );
  if (statsRef.value) observer.observe(statsRef.value);
});

// Si el endpoint de cupo responde después del montaje, la barra sigue el dato real.
watch(objetivoBarra, (v) => {
  if (barra.value > 0) barra.value = v;
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.hero-section {
  background: #f8f9fb;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 9999px;
  border-width: 1px;
  padding: 0.25rem 0.875rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}
@media (min-width: 640px) {
  .pill {
    font-size: 0.72rem;
    padding: 0.375rem 0.875rem;
  }
}
.pill-neutral {
  border-color: rgb(226 232 240);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(4px);
  color: rgb(71 85 105);
  font-weight: 600;
}
.pill-primary {
  border-color: rgba(105, 94, 222, 0.2);
  background: rgba(105, 94, 222, 0.05);
  color: var(--primary);
}
.pill-emerald {
  border-color: rgb(167 243 208);
  background: rgb(236 253 245);
  color: rgb(4 120 87);
}
.pill-rose {
  border-color: rgb(254 205 211);
  background: rgb(255 241 242);
  color: rgb(225 29 72);
}

.hero-dot-grid {
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.07) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 100%);
}

.orb {
  position: absolute;
}
.orb-1 {
  width: 600px;
  height: 600px;
  left: -8%;
  top: -5%;
  animation: orbDrift 20s ease-in-out infinite alternate;
}
.orb-2 {
  width: 700px;
  height: 700px;
  right: -12%;
  top: 20%;
  animation: orbDrift 25s ease-in-out 3s infinite alternate-reverse;
}
.orb-3 {
  width: 400px;
  height: 400px;
  left: 30%;
  bottom: 10%;
  animation: orbDrift 18s ease-in-out 5s infinite alternate;
}

@keyframes orbDrift {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(30px, -20px) scale(1.05);
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.98);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}
.animate-rise {
  animation: rise 1s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.btn-primary {
  isolation: isolate;
}
.btn-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 60%
  );
  background-size: 200% 100%;
  animation: shimmer 3s ease-in-out infinite;
}
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .orb,
  .btn-shimmer {
    animation: none;
  }
}
</style>
