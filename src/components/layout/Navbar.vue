<template>
  <header
    class="fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-300"
    :class="scrolled ? 'border-white/10 bg-noche/90 backdrop-blur-md' : 'border-transparent bg-noche'"
  >
    <div class="contenedor">
      <div class="flex items-center justify-between gap-6 py-3.5">
        <a href="#hero" class="flex min-h-[44px] min-w-0 items-center gap-3" @click.prevent="arriba">
          <span class="text-[0.95rem] font-black uppercase tracking-[-0.01em] text-white">GastroTech</span>
          <span class="rotulo hidden text-gris sm:inline">{{ EVENTO.fechaNumerica }} · Córdoba</span>
        </a>

        <nav class="hidden items-center gap-7 lg:flex" aria-label="Secciones">
          <a
            v-for="l in enlaces"
            :key="l.id"
            :href="`#${l.id}`"
            class="inline-flex min-h-[44px] items-center text-[0.85rem] font-medium text-gris transition-colors hover:text-white"
            @click.prevent="ir(l.id)"
            >{{ l.label }}</a
          >
        </nav>

        <div class="flex items-center gap-5">
          <span class="rotulo hidden text-gris md:inline">
            <!-- "Quedan N" solo si N es un dato real; si no, el total. -->
            {{ agotado ? "Cupo completo" : mostrarCupo ? `${restantes} lugares` : `${total} lugares` }}
          </span>
          <!--
            Se esconde cuando aparece la
            barra flotante de abajo, y vuelve en cuanto la barra se va. Sin
            esto había dos píldoras magenta idénticas en pantalla al mismo
            tiempo durante veintidós de las veintiocho pantallas del teléfono.
            La condición sale de useBarraReserva y no de un umbral propio: la
            barra se apaga por tres motivos distintos y adivinarlos acá dejaba
            un tramo sin ningún acceso a reservar.
          -->
          <a
            v-if="!barraVisible"
            href="#reservar"
            class="presionable inline-flex min-h-[44px] items-center rounded-full bg-acento-boton px-5 text-[0.82rem] font-semibold text-white transition-colors hover:bg-[#D80047]"
            @click.prevent="ir('reservar')"
          >
            Reservar
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { EVENTO, NAV_ENLACES as enlaces } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";
import { barraVisible } from "@/composables/useBarraReserva";

const { total, restantes, agotado, mostrarCupo } = useCupo();
const scrolled = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 24;
}
function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
function arriba() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>
