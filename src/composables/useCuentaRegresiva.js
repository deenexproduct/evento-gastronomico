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

/* ── El reloj vivo ───────────────────────────────────────────────────────
   Segundo reloj, con su propio tick de un segundo, para el contador del hero.

   No se aceleró el de arriba: ese alimenta la cuenta en días de dos secciones
   y despertar el hilo cada segundo para un número que cambia una vez por día
   es gasto de batería en un teléfono que puede quedar con la pestaña abierta.
   Este sólo corre mientras alguien lo consume, y se apaga con la pestaña
   oculta — si no, sigue sumando ticks en segundo plano y al volver hay que
   recalcular igual.

   La resta acá SÍ es en milisegundos, a diferencia de `dias`: un contador con
   horas, minutos y segundos mide tiempo real hasta la apertura de puertas, no
   días de calendario. Los dos números pueden diferir en uno cerca de la
   medianoche y es correcto que difieran: cuentan cosas distintas. */
const vivoAhora = ref(Date.now());
let vivoSuscriptores = 0;
let vivoReloj = null;

function tick() {
  vivoAhora.value = Date.now();
}
function arrancarReloj() {
  if (vivoReloj) return;
  tick();
  vivoReloj = setInterval(tick, 1000);
}
function pararReloj() {
  clearInterval(vivoReloj);
  vivoReloj = null;
}
function segunVisibilidad() {
  if (document.hidden) pararReloj();
  else arrancarReloj();
}

const restante = computed(() => {
  const ms = new Date(EVENTO.fechaISO).getTime() - vivoAhora.value;
  if (ms <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0, vencido: true };
  const s = Math.floor(ms / 1000);
  return {
    dias: Math.floor(s / 86400),
    horas: Math.floor((s % 86400) / 3600),
    minutos: Math.floor((s % 3600) / 60),
    segundos: s % 60,
    vencido: false,
  };
});

export function useRelojEvento() {
  onMounted(() => {
    vivoSuscriptores += 1;
    if (vivoSuscriptores > 1) return;
    arrancarReloj();
    document.addEventListener("visibilitychange", segunVisibilidad);
  });

  onUnmounted(() => {
    vivoSuscriptores -= 1;
    if (vivoSuscriptores > 0) return;
    pararReloj();
    document.removeEventListener("visibilitychange", segunVisibilidad);
  });

  return { restante };
}

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
