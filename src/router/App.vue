<!--
  El armazón de todas las vistas.

  Navbar y Footer viven acá y no dentro de cada vista: antes estaban en
  HomeView, que era la única página. Con cinco vistas más, repetirlos en
  cada una es la forma segura de que deriven entre sí.

  La barra flotante de reserva sólo se dibuja en la home. En las vistas
  internas ya está el botón de la cabecera, que es fijo: con las dos, quedan
  dos píldoras magenta iguales en pantalla al mismo tiempo.
-->
<template>
  <div class="relative min-h-screen">
    <a href="#contenido" class="saltar">Saltar al contenido</a>
    <Navbar />

    <!-- tabindex -1: sin esto el link de salto mueve la página pero no el
         foco, y el siguiente Tab vuelve al menú que se quería saltear. -->
    <main id="contenido" tabindex="-1" class="focus:outline-none">
      <RouterView />
    </main>

    <Footer />
    <BarraFija v-if="esHome" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import BarraFija from "@/components/layout/BarraFija.vue";

const ruta = useRoute();
const esHome = computed(() => ruta.path === "/");
</script>
