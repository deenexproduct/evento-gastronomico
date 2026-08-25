<template>
  <!--
    Va apenas debajo del hero porque responde la primera pregunta que se hace
    cualquiera que llega por un anuncio: qué es esto, exactamente. Sin esto,
    el visitante tiene que deducirlo del programa varias pantallas más abajo.
  -->
  <section id="que-es" class="bg-noche py-seccion">
    <div class="contenedor">
      <div class="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <div>
          <p class="rotulo text-acento-texto">Qué es</p>
          <h2 class="titulo mt-4 max-w-[13ch] text-[clamp(2rem,6vw,3.6rem)]">
            GastroTech en una frase
          </h2>
        </div>

        <div>
          <p class="text-[clamp(1.15rem,2.6vw,1.6rem)] font-bold leading-[1.35]">
            Un día entero en Córdoba donde
            <span class="text-acento-texto">dueños de bares y restaurantes</span>
            escuchan a los que ya resolvieron lo que ellos están peleando:
            costos, datos, sistemas y contenido.
          </p>

          <p class="lectura mt-6 text-[17px] leading-[1.6] text-gris">
            Lo organiza {{ EVENTO.organiza }}, la plataforma con la que trabajan más de 350 marcas
            del rubro. Es la primera edición y la entrada no se cobra: lo único limitado es el
            salón.
          </p>
        </div>
      </div>

      <!-- Las cuatro preguntas que se hace cualquiera que llega de un anuncio -->
      <dl class="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="q in CLAVES" :key="q.pregunta" class="tarjeta flex flex-col p-6">
          <span
            class="flex h-11 w-11 items-center justify-center rounded-full bg-acento/12 text-acento-texto"
          >
            <Pictograma :nombre="q.icono" :tam="20" />
          </span>
          <dt class="mt-5 text-[12px] font-black uppercase tracking-[0.12em] text-gris">
            {{ q.pregunta }}
          </dt>
          <dd class="mt-2 text-[1.05rem] font-black uppercase leading-[1.15] tracking-[-0.01em]">
            {{ q.respuesta }}
          </dd>
          <p class="mt-2.5 text-[14px] leading-[1.5] text-gris">{{ q.detalle }}</p>
        </div>
      </dl>

      <!-- Qué NO es: filtra tan rápido como lo que sí es -->
      <div class="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-7">
        <p class="text-[12px] font-black uppercase tracking-[0.12em] text-gris-2">Qué no es</p>
        <div class="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          <span
            v-for="n in NO_ES"
            :key="n"
            class="flex items-center gap-2.5 text-[15px] font-semibold text-gris"
          >
            <Pictograma nombre="cruz" :tam="15" :grosor="2.4" />
            {{ n }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { EVENTO } from "@/data/evento";
import Pictograma from "@/components/ui/Pictograma.vue";

const CLAVES = [
  {
    icono: "calendario",
    pregunta: "Cuándo",
    respuesta: "Domingo 20/09",
    detalle: "De 9 a 18 h. Entrás y salís cuando quieras, nadie controla la butaca.",
  },
  {
    icono: "lugar",
    pregunta: "Dónde",
    respuesta: "Córdoba capital",
    detalle: `${EVENTO.venue}, en un salón propio de 200 m².`,
  },
  {
    icono: "gente",
    pregunta: "Para quién",
    respuesta: "Dueños del rubro",
    detalle: "Marcas gastronómicas y restaurantes. Decisores, no público general.",
  },
  {
    icono: "entrada",
    pregunta: "Cuánto sale",
    respuesta: "Nada",
    detalle: "Entrada sin costo. El registro previo es obligatorio y el cupo es de 200.",
  },
];

const NO_ES = [
  "Una feria de comida",
  "Un curso ni una capacitación",
  "Una ronda de venta de proveedores",
  "Un evento para público general",
];
</script>
