<template>
  <!--
    Qué queda después del 20/9. Lo que se lleva el que fue, dicho antes de
    que decida ir.

    La tarjeta que envolvía a todo se fue: era la cáscara de cuando esto eran
    dos bloques. Envolvía al encabezado de su propia sección —la única de
    quince que abría así, con el h2 arrancando 32,8px más adentro que los
    otros catorce— y dejaba tres renglones de 1.070px con el texto topado en
    400: dos tercios de blanco muerto a la derecha de cada uno. Encima
    mantenía un hover de 1.136x508px en una sección que no tiene nada para
    tocar. Ahora el encabezado abre como los otros catorce y los tres ítems
    son tres columnas, que es la forma que el contenido pedía: son tres cosas
    paralelas, no una secuencia.
  -->
  <section id="despues" class="py-seccion">
    <div class="contenedor">
      <p class="rotulo text-gris">Después del 20/09</p>
      <h2 class="titulo mt-4 text-[clamp(1.5rem,3.4vw,2.2rem)]">Qué queda cuando termina</h2>

      <ul class="mt-8 grid gap-4 sm:grid-cols-3">
        <li
          v-for="d in DESPUES"
          :key="d.titulo"
          class="rounded-xl border border-white/10 bg-white/5 p-6"
        >
          <p class="text-[15px] font-black uppercase tracking-[0.02em]">{{ d.titulo }}</p>
          <p class="mt-2 text-[15px] leading-[1.5] text-gris">{{ d.texto }}</p>
        </li>
      </ul>

      <p class="mt-6 text-[14px] leading-[1.5] text-gris-2">
        No se transmite en vivo: lo que pasa en la sala pasa estando ahí.
      </p>
    </div>
  </section>
</template>

<script setup>

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
    titulo: "Si hay una próxima",
    texto: "Los que estuvieron se enteran antes que nadie.",
  },
];

</script>
