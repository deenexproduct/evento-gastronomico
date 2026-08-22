<template>
  <section id="por-que" class="bg-hueso text-ink">
    <div class="px-5 py-16 sm:px-8 sm:py-24">
      <p class="kicker opacity-50">Por qué ahora</p>

      <h2 class="titular mt-6 max-w-[18ch] text-[clamp(2.2rem,7vw,5.2rem)]">
        El mercado se puso difícil.
      </h2>
      <h2 class="titular mt-3 max-w-[22ch] text-[clamp(1.6rem,4.6vw,3.4rem)] text-fuego">
        Los que salgan adelante no son los que aguanten. Son los que se preparen.
      </h2>

      <div class="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div class="space-y-5 text-[1.02rem] leading-[1.65] text-ink/70 sm:text-[1.1rem]">
          <p>
            El 20 de septiembre arranca esa preparación. Hay un mercado gastronómico nuevo
            formándose —con otra tecnología, otros datos y otra forma de hacer marketing— y hay una
            manera concreta de entrar.
          </p>
          <p>
            Este es el primer evento propio de Deenex. Una jornada entera pensada para el que
            decide: el dueño de la marca y el dueño del restaurante.
          </p>
          <blockquote class="borde mt-8 bg-ink p-7 text-white">
            <p class="titular text-[clamp(1.2rem,2.6vw,1.9rem)] leading-[1.15]">
              “No vinimos a escuchar.<br /><span class="text-lima">Vinimos a armar algo juntos.”</span>
            </p>
            <footer class="kicker mt-5 text-white/50">Alan Tapia · Founder &amp; CEO de Deenex</footer>
          </blockquote>
        </div>

        <!-- Tres ejes -->
        <div class="grid gap-[3px] bg-ink">
          <div v-for="eje in EJES" :key="eje.n" class="bg-hueso p-7 sm:p-8">
            <div class="flex items-baseline gap-5">
              <span class="titular text-[2rem] text-fuego">{{ eje.n }}</span>
              <div>
                <h3 class="titular text-[clamp(1.3rem,2.6vw,1.8rem)]">{{ eje.titulo }}</h3>
                <p class="mt-2.5 max-w-[42ch] text-[0.95rem] leading-[1.55] text-ink/65">
                  {{ eje.texto }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
