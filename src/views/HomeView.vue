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
    <!-- ── Qué pasa ese día ──────────────────────────────────────── -->

    <!-- Hero · transparente a propósito: se ve el fondo del body -->
    <HeroSection />

    <!-- Los logos apenas termina el hero: la prueba que se lee sin leer, y
         lo único que impide que el hero transparente se funda con lo que
         sigue. -->
    <BarraPartners />

    <!-- El programa, que es lo que se viene a escuchar -->
    <JornadaSection class="v-reveal bg-noche-3" />

    <!-- ── Dónde está el detalle ─────────────────────────────────── -->

    <BloquesResumen class="v-reveal bg-noche-2" />

    <!-- ── Cómo entrar ───────────────────────────────────────────── -->


    <!-- La reserva, con la prueba ya leída -->
    <RegistroSection />

    <!-- Los otros dos públicos, después del pedido de reserva: el que entra a
         reservar no tiene que atravesar una oferta que no es para él. -->
    <SumarseSection class="v-reveal bg-noche-3" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import BarraPartners from "@/components/sections/BarraPartners.vue";
import JornadaSection from "@/components/sections/JornadaSection.vue";
import BloquesResumen from "@/components/sections/BloquesResumen.vue";
import RegistroSection from "@/components/sections/RegistroSection.vue";
import SumarseSection from "@/components/sections/SumarseSection.vue";

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
