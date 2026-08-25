<template>
  <!--
    El brief es explícito: el evento compra autoridad, y "la gente sigue a
    Alan, no a Deenex". Hasta acá aparecía solo como atribución de tres
    bloques. Para un público de dueños, la credibilidad viene de la persona.
  -->
  <section id="alan" class="bg-noche-2 py-seccion">
    <div class="contenedor">
      <div class="grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-14">
        <!-- Retrato -->
        <div class="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
          <FotoSlot
            :src="foto"
            alt="Alan Tapia, founder y CEO de Deenex"
            etiqueta="Foto de Alan Tapia"
            posicion="object-top"
          />
          <span
            class="absolute left-4 top-4 rounded-full bg-acento-boton px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-white"
          >
            3 de los 7 bloques
          </span>
        </div>

        <div>
          <!--
            Sin rótulo a propósito: el capítulo ya lo abrió "Quién está detrás"
            una sección más arriba. Con un segundo cartel, el lector cree que
            arrancó otra cosa y el capítulo se parte al medio.
          -->
          <h2 class="titulo mt-4 text-[clamp(2.2rem,6vw,3.8rem)]">Alan Tapia</h2>
          <p class="mt-2 text-[14px] font-black uppercase tracking-[0.12em] text-gris">
            Founder &amp; CEO de Deenex
          </p>

          <p
            class="mt-8 border-l-2 border-acento pl-6 text-[clamp(1.1rem,2.4vw,1.5rem)] font-bold leading-[1.35]"
          >
            “Me cansé de ver dueños tomando decisiones de tecnología a ciegas.
            <span class="text-acento-texto">Armé el evento que me hubiera servido tener.</span>”
          </p>

          <p class="lectura mt-7 text-[17px] leading-[1.6] text-gris">
            Fundó Deenex, la plataforma omnicanal con la que hoy trabajan más de 350 marcas de
            foodservice y gastronomía. Pasa el día hablando con dueños de cadenas y escuchando el
            mismo problema en cada uno: decisiones grandes tomadas con información que nadie mira.
          </p>

          <p class="lectura mt-4 text-[17px] leading-[1.6] text-gris">
            En GastroTech abre la jornada, presenta a cada orador, modera la mesa redonda de cierre
            y da tres de los siete bloques.
          </p>

          <ul class="mt-9 grid gap-px bg-white/10 sm:grid-cols-3">
            <li v-for="b in BLOQUES" :key="b" class="flex gap-3 bg-noche-2 py-4 text-[15px] leading-snug">
              <span class="shrink-0 font-black text-acento-texto">—</span>
              {{ b }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import FotoSlot from "@/components/ui/FotoSlot.vue";

const archivos = import.meta.glob("@/assets/images/speakers/*", { eager: true, import: "default" });
const foto = computed(() => {
  const clave = Object.keys(archivos).find((k) => k.endsWith("/alan-tapia.jpg"));
  return clave ? archivos[clave] : "";
});

const BLOQUES = [
  "El nuevo mercado gastronómico",
  "Datos e inteligencia artificial en tu negocio",
  "Cómo se arma un ecosistema",
];
</script>
