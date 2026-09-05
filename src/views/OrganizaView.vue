<!--
  Quién organiza · Deenex y por qué abrimos este espacio. Es la credencial,
  y va con las marcas del ecosistema, que son la prueba de la credencial.
  Las marcas del ecosistema ya vienen dentro de PruebaSection. El video se
  dibuja solo cuando haya alguno cargado.
-->
<template>
  <div>
    <CabeceraVista rotulo="El organizador" titulo="Quién organiza">
      <template #bajada>
        Sabores Tech lo organiza Deenex. En tres años trabajando con dueños de
        cadenas apareció siempre la misma escena, y este día es la respuesta.
      </template>
    </CabeceraVista>

    <PruebaSection :encabezado="false" />
    <ReelsSection class="bg-noche-3" />
    <SiguienteBloque />
  </div>
</template>

<script setup>
import CabeceraVista from "@/components/layout/CabeceraVista.vue";
import SiguienteBloque from "@/components/layout/SiguienteBloque.vue";
import PruebaSection from "@/components/sections/PruebaSection.vue";
import ReelsSection from "@/components/sections/ReelsSection.vue";
</script>
