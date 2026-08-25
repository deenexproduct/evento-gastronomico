<template>
  <!--
    En el referente, este lugar lo ocupa "Así fue la primera edición" con sus
    1.400 asistentes. Como esta es la edición 01, va la única prueba social
    verificable que hay: el volumen de Deenex y las marcas que ya trabajan
    con la plataforma. Misma estructura de tres columnas.
  -->
  <section id="detras" class="py-seccion">
    <div class="contenedor">
      <p class="rotulo text-acento-texto">Quién está detrás</p>
      <h2 class="titulo mt-4 max-w-[22ch] text-[clamp(2rem,6vw,3.5rem)]">
        Deenex organiza el evento que le venían pidiendo.
      </h2>
      <p class="lectura mt-5 text-[17px] text-gris">
        Deenex es la plataforma con la que trabajan todos los días las marcas de acá abajo. En tres
        años escuchando a dueños de cadenas apareció siempre la misma escena: decisiones grandes
        tomadas con información que nadie mira, y nadie con quién contrastarlas.
      </p>
      <p class="lectura mt-4 text-[17px] text-gris">
        GastroTech es la respuesta a eso, y por eso no se cobra la entrada: el valor está en quién
        se sienta en la sala.
      </p>

      <div ref="grilla" class="mt-12 grid gap-4 sm:grid-cols-3">
        <div v-for="d in DATOS" :key="d.label" class="tarjeta p-7">
          <p class="text-[3.4rem] font-black leading-none tracking-[-0.04em] text-acento-texto">
            <span v-if="d.prefijo">{{ d.prefijo }}</span>{{ contados[d.label] }}
          </p>
          <p class="mt-4 text-[14px] font-black uppercase tracking-[0.1em]">{{ d.label }}</p>
          <p class="mt-2.5 text-[15px] leading-[1.45] text-gris">{{ d.detalle }}</p>
        </div>
      </div>

      <!-- Logos -->
      <p class="mt-16 text-[13px] font-black uppercase tracking-[0.16em] text-gris-2">
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
import { reactive, ref, onMounted, onUnmounted } from "vue";
import { MARCAS_LOGOS } from "@/data/evento";

const DATOS = [
  {
    prefijo: "+",
    cifra: 350,
    label: "marcas en la plataforma",
    detalle: "Cadenas de foodservice y gastronomía que trabajan con la plataforma.",
  },
  {
    cifra: 7,
    label: "bloques en la jornada",
    detalle: "Cinco charlas, una demo en vivo y la mesa redonda de cierre, en un solo track.",
  },
  {
    cifra: 200,
    label: "lugares, no más",
    detalle: "El cupo es la capacidad real del salón. No hay sillas extra.",
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
