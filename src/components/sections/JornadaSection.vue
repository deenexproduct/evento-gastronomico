<template>
  <!--
    El corazón visual de la página. Timeline vertical de una columna: acá
    nadie compara nada, se lee el día de arriba hacia abajo. La hora en
    tamaño gigante es el sistema gráfico que separa esta landing de
    cualquier otra del rubro, que usan todas grilla de tarjetas.
  -->
  <section id="jornada" class="border-b border-linea py-16 sm:py-24">
    <div class="contenedor">
      <p class="rotulo text-acento-texto">La jornada</p>
      <h2 class="titulo mt-5 max-w-[16ch] text-[clamp(1.9rem,5vw,3.2rem)]">
        Nueve horas, de punta a punta.
      </h2>
      <p class="lectura mt-6 text-gris">
        Track único: no hay salas paralelas ni hay que elegir. Con degustación entre bloque y
        bloque, stands abiertos todo el día y networking de cierre.
      </p>

      <!-- Timeline -->
      <ol ref="lista" class="relative mt-14">
        <!-- La línea que se dibuja al entrar: uno de los dos únicos motions -->
        <span
          class="linea-dia absolute left-0 top-2 hidden w-[2px] bg-acento sm:block"
          :class="{ 'linea-dia-visible': dibujada }"
          style="bottom: 2rem"
          aria-hidden="true"
        ></span>

        <li
          v-for="(t, i) in TEMAS"
          :key="t.hora"
          class="relative grid gap-x-8 gap-y-3 border-b border-linea py-8 sm:grid-cols-[minmax(140px,190px)_1fr] sm:pl-8"
          :class="i === 0 ? 'border-t' : ''"
        >
          <!-- La hora, como elemento gráfico -->
          <div>
            <div
              class="hora text-[clamp(3.5rem,13vw,8rem)]"
              :class="t.tipo === 'mesa' ? 'text-acento-texto' : 'text-acento-texto'"
            >
              {{ t.hora.split(":")[0] }}<span class="text-[0.42em] align-top">{{ t.hora.split(":")[1] }}</span>
            </div>
          </div>

          <div class="sm:pt-3">
            <span class="chip" :class="TIPOS_BLOQUE[t.tipo].clase">
              <Pictograma :nombre="TIPOS_BLOQUE[t.tipo].icono" :tam="15" :grosor="2" />
              {{ TIPOS_BLOQUE[t.tipo].label }}
            </span>

            <h3 class="titulo mt-4 max-w-[26ch] text-[clamp(1.25rem,3vw,1.8rem)]">
              {{ t.titulo }}
            </h3>

            <p class="mt-3 text-[15px] font-bold uppercase tracking-[0.05em] text-acento-texto sm:text-[16px]">
              {{ t.quien }}
            </p>

            <p class="lectura mt-3 text-[16px] leading-[1.5] text-gris sm:text-[17px]">
              {{ t.punta }}
            </p>
          </div>
        </li>
      </ol>

      <p class="mt-8 max-w-[68ch] text-[16px] text-gris">
        Puertas y acreditación desde las 8:30. La grilla con el orden final se publica cuando cierre
        — <span class="font-bold text-white">los inscriptos la reciben primero</span>.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { TEMAS, TIPOS_BLOQUE } from "@/data/evento";
import Pictograma from "@/components/ui/Pictograma.vue";

const lista = ref(null);
const dibujada = ref(false);
let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entrada]) => {
      if (entrada.isIntersecting) {
        dibujada.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.05 }
  );
  if (lista.value) observer.observe(lista.value);
});

onUnmounted(() => observer?.disconnect());
</script>
