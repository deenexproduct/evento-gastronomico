import { ref, computed } from "vue";
import { CUPO, MINIMO_PARA_MOSTRAR_CUPO } from "@/data/evento";

/**
 * Cupo de la sala.
 *
 * El estado vive a nivel de módulo, no dentro de la función: la landing muestra
 * el cupo en cinco lugares y todos tienen que ver el mismo número y disparar
 * una sola consulta, no cinco.
 *
 * Sin backend usa el valor estático de CUPO.ocupados. Si está definido
 * VITE_CUPO_ENDPOINT, pide el número real la primera vez y lo pisa.
 *
 * El endpoint tiene que devolver JSON con { ocupados: number } y,
 * opcionalmente, { total: number }.
 */

const total = ref(CUPO.total);
const ocupados = ref(CUPO.ocupados);
const enVivo = ref(false);

const restantes = computed(() => Math.max(0, total.value - ocupados.value));
const porcentaje = computed(() =>
  total.value ? Math.min(100, Math.round((ocupados.value / total.value) * 100)) : 0
);
const agotado = computed(() => restantes.value <= 0);
/**
 * El contador solo se enciende a partir de MINIMO_PARA_MOSTRAR_CUPO anotados.
 * La constante estaba escrita y documentada desde el principio pero no la leía
 * nadie: con pocos anotados, decir "van 12 de 200" destruye más de lo que
 * construye. Hoy no cambia nada en pantalla —van 85— pero protege el día que
 * el número arranque de cero para una edición nueva.
 */
const mostrarCupo = computed(() => ocupados.value >= MINIMO_PARA_MOSTRAR_CUPO);

/** Bajo 40 lugares el cupo pasa a comunicarse en rojo. */
const critico = computed(() => !agotado.value && restantes.value <= 40);

/** Promesa única compartida: el segundo llamado reusa el primero. */
let consulta = null;

function consultar() {
  const endpoint = import.meta.env.VITE_CUPO_ENDPOINT;
  if (!endpoint) return Promise.resolve();

  consulta ??= fetch(endpoint, { headers: { Accept: "application/json" } })
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (!data) return;
      if (typeof data.total === "number") total.value = data.total;
      if (typeof data.ocupados === "number") {
        ocupados.value = data.ocupados;
        enVivo.value = true;
      }
    })
    .catch(() => {
      // Se queda con el valor estático. El cupo nunca debe romper la landing.
    });

  return consulta;
}

export function useCupo() {
  consultar();
  return { total, ocupados, restantes, porcentaje, agotado, critico, enVivo, mostrarCupo };
}
