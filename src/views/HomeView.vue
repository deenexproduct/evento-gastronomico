<!--
  La home es el resumen ejecutivo de la jornada.

  Se lee de un scroll corto y contesta cuatro cosas: qué es, quiénes vienen,
  qué pasa ese día y cómo entrar. El detalle de cada bloque vive en su propia
  vista, a la que se llega desde la cabecera o desde las tarjetas de acá
  abajo — así el que ya decidió no tiene que atravesar cinco secciones para
  llegar al botón, y el que quiere profundizar entra por donde le importa.

  La jornada se queda acá y no se va a una vista: es el corazón del resumen.
  Lo que se viene a hacer ese día ES el programa; sacarlo dejaría una home
  que habla del evento sin mostrarlo nunca.

  Dos botones en toda la página, y ninguno repetido: el del hero y el del
  cierre. La barra flotante los acompaña sólo mientras hay scroll por
  delante.
-->
<template>
  <div>
    <!-- ── Qué es ─────────────────────────────────────────────────── -->

    <!-- Hero · transparente a propósito: se ve el fondo del body -->
    <HeroSection />

    <!-- Los logos apenas termina el hero: la prueba que se lee sin leer, y
         lo único que impide que el hero transparente se funda con lo que
         sigue. -->
    <BarraPartners />

    <!--
      Qué es Sabores Tech, acá y no detrás de una tarjeta.

      Es la misma sección que sirve la vista /que-es, no una copia: un segundo
      texto que mantener es como se desincronizan los datos en este repo.
    -->
    <QueEsSection class="v-reveal" />

    <!-- ── Qué pasa ese día ──────────────────────────────────────── -->

    <JornadaSection class="v-reveal bg-noche-3" />

    <!--
      El podcast, después de la jornada: primero el lector sabe qué se habla
      en el escenario, y recién entonces que además hay algo fuera de la
      grilla. Con sección propia porque es lo único del día que no le pasa a
      todo el mundo.
    -->
    <PodcastSection class="v-reveal bg-noche-2" />

    <!--
      Dónde y a qué hora, antes del pedido de reserva: no se le puede pedir el
      sí a alguien que todavía no sabe dónde queda.
    -->
    <DondeSection class="v-reveal" />

    <!-- ── Cómo entrar ───────────────────────────────────────────── -->

    <RegistroSection />

    <!-- ── Para el que quiere más ────────────────────────────────── -->

    <BloquesResumen class="v-reveal bg-noche-3" />

    <!--
      Los otros dos públicos, después del pedido de reserva: el que entra a
      reservar no tiene que atravesar una oferta que no es para él.
    -->
    <SumarseSection />

    <!-- Las preguntas cierran el recorrido -->
    <FAQSection class="v-reveal bg-noche" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import QueEsSection from "@/components/sections/QueEsSection.vue";
import PodcastSection from "@/components/sections/PodcastSection.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import BarraPartners from "@/components/sections/BarraPartners.vue";
import JornadaSection from "@/components/sections/JornadaSection.vue";
import BloquesResumen from "@/components/sections/BloquesResumen.vue";
import RegistroSection from "@/components/sections/RegistroSection.vue";
import SumarseSection from "@/components/sections/SumarseSection.vue";
import FAQSection from "@/components/sections/FAQSection.vue";
import DondeSection from "@/components/sections/DondeSection.vue";

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
