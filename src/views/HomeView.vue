<template>
  <div class="bg-ink">
    <Navbar />
    <main>
      <HeroSection />
      <Marquesina :items="MARQUESINA_1" />
      <DiagnosticoSection class="v-reveal" />
      <SalonSection class="v-reveal" />
      <ManifestoSection class="v-reveal" />
      <AgendaSection class="v-reveal" />
      <SpeakersSection class="v-reveal" />
      <MesaRedondaSection class="v-reveal" />
      <QuieroIrBanner />
      <ValuePropSection class="v-reveal" />
      <EntradaLlaveSection class="v-reveal" />
      <ParaQuienSection class="v-reveal" />
      <BrandsSection class="v-reveal" />
      <Marquesina :items="MARQUESINA_2" oscuro rapida />
      <RegistroSection />
      <LocationSection class="v-reveal" />
      <FAQSection class="v-reveal" />
      <FinalCTASection class="v-reveal" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import Marquesina from "@/components/ui/Marquesina.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import DiagnosticoSection from "@/components/sections/DiagnosticoSection.vue";
import SalonSection from "@/components/sections/SalonSection.vue";
import ManifestoSection from "@/components/sections/ManifestoSection.vue";
import AgendaSection from "@/components/sections/AgendaSection.vue";
import SpeakersSection from "@/components/sections/SpeakersSection.vue";
import MesaRedondaSection from "@/components/sections/MesaRedondaSection.vue";
import QuieroIrBanner from "@/components/sections/QuieroIrBanner.vue";
import ValuePropSection from "@/components/sections/ValuePropSection.vue";
import EntradaLlaveSection from "@/components/sections/EntradaLlaveSection.vue";
import ParaQuienSection from "@/components/sections/ParaQuienSection.vue";
import BrandsSection from "@/components/sections/BrandsSection.vue";
import RegistroSection from "@/components/sections/RegistroSection.vue";
import LocationSection from "@/components/sections/LocationSection.vue";
import FAQSection from "@/components/sections/FAQSection.vue";
import FinalCTASection from "@/components/sections/FinalCTASection.vue";

const MARQUESINA_1 = [
  "Diagnóstico para todos",
  "200 lugares",
  "Entrada gratuita",
  "Innovación",
  "Tecnología",
  "Marketing",
  "Córdoba 20.09",
];

const MARQUESINA_2 = [
  "Sin registro no hay ingreso",
  "El cupo es el del salón",
  "20 de septiembre",
  "Hotel Quinto Centenario",
];

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
    { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".v-reveal").forEach((el) => observer.observe(el));
});

onUnmounted(() => observer?.disconnect());
</script>
