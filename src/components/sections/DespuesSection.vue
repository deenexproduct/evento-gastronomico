<template>
  <!--
    Qué queda después del 20/9. Lo que se lleva el que fue, dicho antes de
    que decida ir.
  -->
  <section id="despues" class="py-seccion">
    <div class="contenedor">
      <div class="grid gap-4">
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

</script>
