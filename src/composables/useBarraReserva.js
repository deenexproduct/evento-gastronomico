import { ref } from "vue";

/**
 * Si la barra flotante de reserva está en pantalla.
 *
 * El nav y la barra llevan la misma píldora magenta. Con las dos visibles al
 * mismo tiempo —que era el caso durante veintidós de las veintiocho pantallas
 * del teléfono— el magenta deja de querer decir "esta es LA acción" y pasa a
 * ser decoración.
 *
 * Se turnan: la barra manda, y el nav muestra la suya sólo cuando la barra no
 * está. Tiene que ser un estado compartido y no dos condiciones parecidas en
 * cada componente: la barra se apaga por tres motivos distintos —todavía no
 * pasaste el hero, el botón de reserva está en pantalla, o entró el pie— y si
 * el nav intenta adivinarlos queda un tramo sin ningún acceso a reservar.
 * Me pasó: escondiendo la píldora con sólo "pasó el hero", en escritorio
 * quedaba una pantalla entera cerca del final sin nada que reserve.
 */
export const barraVisible = ref(false);
