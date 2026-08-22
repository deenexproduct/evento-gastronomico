<template>
  <section id="para-quien" class="bg-ink text-white">
    <div class="px-5 py-16 sm:px-8 sm:py-20">
      <p class="kicker text-lima">Para quién es</p>
      <h2 class="titular mt-6 max-w-[12ch] text-[clamp(2.4rem,8vw,6rem)]">
        Una sala de<br /><span class="text-lima">decisores.</span>
      </h2>
      <p class="mt-8 max-w-[54ch] text-[1.02rem] leading-[1.6] text-white/60">
        Dueños de marcas gastronómicas y dueños de restaurantes, con el mismo peso: la cadena de
        varios locales y el restaurante de uno solo. Córdoba capital y provincia.
      </p>
    </div>

    <div class="grid border-t-[3px] border-white/20 lg:grid-cols-[1.4fr_.6fr]">
      <!-- Sí -->
      <div class="grid gap-[3px] border-b-[3px] border-white/20 bg-white/20 sm:grid-cols-3 lg:border-b-0 lg:border-r-[3px]">
        <article v-for="p in PUBLICO.si" :key="p.titulo" class="flex flex-col bg-ink p-8">
          <span class="text-[1.6rem] text-lima">✓</span>
          <h3 class="titular mt-5 text-[clamp(1.2rem,2.4vw,1.6rem)]">{{ p.titulo }}</h3>
          <p class="mt-3 text-[0.92rem] leading-[1.55] text-white/60">{{ p.texto }}</p>
        </article>
      </div>

      <!-- No -->
      <aside class="bg-fuego p-8 text-white">
        <p class="kicker opacity-70">Para quién no</p>
        <ul class="mt-6 space-y-4">
          <li
            v-for="(item, i) in PUBLICO.no"
            :key="i"
            class="flex gap-3 border-b border-white/25 pb-4 text-[0.95rem] font-semibold leading-snug last:border-0"
          >
            <span class="shrink-0 opacity-70">✕</span>
            {{ item }}
          </li>
        </ul>
        <p class="mt-7 text-[0.88rem] leading-[1.55] text-white/80">
          El cupo es de 200 y es real. Preferimos la sala llena de gente que decide antes que llena
          a secas.
        </p>
      </aside>
    </div>

    <div class="border-t-[3px] border-white/20 px-5 py-10 sm:px-8">
      <p class="max-w-[60ch] text-[1.05rem] leading-[1.6] text-white/70">
        Hablamos de <strong class="text-lima">margen, tiempo y decisiones</strong>. No es una charla
        introductoria sobre digitalización ni una feria de comida: es un evento de negocios.
      </p>
    </div>
  </section>
</template>

<script setup>
import { PUBLICO } from "@/data/evento";
</script>
