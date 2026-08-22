<template>
  <div class="pb-[80px]">
    <a href="#contenido" class="saltar">Saltar al contenido</a>
    <Navbar />

    <main id="contenido">
      <!-- 1 · Cierra solo: fecha, hora, sede, precio y CTA en un viewport -->
      <HeroSection />

      <!-- 2 · Grilla de tarjetas: el recurso central del referente -->
      <OradoresSection class="v-reveal" />

      <!-- 3 · El día en un vistazo, por densidad de valor y no por asistentes -->
      <BentoSection class="v-reveal" />

      <!-- 3 · Con qué volvés al local el lunes -->
      <ElLunesSection class="v-reveal" />

      <!-- 4 · La objeción de frente, antes de pedir nada -->
      <DomingoSection class="v-reveal" />

      <!-- 5 · El corazón visual: el día contado con las horas -->
      <JornadaSection class="v-reveal" />

      <!-- 6 · Registro, después de la prueba de valor -->
      <RegistroSection />

      <!-- 7 · Dónde es y cómo llego -->
      <LocationSection class="v-reveal" />

      <!-- 8 · Para quién es y para quién no + preguntas -->
      <ParaQuienSection class="v-reveal" />
      <FAQSection class="v-reveal" />

      <!-- 9 · Partners, subordinado y con CTA propio -->
      <BrandsSection class="v-reveal" />

      <!-- 10 · Cierre -->
      <FinalCTASection class="v-reveal" />
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
import BentoSection from "@/components/sections/BentoSection.vue";
import ElLunesSection from "@/components/sections/ElLunesSection.vue";
import DomingoSection from "@/components/sections/DomingoSection.vue";
import JornadaSection from "@/components/sections/JornadaSection.vue";
import RegistroSection from "@/components/sections/RegistroSection.vue";
import LocationSection from "@/components/sections/LocationSection.vue";
import ParaQuienSection from "@/components/sections/ParaQuienSection.vue";
import FAQSection from "@/components/sections/FAQSection.vue";
import BrandsSection from "@/components/sections/BrandsSection.vue";
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
