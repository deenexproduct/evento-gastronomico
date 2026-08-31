<template>
  <!--
    Cronograma vertical, no grilla de cuadrados.

    Los siete cuadrados eran una grilla de 2/3/4 columnas donde el orden de
    lectura no era el orden del día: en teléfono se leían de a dos por fila y
    la hora quedaba como un dato más adentro de una caja. Once bloques en esa
    forma no se entienden — y once es lo que tiene la grilla del 30/08.

    Acá el eje es el tiempo y se lee de arriba abajo, que es como se lee una
    agenda. Se muestran los primeros cinco: once renglones seguidos son una
    pared que nadie termina, y cinco alcanzan para entender de qué va el día.
    El resto entra con un botón. Cada fila abre su detalle en un diálogo.
  -->
  <section id="jornada" class="border-b border-linea py-seccion">
    <div class="contenedor">
      <p class="rotulo text-acento-texto">La jornada</p>
      <h2 class="titulo mt-4 max-w-[18ch] text-[clamp(1.9rem,5.2vw,3.1rem)]">
        Once bloques, ninguno de teoría
      </h2>
      <p class="lectura mt-5 text-[17px] text-gris">
        Track único: no hay salas paralelas ni hay que elegir. Tocá cualquier bloque para ver de
        qué va y quién lo da.
      </p>

      <!-- Las tres cifras del día, antes de la lista -->
      <dl class="mt-8 flex flex-wrap gap-x-10 gap-y-4">
        <div v-for="c in cifras" :key="c.r">
          <dt class="text-[11px] font-semibold uppercase tracking-[0.12em] text-gris-2">
            {{ c.r }}
          </dt>
          <dd class="hora mt-1 text-[1.4rem] text-acento-texto">{{ c.n }}</dd>
        </div>
      </dl>

      <!-- ── El cronograma ──────────────────────────────────────── -->
      <ol class="mt-10 border-t border-linea">
        <!-- Acreditación -->
        <li class="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-linea py-4">
          <time :datetime="iso(BORDES.apertura.hora)" class="hora w-[4.5rem] text-[1rem] text-gris-2">
            {{ BORDES.apertura.hora }}
          </time>
          <span class="text-[15px] text-gris">{{ BORDES.apertura.titulo }}</span>
        </li>

        <template v-for="(b, i) in visibles" :key="b.id">
          <!-- La pausa que va ANTES de este bloque, calculada, nunca declarada -->
          <li
            v-if="pausaAntes(i)"
            class="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-linea py-2.5"
          >
            <time :datetime="iso(pausaAntes(i).hora)" class="hora w-[4.5rem] text-[0.85rem] text-gris-2">
              {{ pausaAntes(i).hora }}
            </time>
            <span class="text-[13px] text-gris-2">
              {{ pausaAntes(i).dur }}′ · Degustación y preparación
            </span>
          </li>

          <li class="border-b border-linea">
            <button
              type="button"
              class="fila-bloque presionable w-full text-left"
              :aria-label="`Ver el detalle del bloque de las ${b.hora}: ${b.titulo}`"
              @click="abrir(b)"
            >
              <time :datetime="iso(b.hora)" class="hora w-[4.5rem] shrink-0 text-[1.05rem]" :class="b.tipo === 'networking' ? 'text-gris-2' : 'text-acento-texto'">
                {{ b.hora }}
              </time>

              <span class="min-w-0 flex-1">
                <span class="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span class="text-[11px] font-semibold uppercase tracking-[0.1em] text-gris-2">
                    {{ b.dur }}′
                  </span>
                  <span
                    v-if="b.tipo !== 'charla'"
                    class="chip text-[10px]"
                    :class="b.tipo === 'networking' ? 'border-linea text-gris-2' : 'border-acento/45 text-acento-texto'"
                  >
                    {{ TIPOS_BLOQUE[b.tipo]?.label }}
                  </span>
                </span>

                <span
                  class="mt-1.5 block text-[1.02rem] font-extrabold leading-[1.25] sm:text-[1.15rem]"
                  :class="b.tipo === 'networking' ? 'text-gris' : ''"
                >
                  {{ b.titulo }}
                </span>

                <span v-if="b.quien" class="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span class="text-[13px] text-gris">{{ b.quien }}</span>
                  <span v-if="b.estado" class="punto" :class="`punto-${ESTADOS_BLOQUE[b.estado].tono}`">
                    {{ ESTADOS_BLOQUE[b.estado].label }}
                  </span>
                </span>
              </span>

              <span class="ver-mas shrink-0" aria-hidden="true">Ver detalle</span>
            </button>

          </li>
        </template>

        <!-- Cierre -->
        <li v-if="todos" class="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4">
          <time :datetime="iso(BORDES.cierre.hora)" class="hora w-[4.5rem] text-[1rem] text-gris-2">
            {{ BORDES.cierre.hora }}
          </time>
          <span class="text-[15px] text-gris">{{ BORDES.cierre.titulo }}</span>
        </li>
      </ol>

      <!--
        El corte en cinco no se disimula: el boton dice cuantos faltan, asi el
        lector sabe que hay mas dia y decide si lo quiere ver. Y no desaparece
        al desplegar: se puede volver a los cinco, que es lo que permite mirar
        la jornada dos veces sin recargar.
      -->
      <button type="button" class="btn-desglosar presionable mt-6" @click="todos = !todos">
        <template v-if="todos">Ver menos</template>
        <template v-else>
          Ver los {{ TEMAS.length }} bloques del día
          <span class="text-[11px] font-semibold uppercase tracking-[0.08em] opacity-70">
            · faltan {{ TEMAS.length - TOPE }}
          </span>
        </template>
      </button>

      <p class="mt-6 text-[14px] leading-[1.55] text-gris-2">
        El orden puede moverse hasta la semana del evento. La grilla final la reciben primero los
        que ya reservaron.
      </p>
    </div>

    <!-- ── El detalle ─────────────────────────────────────────────
         <dialog> nativo: trae el foco atrapado, el cierre con Escape y el
         fondo inerte sin una línea de JS. -->
    <dialog
      ref="dlg"
      class="detalle-bloque"
      :aria-label="activo ? `Detalle: ${activo.titulo}` : 'Detalle del bloque'"
      @click="clickFuera"
      @close="alCerrar"
    >
      <div v-if="activo" class="detalle-caja">
        <button type="button" class="cerrar presionable" aria-label="Cerrar el detalle" @click="cerrar">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
          </svg>
        </button>

        <p class="flex flex-wrap items-center gap-x-3 gap-y-1">
          <time :datetime="iso(activo.hora)" class="hora text-[1.3rem] text-acento-texto">{{ activo.hora }}</time>
          <span class="text-[12px] font-semibold uppercase tracking-[0.11em] text-gris-2">
            {{ activo.dur }} minutos
          </span>
          <span v-if="activo.tipo !== 'charla'" class="chip border-acento/45 text-[10px] text-acento-texto">
            {{ TIPOS_BLOQUE[activo.tipo]?.label }}
          </span>
        </p>

        <h3 class="mt-4 text-[1.25rem] font-extrabold leading-[1.2] sm:text-[1.5rem]">
          {{ activo.titulo }}
        </h3>

        <div v-if="activo.quien" class="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-linea pt-5">
          <span class="text-[15px] font-semibold">{{ activo.quien }}</span>
          <span v-if="activo.empresa" class="text-[14px] text-gris">· {{ activo.empresa }}</span>
          <span v-if="activo.estado" class="punto" :class="`punto-${ESTADOS_BLOQUE[activo.estado].tono}`">
            {{ ESTADOS_BLOQUE[activo.estado].label }}
          </span>
        </div>

        <p class="mt-4 text-[15px] leading-[1.6] text-gris">{{ activo.punta }}</p>

        <div v-if="activo.temas?.length" class="mt-6 border-t border-linea pt-5">
          <p class="text-[11px] font-semibold uppercase tracking-[0.12em] text-gris-2">Qué se toca</p>
          <ul class="mt-3 grid gap-2">
            <li v-for="t in activo.temas" :key="t" class="flex gap-2.5 text-[15px] leading-[1.5]">
              <span class="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-acento" aria-hidden="true"></span>
              <span>{{ t }}</span>
            </li>
          </ul>
        </div>

        <p v-if="activo.estado === 'abierto'" class="mt-6 rounded-lg border border-linea px-4 py-3 text-[13.5px] leading-[1.5] text-gris-2">
          El tema está cerrado; el orador todavía no. Lo anunciamos con la grilla final, que
          reciben primero los que ya reservaron.
        </p>
      </div>
    </dialog>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { TEMAS, TIPOS_BLOQUE, ESTADOS_BLOQUE, BORDES, EVENTO } from "@/data/evento";

