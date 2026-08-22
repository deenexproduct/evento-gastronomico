<template>
  <!--
    Orden y ritmo del referente (fooddeliveryday.com.ar):
    hero → oradores → acceso → cuenta regresiva → partners → prueba →
    comunidad → pie. La alternancia de los tres negros es lo que le da
    profundidad sección a sección, sin un solo borde.
  -->
  <div class="pb-[80px]">
    <a href="#contenido" class="saltar">Saltar al contenido</a>
    <Navbar />

    <main id="contenido">
      <!-- Hero · fondo base -->
      <HeroSection />

      <!-- Quiénes van a estar · negro medio -->
      <OradoresSection class="v-reveal bg-noche-2" />

      <!-- El programa completo, con las horas como sistema -->
      <JornadaSection class="v-reveal bg-noche" />

      <!-- Asegurá tu lugar · negro profundo -->
      <AccesoSection class="v-reveal" />

      <!-- Cuenta regresiva -->
      <CuentaSection class="v-reveal" />

      <!-- Sí, es domingo · la objeción, antes de pedir nada -->
      <DomingoSection class="v-reveal" />

      <!-- Con qué volvés al local -->
      <ElLunesSection class="v-reveal bg-noche-2" />

      <!-- Registro -->
      <RegistroSection />

      <!-- Partners · negro profundo -->
      <BrandsSection class="v-reveal bg-noche-3" />

      <!-- Quién organiza + logos -->
      <PruebaSection class="v-reveal" />

      <!-- Dónde es -->
      <LocationSection class="v-reveal bg-noche-2" />

      <!-- Para quién es y preguntas -->
      <ParaQuienSection class="v-reveal bg-noche" />
      <FAQSection class="v-reveal bg-noche-2" />

      <!-- Cierre -->
      <FinalCTASection class="v-reveal bg-noche-3" />
    </main>

    <Footer />
    <BarraFija />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import BarraFija from "@/components/layout/BarraFija.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import OradoresSection from "@/components/sections/OradoresSection.vue";
import JornadaSection from "@/components/sections/JornadaSection.vue";
import AccesoSection from "@/components/sections/AccesoSection.vue";
import CuentaSection from "@/components/sections/CuentaSection.vue";
import DomingoSection from "@/components/sections/DomingoSection.vue";
import ElLunesSection from "@/components/sections/ElLunesSection.vue";
import RegistroSection from "@/components/sections/RegistroSection.vue";
import BrandsSection from "@/components/sections/BrandsSection.vue";
import PruebaSection from "@/components/sections/PruebaSection.vue";
import LocationSection from "@/components/sections/LocationSection.vue";
import ParaQuienSection from "@/components/sections/ParaQuienSection.vue";
import FAQSection from "@/components/sections/FAQSection.vue";
import FinalCTASection from "@/components/sections/FinalCTASection.vue";

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("v-reveal-visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.04, rootMargin: "0px 0px -30px 0px" }
  );
  document.querySelectorAll(".v-reveal").forEach((el) => observer.observe(el));
});

onUnmounted(() => observer?.disconnect());
</script>
