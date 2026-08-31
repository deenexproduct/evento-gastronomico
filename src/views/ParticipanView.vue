<!--
  Quiénes son parte · el tablero de rubros con qué trae cada uno, y la
  invitación abierta para los que faltan. La barra de logos va arriba de
  todo: es la prueba que se lee sin leer.
-->
<template>
  <div>
    <CabeceraVista rotulo="Los sponsors" titulo="Quiénes son parte">
      <template #bajada>
        Un solo lugar por rubro. Ninguno viene a poner el logo y nada más:
        cada uno llega con quién habla, qué se prueba o qué se come.
      </template>
    </CabeceraVista>

    <BarraPartners />
    <BrandsSection />
    <SumarseSection class="bg-noche-3" />
    <SiguienteBloque />
  </div>
</template>

<script setup>
import CabeceraVista from "@/components/layout/CabeceraVista.vue";
import SiguienteBloque from "@/components/layout/SiguienteBloque.vue";
import BarraPartners from "@/components/sections/BarraPartners.vue";
import BrandsSection from "@/components/sections/BrandsSection.vue";
import SumarseSection from "@/components/sections/SumarseSection.vue";
</script>