/** Cuántos bloques se ven antes de pedir el resto. */
const TOPE = 5;
const todos = ref(false);
const visibles = computed(() => (todos.value ? TEMAS : TEMAS.slice(0, TOPE)));

/*
  El scroll del fondo, congelado mientras el diálogo está abierto y devuelto
  al cerrar. Sin esto, `showModal()` mueve la página al enfocar el diálogo y
  el que cierra vuelve a otro punto del scroll — que es justo lo que un visor
  sobre la home no tiene que hacer.
*/
let scrollGuardado = 0;
function congelar() {
  scrollGuardado = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollGuardado}px`;
  document.body.style.width = "100%";
}
function descongelar() {
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  window.scrollTo({ top: scrollGuardado, behavior: "instant" });
}

const dlg = ref(null);
const activo = ref(null);

function abrir(b) {
  activo.value = b;
  congelar();
  dlg.value?.showModal();
}
function cerrar() {
  dlg.value?.close();
}
/** Clic en el backdrop: el <dialog> recibe el evento cuando se toca afuera. */
function alCerrar() {
  activo.value = null;
  descongelar();
}
function clickFuera(e) {
  if (e.target === dlg.value) cerrar();
}

/** Minutos desde medianoche, para poder restar horas sin traer una librería. */
function min(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}
function aHora(mins) {
  return `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
}
/** El datetime del <time>, con la fecha del evento. */
function iso(hhmm) {
  return `${EVENTO.fechaISO.slice(0, 10)}T${hhmm.padStart(5, "0")}:00-03:00`;
}

