<template>
  <!--
    En el referente, este lugar lo ocupa "Así fue la primera edición" con sus
    1.400 asistentes. Como esta es la edición 01, va la única prueba social
    verificable que hay: el volumen de Deenex y las marcas que ya trabajan
    con la plataforma. Misma estructura de tres columnas.
  -->
  <section class="bg-noche py-seccion">
    <div class="contenedor">
      <p class="rotulo text-acento-texto">Quién organiza</p>
      <h2 class="titulo mt-4 max-w-[20ch] text-[clamp(2rem,6vw,3.5rem)]">
        Es el primer evento propio de Deenex
      </h2>
      <p class="lectura mt-5 text-[17px] text-gris">
        No hay edición anterior que mostrar. Lo que hay es la plataforma con la que ya trabajan las
        marcas que están abajo, y tres años de escuchar el mismo problema en cada local.
      </p>

      <div class="mt-12 grid gap-4 sm:grid-cols-3">
        <div v-for="d in DATOS" :key="d.label" class="tarjeta p-7">
          <p class="text-[3.4rem] font-black leading-none tracking-[-0.04em] text-acento-texto">
            {{ d.cifra }}
          </p>
          <p class="mt-4 text-[14px] font-black uppercase tracking-[0.1em]">{{ d.label }}</p>
          <p class="mt-2.5 text-[15px] leading-[1.45] text-gris">{{ d.detalle }}</p>
        </div>
      </div>

      <!-- Logos -->
      <p class="mt-16 text-[13px] font-black uppercase tracking-[0.16em] text-gris-2">
        Algunas de las marcas que trabajan con Deenex
      </p>
      <div class="mt-8 flex flex-wrap items-center gap-x-10 gap-y-7 sm:gap-x-14">
        <img
          v-for="logo in logos"
          :key="logo.src"
          :src="logo.src"
          :alt="logo.alt"
          class="h-7 w-auto max-w-[120px] object-contain opacity-45 brightness-0 invert transition-opacity duration-200 hover:opacity-100 sm:h-9"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { MARCAS_LOGOS } from "@/data/evento";

const DATOS = [
  {
    cifra: "+350",
    label: "marcas en la plataforma",
    detalle: "Cadenas de foodservice y restaurantes que ya usan Deenex todos los días.",
  },
  {
    cifra: "7",
    label: "bloques en la jornada",
    detalle: "Seis charlas más la mesa redonda de cierre, en un solo track.",
  },
  {
    cifra: "200",
    label: "lugares, no más",
    detalle: "El cupo es la capacidad real del salón. No hay sillas extra.",
  },
];

const archivos = import.meta.glob("@/assets/images/brands/*", { eager: true, import: "default" });
const logos = MARCAS_LOGOS.map((nombre) => {
  const clave = Object.keys(archivos).find((k) => k.endsWith(`/${nombre}`));
  return { src: clave ? archivos[clave] : "", alt: nombre.replace(/\.\w+$/, "").replace(/[-_]/g, " ") };
}).filter((l) => l.src);
</script>
