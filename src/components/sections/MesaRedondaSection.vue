<template>
  <section id="mesa-redonda" class="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[140px]"
      ></div>
    </div>

    <div class="relative z-10 mx-auto w-full max-w-[900px] px-6 text-center sm:px-8">
      <span
        class="inline-block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary-light font-bold mb-7"
      >
        El cierre · 17:00
      </span>

      <h2
        class="font-heading text-[clamp(1.8rem,4vw,3.2rem)] font-extrabold leading-[1.12] tracking-tighter text-white"
      >
        Todos los partners y speakers,
        <em class="font-light italic text-primary-light">en el centro del salón.</em>
      </h2>

      <p class="mx-auto mt-8 max-w-2xl text-[1.05rem] leading-[1.75] text-slate-400">
        Una hora de mesa redonda para hablar en serio de cómo se construye un ecosistema
        gastronómico entre nosotros, y cómo apoyarnos para conseguir clientes serios.
      </p>

      <p class="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-[1.75] text-slate-400">
        Es el momento más aspiracional del día y el que mejor resume de qué se trata todo esto:
        <span class="font-semibold text-white"
          >no vinimos a escuchar, vinimos a armar algo juntos.</span
        >
      </p>

      <!-- Mesa visual -->
      <div class="mt-14 flex items-center justify-center">
        <div class="mesa relative flex h-[220px] w-[220px] items-center justify-center sm:h-[280px] sm:w-[280px]">
          <div class="absolute inset-0 rounded-full border border-white/10"></div>
          <div class="absolute inset-[14%] rounded-full border border-white/[0.07]"></div>
          <div
            class="absolute inset-[30%] rounded-full bg-gradient-to-br from-primary/25 to-violet-500/10 backdrop-blur-sm"
          ></div>

          <span
            v-for="n in 8"
            :key="n"
            class="silla absolute h-3 w-3 rounded-full bg-primary-light/80"
            :style="posicionSilla(n)"
          ></span>

          <span
            class="relative z-10 font-mono text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/70"
          >
            La mesa
          </span>
        </div>
      </div>

      <a
        href="#registro"
        @click.prevent="ir('registro')"
        class="mt-14 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[0.95rem] font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:bg-slate-100"
      >
        Quiero estar en la sala
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
  </section>
</template>

<script setup>
function posicionSilla(n) {
  const angulo = ((n - 1) / 8) * Math.PI * 2 - Math.PI / 2;
  const radio = 42; // % del contenedor
  return {
    left: `calc(50% + ${Math.cos(angulo) * radio}% - 6px)`,
    top: `calc(50% + ${Math.sin(angulo) * radio}% - 6px)`,
    animationDelay: `${n * 0.15}s`,
  };
}

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>

<style scoped>
.silla {
  animation: pulso 3s ease-in-out infinite;
}
@keyframes pulso {
  0%,
  100% {
    opacity: 0.45;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.25);
  }
}

@media (prefers-reduced-motion: reduce) {
  .silla {
    animation: none;
    opacity: 0.8;
  }
}
</style>
