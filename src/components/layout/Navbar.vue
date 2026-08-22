<template>
  <header class="fixed inset-x-0 top-0 z-[100]">
    <!-- Franja de datos -->
    <div
      class="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b-[3px] border-ink bg-lima px-4 py-2 text-ink sm:px-6"
    >
      <a href="#hero" class="kicker shrink-0" @click.prevent="arriba">El evento de Deenex</a>
      <span class="kicker hidden sm:inline">{{ EVENTO.fechaCorta }} · Córdoba</span>
      <span class="kicker hidden lg:inline">{{ EVENTO.venue }}</span>
      <span class="kicker tabular-nums">{{ cuenta }}</span>
    </div>

    <!-- Barra de acción -->
    <div
      class="flex items-center justify-between gap-4 border-b-[3px] border-ink bg-ink px-4 py-2.5 transition-colors sm:px-6"
    >
      <p class="kicker truncate text-white/55">
        <span :class="critico ? 'text-fuego' : 'text-lima'">●</span>
        {{ agotado ? "Cupo completo" : `Quedan ${restantes} de ${total} lugares` }}
      </p>

      <a
        href="#registro"
        class="shrink-0 bg-lima px-4 py-2 text-[0.72rem] font-black uppercase tracking-[-0.01em] text-ink transition-transform duration-150 hover:-translate-y-0.5 sm:px-5 sm:text-[0.8rem]"
        @click.prevent="ir('registro')"
      >
        Reservar mi lugar
      </a>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { EVENTO } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";

const { total, restantes, agotado, critico } = useCupo();

const objetivo = new Date(EVENTO.fechaISO).getTime();
const cuenta = ref("--");

function tick() {
  const diff = objetivo - Date.now();
  if (diff <= 0) {
    cuenta.value = "Es hoy";
    return;
  }
  const dias = Math.floor(diff / 86400000);
  const hs = Math.floor((diff / 3600000) % 24);
  const min = Math.floor((diff / 60000) % 60);
  cuenta.value = `Faltan ${dias}d ${String(hs).padStart(2, "0")}h ${String(min).padStart(2, "0")}m`;
}

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
function arriba() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

let interval = null;
onMounted(() => {
  tick();
  interval = setInterval(tick, 30000);
});
onUnmounted(() => clearInterval(interval));
</script>
