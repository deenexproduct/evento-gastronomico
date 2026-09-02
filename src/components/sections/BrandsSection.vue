<template>
  <section id="partners" class="border-b border-linea py-seccion">
    <div class="contenedor">
      <p class="rotulo text-acento-texto">Sponsors</p>
      <h2 class="titulo mt-4 max-w-[16ch] text-[clamp(1.4rem,4.4vw,2.85rem)]">
        Quiénes vienen y qué traen
      </h2>
      <p class="lectura mt-5 text-[17px] text-gris">
        Ninguno viene a poner el logo y nada más. Hay un solo lugar por rubro, y cada uno llega con
        algo concreto para el día: quién habla, qué se prueba en el salón y qué se come entre
        bloque y bloque. Cuando entra el próximo rubro, lo vas a ver acá.
      </p>

      <div class="mt-12 grid gap-4 sm:grid-cols-2">
        <article v-for="p in partners" :key="p.nombre" class="tarjeta flex flex-col p-7">
          <!-- Logo, o el nombre en tipografía si todavía no llegó -->
          <div class="flex min-h-14 items-center">
            <img
              v-if="p.src"
              :src="p.src"
              :alt="p.nombre"
              class="max-h-10 w-auto max-w-[150px] object-contain logo-sponsor brightness-0 invert"
              loading="lazy"
            />
            <span v-else class="text-[1.5rem] font-extrabold uppercase tracking-[-0.02em]">
              {{ p.nombre }}
            </span>
          </div>

          <!-- El rubro, no un nivel: los diez lugares valen igual, así que
               ninguno se resalta por encima de otro. Y es el dato que hace
               concreta la exclusividad, que antes no aparecía en la página. -->
          <span class="chip mt-5 self-start border-white/15 text-gris">
            Rubro · {{ p.rubro }}
          </span>

          <p class="mt-5 text-[15px] leading-[1.55] text-gris">{{ p.empresa }}</p>

          <div class="mt-6 border-t border-white/10 pt-5">
            <p class="text-[13px] font-semibold uppercase tracking-[0.1em] text-acento-texto">
              {{ p.quien }}
            </p>
            <p class="mt-2 text-[15px] leading-[1.5]">{{ p.aporte }}</p>
          </div>
        </article>
      </div>

      <!-- Invitación abierta: con pocos partners rinde más que una grilla a medio llenar -->
      <div
        class="mt-4 flex flex-col gap-5 rounded-2xl border border-dashed border-white/15 p-7 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h3 class="text-[1.2rem] font-extrabold uppercase leading-tight">
            Hay lugar para más marcas
          </h3>
          <p class="mt-2 max-w-[52ch] text-[15px] leading-[1.5] text-gris">
            Stands, demos y beneficios para los dueños de cadenas de la sala. Quedan espacios.
          </p>
        </div>
        <a
          :href="whatsappPartners"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-linea shrink-0"
        >
          Quiero mi rubro
        <span class="sr-only"> (abre en una pestaña nueva)</span></a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PARTNERS, linkWa } from "@/data/evento";

const archivos = import.meta.glob("@/assets/images/partners/*", {
  eager: true,
  import: "default",
});

const partners = PARTNERS.map((p) => {
  const clave = p.logo ? Object.keys(archivos).find((k) => k.endsWith(`/${p.logo}`)) : null;
  return { ...p, src: clave ? archivos[clave] : "" };
});

const whatsappPartners = linkWa("partner");
</script>
