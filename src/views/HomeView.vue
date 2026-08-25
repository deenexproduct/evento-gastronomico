<template>
  <!--
    Orden y ritmo del referente (fooddeliveryday.com.ar):
    hero → qué es → quién organiza → la jornada → acceso → registro →
    partners → prueba → lugar → preguntas → pie. La alternancia de los tres
    negros es lo que le da profundidad sección a sección, sin un solo borde.
  -->
  <div class="pb-[80px]">
    <a href="#contenido" class="saltar">Saltar al contenido</a>
    <Navbar />

    <!-- tabindex -1: sin esto el link de salto mueve la página pero no el
         foco, y el siguiente Tab vuelve al menú que se quería saltear. -->
    <main id="contenido" tabindex="-1" class="focus:outline-none">
      <!-- Hero · fondo base -->
      <HeroSection />

      <!-- Barra de partners: prueba social apenas termina el hero -->
      <BarraPartners />

      <!-- Qué es: responde la primera pregunta del que llega de un anuncio -->
      <QueEsSection class="v-reveal" />

      <!-- Reels verticales: se activa sola cuando haya videos cargados -->
      <ReelsSection class="v-reveal" />

      <!-- Quién lo organiza: el brief dice que se sigue a la persona -->
      <AlanSection class="v-reveal" />

      <!-- El programa completo, con las horas como sistema -->
      <JornadaSection class="v-reveal bg-noche" />

      <!-- Asegurá tu lugar · negro profundo -->
      <AccesoSection class="v-reveal" />


      <!-- Con qué volvés al local -->
      <ElLunesSection class="v-reveal bg-noche-2" />

      <!-- Quiénes ya confirmaron: empuja al formulario que viene abajo -->
      <AnotadasSection class="v-reveal" />

      <!-- Registro -->
      <RegistroSection />

      <!-- Partners · negro profundo -->
      <BrandsSection class="v-reveal bg-noche-3" />

      <!-- Quién organiza + logos -->
      <PruebaSection class="v-reveal" />

      <!-- Dónde es -->
      <LocationSection class="v-reveal bg-noche-2" />


      <!-- Qué pasa si no podés venir y qué queda después -->
      <DespuesSection class="v-reveal bg-noche" />

      <!-- Captura secundaria, para el que llegó hasta acá y no se registró -->
      <AvisameSection class="v-reveal" />

      <!-- Preguntas -->
      <FAQSection class="v-reveal bg-noche" />

      <!-- Partners y prensa: los otros dos públicos, al final -->
      <SumarseSection class="v-reveal" />

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
import BarraPartners from "@/components/sections/BarraPartners.vue";
import QueEsSection from "@/components/sections/QueEsSection.vue";
import AlanSection from "@/components/sections/AlanSection.vue";
import ReelsSection from "@/components/sections/ReelsSection.vue";
import JornadaSection from "@/components/sections/JornadaSection.vue";
import AccesoSection from "@/components/sections/AccesoSection.vue";
import ElLunesSection from "@/components/sections/ElLunesSection.vue";
import AnotadasSection from "@/components/sections/AnotadasSection.vue";
import RegistroSection from "@/components/sections/RegistroSection.vue";
import AvisameSection from "@/components/sections/AvisameSection.vue";
import DespuesSection from "@/components/sections/DespuesSection.vue";
import SumarseSection from "@/components/sections/SumarseSection.vue";
import BrandsSection from "@/components/sections/BrandsSection.vue";
import PruebaSection from "@/components/sections/PruebaSection.vue";
import LocationSection from "@/components/sections/LocationSection.vue";
import FAQSection from "@/components/sections/FAQSection.vue";

let observer = null;
let respaldo = null;

function revelarTodo() {
  document.querySelectorAll(".v-reveal").forEach((el) => el.classList.add("v-reveal-visible"));
}

onMounted(() => {
  const objetivos = [...document.querySelectorAll(".v-reveal")];

  // Sin soporte de IntersectionObserver, el contenido se muestra y listo.
  if (!("IntersectionObserver" in window)) {
    revelarTodo();
    return;
  }

  // Recién acá se habilita el estado oculto: si el script no llegó hasta
  // este punto, el CSS nunca esconde nada.
  document.documentElement.classList.add("reveal-listo");

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
  objetivos.forEach((el) => observer.observe(el));

  // Red de seguridad: si en dos segundos algo no se reveló —observer que no
  // dispara, pestaña en segundo plano, motor sin composición—, se muestra
  // igual. Nunca se deja contenido invisible.
  respaldo = setTimeout(revelarTodo, 2000);
});

onUnmounted(() => {
  observer?.disconnect();
  if (respaldo) clearTimeout(respaldo);
});
</script>
