<template>
  <!--
    Dos cosas que nadie pone y que sí importan: qué pasa con tu lugar si no
    podés venir, y qué queda después del 20/9.

    La cancelación de un clic no es cortesía: con un no-show del 40 al 60% en
    eventos gratuitos, cada aviso libera una butaca que alguien de la lista
    puede ocupar. Convierte una ausencia silenciosa en un lugar recuperado.
  -->
  <section id="despues" class="py-seccion">
    <div class="contenedor">
      <div class="grid gap-4 lg:grid-cols-2">
        <!-- Si no podés venir -->
        <article class="rounded-2xl border border-acento/40 bg-acento/[0.06] p-8">
          <p class="rotulo text-acento-texto">Si al final no podés</p>
          <h2 class="titulo mt-4 text-[clamp(1.5rem,3.4vw,2.2rem)]">Avisanos y liberás tu lugar</h2>

          <p class="mt-5 max-w-[46ch] text-[16px] leading-[1.6] text-gris">
            No pasa nada y no hace falta explicar por qué. Un mensaje alcanza. El tema es otro: son
            200 butacas y cada una que queda vacía es una cadena que se quedó afuera pudiendo
            entrar.
          </p>

          <a
            :href="whatsappCancelar"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-linea mt-7"
          >
            No voy a poder ir
          <span class="sr-only"> (abre en una pestaña nueva)</span></a>
        </article>

        <!-- Qué queda después -->
        <article class="tarjeta p-8">
          <p class="rotulo text-gris">Después del 20/09</p>
          <h2 class="titulo mt-4 text-[clamp(1.5rem,3.4vw,2.2rem)]">Qué queda cuando termina</h2>

          <ul class="mt-6 grid gap-px bg-white/10">
            <li v-for="d in DESPUES" :key="d.titulo" class="bg-noche py-4">
              <p class="text-[15px] font-black uppercase tracking-[0.02em]">{{ d.titulo }}</p>
              <p class="mt-1.5 max-w-[46ch] text-[15px] leading-[1.5] text-gris">{{ d.texto }}</p>
            </li>
          </ul>

          <p class="mt-6 text-[14px] leading-[1.5] text-gris-2">
            No se transmite en vivo: lo que pasa en la sala pasa estando ahí.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { WHATSAPP_ORGANIZADOR, EVENTO } from "@/data/evento";

const DESPUES = [
  {
    titulo: "La grilla, por escrito",
    texto: "Todo el evento en un material: los beneficios disponibles y cómo encararlos.",
  },
  {
    titulo: "Tu diagnóstico, si lo pediste",
    texto: "Se coordina después del evento con el equipo de Deenex.",
  },
  {
    titulo: "La edición 02",
    texto: "Los que estuvieron se enteran primero y entran antes que el resto.",
  },
];

const whatsappCancelar =
  `https://wa.me/${WHATSAPP_ORGANIZADOR}?text=` +
  encodeURIComponent(
    `Hola! Me había anotado a ${EVENTO.nombre} del 20 de septiembre pero no voy a poder ir. Mi nombre es ____ y mi marca es ____. Liberen mi lugar.`
  );
</script>
