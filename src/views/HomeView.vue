<template>
  <!-- pb: deja aire para que la barra fija no tape el pie -->
  <div class="pb-[76px]">
    <a href="#contenido" class="saltar">Saltar al contenido</a>
    <Navbar />

    <main id="contenido">
      <!-- ATENCIÓN: qué es, cuándo y para quién -->
      <HeroSection />

      <!-- MARCO: por qué este momento -->
      <ManifestoSection class="v-reveal" />

      <!-- INTERÉS: de qué se habla, quién lo dice, dónde pasa -->
      <TemasSection class="v-reveal" />
      <SpeakersSection class="v-reveal" />
      <SalonSection class="v-reveal" />

      <!-- DESEO: cómo es el día y qué te llevás -->
      <AgendaSection class="v-reveal" />
      <MesaRedondaSection class="v-reveal" />

      <!-- ACCIÓN: urgencia y formulario, a mitad de página -->
      <QuieroIrBanner />
      <RegistroSection />

      <!-- REFUERZO: para el que todavía duda -->
      <ParaQuienSection class="v-reveal" />
      <BrandsSection class="v-reveal" />
      <EntradaLlaveSection class="v-reveal" />
      <LocationSection class="v-reveal" />
      <FAQSection class="v-reveal" />

      <!-- BALANCE: todo lo que se lleva, en concreto -->
      <VolvesConSection class="v-reveal" />
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
import TemasSection from "@/components/sections/TemasSection.vue";
import SpeakersSection from "@/components/sections/SpeakersSection.vue";
import SalonSection from "@/components/sections/SalonSection.vue";
import AgendaSection from "@/components/sections/AgendaSection.vue";
import MesaRedondaSection from "@/components/sections/MesaRedondaSection.vue";
import QuieroIrBanner from "@/components/sections/QuieroIrBanner.vue";
import RegistroSection from "@/components/sections/RegistroSection.vue";
import ManifestoSection from "@/components/sections/ManifestoSection.vue";
import ParaQuienSection from "@/components/sections/ParaQuienSection.vue";
import BrandsSection from "@/components/sections/BrandsSection.vue";
import EntradaLlaveSection from "@/components/sections/EntradaLlaveSection.vue";
import LocationSection from "@/components/sections/LocationSection.vue";
import FAQSection from "@/components/sections/FAQSection.vue";
import VolvesConSection from "@/components/sections/VolvesConSection.vue";
import FinalCTASection from "@/components/sections/FinalCTASection.vue";

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("v-reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".v-reveal").forEach((el) => observer.observe(el));
});

onUnmounted(() => observer?.disconnect());
</script>
