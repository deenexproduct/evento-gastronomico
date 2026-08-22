<template>
  <!--
    Grilla de tarjetas translúcidas, el recurso central del referente.
    Diferencia: ellos titulan por persona porque tienen todos los nombres.
    Acá la tarjeta se titula por el TEMA y el orador va como atribución, así
    un "por confirmar" no deja un agujero visible en la grilla.
  -->
  <section id="oradores" class="border-t border-linea py-16 sm:py-24">
    <div class="contenedor">
      <p class="rotulo text-acento-texto">★ Quiénes van a estar</p>
      <h2 class="titulo mt-5 max-w-[16ch] text-[clamp(1.9rem,5.6vw,3.4rem)]">
        Siete bloques, un solo track
      </h2>
      <p class="lectura mt-5 text-[17px] text-gris">
        No hay salas paralelas ni hay que elegir. Los que hablan trabajan en el rubro todos los
        días y traen números propios, no teoría.
      </p>

      <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="t in TEMAS"
          :key="t.hora"
          class="tarjeta flex flex-col p-6"
          :class="t.tipo === 'mesa' ? 'sm:col-span-2 lg:col-span-3' : ''"
        >
          <div class="flex items-center justify-between gap-3">
            <span class="chip" :class="t.tipo === 'mesa' ? 'border-acento/40 text-acento-texto' : ''">
              {{ TIPOS_BLOQUE[t.tipo].label }}
            </span>
            <span class="hora text-[1.6rem] text-acento-texto">{{ t.hora }}</span>
          </div>

          <h3
            class="mt-6 font-black leading-[1.15] tracking-[-0.015em]"
            :class="t.tipo === 'mesa' ? 'text-[clamp(1.4rem,3.4vw,2rem)] max-w-[24ch]' : 'text-[1.15rem]'"
          >
            {{ t.titulo }}
          </h3>

          <p class="mt-4 text-[15px] leading-[1.5] text-gris" :class="t.tipo === 'mesa' ? 'max-w-[52ch]' : ''">
            {{ t.punta }}
          </p>

          <p
            class="mt-6 border-t border-white/10 pt-4 text-[13px] font-bold uppercase tracking-[0.08em] text-acento-texto"
          >
            {{ t.quien }}
          </p>
        </article>

        <!-- Slot abierto: mecánica, no desprolijidad -->
        <article class="flex flex-col justify-between rounded-xl border border-dashed border-white/15 p-6">
          <span class="chip border-white/10 text-gris">Por anunciar</span>
          <div class="mt-6">
            <h3 class="text-[1.15rem] font-black leading-[1.15]">Se suman más voces</h3>
            <p class="mt-3 text-[15px] leading-[1.5] text-gris">
              Los anuncios salen a medida que se cierran. Los inscriptos se enteran primero.
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { TEMAS, TIPOS_BLOQUE } from "@/data/evento";
</script>
