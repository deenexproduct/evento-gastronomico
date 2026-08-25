<template>
  <!--
    Réplica del bloque de cuenta regresiva del referente, que muestra "03
    MESES" en grande. Acá faltan días, así que la unidad es el día — y en la
    última semana el número solo se vuelve más urgente sin tocar nada.
  -->
  <section class="bg-noche py-seccion">
    <div class="contenedor text-center">
      <p class="rotulo text-acento-texto">Domingo 20 de septiembre · Córdoba</p>

      <h2 class="titulo mx-auto mt-6 max-w-[20ch] text-[clamp(1.6rem,4.6vw,2.8rem)]">
        {{ titular }}
      </h2>

      <div v-if="estado === 'faltan'" class="mt-12 flex items-end justify-center gap-4 sm:gap-6">
        <div>
          <p
            class="late font-black leading-[0.8] tabular-nums tracking-[-0.05em] text-acento text-[clamp(5rem,22vw,12rem)]"
          >
            {{ String(dias).padStart(2, "0") }}
          </p>
          <p class="mt-4 text-[13px] font-black uppercase tracking-[0.2em] text-gris">
            {{ dias === 1 ? "día" : "días" }}
          </p>
        </div>
      </div>

      <p
        v-else
        class="late mt-12 font-black uppercase leading-[0.85] tracking-[-0.04em] text-acento text-[clamp(3rem,13vw,7rem)]"
      >
        {{ estado === "hoy" ? "Es hoy" : "Ya pasó" }}
      </p>

      <a
        v-if="estado !== 'pasado'"
        :href="`#${destino}`"
        class="btn mt-12"
        @click.prevent="ir(destino)"
      >
        {{ estado === "hoy" ? "Ver cómo llegar" : "Quiero mi lugar" }}
      </a>
      <p v-else class="lectura mt-8 text-[17px] text-gris">
        Gracias a los que estuvieron. Cuando haya fecha para la próxima edición, la vas a ver acá.
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { EVENTO } from "@/data/evento";

/**
 * La cuenta se mide en días de calendario de Córdoba, no en milisegundos: si
 * se resta y se divide, alguien que abre la página a las 23 h ve un día menos
 * que el que la abre a las 8 del mismo día.
 *
 * Y tiene tres estados. Antes venía uno solo: al pasar el 20 de septiembre el
 * bloque quedaba clavado en "00 días" invitando a reservar un evento que ya
 * había sucedido.
 */
const ZONA = "America/Argentina/Cordoba";
const formato = new Intl.DateTimeFormat("en-CA", {
  timeZone: ZONA,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** "2026-09-20" → mediodía UTC de ese día, para restar sin que muerda el huso. */
function aMediodia(iso) {
  const [a, m, d] = iso.split("-").map(Number);
  return Date.UTC(a, m - 1, d, 12);
}

const ahora = ref(Date.now());
let reloj = null;

function actualizar() {
  ahora.value = Date.now();
}

onMounted(() => {
  // Cada diez minutos alcanza para una cuenta en días, y se recalcula al
  // volver a la pestaña: una landing de evento se deja abierta días enteros.
  reloj = setInterval(actualizar, 600000);
  document.addEventListener("visibilitychange", actualizar);
});

onUnmounted(() => {
  clearInterval(reloj);
  document.removeEventListener("visibilitychange", actualizar);
});

const dias = computed(() => {
  const hoy = aMediodia(formato.format(new Date(ahora.value)));
  const evento = aMediodia(formato.format(new Date(EVENTO.fechaISO)));
  return Math.round((evento - hoy) / 86400000);
});

const estado = computed(() => (dias.value > 0 ? "faltan" : dias.value === 0 ? "hoy" : "pasado"));

const titular = computed(() => {
  if (estado.value === "hoy") return `Hoy es ${EVENTO.nombre}`;
  if (estado.value === "pasado") return `${EVENTO.nombre} ya pasó`;
  return `Falta cada vez menos para ${EVENTO.nombre}`;
});

const destino = computed(() => (estado.value === "hoy" ? "lugar" : "registro"));

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>

<style scoped>
/* El número late, como en el referente. */
.late { animation: latir 2.6s ease-in-out infinite; }
@keyframes latir {
  0%, 100% { opacity: 1; }
  50% { opacity: .72; }
}
@media (prefers-reduced-motion: reduce) {
  .late { animation: none; }
}
</style>