/**
 * La pausa anterior a un bloque se CALCULA: fin del bloque previo → arranque
 * de éste. Nunca se declara en los datos, así que si mañana se mueve un
 * horario la pausa se recalcula sola y el cronograma no puede mentir.
 * El networking del mediodía ya es un bloque propio, así que no genera pausa.
 */
function pausaAntes(i) {
  if (i === 0) return null;
  const prev = TEMAS[i - 1];
  const arranca = min(TEMAS[i].hora);
  const termina = min(prev.hora) + prev.dur;
  const dur = arranca - termina;
  return dur > 0 ? { hora: aHora(termina), dur } : null;
}

const cifras = computed(() => {
  const conOrador = TEMAS.filter((b) => b.tipo !== "networking");
  const contenido = conOrador.reduce((a, b) => a + b.dur, 0);
  return [
    { r: "Bloques", n: conOrador.length },
    { r: "De contenido", n: `${contenido}′` },
    { r: "Networking", n: `${TEMAS.filter((b) => b.tipo === "networking").reduce((a, b) => a + b.dur, 0)}′` },
  ];
});

</script>

<style scoped>
.fila-bloque {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.15rem 0;
  transition: background-color 0.15s;
}
.fila-bloque:hover { background-color: rgb(0 0 0 / 0.02); }

/*
  La pildora es el unico aviso de que la fila se toca: sin ella, once renglones
  de agenda se leen como una tabla y nadie descubre el detalle. Va en el violeta
  de marca y chica —11px— para que se repita once veces sin gritar.
*/
.ver-mas {
  align-self: center;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
  color: #fff;
  background: var(--acento, #695EDE);
  transition: background-color 0.15s, transform 0.15s;
}
.ver-mas::after { content: "+"; font-size: 12px; line-height: 1; }
.fila-bloque:hover .ver-mas { background: #5B4FD6; }
.fila-bloque:active .ver-mas { transform: scale(0.96); }

/* En telefono el texto no entra al lado del titulo: queda solo el signo. */
@media (max-width: 480px) {
  .ver-mas { font-size: 0; padding: 0.32rem 0.5rem; gap: 0; }
  .ver-mas::after { font-size: 14px; }
}

/* El estado de cada orador. No es un chip: un chip more pesa lo mismo que el
   nombre y acá el nombre manda. */
.punto {
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.punto::before {
  content: "";
  width: 5px; height: 5px; border-radius: 999px;
  background: currentColor;
}
.punto-firme { color: #2F6E4E; }
.punto-medio { color: var(--acento-texto, #4F42C4); }
.punto-tenue { color: #82828A; }

/* El botón que revela el resto del día. */
.btn-desglosar {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 48px;
  padding: 0 1.4rem;
  border-radius: 999px;
  border: 1px solid var(--acento, #695EDE);
  background: transparent;
  color: var(--acento-texto, #4F42C4);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
}
.btn-desglosar:hover {
  background: var(--acento, #695EDE);
  color: #fff;
}

.detalle-bloque {
  border: none;
  padding: 0;
  background: transparent;
  max-width: min(38rem, calc(100vw - 2rem));
  width: 100%;
}
.detalle-bloque::backdrop { background: rgb(10 10 12 / 0.55); }
.detalle-caja {
  position: relative;
  background: var(--papel, #fff);
  color: inherit;
  border-radius: 18px;
  padding: 1.75rem;
  max-height: 85vh;
  overflow-y: auto;
}
@media (min-width: 640px) { .detalle-caja { padding: 2.25rem; } }

.cerrar {
  position: absolute;
  top: 0.9rem; right: 0.9rem;
  display: inline-flex; align-items: center; justify-content: center;
  width: 40px; height: 40px;
  border-radius: 999px;
  border: 1px solid var(--linea, #E7E4F0);
  background: transparent;
  color: inherit;
  cursor: pointer;
}
</style>
