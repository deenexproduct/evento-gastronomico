import { ref, computed } from "vue";
import { TEMAS, TERMOMETRO } from "@/data/evento";

/**
 * Lo que la persona marcó, y cuántos van.
 *
 * El estado vive a nivel de MÓDULO, igual que useCupo, y por la misma razón:
 * se marca en la pantalla 6 y se lee en la pantalla 19. Con estado por
 * instancia, el termómetro guardaría lo suyo y el mensaje de WhatsApp saldría
 * vacío — que es exactamente lo que pasa hoy con el renglón del tema.
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
    return {
      // Se filtra contra TERMOMETRO: una sesión vieja no puede resucitar un id
      // que ya no existe y meter en el mensaje un tema que la página retiró.
      marcados: Array.isArray(g.marcados)
        ? g.marcados.filter((id) => TERMOMETRO.some((t) => t.id === id))
        : [],
      // Acotado a 1..4: el valor viene de una píldora, pero sessionStorage lo
      // puede editar cualquiera y "Vamos 900" con cupo duro es un problema.
      personas: Number.isInteger(g.personas) ? Math.min(4, Math.max(1, g.personas)) : 1,
    };
  } catch {
    return { marcados: [], personas: 1 };
  }
}

const inicial = leer();
const marcados = ref(inicial.marcados);
const personas = ref(inicial.personas);

function guardar() {
  try {
    sessionStorage.setItem(
      CLAVE,
      JSON.stringify({ marcados: marcados.value, personas: personas.value })
    );
  } catch {
    /* modo privado: se degrada a estado por página, que es lo de hoy */
  }
}

const elegidos = computed(() => TERMOMETRO.filter((t) => marcados.value.includes(t.id)));

/** Los textos que viajan al mensaje. Cortos: el renglón se lee en el chat. */
const temas = computed(() => elegidos.value.map((t) => t.corto));

/**
 * Los bloques del día que tratan lo marcado. Se DERIVAN de TEMAS por id, con
 * filter(Boolean): si mañana se cae un bloque del programa, la afirmación que
 * lo señalaba deja de ofrecer un bloque inexistente en vez de romper.
 */
const bloques = computed(() => {
  const ids = [...new Set(elegidos.value.map((t) => t.tema))];
  return ids.map((id) => TEMAS.find((b) => b.id === id)).filter(Boolean);
});

const hayEleccion = computed(() => marcados.value.length > 0);

export function useTuDomingo() {
  const marcar = (id) => {
    marcados.value = marcados.value.includes(id)
      ? marcados.value.filter((x) => x !== id)
      : [...marcados.value, id];
    guardar();
  };
  const limpiar = () => {
    marcados.value = [];
    guardar();
  };
  const cuantos = (n) => {
    personas.value = Math.min(4, Math.max(1, n));
    guardar();
  };

  return { marcados, elegidos, temas, bloques, hayEleccion, personas, marcar, limpiar, cuantos };
}
