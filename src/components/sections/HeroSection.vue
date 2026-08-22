<template>
  <section id="hero" class="relative bg-ink pt-[104px] text-white">
    <div class="px-5 pb-14 pt-12 sm:px-8 sm:pt-16">
      <p class="kicker text-lima">Córdoba · {{ EVENTO.fechaCorta }} · {{ EVENTO.horario }}</p>

      <!-- Titular -->
      <h1 class="titular mt-7 text-[clamp(2.7rem,10.6vw,9rem)]">
        <span class="block">El evento de</span>
        <span class="block">gastronomía</span>
        <span class="contorno block text-lima">y tecnología.</span>
      </h1>

      <!-- Bajada + cupo -->
      <div class="mt-10 grid gap-8 lg:grid-cols-[1.3fr_.7fr] lg:items-end lg:gap-12">
        <div>
          <p class="max-w-[48ch] text-[1.15rem] leading-[1.5] text-white/70 sm:text-[1.35rem]">
            Un día entero de charlas, demos en vivo y networking para
            <strong class="font-extrabold text-lima"
              >dueños de marcas gastronómicas y restaurantes</strong
            >. Seis bloques sobre lo que ya está cambiando el negocio: datos, inteligencia
            artificial, POS, contenido y ecosistema.
          </p>

          <div class="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a href="#registro" class="btn-cartel text-[0.95rem] sm:text-[1.05rem]" @click.prevent="ir('registro')">
              Reservar mi lugar
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
            <a
              href="#temas"
              class="kicker border-b-2 border-lima pb-1 text-lima transition-opacity hover:opacity-70"
              @click.prevent="ir('temas')"
            >
              Ver de qué se habla
            </a>
          </div>
        </div>

        <!-- Contador de cupo -->
        <div class="borde-claro p-6" :class="critico ? 'border-fuego' : ''">
          <div class="titular text-[clamp(3.5rem,9vw,5.5rem)]" :class="critico ? 'text-fuego' : 'text-lima'">
            {{ restantes }}
          </div>
          <p class="kicker mt-2 leading-[1.5]">
            {{ agotado ? "Cupo completo" : "Lugares disponibles" }}<br />
            <span class="text-white/50">de {{ total }} · {{ ocupados }} ya tomados</span>
          </p>
          <div class="mt-4 h-2 w-full bg-white/15">
            <div
              class="h-full transition-[width] duration-[1400ms] ease-out"
              :class="critico ? 'bg-fuego' : 'bg-lima'"
              :style="{ width: ancho + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Datos duros -->
    <div class="grid grid-cols-2 border-t-[3px] border-white/15 lg:grid-cols-4">
      <div
        v-for="(d, i) in DATOS"
        :key="d.label"
        class="border-white/15 px-5 py-7 sm:px-8"
        :class="[i % 2 === 0 ? 'border-r-[3px]' : '', i < 2 ? 'border-b-[3px] lg:border-b-0' : '', i === 2 ? 'lg:border-r-[3px]' : '']"
      >
        <div class="titular text-[clamp(1.9rem,4.4vw,3rem)] text-lima">{{ d.valor }}</div>
        <div class="kicker mt-2 text-white/50">{{ d.label }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { EVENTO } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";

const { total, ocupados, restantes, porcentaje, agotado, critico } = useCupo();

const ancho = ref(0);
const objetivo = computed(() => Math.max(porcentaje.value, 3));

const DATOS = [
  { valor: "6", label: "Bloques de charla" },
  { valor: "9h", label: "De jornada" },
  { valor: "6+", label: "Voces en escenario" },
  { valor: "200", label: "Lugares, no más" },
];

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

onMounted(() => setTimeout(() => (ancho.value = objetivo.value), 500));
watch(objetivo, (v) => {
  if (ancho.value > 0) ancho.value = v;
});
</script>
