import { computed, ref, onMounted, onUnmounted } from "vue";
import { EVENTO } from "@/data/evento";

/**
 * Cuántos días faltan para el evento.
 *
 * Se mide en días de calendario de Córdoba, no en milisegundos: si se resta y
 * se divide, alguien que abre la página a las 23 h ve un día menos que el que
 * la abre a las 8 del mismo día.
 *
 * Vive acá y no dentro de una sección porque el dato se muestra en dos lugares
 * —el panel del hero y el bloque de cuenta regresiva—, y dos relojes que se
 * calculan por separado terminan discrepando en el cambio de día.
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

/* Estado de módulo: un solo reloj para todos los consumidores. */
const ahora = ref(Date.now());
let suscriptores = 0;
let reloj = null;

function actualizar() {
  ahora.value = Date.now();
}

const dias = computed(() => {
  const hoy = aMediodia(formato.format(new Date(ahora.value)));
  const evento = aMediodia(formato.format(new Date(EVENTO.fechaISO)));
  return Math.round((evento - hoy) / 86400000);
});

const estado = computed(() => (dias.value > 0 ? "faltan" : dias.value === 0 ? "hoy" : "pasado"));

export function useCuentaRegresiva() {
  onMounted(() => {
    suscriptores += 1;
    if (suscriptores > 1) return;
    // Cada diez minutos alcanza para una cuenta en días, y se recalcula al
    // volver a la pestaña: una landing de evento se deja abierta días enteros.
    actualizar();
    reloj = setInterval(actualizar, 600000);
    document.addEventListener("visibilitychange", actualizar);
  });

  onUnmounted(() => {
    suscriptores -= 1;
    if (suscriptores > 0) return;
    clearInterval(reloj);
    reloj = null;
    document.removeEventListener("visibilitychange", actualizar);
  });

  return { dias, estado };
}
