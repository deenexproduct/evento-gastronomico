<template>
  <div class="fixed top-3 sm:top-4 left-0 right-0 z-[100] flex flex-col items-center px-3 sm:px-4">
    <nav
      class="w-full max-w-6xl transition-all duration-500 px-3 sm:px-4 py-2 sm:py-2.5"
      :class="scrolled ? 'nav-scrolled' : 'nav-top'"
    >
      <div class="flex items-center justify-between gap-2 sm:gap-4 min-h-[44px]">
        <!-- Brand -->
        <a
          href="#hero"
          @click.prevent="scrollToTop"
          class="flex items-center gap-2 sm:gap-2.5 shrink-0 min-w-0 py-2 -my-2"
        >
          <span
            class="w-2 h-2 rounded-full transition-colors shrink-0 animate-pulse"
            :class="scrolled ? 'bg-white' : 'bg-primary'"
          ></span>
          <span
            class="font-heading font-extrabold text-[0.78rem] sm:text-[0.95rem] tracking-tight transition-colors truncate"
            :class="scrolled ? 'text-white' : 'text-slate-900'"
          >
            El evento de Deenex
          </span>
          <span
            class="hidden lg:inline text-[0.72rem] font-mono tracking-widest transition-colors shrink-0"
            :class="scrolled ? 'text-white/60' : 'text-slate-400'"
          >
            CBA · {{ EVENTO.fechaNumerica }}
          </span>
        </a>

        <!-- Countdown -->
        <div class="hidden md:flex items-center gap-3 font-mono text-[0.72rem] tracking-wider">
          <div
            v-for="unit in units"
            :key="unit.label"
            class="flex flex-col items-center leading-tight"
          >
            <span
              class="font-bold text-[0.95rem] transition-colors"
              :class="scrolled ? 'text-white' : 'text-primary'"
              >{{ unit.value }}</span
            >
            <span
              class="text-[0.55rem] uppercase tracking-[0.18em] transition-colors"
              :class="scrolled ? 'text-white/60' : 'text-slate-400'"
              >{{ unit.label }}</span
            >
          </div>
        </div>

        <!-- CTA -->
        <a
          href="#registro"
          @click.prevent="irARegistro"
          class="inline-flex items-center gap-1.5 sm:gap-2 text-[0.78rem] sm:text-[0.82rem] font-bold px-3.5 sm:px-4 py-2.5 rounded-xl transition-all duration-300 shrink-0 min-h-[40px]"
          :class="
            scrolled
              ? 'bg-white text-primary hover:bg-slate-50'
              : 'bg-primary text-white hover:bg-[#5346c7] shadow-md shadow-primary/25'
          "
        >
          Reservar mi lugar
          <svg width="10" height="10" viewBox="0 0 13 13" fill="none">
            <path
              d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from "vue";
import { EVENTO } from "@/data/evento";

const scrolled = ref(false);
const target = new Date(EVENTO.fechaISO).getTime();

const units = reactive([
  { label: "días", value: "--" },
  { label: "hs", value: "--" },
  { label: "min", value: "--" },
  { label: "seg", value: "--" },
]);

const pad = (n) => String(n).padStart(2, "0");

function tick() {
  const diff = target - Date.now();
  if (diff <= 0) {
    units.forEach((u) => (u.value = "00"));
    return;
  }
  units[0].value = pad(Math.floor(diff / 86400000));
  units[1].value = pad(Math.floor((diff / 3600000) % 24));
  units[2].value = pad(Math.floor((diff / 60000) % 60));
  units[3].value = pad(Math.floor((diff / 1000) % 60));
}

function onScroll() {
  scrolled.value = window.scrollY > 60;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function irARegistro() {
  document.getElementById("registro")?.scrollIntoView({ behavior: "smooth" });
}

let interval = null;
onMounted(() => {
  tick();
  interval = setInterval(tick, 1000);
  window.addEventListener("scroll", onScroll, { passive: true });
});
onUnmounted(() => {
  if (interval) clearInterval(interval);
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
.nav-top {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 1.25rem;
  border: 1.5px solid rgba(105, 94, 222, 0.35);
  box-shadow: 0 4px 24px -8px rgba(105, 94, 222, 0.18);
}
.nav-scrolled {
  background: var(--primary);
  border-radius: 1rem;
  border: 1px solid transparent;
}
</style>
