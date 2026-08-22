<template>
  <section id="mesa-redonda" class="bg-fuego text-ink">
    <div class="grid lg:grid-cols-[1.15fr_.85fr]">
      <div class="border-b-[3px] border-ink p-8 sm:p-12 lg:border-b-0 lg:border-r-[3px]">
        <p class="kicker opacity-70">El cierre de la jornada</p>
        <h2 class="titular mt-6 text-[clamp(2.2rem,6.4vw,4.6rem)]">
          Todos los partners y speakers, en el centro del salón.
        </h2>

        <p class="mt-8 max-w-[50ch] text-[1.05rem] leading-[1.6] text-ink/80">
          Una hora de mesa redonda sobre cómo se construye un ecosistema gastronómico entre
          nosotros, y cómo apoyarnos para conseguir clientes serios. Con preguntas de la sala.
        </p>

        <p class="mt-5 max-w-[50ch] text-[1.05rem] leading-[1.6] text-ink/80">
          Es la única parte del día en la que
          <strong class="font-extrabold text-ink underline decoration-2 underline-offset-4"
            >todos los que hablaron están sentados juntos</strong
          >
          y se les puede preguntar cualquier cosa.
        </p>

        <a href="#registro" class="btn-cartel-inv mt-10 text-[0.95rem]" @click.prevent="ir('registro')">
          Quiero estar en la sala
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 8h11M9 3.5L13.5 8 9 12.5"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>

      <!-- La mesa -->
      <div class="flex items-center justify-center bg-ink p-10">
        <div class="relative aspect-square w-full max-w-[300px]">
          <div class="absolute inset-0 rounded-full border-[3px] border-white/15"></div>
          <div class="absolute inset-[16%] rounded-full border-[3px] border-white/10"></div>
          <div class="absolute inset-[32%] rounded-full bg-fuego"></div>

          <span
            v-for="n in 9"
            :key="n"
            class="silla absolute h-3.5 w-3.5 bg-lima"
            :style="silla(n)"
          ></span>

          <div class="absolute inset-0 flex items-center justify-center">
            <span class="kicker text-white/70">La mesa</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const TOTAL_SILLAS = 9;

function silla(n) {
  const angulo = ((n - 1) / TOTAL_SILLAS) * Math.PI * 2 - Math.PI / 2;
  const radio = 43; // % del contenedor
  return {
    left: `calc(50% + ${Math.cos(angulo) * radio}% - 7px)`,
    top: `calc(50% + ${Math.sin(angulo) * radio}% - 7px)`,
    animationDelay: `${n * 0.14}s`,
  };
}

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>

<style scoped>
.silla {
  animation: latir 3s ease-in-out infinite;
}
@keyframes latir {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.35);
  }
}
@media (prefers-reduced-motion: reduce) {
  .silla {
    animation: none;
    opacity: 0.85;
  }
}
</style>
