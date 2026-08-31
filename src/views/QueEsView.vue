<!--
  Qué es · el bloque que responde la primera pregunta del que llega de un
  anuncio. Va con el lugar y las preguntas frecuentes porque las tres cosas
  responden lo mismo desde ángulos distintos: qué es esto, dónde pasa y qué
  me van a querer vender.
-->
<template>
  <div>
    <CabeceraVista rotulo="El evento" titulo="Qué es GastroTech">
      <template #bajada>
        Un día de tendencias e innovación para dueños de cadenas gastronómicas.
        Track único, once bloques y doscientas personas que deciden.
      </template>
    </CabeceraVista>

    <QueEsSection />
    <LocationSection class="bg-noche-3" />

    <SiguienteBloque />
  </div>
</template>

<script setup>
import CabeceraVista from "@/components/layout/CabeceraVista.vue";
import SiguienteBloque from "@/components/layout/SiguienteBloque.vue";
import QueEsSection from "@/components/sections/QueEsSection.vue";
import LocationSection from "@/components/sections/LocationSection.vue";
</script>
