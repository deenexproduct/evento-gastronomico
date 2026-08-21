<template>
  <section id="por-que" class="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
    <!-- Background -->
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[130px]"
      ></div>
      <div
        class="absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-violet-500/15 blur-[120px]"
      ></div>
      <div class="manifesto-grid absolute inset-0"></div>
    </div>

    <div class="relative z-10 mx-auto w-full max-w-[1240px] px-6 sm:px-8">
      <span
        class="inline-block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary-light font-bold mb-7"
      >
        Por qué ahora
      </span>

      <h2
        class="max-w-4xl font-heading text-[clamp(1.7rem,3.7vw,3.1rem)] font-extrabold leading-[1.15] tracking-tight text-white"
      >
        El mercado se puso difícil. Los que salgan adelante
        <em class="font-light italic text-primary-light">no son los que aguanten</em>, son los que
        se preparen.
      </h2>

      <p class="mt-8 max-w-2xl text-[1.05rem] leading-[1.75] text-slate-400">
        El 20 de septiembre arranca esa preparación. Hay un mercado gastronómico nuevo formándose
        —con otra tecnología, otros datos y otra forma de hacer marketing— y hay una manera concreta
        de entrar.
      </p>

      <p class="mt-5 max-w-2xl text-[1.05rem] leading-[1.75] text-slate-400">
        Este es el primer evento propio de Deenex. Una jornada entera de innovación, tecnología y
        marketing, pensada para el que decide: el dueño de la marca y el dueño del restaurante.
      </p>

      <!-- Tres ejes -->
      <div class="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3">
        <div v-for="eje in EJES" :key="eje.n" class="bg-slate-900 p-7 sm:p-8">
          <span class="font-mono text-[0.7rem] font-bold tracking-widest text-primary-light">{{
            eje.n
          }}</span>
          <h3 class="mt-4 font-heading text-[1.15rem] font-bold tracking-tight text-white">
            {{ eje.titulo }}
          </h3>
          <p class="mt-3 text-[0.92rem] leading-[1.65] text-slate-400">{{ eje.texto }}</p>
        </div>
      </div>

      <!-- Cita -->
      <blockquote
        class="mt-16 max-w-3xl border-l-2 border-primary pl-6 sm:pl-8 font-heading text-[clamp(1.15rem,2vw,1.6rem)] font-medium italic leading-[1.5] text-white/90"
      >
        “No vinimos a escuchar. Vinimos a armar algo juntos.”
        <footer class="mt-4 not-italic font-sans text-[0.8rem] font-bold uppercase tracking-[0.14em] text-slate-500">
          Alan Tapia · Founder & CEO de Deenex
        </footer>
      </blockquote>
    </div>
  </section>
</template>

<script setup>
const EJES = [
  {
    n: "01",
    titulo: "Innovación",
    texto:
      "Qué se está usando de verdad en el rubro y qué viene. Lo que ya funciona en otros locales, no proyecciones.",
  },
  {
    n: "02",
    titulo: "Tecnología",
    texto:
      "Datos, inteligencia artificial y sistemas POS aplicados al negocio. La parte que decide el margen.",
  },
  {
    n: "03",
    titulo: "Marketing",
    texto:
      "La nueva forma de hacer contenido en las marcas gastronómicas. Qué mueve la aguja y qué se dejó de usar.",
  },
];
</script>

<style scoped>
.manifesto-grid {
  background-image: linear-gradient(rgba(255, 255, 255, 0.028) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.028) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 70% 60% at 30% 40%, black 20%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 30% 40%, black 20%, transparent 100%);
}
</style>
