<template>
  <section id="que-te-llevas" class="bg-hueso text-ink">
    <div class="px-5 py-16 sm:px-8 sm:py-20">
      <p class="kicker opacity-50">Qué te llevás</p>
      <h2 class="titular mt-6 max-w-[16ch] text-[clamp(2.2rem,7vw,5rem)]">
        Lo que te llevás <span class="text-fuego">de la sala.</span>
      </h2>
      <p class="mt-8 max-w-[54ch] text-[1.02rem] leading-[1.6] text-ink/65">
        Sin entrada premium ni lista especial: el que está en la sala accede exactamente a lo mismo
        que el de al lado.
      </p>
    </div>

    <div class="grid gap-[3px] border-t-[3px] border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4">
      <article
        v-for="b in BENEFICIOS"
        :key="b.n"
        class="flex min-h-[260px] flex-col justify-between bg-hueso p-8"
      >
        <div>
          <div class="flex items-baseline gap-4">
            <span class="titular text-[2.2rem] text-fuego">{{ b.n }}</span>
            <span class="kicker opacity-45">{{ b.kicker }}</span>
          </div>
          <h3 class="titular mt-5 text-[clamp(1.3rem,2.8vw,1.8rem)]">{{ b.titulo }}</h3>
        </div>
        <p class="mt-7 text-[0.94rem] leading-[1.6] text-ink/65">{{ b.texto }}</p>
      </article>
    </div>

    <!-- El diagnóstico, en detalle pero sin protagonismo -->
    <div class="grid border-t-[3px] border-ink bg-ink text-white lg:grid-cols-[.9fr_1.1fr]">
      <div class="border-b-[3px] border-white/20 p-8 sm:p-10 lg:border-b-0 lg:border-r-[3px]">
        <p class="kicker text-lima">El diagnóstico, en detalle</p>
        <h3 class="titular mt-5 text-[clamp(1.5rem,3.2vw,2.2rem)]">
          Opcional, sin costo y a pedido.
        </h3>
        <p class="mt-5 max-w-[46ch] text-[0.98rem] leading-[1.6] text-white/60">
          {{ DIAGNOSTICO.bajada }}
        </p>
      </div>

      <div class="p-8 sm:p-10">
        <p class="kicker text-white/40">Qué se mira</p>
        <ul class="mt-5 grid gap-3 sm:grid-cols-2">
          <li
            v-for="(p, i) in DIAGNOSTICO.puntos"
            :key="i"
            class="flex gap-3 text-[0.94rem] leading-[1.5] text-white/70"
          >
            <span class="mt-[6px] h-[6px] w-[6px] shrink-0 bg-lima"></span>
            {{ p }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { BENEFICIOS, DIAGNOSTICO } from "@/data/evento";
</script>
