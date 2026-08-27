<template>
  <!--
    El recorrido: se cuenta qué pasa ese día, se muestra quién lo hace posible,
    y recién ahí se pide el contacto. Toda la prueba —los partners, la empresa
    y la persona— quedó del lado de ARRIBA del pedido: antes el que decidía
    dar su WhatsApp lo hacía sin haber visto un logo ni el nombre de un orador.

    La alternancia de los tres fondos es lo único que separa una sección de la
    siguiente: no hay bordes. Dos secciones seguidas con el mismo fondo se leen
    como una sola, así que al mover una hay que revisar sus dos vecinas —y
    contar también las dos que hoy no se dibujan por tener su array vacío.
  -->
  <div>
    <a href="#contenido" class="saltar">Saltar al contenido</a>
    <Navbar />

    <!-- tabindex -1: sin esto el link de salto mueve la página pero no el
         foco, y el siguiente Tab vuelve al menú que se quería saltear. -->
    <main id="contenido" tabindex="-1" class="focus:outline-none">
      <!-- ── Qué pasa ese día ──────────────────────────────────────── -->

      <!-- Hero · transparente a propósito: lo que se ve es el fondo del body -->
      <HeroSection />

      <!-- Los partners apenas termina el hero. Además es lo único que impide
           que el hero transparente se funda con la sección siguiente. -->
      <BarraPartners />

      <!-- Qué es: responde la primera pregunta del que llega de un anuncio -->
      <QueEsSection class="v-reveal" />

      <!-- Del "qué es" se pasa derecho al programa, sin escala. -->
      <JornadaSection class="v-reveal bg-noche-3" />

      <!-- Con qué volvés, pegado al programa que lo produce -->
      <ElLunesSection class="v-reveal bg-noche-2" />

      <!-- ── Quién lo hace posible ─────────────────────────────────── -->

      <!-- Los partners y qué trae cada uno -->
      <BrandsSection class="v-reveal bg-noche-3" />

      <!-- Quién está detrás: la empresa abre el capítulo… -->
      <PruebaSection class="v-reveal bg-noche-2" />

      <!-- …el video se activa solo cuando haya alguno cargado… -->
      <ReelsSection class="v-reveal bg-noche-3" />

      <!-- …y la persona lo cierra. Los tres son un solo capítulo: van pegados
           y enmarcados por dos secciones más oscuras. -->
      <AlanSection class="v-reveal" />

      <!-- ── Cómo entrar ───────────────────────────────────────────── -->

      <!-- La escasez se gasta pegada al pedido, no a mitad de la explicación -->
      <AccesoSection class="v-reveal" />

      <!-- Quiénes ya confirmaron: último escalón antes de reservar -->
      <AnotadasSection class="v-reveal" />

      <!--
        Las preguntas ANTES del pedido.

        Estaban cinco pantallas debajo del único botón que reserva, y son
        objeciones: "es domingo y trabajo", "¿me van a querer vender algo?",
        "tengo un solo local, ¿me sirve?". El que dudaba llegaba al botón sin
        haberlas leído, no reservaba, y las respuestas que lo habrían
        convencido quedaban del lado equivocado de la decisión.

        Cuesta demora: el botón se corre. Es la única contra y está medida
        abajo, en el commit. La cuenta que la justifica es que el porcentaje
        es un proxy y las objeciones contestadas no.
      -->
      <FAQSection class="v-reveal bg-noche" />

      <!-- La reserva, con toda la prueba y las preguntas ya leídas -->
      <RegistroSection />

      <!-- Dónde es -->
      <LocationSection class="v-reveal bg-noche-3" />

      <!-- Qué pasa si no podés venir y qué queda después -->
      <DespuesSection class="v-reveal bg-noche-2" />

      <!-- Captura secundaria, para el que llegó hasta acá y no reservó -->
      <AvisameSection class="v-reveal" />

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
