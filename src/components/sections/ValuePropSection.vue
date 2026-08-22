<template>
  <section id="que-te-llevas" class="bg-hueso text-ink">
    <div class="px-5 py-16 sm:px-8 sm:py-20">
      <p class="kicker opacity-50">Además del diagnóstico</p>
      <h2 class="titular mt-6 max-w-[15ch] text-[clamp(2.2rem,7vw,5rem)]">
        Lo otro que te llevás <span class="text-fuego">de la sala.</span>
      </h2>
      <p class="mt-8 max-w-[52ch] text-[1.02rem] leading-[1.6] text-ink/65">
        Sin entrada premium ni lista especial: el que está en la sala accede exactamente a lo mismo
        que el de al lado.
      </p>
    </div>

    <div class="grid gap-[3px] border-t-[3px] border-ink bg-ink md:grid-cols-3">
      <article v-for="b in BENEFICIOS" :key="b.n" class="flex flex-col justify-between bg-hueso p-8 sm:p-9">
        <div>
          <div class="flex items-baseline gap-4">
            <span class="titular text-[2.2rem] text-fuego">{{ b.n }}</span>
            <span class="kicker opacity-45">{{ b.kicker }}</span>
          </div>
          <h3 class="titular mt-5 text-[clamp(1.4rem,3vw,2rem)]">{{ b.titulo }}</h3>
        </div>
        <p class="mt-7 text-[0.95rem] leading-[1.6] text-ink/65">{{ b.texto }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { BENEFICIOS } from "@/data/evento";
</script>
