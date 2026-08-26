import { ref } from "vue";

/**
 * Cuántos van.
 *
 * El estado vive a nivel de MÓDULO, igual que useCupo: se elige en la sección
 * de reserva y se lee en el enlace de WhatsApp de esa misma sección, pero
 * también en el del pie y en el de la barra flotante.
 *
 * NO se guarda en localStorage ni en la URL, a propósito:
 * · localStorage ya nos hizo prometer algo que nunca salía del navegador
 *   (AvisameSection: "Anotado, te escribimos" con el dato en el equipo del
 *   propio visitante).
 * · la URL con hash es lo que se pega en WhatsApp, y la ruta comodín del
 *   router es lo único que impide que ese link abra una página en blanco.
 * sessionStorage muere con la pestaña y no promete nada.
 */
const CLAVE = "gt-tu-domingo";

function leer() {
  try {
    const g = JSON.parse(sessionStorage.getItem(CLAVE) || "{}");
    // Acotado a 1..4: el valor viene de una píldora, pero sessionStorage lo
    // puede editar cualquiera y "Vamos 900" con cupo duro es un problema.
    return Number.isInteger(g.personas) ? Math.min(4, Math.max(1, g.personas)) : 1;
  } catch {
    return 1;
  }
}

const personas = ref(leer());

function guardar() {
  try {
    sessionStorage.setItem(CLAVE, JSON.stringify({ personas: personas.value }));
  } catch {
    /* modo privado: se degrada a estado por página, que es lo de hoy */
  }
}

/** Cuántas sillas guardar. 1 es "solo yo" y no viaja al mensaje. */
function cuantos(n) {
  personas.value = Math.min(4, Math.max(1, n));
  guardar();
}

export function useTuDomingo() {
  return { personas, cuantos };
}
