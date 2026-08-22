<template>
  <section id="temas" class="bg-ink text-white">
    <div class="px-5 py-16 sm:px-8 sm:py-20">
      <p class="kicker text-lima">De qué se habla</p>
      <h2 class="titular mt-6 max-w-[16ch] text-[clamp(2.2rem,7.4vw,5.6rem)]">
        Seis bloques.<br />
        <span class="text-lima">Todo aplicado al negocio.</span>
      </h2>
      <p class="mt-8 max-w-[56ch] text-[1.05rem] leading-[1.6] text-white/60">
        Nada de charlas motivacionales ni de digitalización en abstracto. Cada bloque es un tema
        concreto del negocio gastronómico, contado por alguien que lo hace todos los días.
      </p>
    </div>

    <!-- Temas -->
    <ol class="border-t-[3px] border-white/20">
      <li
        v-for="(t, i) in TEMAS"
        :key="t.n"
        class="group grid gap-4 border-b-[3px] border-white/20 px-5 py-8 transition-colors duration-200 sm:grid-cols-[80px_1fr] sm:gap-8 sm:px-8 sm:py-10 hover:bg-lima hover:text-ink"
      >
        <span class="titular text-[clamp(2rem,4.4vw,3.2rem)] leading-none text-lima group-hover:text-ink">
          {{ t.n }}
        </span>

        <div class="grid gap-3 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-10">
          <div>
            <h3 class="titular text-[clamp(1.4rem,3.4vw,2.4rem)]">{{ t.tema }}</h3>
            <p class="kicker mt-3 text-white/60 group-hover:text-ink/70">{{ t.quien }}</p>
          </div>
          <p class="max-w-[52ch] text-[1rem] leading-[1.6] text-white/60 group-hover:text-ink/80">
            {{ t.punta }}
          </p>
        </div>
      </li>
    </ol>

    <!-- Cierre -->
    <div
      class="flex flex-col gap-7 px-5 py-12 sm:px-8 lg:flex-row lg:items-center lg:justify-between"
    >
      <p class="max-w-[54ch] text-[1.02rem] leading-[1.6] text-white/65">
        Bloques de 45 minutos con degustación entre uno y otro, más una mesa redonda de cierre con
        todos los partners y speakers del día.
      </p>
      <a href="#registro" class="btn-cartel shrink-0 self-start text-[0.95rem]" @click.prevent="ir('registro')">
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
  </section>
</template>

<script setup>
import { TEMAS } from "@/data/evento";

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
