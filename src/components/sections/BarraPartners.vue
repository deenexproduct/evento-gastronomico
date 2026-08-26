<template>
  <!--
    Barra de partners inmediatamente después del hero, como hace el referente
    con sus "Main partners". Es prueba social temprana: dice quién respalda el
    evento antes de que el visitante tenga que leer nada.

    Sin archivo de logo se muestra el nombre en tipografía. Un nombre bien
    puesto se lee mejor que un recuadro vacío esperando una imagen.
  -->
  <section id="respaldan" class="border-y border-white/10 bg-noche-2 py-10 sm:py-12">
    <div class="contenedor">
      <p class="text-center text-[12px] font-black uppercase tracking-[0.18em] text-gris-2">
        Partners confirmados
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16">
        <template v-for="p in partnersBarra" :key="p.nombre">
          <img
            v-if="p.src"
            :src="p.src"
            :alt="p.nombre"
            class="h-8 w-auto max-w-[150px] object-contain opacity-70 brightness-0 invert transition-opacity duration-200 hover:opacity-100 sm:h-10"
            loading="lazy"
          />
          <span
            v-else
            class="text-[1.05rem] font-black uppercase tracking-[-0.01em] text-white/75 transition-colors duration-200 hover:text-white sm:text-[1.25rem]"
          >
            {{ p.nombre }}
          </span>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PARTNERS } from "@/data/evento";

const archivos = import.meta.glob("@/assets/images/partners/*", {
  eager: true,
  import: "default",
});

const partners = PARTNERS.map((p) => {
  const clave = p.logo ? Object.keys(archivos).find((k) => k.endsWith(`/${p.logo}`)) : null;
  return { ...p, src: clave ? archivos[clave] : "" };
});

// La barra son puros nombres de empresa. El que no lo es queda afuera de acá
// y sigue teniendo su tarjeta en #partners, que es donde se explica qué es.
const partnersBarra = partners.filter((p) => p.enBarra !== false);
</script>
