<template>
  <!--
    Prueba social directa: qué cadenas ya tomaron su lugar. Para un dueño,
    enterarse de que va un par respetado pesa más que cualquier argumento
    de la página.

    Solo aparecen las que dieron opt-in al registrarse. Con la lista vacía la
    sección no se renderiza — dos nombres en un espacio diseñado para veinte
    se leen como fracaso.
  -->
  <section v-if="hayMarcas" id="anotadas" class="border-b border-linea bg-noche-2 py-seccion">
    <div class="contenedor">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="rotulo text-gris">Ya confirmaron</p>
          <h2 class="titulo mt-4 max-w-[16ch] text-[clamp(2rem,5.6vw,3.4rem)]">
            Quiénes van a estar en la sala
          </h2>
        </div>
        <p v-if="mostrarCupo" class="text-[15px] text-gris">
          <span class="text-[2rem] font-black leading-none text-white">{{ ocupados }}</span>
          <span class="ml-2">de {{ total }} lugares tomados</span>
        </p>
      </div>

      <ul class="mt-10 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="m in MARCAS_ANOTADAS"
          :key="m.nombre"
          class="flex items-baseline justify-between gap-4 bg-noche-2 px-5 py-4"
        >
          <span class="text-[1.05rem] font-black uppercase tracking-[-0.01em]">{{ m.nombre }}</span>
          <span class="shrink-0 text-[13px] font-semibold text-gris">{{ m.locales }}</span>
        </li>
      </ul>

      <p class="mt-8 text-[15px] leading-[1.55] text-gris">
        Son las que autorizaron que publiquemos su nombre. Hay
        <span class="font-bold text-white">{{ ocupados - MARCAS_ANOTADAS.length }} más</span>
        anotadas que prefirieron no aparecer.
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { MARCAS_ANOTADAS } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";

const { total, ocupados, mostrarCupo } = useCupo();
const hayMarcas = computed(() => MARCAS_ANOTADAS.length > 0);
</script>
