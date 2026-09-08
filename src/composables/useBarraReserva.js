import { ref, computed } from "vue";

/**
 * Si hay un acceso a reservar PERSISTENTE en pantalla, sea cual sea.
 *
 * El nav, la barra flotante y el dock de teléfono llevan la misma píldora
 * violeta. Con dos visibles al mismo tiempo —que era el caso durante
 * veintidós de las veintiocho pantallas del teléfono— el violeta deja de
 * querer decir "esta es LA acción" y pasa a ser decoración.
 *
 * Se turnan: manda el que está pegado al borde —la barra en escritorio, el
 * dock en teléfono— y el nav muestra la suya sólo cuando no hay ninguno.
 *
 * TIENE QUE SER UN ESTADO COMPARTIDO y no dos condiciones parecidas en cada
 * componente: la barra se apaga por varios motivos —todavía no pasaste el
 * hero, hay un botón de reserva en pantalla, entró el pie, la ventana es
 * demasiado baja— y si el nav intenta adivinarlos queda un tramo sin ningún
 * acceso a reservar. Ya pasó dos veces:
 *
 *  · Escondiendo la píldora con sólo "pasó el hero", en escritorio quedaba una
 *    pantalla entera cerca del final sin nada que reserve.
 *  · Y la que encontró la auditoría del 08/09: la barra se escondía por CSS en
 *    pantallas de menos de 500px de alto —un teléfono acostado— pero el ref
 *    seguía en true, así que el nav tampoco mostraba la suya. En 844x390, que
 *    es un iPhone en horizontal, la home entera quedaba SIN UN SOLO BOTÓN DE
 *    RESERVAR. Verificado en producción. Por eso ahora cada barra publica si
 *    está visible DE VERDAD, y no si su lógica dice que debería estarlo.
 */
const barraFlotante = ref(false);
const dockMovil = ref(false);

/** Lo que consume el nav para decidir si muestra su píldora. */
export const barraVisible = computed(() => barraFlotante.value || dockMovil.value);

/** La barra flotante de escritorio dice si está a la vista. */
export function publicarBarra(v) {
  barraFlotante.value = v;
}

/** El dock de teléfono dice si está a la vista. */
export function publicarDock(v) {
  dockMovil.value = v;
}
