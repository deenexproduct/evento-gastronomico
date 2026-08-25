<template>
  <!--
    Barra de conversión persistente. Aparece pasado el hero y se esconde
    cuando el formulario está en pantalla, donde ya no aporta y tapa campos.
  -->
  <Transition name="subir">
    <!--
      El contenedor fijo abarca todo el ancho para poder centrar la barra, pero
      no puede recibir clicks: sin pointer-events-none, la franja de aire que
      queda a los costados y abajo se comería los clicks de la página.
    -->
    <div
      v-if="visible"
      class="barra-fija pointer-events-none fixed inset-x-0 bottom-0 z-[90] px-3 pb-3 sm:px-6 sm:pb-5"
    >
      <div
        class="barra-flotante pointer-events-auto mx-auto flex max-w-[1080px] items-center justify-between gap-4 rounded-2xl border border-linea bg-noche/95 px-4 py-3 backdrop-blur-md sm:gap-5 sm:rounded-full sm:px-5"
      >
        <div class="min-w-0">
          <p class="rotulo truncate text-gris">{{ EVENTO.fechaCorta }} · {{ EVENTO.venue }}</p>
          <p class="mt-0.5 truncate text-[0.9rem] font-semibold tracking-[-0.02em]">
            <template v-if="agotado">Cupo completo · lista de espera</template>
            <template v-else-if="mostrarCupo">
              Quedan <span class="text-acento-texto">{{ restantes }}</span> de {{ total }} lugares
            </template>
            <template v-else>Entrada sin costo · registro previo</template>
          </p>
        </div>

        <a
          href="#registro"
          class="presionable inline-flex min-h-[44px] shrink-0 items-center rounded-full bg-acento-boton px-5 text-[0.85rem] font-semibold text-white transition-colors hover:bg-[#D80047] sm:px-6"
          @click.prevent="ir"
        >
          {{ agotado ? "Anotarme en la lista" : "Reservar mi lugar" }}
        </a>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { EVENTO } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";

const { total, restantes, agotado, mostrarCupo } = useCupo();

const pasoElHero = ref(false);
const formEnPantalla = ref(false);
const pieEnPantalla = ref(false);
const visible = ref(false);

/**
 * La barra se esconde cuando el pie entra en pantalla. Sin esto quedan dos
 * píldoras magenta a la vista al mismo tiempo diciendo lo mismo: la del pie y
 * la flotante, a trescientos píxeles una de otra. Escondiéndola, la lectura
 * es que la barra se convirtió en el pie.
 */
function recalcular() {
  visible.value = pasoElHero.value && !formEnPantalla.value && !pieEnPantalla.value;
}
function onScroll() {
  pasoElHero.value = window.scrollY > window.innerHeight * 0.7;
  recalcular();
}

let observer = null;
let observerPie = null;

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

  const pie = document.querySelector("footer");
  if (pie) {
    // Umbral bajo: alcanza con que asome el zócalo para que la barra baje.
    observerPie = new IntersectionObserver(
      ([entry]) => {
        pieEnPantalla.value = entry.isIntersecting;
        recalcular();
      },
      { threshold: 0.02 }
    );
    observerPie.observe(pie);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  observer?.disconnect();
  observerPie?.disconnect();
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
