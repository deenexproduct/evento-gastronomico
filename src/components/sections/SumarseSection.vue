<template>
  <!--
    Dos públicos que no son el asistente y que hasta acá no tenían dónde
    entrar: la marca que quiere un stand y el medio que quiere cubrirlo.
    Van juntos y al final, subordinados al registro, para no competir con el
    CTA principal — el error documentado de las ferias del rubro es escribir
    el home para el expositor.
  -->
  <section id="sumarse" class="bg-noche-2 py-seccion">
    <div class="contenedor">
      <p class="rotulo text-gris">No venís como asistente</p>
      <h2 class="titulo mt-4 max-w-[18ch] text-[clamp(2rem,5.6vw,3.4rem)]">
        Sumate de otra forma
      </h2>

      <div class="mt-12 grid gap-4 lg:grid-cols-2">
        <!-- Sponsors -->
        <article class="tarjeta flex flex-col p-8">
          <span class="chip self-start border-acento/50 text-acento-texto">Marcas</span>
          <h3 class="mt-5 text-[1.5rem] font-extrabold uppercase leading-[1.1]">
            Sponsors
          </h3>
          <p class="mt-4 text-[16px] leading-[1.55] text-gris">
            Stand en el salón, un bloque propio dentro del programa y un beneficio para los que
            estén ese día. Hay un solo lugar por rubro, y queda asignado al confirmar.
          </p>

          <ul class="mt-7 grid gap-3">
            <li v-for="i in INCLUYE_PARTNER" :key="i" class="item-incluye">
              <span class="tilde" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.4">
                  <path d="M3 8.4l3.2 3.1L13 4.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <span>{{ i }}</span>
            </li>
          </ul>

          <p class="mt-6 text-[14px] leading-[1.5] text-gris-2">
            No hay niveles ni tarifario: los diez reciben lo mismo y aportan lo mismo. Sin fee y
            sin factura de por medio.
          </p>

          <a
            :href="whatsappPartner"
            target="_blank"
            rel="noopener noreferrer"
            class="btn mt-7 w-full"
          >
            Quiero ser sponsor
          <span class="sr-only"> (abre en una pestaña nueva)</span></a>
        </article>

        <!-- Prensa -->
        <article class="tarjeta flex flex-col p-8">
          <span class="chip self-start border-white/15 text-gris">Medios</span>
          <h3 class="mt-5 text-[1.5rem] font-extrabold uppercase leading-[1.1]">Prensa</h3>
          <p class="mt-4 text-[16px] leading-[1.55] text-gris">
            Acreditación para medios del rubro gastronómico y de Córdoba. Alan Tapia queda
            disponible para entrevistas antes y durante la jornada.
          </p>

          <ul class="mt-7 grid gap-3">
            <li v-for="i in INCLUYE_PRENSA" :key="i" class="item-incluye">
              <span class="tilde" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.4">
                  <path d="M3 8.4l3.2 3.1L13 4.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <span>{{ i }}</span>
            </li>
          </ul>

          <p class="mt-6 text-[14px] leading-[1.5] text-gris-2">
            El tema de fondo: cómo se está reconvirtiendo la gastronomía cordobesa. El evento es el
            lugar donde se ve.
          </p>

          <a
            :href="whatsappPrensa"
            target="_blank"
            rel="noopener noreferrer"
            class="btn mt-7 w-full"
          >
            Pedir acreditación
          <span class="sr-only"> (abre en una pestaña nueva)</span></a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { EVENTO, linkWa } from "@/data/evento";

const INCLUYE_PARTNER = [
  "Stand en el salón durante toda la jornada",
  "Un bloque propio dentro del programa, en el track único",
  "Tu marca en la comunicación del evento",
  "Un día entero cara a cara con dueños de cadenas, sin público general",
];

const INCLUYE_PRENSA = [
  `Acreditación para el ${EVENTO.fechaSinDia}`,
  "Gacetilla y material fotográfico",
  "Entrevistas con Alan Tapia y los oradores",
  "Acceso al panel de cierre",
];

const whatsappPartner = linkWa("partner");
const whatsappPrensa = linkWa("prensa");
</script>

<style scoped>
/*
  Los items llevaban un guion como viñeta. Un guion no dice nada: ocupa el lugar
  del signo y deja la lista pareja con cualquier enumeración. El tilde afirma
  que eso está incluido, que es lo que la tarjeta quiere decir.
*/
.item-incluye {
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 0.75rem;
  align-items: start;
  font-size: 15px;
  line-height: 1.45;
}
.tilde {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--acento, #695EDE) 14%, transparent);
  color: var(--acento-texto, #4F42C4);
  margin-top: 1px;
}
</style>
