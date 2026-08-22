<template>
  <!--
    Un dueño desconfía de que una empresa de tecnología lo invite gratis un
    domingo. Negar el interés no convence a nadie; explicarlo, sí.
  -->
  <section id="por-que-lo-hacemos" class="border-b border-linea bg-papel-2 py-20 sm:py-24">
    <div class="contenedor">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-violeta-texto">Sin vueltas</p>
        </div>

        <div class="lg:col-span-9">
          <h2 class="titular max-w-[16ch] text-[clamp(1.8rem,3.6vw,2.8rem)]">
            {{ TRANSPARENCIA.titulo }}
          </h2>

          <div class="mt-8 max-w-[62ch] space-y-5 text-[1.02rem] leading-[1.7] text-gris">
            <p v-for="(p, i) in TRANSPARENCIA.parrafos" :key="i" :class="i === 0 ? 'text-tinta' : ''">
              {{ p }}
            </p>
          </div>

          <p class="rotulo mt-8 border-t border-linea pt-6 text-gris">
            {{ TRANSPARENCIA.firma }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { TRANSPARENCIA } from "@/data/evento";
</script>
