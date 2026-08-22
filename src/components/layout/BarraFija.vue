<template>
  <!--
    Barra de conversión siempre visible.
    Aparece recién pasado el hero para no competir con el titular, y se esconde
    cuando el formulario está en pantalla (ahí ya no aporta y tapa campos).
  -->
  <Transition name="subir">
    <div
      v-if="visible"
      class="fixed inset-x-0 bottom-0 z-[90] border-t-[3px] border-ink bg-lima px-4 py-3 sm:px-6"
    >
      <div class="flex items-center justify-between gap-4">
        <div class="min-w-0">
          <p class="kicker truncate text-ink/60">
            {{ EVENTO.fechaCorta }} · Córdoba · Entrada gratuita
          </p>
          <p class="titular truncate text-[0.95rem] sm:text-[1.15rem]">
            {{ agotado ? "Cupo completo · lista de espera" : `Quedan ${restantes} de ${total} lugares` }}
          </p>
        </div>

        <a
          href="#registro"
          class="shrink-0 bg-ink px-5 py-3 text-[0.78rem] font-black uppercase tracking-[-0.01em] text-lima transition-transform duration-150 hover:-translate-y-0.5 sm:px-7 sm:text-[0.9rem]"
          @click.prevent="ir"
        >
          Reservar
        </a>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { EVENTO } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";

const { total, restantes, agotado } = useCupo();

const pasoElHero = ref(false);
const formEnPantalla = ref(false);
const visible = ref(false);

function recalcular() {
  visible.value = pasoElHero.value && !formEnPantalla.value;
}

function onScroll() {
  pasoElHero.value = window.scrollY > window.innerHeight * 0.75;
  recalcular();
}

let observer = null;

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const registro = document.getElementById("registro");
  if (registro) {
    observer = new IntersectionObserver(
      ([entry]) => {
        formEnPantalla.value = entry.isIntersecting;
        recalcular();
      },
      { threshold: 0.12 }
    );
    observer.observe(registro);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  observer?.disconnect();
});

function ir() {
  document.getElementById("registro")?.scrollIntoView({ behavior: "smooth" });
}
</script>

<style scoped>
.subir-enter-active,
.subir-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s;
}
.subir-enter-from,
.subir-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .subir-enter-active,
  .subir-leave-active {
    transition: none;
  }
}
</style>
