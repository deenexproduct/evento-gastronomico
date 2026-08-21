<template>
  <div>
    <Navbar />
    <main>
      <HeroSection />
      <ValuePropSection class="v-reveal" />
      <ManifestoSection class="v-reveal" />
      <EntradaLlaveSection class="v-reveal" />
      <AgendaSection class="v-reveal" />
      <SpeakersSection class="v-reveal" />
      <MesaRedondaSection class="v-reveal" />
      <QuieroIrBanner class="v-reveal" />
      <ParaQuienSection class="v-reveal" />
      <BrandsSection class="v-reveal" />
      <LocationSection class="v-reveal" />
      <RegistroSection class="v-reveal" />
      <FAQSection class="v-reveal" />
      <FinalCTASection class="v-reveal" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import ValuePropSection from "@/components/sections/ValuePropSection.vue";
import ManifestoSection from "@/components/sections/ManifestoSection.vue";
import EntradaLlaveSection from "@/components/sections/EntradaLlaveSection.vue";
import AgendaSection from "@/components/sections/AgendaSection.vue";
import SpeakersSection from "@/components/sections/SpeakersSection.vue";
import MesaRedondaSection from "@/components/sections/MesaRedondaSection.vue";
import QuieroIrBanner from "@/components/sections/QuieroIrBanner.vue";
import ParaQuienSection from "@/components/sections/ParaQuienSection.vue";
import BrandsSection from "@/components/sections/BrandsSection.vue";
import LocationSection from "@/components/sections/LocationSection.vue";
import RegistroSection from "@/components/sections/RegistroSection.vue";
import FAQSection from "@/components/sections/FAQSection.vue";
import FinalCTASection from "@/components/sections/FinalCTASection.vue";

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("v-reveal-visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document.querySelectorAll(".v-reveal").forEach((el) => observer.observe(el));
});
</script>
