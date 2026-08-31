<!--
  Beneficios · con qué se vuelve el lunes. Va solo: es una lista de seis y
  meterle otra sección al lado la diluye. El que llega acá ya sabe qué es el
  evento y está midiendo si le conviene el domingo.
-->
<template>
  <div>
    <CabeceraVista rotulo="Los beneficios" titulo="Con qué te volvés el lunes">
      <template #bajada>
        Seis cosas concretas, todas producidas por el programa del día. Ninguna
        depende de que hables con alguien en particular.
      </template>
    </CabeceraVista>

    <ElLunesSection :encabezado="false" />
    <SiguienteBloque />
  </div>
</template>

<script setup>
import CabeceraVista from "@/components/layout/CabeceraVista.vue";
import SiguienteBloque from "@/components/layout/SiguienteBloque.vue";
import ElLunesSection from "@/components/sections/ElLunesSection.vue";
</script>
