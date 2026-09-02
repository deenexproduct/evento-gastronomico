<template>
  <!--
    En el referente, este lugar lo ocupa "Así fue la primera edición" con sus
    1.400 asistentes. Como esta es la edición 01, va la única prueba social
    verificable que hay: el volumen de Deenex y las marcas que ya trabajan
    con la plataforma. Misma estructura de tres columnas.
  -->
  <section id="detras" class="border-b border-linea py-seccion">
    <div class="contenedor">
      <template v-if="encabezado">
      <p class="rotulo text-gris">Quién organiza</p>
      <h2 class="titulo mt-4 max-w-[22ch] text-[clamp(2rem,6vw,3.5rem)]">
        Las marcas nos venían pidiendo este día.
      </h2>
      </template>
      <p class="lectura mt-5 text-[17px] text-gris">
        GastroTech lo organiza <strong class="font-bold">Deenex</strong>, la plataforma
        omnicanal donde las marcas de acá abajo manejan todos los días sus canales de venta. Más de
        350 marcas de foodservice y gastronomía la usan para lo mismo: tener en un solo lugar lo
        que pasa en todos sus locales, en vez de armar el número a mano sucursal por sucursal.
      </p>
      <p class="lectura mt-4 text-[17px] text-gris">
        En tres años trabajando con dueños de cadenas apareció siempre la misma escena: decisiones
        grandes tomadas con información que nadie mira, y nadie con quién contrastarlas. GastroTech
        es la respuesta a eso, y por eso no se cobra la entrada: el valor está en quién se sienta
        en la sala.
      </p>

      <div ref="grilla" class="mt-12 grid gap-4 sm:grid-cols-2">
        <div v-for="d in DATOS" :key="d.label" class="tarjeta p-7">
          <p class="text-[3.4rem] font-extrabold leading-none tracking-[-0.04em] text-acento-texto">
            <span v-if="d.prefijo">{{ d.prefijo }}</span>{{ contados[d.label] }}
          </p>
          <p class="mt-4 text-[14px] font-semibold uppercase tracking-[0.1em]">{{ d.label }}</p>
          <p class="mt-2.5 text-[15px] leading-[1.45] text-gris">{{ d.detalle }}</p>
        </div>
      </div>

      <!-- Logos -->
      <!--
        Alan, acá y no en "qué es": esta es la sección que contesta quién está
        detrás, y tenerlo en dos lugares obligaba a mantener el mismo dato dos
        veces. Su nombre va en el violeta de marca — estaba en `text-papel`,
        que en fondo claro es blanco sobre blanco y lo dejaba invisible.
      -->
      <div class="tarjeta mt-12 p-7">
        <p class="text-[12px] font-semibold uppercase tracking-[0.12em] text-gris-2">
          Quién da la cara
        </p>
        <p class="mt-4 max-w-[62ch] text-[1.05rem] leading-[1.55]">
          <span class="texto-deenex font-bold">Alan Tapia</span>, CEO y co-fundador de Deenex,
          abre la jornada y comparte el escenario con otros empresarios del sector.
        </p>
        <p class="mt-3 max-w-[62ch] text-[15px] leading-[1.55] text-gris">
          La sostienen los que ya tomaron estas decisiones adentro de su propia operación, no
          consultores hablando de casos ajenos.
        </p>
      </div>

      <p class="mt-16 text-[13px] font-semibold uppercase tracking-[0.16em] text-gris-2">
        Marcas que trabajan con Deenex
      </p>
      <div class="mt-8 flex flex-wrap items-center gap-x-8 gap-y-6 sm:gap-x-10">
        <!--
          La caja reserva el espacio antes de que cargue el logo, así la página
          no salta. El alto va repetido en píxeles sobre la imagen y no como
          max-h-full: dentro de una grilla ese porcentaje no resuelve contra el
          área y los logos se salían de la caja a 132 px, cuatro veces su medida.
        -->
        <div
          v-for="logo in logos"
          :key="logo.src"
          class="grid h-7 w-[120px] place-items-center sm:h-9"
        >
          <img
            :src="logo.src"
            :alt="logo.alt"
            class="h-7 w-auto max-w-[120px] object-contain opacity-45 brightness-0 invert transition-opacity duration-200 hover:opacity-100 sm:h-9"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// La vista que la envuelve ya pone el titulo de la pagina: con los dos,
// el lector lee dos encabezados seguidos diciendo lo mismo.
defineProps({ encabezado: { type: Boolean, default: true } });

import { reactive, ref, onMounted, onUnmounted } from "vue";
import { MARCAS_LOGOS } from "@/data/evento";

/**
 * Las cifras son del ORGANIZADOR, no del evento.
 *
 * Eran tres y dos de ellas —7 bloques y 200 lugares— repetían datos que la
 * página ya da en #jornada y en #acceso. En una sección que se llama "quién
 * organiza", contar otra vez el evento es no contestar la pregunta.
 *
 * Quedan las dos de Deenex que están verificadas. Falta una tercera: pedirle
 * a Alan un número publicable (locales, ciudades, años de la empresa, lo que
 * quiera) y volver a sm:grid-cols-3.
 */
const DATOS = [
  {
    prefijo: "+",
    cifra: 350,
    label: "marcas en la plataforma",
    detalle: "Cadenas de foodservice y gastronomía que trabajan con Deenex todos los días.",
  },
  {
    cifra: 3,
    label: "años con dueños de cadenas",
    detalle: "Escuchando cómo deciden, con qué información y qué les falta para decidir mejor.",
  },
];

// Las tres cifras cuentan hacia arriba al entrar en pantalla. Solo cambia un
// número: sin transform ni layout, así que no cuesta render.
const grilla = ref(null);
const contados = reactive(Object.fromEntries(DATOS.map((d) => [d.label, 0])));
let observer = null;
let raf = null;
let respaldo = null;

/** Escribe el valor final sin animar. */
function mostrarFinal() {
  DATOS.forEach((d) => (contados[d.label] = d.cifra));
}

function contar() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    mostrarFinal();
    return;
  }
  const inicio = performance.now();
  const paso = (ahora) => {
    const t = Math.min((ahora - inicio) / 1400, 1);
    const e = 1 - Math.pow(1 - t, 3);
    DATOS.forEach((d) => (contados[d.label] = Math.round(d.cifra * e)));
    if (t < 1) raf = requestAnimationFrame(paso);
  };
  raf = requestAnimationFrame(paso);
}

onMounted(() => {
  if (!grilla.value) return;
  observer = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        contar();
        observer.disconnect();
        if (respaldo) clearTimeout(respaldo);
      }
    },
    { threshold: 0.15 }
  );
  observer.observe(grilla.value);

  // Red de seguridad. Escribe el valor final sin animar a propósito:
  // requestAnimationFrame no corre en una pestaña que no compone frames, así
  // que el respaldo no puede depender de él. Un contador trabado en cero
  // informa mal, que es peor que no animar.
  respaldo = setTimeout(mostrarFinal, 2000);
});

onUnmounted(() => {
  observer?.disconnect();
  if (raf) cancelAnimationFrame(raf);
  if (respaldo) clearTimeout(respaldo);
});

const archivos = import.meta.glob("@/assets/images/brands/*", { eager: true, import: "default" });
const logos = MARCAS_LOGOS.map((nombre) => {
  const clave = Object.keys(archivos).find((k) => k.endsWith(`/${nombre}`));
  return { src: clave ? archivos[clave] : "", alt: nombre.replace(/\.\w+$/, "").replace(/[-_]/g, " ") };
}).filter((l) => l.src);
</script>
