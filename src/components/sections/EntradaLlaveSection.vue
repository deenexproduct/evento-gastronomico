<template>
  <section id="tu-entrada" class="border-b border-linea bg-white/5 py-20 sm:py-28">
    <div class="contenedor">
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-violeta">Tu entrada</p>
        </div>
        <div class="lg:col-span-9">
          <h2 class="titular max-w-[20ch] text-[clamp(1.9rem,4vw,3.2rem)]">
            Cómo funciona el ingreso.
          </h2>
          <p class="mt-6 max-w-[58ch] text-[1.02rem] leading-[1.65] text-gris">
            Son 200 lugares y la puerta se controla. El que llega sin haberse registrado, no entra.
          </p>
        </div>
      </div>

      <ol class="mt-14 grid gap-x-8 border-t border-linea md:grid-cols-3">
        <li
          v-for="(paso, i) in PASOS_ENTRADA"
          :key="paso.n"
          class="border-linea py-9"
          :class="i > 0 ? 'md:border-l md:pl-8' : ''"
        >
          <p class="titular text-[2rem] text-violeta">0{{ paso.n }}</p>
          <h3 class="titular mt-4 text-[1.15rem]">{{ paso.titulo }}</h3>
          <p class="mt-3 max-w-[38ch] text-[0.93rem] leading-[1.62] text-gris">{{ paso.texto }}</p>
        </li>
      </ol>

      <p class="mt-4 max-w-[62ch] border-t border-linea pt-6 text-[0.95rem] leading-[1.6] text-gris">
        El QR llega a tu email apenas te registrás.
        <span class="font-semibold text-white">Guardalo en el celular</span> — no hace falta
        imprimirlo, y con eso ya tenés todo resuelto en la puerta.
      </p>
    </div>
  </section>
</template>

<script setup>
import { PASOS_ENTRADA } from "@/data/evento";
</script>
