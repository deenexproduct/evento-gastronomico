<template>
  <section id="temas" class="border-b border-linea py-20 sm:py-28">
    <div class="contenedor">
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-violeta-texto">El programa</p>
        </div>
        <div class="lg:col-span-9">
          <h2 class="titular max-w-[18ch] text-[clamp(1.9rem,4vw,3.2rem)]">
            Seis bloques, todo aplicado al negocio.
          </h2>
          <p class="mt-6 max-w-[58ch] text-[1.02rem] leading-[1.65] text-gris">
            Ningún bloque es una charla motivacional. Cada uno toma un problema concreto de una
            marca gastronómica y lo abre con quien lo resuelve para vivir.
          </p>
        </div>
      </div>

      <ol class="mt-14 border-t border-linea">
        <li
          v-for="t in TEMAS"
          :key="t.n"
          class="group grid gap-x-8 gap-y-3 border-b border-linea py-7 transition-colors duration-200 hover:bg-violeta-tinte/60 sm:py-8 lg:grid-cols-12"
        >
          <span class="rotulo text-violeta-texto lg:col-span-1">{{ t.n }}</span>

          <div class="lg:col-span-5">
            <h3 class="titular text-[clamp(1.15rem,2.1vw,1.6rem)]">{{ t.tema }}</h3>
            <p class="rotulo mt-2.5 text-gris">{{ t.quien }}</p>
          </div>

          <p class="max-w-[52ch] text-[0.97rem] leading-[1.62] text-gris lg:col-span-6">
            {{ t.punta }}
          </p>
        </li>
      </ol>

      <div class="mt-10 flex flex-wrap items-center justify-between gap-6">
        <p class="max-w-[54ch] text-[0.95rem] leading-[1.6] text-gris">
          Bloques de 45 minutos con degustación entre uno y otro, más la mesa redonda de cierre con
          todos los oradores y partners del día.
        </p>
        <a href="#registro" class="btn shrink-0" @click.prevent="ir('registro')">
          Quiero estar en la sala
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { TEMAS } from "@/data/evento";

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
