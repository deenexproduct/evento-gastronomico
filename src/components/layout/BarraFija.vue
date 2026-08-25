<template>
  <!--
    Barra de conversión persistente. Aparece pasado el hero y se esconde
    cuando el formulario está en pantalla, donde ya no aporta y tapa campos.
  -->
  <Transition name="subir">
    <div v-if="visible" class="barra-fija fixed inset-x-0 bottom-0 z-[90] border-t border-linea bg-noche/95 backdrop-blur-md">
      <div class="contenedor">
        <div class="flex items-center justify-between gap-5 py-3">
          <div class="min-w-0">
            <p class="rotulo truncate text-gris">
              {{ EVENTO.fechaCorta }} · {{ EVENTO.venue }}
            </p>
            <p class="mt-0.5 truncate text-[0.9rem] font-semibold tracking-[-0.02em]">
              <template v-if="agotado">Cupo completo · lista de espera</template>
              <template v-else>
                Quedan <span class="text-acento-texto">{{ restantes }}</span> de {{ total }} lugares
              </template>
            </p>
          </div>

          <a
            href="#registro"
            class="shrink-0 bg-acento-boton px-6 py-3 text-[0.85rem] font-semibold text-white transition-colors hover:bg-[#D80047]"
            @click.prevent="ir"
          >
            {{ agotado ? "Anotarme en la lista" : "Reservar mi lugar" }}
          </a>
        </div>
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
  pasoElHero.value = window.scrollY > window.innerHeight * 0.7;
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
/* Pantalla baja (celular acostado): la barra ocupa demasiado y se oculta. */
@media (max-height: 500px) {
  .barra-fija { display: none; }
}

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
