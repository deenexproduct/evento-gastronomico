<!--
  Sala de prensa · la vista que se le manda a un medio.

  No está en la cabecera ni en BLOQUES a propósito: el que viene a reservar no
  necesita esto, y sumarla al recorrido de cuatro bloques le agregaría una
  pestaña que no le habla. Se llega por el link de la invitación de prensa y
  desde la tarjeta «Prensa» de #sumarse.

  El programa y los oradores son las mismas secciones de la home, no una copia:
  un segundo programa que mantener es como se desincronizan los datos acá.
-->
<template>
  <div>
    <CabeceraVista rotulo="Para medios" titulo="Sala de prensa">
      <template #bajada>
        Todo lo necesario para cubrir la jornada: el programa hora por hora, quiénes hablan, cuándo
        conviene grabar, cómo se acredita y una gacetilla lista para publicar.
      </template>
    </CabeceraVista>

    <PrensaSection />

    <JornadaSection class="bg-noche-3" />

    <SpeakersSection v-if="haySpeakers" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import CabeceraVista from "@/components/layout/CabeceraVista.vue";
import JornadaSection from "@/components/sections/JornadaSection.vue";
import PrensaSection from "@/components/sections/PrensaSection.vue";
import SpeakersSection from "@/components/sections/SpeakersSection.vue";
import { MINIMO_SPEAKERS, SPEAKERS } from "@/data/evento";

// La misma condición que la home: una sección «quiénes hablan» con dos nombres
// dice que hay dos.
const haySpeakers = computed(() => SPEAKERS.length >= MINIMO_SPEAKERS);
</script>
