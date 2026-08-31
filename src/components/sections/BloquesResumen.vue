<!--
  El índice del detalle, dentro de la home.

  Es lo que convierte a la home en un resumen y no en un recorte: acá se ve,
  de un vistazo, todo lo que el evento tiene para contar.

  Antes cada tarjeta navegaba a su vista y sacaba al lector de la home. Ahora
  abre el contenido en un diálogo sobre la misma página: el que está evaluando
  el evento no pierde el lugar del scroll ni el hilo, y cierra cuando termina.
  Las vistas siguen existiendo con su propia URL para el que llega directo o
  comparte un enlace — esto no las reemplaza, las adelanta.
-->
<template>
  <section id="bloques" class="border-y border-linea py-seccion">
    <div class="contenedor">
      <p class="rotulo text-gris-2">El detalle</p>
      <h2 class="titulo mt-4 max-w-[20ch] text-[clamp(1.9rem,5vw,3rem)]">
        Todo lo demás, sin scrollear de más
      </h2>
      <p class="lectura mt-5 text-[17px] text-gris">
        Cada bloque se abre acá mismo, sin salir de la página. No hace falta
        leerlos en orden ni leerlos todos.
      </p>

      <div class="mt-12 grid gap-px bg-linea sm:grid-cols-2 lg:grid-cols-3">
        <button
          v-for="(b, i) in BLOQUES"
          :key="b.ruta"
          type="button"
          class="tarjeta-bloque group"
          :aria-label="`Abrir: ${b.titulo}`"
          @click="abrir(b)"
        >
          <span class="text-[13px] font-semibold uppercase tracking-[0.1em] text-gris-2 tabular-nums">
            {{ String(i + 1).padStart(2, "0") }}
          </span>
          <span class="mt-1 text-[1.2rem] font-extrabold uppercase leading-tight">
            {{ b.titulo }}
          </span>
          <span class="text-[15px] leading-[1.5] text-gris">{{ b.resumen }}</span>
          <span class="ver-bloque mt-4">
            Ver
            <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </button>
      </div>
    </div>

    <!-- El contenido del bloque, sobre la home. <dialog> nativo: foco
         atrapado, cierre con Escape y fondo inerte sin JS propio. -->
    <dialog
      ref="dlg"
      class="visor"
      :aria-label="activo ? activo.titulo : 'Detalle del bloque'"
      @click="clickFuera"
      @close="alCerrar"
    >
      <div v-if="activo" class="visor-caja">
        <header class="visor-barra">
          <p class="min-w-0 truncate text-[13px] font-semibold uppercase tracking-[0.1em] text-gris-2">
            {{ activo.titulo }}
          </p>
          <button type="button" class="cerrar presionable" aria-label="Cerrar" @click="cerrar">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
            </svg>
          </button>
        </header>

        <div class="visor-cuerpo">
          <component :is="SECCIONES[activo.ruta]" />
        </div>
      </div>
    </dialog>
  </section>
</template>

<script setup>
import { ref, shallowRef } from "vue";
import { BLOQUES } from "@/data/evento";
import QueEsSection from "@/components/sections/QueEsSection.vue";
import ElLunesSection from "@/components/sections/ElLunesSection.vue";
import RegistroSection from "@/components/sections/RegistroSection.vue";
import BrandsSection from "@/components/sections/BrandsSection.vue";
import PruebaSection from "@/components/sections/PruebaSection.vue";

/*
  Cada bloque muestra la MISMA sección que su vista: no hay una segunda copia
  del contenido que se pueda desincronizar. shallowRef porque son componentes,
  no datos — con ref, Vue intentaría hacerlos reactivos por dentro.
*/
const SECCIONES = shallowRef({
  "/que-es": QueEsSection,
  "/beneficios": ElLunesSection,
  "/deadline": RegistroSection,
  "/participan": BrandsSection,
  "/organiza": PruebaSection,
}).value;

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
function alCerrar() {
  activo.value = null;
  descongelar();
}
function clickFuera(e) {
  if (e.target === dlg.value) cerrar();
}
</script>

<style scoped>
.tarjeta-bloque {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  text-align: left;
  padding: 1.75rem;
  background: var(--papel, #fff);
  color: inherit;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s;
}
.tarjeta-bloque:hover { background: color-mix(in srgb, var(--acento, #695EDE) 5%, transparent); }

/* El "Ver" es el que avisa que la tarjeta se toca, así que va en el violeta
   de marca y con forma de botón — antes era un texto más de la tarjeta. */
.ver-bloque {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  background: var(--acento, #695EDE);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: background-color 0.15s;
}
.tarjeta-bloque:hover .ver-bloque { background: #5B4FD6; }

.visor {
  border: none;
  padding: 0;
  background: transparent;
  width: min(58rem, calc(100vw - 1.5rem));
  max-width: none;
}
.visor::backdrop { background: rgb(10 10 12 / 0.6); }

.visor-caja {
  background: var(--papel, #fff);
  border-radius: 18px;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* La barra queda fija arriba: con contenido largo, el botón de cerrar tiene
   que estar donde el pulgar lo busca y no al final del scroll. */
.visor-barra {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 1rem 0.9rem 1.5rem;
  border-bottom: 1px solid var(--linea, #E7E4F0);
  flex-shrink: 0;
}
.visor-cuerpo { overflow-y: auto; }
/* Las secciones traen su propio aire de sección, que acá sobra. */
.visor-cuerpo :deep(section) { padding-top: 1.5rem; padding-bottom: 2rem; border: none; }

.cerrar {
  display: inline-flex; align-items: center; justify-content: center;
  width: 40px; height: 40px;
  border-radius: 999px;
  border: 1px solid var(--linea, #E7E4F0);
  background: transparent;
  color: inherit;
  cursor: pointer;
  flex-shrink: 0;
}
</style>
