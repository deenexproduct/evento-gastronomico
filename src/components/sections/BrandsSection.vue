<template>
  <section id="partners" class="border-b border-linea py-20 sm:py-28">
    <div class="contenedor">
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-violeta-texto">Partners</p>
        </div>
        <div class="lg:col-span-9">
          <h2 class="titular max-w-[16ch] text-[clamp(1.9rem,4vw,3.2rem)]">
            Los que ya están adentro.
          </h2>
          <p class="mt-6 max-w-[58ch] text-[1.02rem] leading-[1.65] text-gris">
            Cada partner de GastroTech llega con un beneficio exclusivo para los que estén en la
            sala ese día. La lista sigue abierta: se anuncian a medida que se cierran.
          </p>
        </div>
      </div>

      <div class="mt-14 grid gap-x-8 border-t border-linea md:grid-cols-3">
        <article
          v-for="(p, i) in PARTNERS"
          :key="p.nombre"
          class="border-linea py-9"
          :class="i > 0 ? 'md:border-l md:pl-8' : ''"
        >
          <p class="rotulo text-violeta-texto">{{ p.tipo }}</p>
          <h3 class="titular mt-4 text-[1.35rem]">{{ p.nombre }}</h3>
          <p class="mt-3 max-w-[38ch] text-[0.93rem] leading-[1.62] text-gris">{{ p.aporte }}</p>
        </article>
      </div>

      <!-- El evento sigue creciendo: mostrarlo da razón para volver a la página -->
      <div class="grid gap-8 border-t border-linea py-9 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <div class="flex items-center gap-2.5">
            <span class="relative flex h-2 w-2" aria-hidden="true">
              <span class="latido absolute inline-flex h-full w-full rounded-full bg-violeta opacity-60"></span>
              <span class="relative inline-flex h-2 w-2 rounded-full bg-violeta"></span>
            </span>
            <p class="rotulo text-violeta-texto">La grilla sigue abierta</p>
          </div>

          <h3 class="titular mt-4 text-[1.2rem]">Se suman partners todas las semanas.</h3>
          <p class="mt-3 max-w-[54ch] text-[0.93rem] leading-[1.6] text-gris">
            Stands, activaciones y beneficios nuevos hasta el 20 de septiembre. Cada uno que se
            cierra se anuncia acá y se avisa a los que ya están registrados.
            <span class="font-medium text-tinta"
              >Anotarte hoy no te deja afuera de lo que se sume después.</span
            >
          </p>
        </div>

        <div class="lg:col-span-4 lg:col-start-9">
          <p class="text-[0.93rem] leading-[1.6] text-gris">
            ¿Querés que tu marca esté en la sala?
          </p>
          <a
            :href="whatsappPartners"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-linea mt-4 w-full"
          >
            Quiero ser partner
          </a>
        </div>
      </div>

      <!-- Prueba social -->
      <div class="border-t border-linea pt-12">
        <div class="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span class="titular text-[clamp(2rem,4vw,3rem)] text-violeta-texto">+350</span>
          <p class="max-w-[40ch] text-[0.97rem] leading-[1.6] text-gris">
            marcas ya trabajan con Deenex. Estas son algunas.
          </p>
        </div>

        <div class="mt-10 flex flex-wrap items-center gap-x-12 gap-y-9">
          <img
            v-for="logo in logos"
            :key="logo.src"
            :src="logo.src"
            :alt="logo.alt"
            class="h-7 w-auto max-w-[120px] object-contain opacity-55 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0 sm:h-9"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PARTNERS, MARCAS_LOGOS, WHATSAPP_ORGANIZADOR } from "@/data/evento";

const archivos = import.meta.glob("@/assets/images/brands/*", { eager: true, import: "default" });

const logos = MARCAS_LOGOS.map((nombre) => {
  const clave = Object.keys(archivos).find((k) => k.endsWith(`/${nombre}`));
  return {
    src: clave ? archivos[clave] : "",
    alt: nombre.replace(/\.\w+$/, "").replace(/[-_]/g, " "),
  };
}).filter((l) => l.src);

const whatsappPartners =
  `https://wa.me/${WHATSAPP_ORGANIZADOR}?text=` +
  encodeURIComponent(
    "Hola Alan! Me interesa ser partner del evento de Deenex del 20 de septiembre en Córdoba. Mi marca es ____."
  );
</script>

<style scoped>
/* Señal de que la grilla está viva, no un adorno */
.latido {
  animation: latido 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes latido {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(2.2); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .latido { animation: none; }
}
</style>
