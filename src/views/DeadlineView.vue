<!--
  Deadline · el cupo, quiénes ya se anotaron y la reserva, juntos.
  La escasez se gasta pegada al pedido: acá el que entra ya viene decidido o
  a un paso, así que el recorrido es corto y termina en el botón.
-->
<template>
  <div>
    <CabeceraVista rotulo="El cupo" titulo="Hasta cuándo hay lugar">
      <template #bajada>
        La fecha no se mueve y los lugares no se estiran. Reservar temprano
        es lo único que asegura entrar.
      </template>
    </CabeceraVista>

    <AnotadasSection />
    <AccesoSection />

    <RegistroSection />
    <SiguienteBloque />
  </div>
</template>

<script setup>
import CabeceraVista from "@/components/layout/CabeceraVista.vue";
import SiguienteBloque from "@/components/layout/SiguienteBloque.vue";
import AnotadasSection from "@/components/sections/AnotadasSection.vue";
import AccesoSection from "@/components/sections/AccesoSection.vue";
import RegistroSection from "@/components/sections/RegistroSection.vue";
</script>
