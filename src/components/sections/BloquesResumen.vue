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
      <p class="rotulo text-acento-texto">Si querés más</p>
      <h2 class="titulo mt-4 max-w-[18ch] text-[clamp(1.9rem,5vw,3rem)]">
        Cinco respuestas, sin salir de acá
      </h2>
      <p class="lectura mt-5 text-[17px] text-gris">
        Se abren sobre esta misma página. No hace falta leerlos en orden ni
        leerlos todos.
      </p>

      <div class="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <button
          v-for="(b, i) in BLOQUES"
          :key="b.ruta"
          type="button"
          class="tarjeta-bloque group"
          :aria-label="`Abrir: ${b.titulo}`"
          @click="abrir(b)"
        >
          <span class="bloque-n" aria-hidden="true">{{ String(i + 1).padStart(2, "0") }}</span>
          <span class="bloque-titulo">{{ b.titulo }}</span>
          <span class="bloque-resumen">{{ b.resumen }}</span>
          <span class="ver-bloque">
            Ver
            <span aria-hidden="true" class="flecha">→</span>
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
/*
  Tarjeta con cuerpo propio, no celda de una grilla pegada.

  Antes eran cinco celdas separadas por una línea de un píxel: se leían como
  una tabla y ninguna invitaba a tocarse. Ahora cada una tiene su caja, su
  aire y una reacción al hover —sube dos píxeles y el borde toma el violeta—,
  que es lo que dice "esto se abre" sin escribirlo.
*/
.tarjeta-bloque {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 1.9rem 1.75rem 1.6rem;
  min-height: 15rem;
  border-radius: 16px;
  border: 1px solid var(--linea, #e7e4f0);
  background: var(--papel, #fff);
  color: inherit;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.18s ease, border-color 0.18s, box-shadow 0.18s;
}
.tarjeta-bloque:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--acento, #695ede) 40%, transparent);
  box-shadow: 0 10px 30px -18px color-mix(in srgb, var(--acento, #695ede) 70%, transparent);
}
@media (prefers-reduced-motion: reduce) {
  .tarjeta-bloque, .tarjeta-bloque:hover { transform: none; transition: border-color 0.18s; }
}

/* El número, del mismo sistema que la sección de por qué ir: es lo que hace
   que las dos series se lean como parte de la misma página. */
.bloque-n {
  font-family: "Panchang", sans-serif;
  font-weight: 800;
  font-size: 2.4rem;
  line-height: 0.85;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
  color: color-mix(in srgb, var(--acento, #695ede) 20%, transparent);
  transition: color 0.18s;
}
.tarjeta-bloque:hover .bloque-n {
  color: color-mix(in srgb, var(--acento, #695ede) 45%, transparent);
}

.bloque-titulo {
  margin-top: 1.1rem;
  font-size: 1.22rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.015em;
  text-wrap: balance;
}
.bloque-resumen {
  margin-top: 0.6rem;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--gris, #6b6779);
}

/* El "Ver" es el que avisa que la tarjeta se toca, así que va en el violeta
   de marca y con forma de botón — antes era un texto más de la tarjeta. */
.ver-bloque {
  margin-top: auto;
  padding-top: 1.4rem;
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
.flecha { transition: transform 0.18s; }
.tarjeta-bloque:hover .flecha { transform: translateX(3px); }

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
