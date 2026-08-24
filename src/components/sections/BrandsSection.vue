<template>
  <section id="partners" class="py-seccion">
    <div class="contenedor">
      <p class="rotulo text-acento-texto">Partners</p>
      <h2 class="titulo mt-4 max-w-[16ch] text-[clamp(2rem,5.6vw,3.4rem)]">
        Quiénes vienen y qué traen
      </h2>
      <p class="lectura mt-5 text-[17px] text-gris">
        Cada partner llega con algo concreto para los que estén en la sala ese día. La lista sigue
        abierta: se anuncian a medida que se cierran.
      </p>

      <div class="mt-12 grid gap-4 md:grid-cols-3">
        <article v-for="p in partners" :key="p.nombre" class="tarjeta flex flex-col p-7">
          <!-- Logo, o el nombre en tipografía si todavía no llegó -->
          <div class="flex h-14 items-center">
            <img
              v-if="p.src"
              :src="p.src"
              :alt="p.nombre"
              class="max-h-10 w-auto max-w-[150px] object-contain brightness-0 invert"
              loading="lazy"
            />
            <span v-else class="text-[1.5rem] font-black uppercase tracking-[-0.02em]">
              {{ p.nombre }}
            </span>
          </div>

          <span
            class="chip mt-5 self-start"
            :class="p.tipo === 'Partner oficial' ? 'border-acento/50 text-acento-texto' : 'border-white/15 text-gris'"
          >
            {{ p.tipo }}
          </span>

          <p class="mt-5 text-[15px] leading-[1.55] text-gris">{{ p.empresa }}</p>

          <div class="mt-6 border-t border-white/10 pt-5">
            <p class="text-[13px] font-black uppercase tracking-[0.1em] text-acento-texto">
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
          <h3 class="text-[1.2rem] font-black uppercase leading-tight">
            Hay lugar para más marcas
          </h3>
          <p class="mt-2 max-w-[52ch] text-[15px] leading-[1.5] text-gris">
            Stands, demos y beneficios para los 200 dueños de la sala. Quedan espacios.
          </p>
        </div>
        <a
          :href="whatsappPartners"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-linea shrink-0"
        >
          Quiero ser partner
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PARTNERS, WHATSAPP_ORGANIZADOR, EVENTO } from "@/data/evento";

const archivos = import.meta.glob("@/assets/images/partners/*", {
  eager: true,
  import: "default",
});

const partners = PARTNERS.map((p) => {
  const clave = p.logo ? Object.keys(archivos).find((k) => k.endsWith(`/${p.logo}`)) : null;
  return { ...p, src: clave ? archivos[clave] : "" };
});

const whatsappPartners =
  `https://wa.me/${WHATSAPP_ORGANIZADOR}?text=` +
  encodeURIComponent(
    `Hola Alan! Me interesa ser partner de ${EVENTO.nombre} del 20 de septiembre en Córdoba. Mi marca es ____.`
  );
</script>
