<template>
  <section id="hero" class="border-b border-linea pt-[68px]">
    <div class="contenedor">
      <!-- Ficha del evento, en reglas -->
      <dl class="pt-12 sm:pt-16">
        <div v-for="d in FICHA" :key="d.rotulo" class="fila-rotulo pb-5">
          <dt class="rotulo text-violeta-texto">{{ d.rotulo }}</dt>
          <dd class="text-[0.95rem] text-tinta">{{ d.valor }}</dd>
        </div>
      </dl>

      <!-- Titular -->
      <h1 class="titular mt-14 max-w-[15ch] text-[clamp(2.5rem,6.6vw,5.6rem)]">
        <span class="text-violeta-texto">{{ EVENTO.nombre }}</span> llega a Córdoba.
      </h1>

      <p class="mt-7 max-w-[24ch] text-[clamp(1.15rem,2.4vw,1.8rem)] font-medium leading-[1.3] tracking-[-0.025em]">
        {{ EVENTO.bajada }}
      </p>

      <!-- Bajada + acción -->
      <div class="mt-12 grid gap-10 border-t border-linea pt-8 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-6 lg:col-start-1">
          <p class="text-[1.15rem] leading-[1.55] text-tinta">
            Se está formando un mercado gastronómico nuevo: con otra tecnología, otros datos y otra
            forma de hacer marketing.
          </p>
          <p class="mt-4 text-[1.02rem] leading-[1.65] text-gris">
            El 20 de septiembre juntamos en una sala a los que ya entraron, para que cuenten cómo lo
            hicieron. Seis bloques de charla, demos en vivo y doscientos dueños de marcas
            gastronómicas y restaurantes.
          </p>
        </div>

        <div class="lg:col-span-4 lg:col-start-9">
          <div class="flex flex-wrap items-center gap-3">
            <a href="#registro" class="btn" @click.prevent="ir('registro')">
              Reservar mi lugar
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M2 8h11M9 3.5L13.5 8 9 12.5"
                  stroke="currentColor"
                  stroke-width="1.9"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <a href="#temas" class="btn-linea" @click.prevent="ir('temas')">Ver el programa</a>
          </div>
          <p class="mt-4 text-[0.85rem] text-gris">
            Entrada gratuita · Registro previo obligatorio
          </p>
        </div>
      </div>

      <!-- Cupo -->
      <div class="mt-12 border-t border-linea pt-6">
        <div class="flex items-baseline justify-between gap-4">
          <p class="rotulo text-gris">Ocupación de la sala</p>
          <p class="text-[0.85rem] font-medium text-gris">
            <span class="text-[1.05rem] font-semibold text-tinta">{{ ocupados }}</span> de
            {{ total }} lugares tomados
          </p>
        </div>
        <div class="mt-3 h-[3px] w-full bg-linea">
          <div
            class="h-full transition-[width] duration-[1200ms] ease-out"
            :class="critico ? 'bg-[#C2410C]' : 'bg-violeta'"
            :style="{ width: ancho + '%' }"
          ></div>
        </div>
      </div>

      <!-- Datos duros -->
      <dl class="mt-12 grid grid-cols-2 border-t border-linea pb-16 sm:pb-20 lg:grid-cols-4">
        <div
          v-for="(d, i) in DATOS"
          :key="d.label"
          class="border-linea py-8 pr-6"
          :class="[i % 2 === 1 ? 'border-l pl-6 lg:border-l' : '', i === 2 ? 'lg:border-l lg:pl-6' : '', i < 2 ? 'border-b lg:border-b-0' : '']"
        >
          <dd class="titular text-[clamp(1.9rem,3.6vw,2.7rem)] text-violeta-texto">{{ d.valor }}</dd>
          <dt class="rotulo mt-2.5 text-gris">{{ d.label }}</dt>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { EVENTO } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";

const { total, ocupados, porcentaje, critico } = useCupo();

const ancho = ref(0);
const objetivo = computed(() => Math.max(porcentaje.value, 2));

const FICHA = [
  { rotulo: "Fecha", valor: `${EVENTO.fechaLarga} · ${EVENTO.horario}` },
  { rotulo: "Lugar", valor: `${EVENTO.venue}, ${EVENTO.direccion} · Córdoba` },
  { rotulo: "Para quién", valor: "Dueños de marcas gastronómicas y de restaurantes" },
];

// Voces confirmadas: Alan, CEO de Bistrosoft, orador de UGC y los dos de Avanzia.
const DATOS = [
  { valor: "6", label: "Bloques de charla" },
  { valor: "5+", label: "Voces en escenario" },
  { valor: "9h", label: "De jornada" },
  { valor: "200", label: "Lugares, no más" },
];

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

onMounted(() => setTimeout(() => (ancho.value = objetivo.value), 400));
watch(objetivo, (v) => {
  if (ancho.value > 0) ancho.value = v;
});
</script>
