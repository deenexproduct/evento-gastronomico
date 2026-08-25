<template>
  <section id="para-quien" class="border-b border-linea py-20 sm:py-28">
    <div class="contenedor">
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-violeta-texto">Para quién es</p>
        </div>
        <div class="lg:col-span-9">
          <h2 class="titular max-w-[18ch] text-[clamp(1.9rem,4vw,3.2rem)]">
            Dueños de marcas. No curiosos.
          </h2>
          <p class="mt-6 max-w-[58ch] text-[1.02rem] leading-[1.65] text-gris">
            GastroTech es para el dueño de una marca gastronómica: el que firma, el que decide y el
            que después tiene que aplicarlo. Puede tener un local o veinte — lo que importa es que
            la decisión pase por vos. Córdoba capital y provincia.
          </p>
        </div>
      </div>

      <div class="mt-14 grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-8">
          <div class="grid gap-x-8 border-t border-linea sm:grid-cols-3">
            <article
              v-for="(p, i) in PUBLICO.si"
              :key="p.titulo"
              class="border-linea py-8"
              :class="i > 0 ? 'sm:border-l sm:pl-8' : ''"
            >
              <h3 class="titular text-[1.1rem]">{{ p.titulo }}</h3>
              <p class="mt-3 text-[0.92rem] leading-[1.6] text-gris">{{ p.texto }}</p>
            </article>
          </div>

          <p class="mt-8 max-w-[60ch] border-t border-linea pt-6 text-[0.97rem] leading-[1.65] text-gris">
            Hablamos de <span class="font-semibold text-tinta">margen, tiempo y decisiones</span>. No
            es una charla introductoria sobre digitalización ni una feria de comida: es un evento de
            negocios.
          </p>
        </div>

        <aside class="lg:col-span-4">
          <div class="border border-linea bg-papel-2 p-7">
            <p class="rotulo text-gris">Para quién no</p>
            <ul class="mt-5">
              <li
                v-for="(item, i) in PUBLICO.no"
                :key="i"
                class="border-b border-linea py-3 text-[0.93rem] leading-snug text-gris last:border-0"
              >
                {{ item }}
              </li>
            </ul>
            <p class="mt-5 text-[0.87rem] leading-[1.6] text-gris">
              El cupo es de 200 y es real. Preferimos la sala llena de gente que decide antes que
              llena a secas.
            </p>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PUBLICO } from "@/data/evento";
</script>
