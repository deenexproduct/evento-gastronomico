<template>
  <section id="partners" class="bg-hueso text-ink">
    <div class="px-5 py-16 sm:px-8 sm:py-20">
      <p class="kicker opacity-50">Partners</p>
      <h2 class="titular mt-6 max-w-[12ch] text-[clamp(2.4rem,8vw,6rem)]">
        Los que ya están <span class="text-fuego-tinta">adentro.</span>
      </h2>
      <p class="mt-8 max-w-[52ch] text-[1.02rem] leading-[1.6] text-ink/65">
        Cada partner llega con un beneficio exclusivo para los que estén en la sala ese día. La
        lista sigue abierta: se anuncian a medida que se cierran.
      </p>
    </div>

    <div class="grid gap-[3px] border-t-[3px] border-ink bg-ink md:grid-cols-3">
      <article v-for="p in PARTNERS" :key="p.nombre" class="flex flex-col justify-between bg-hueso p-8 sm:p-9">
        <div>
          <span class="inline-block bg-ink px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.16em] text-lima">
            {{ p.tipo }}
          </span>
          <h3 class="titular mt-6 text-[clamp(1.7rem,3.6vw,2.4rem)]">{{ p.nombre }}</h3>
        </div>
        <p class="mt-6 text-[0.95rem] leading-[1.6] text-ink/65">{{ p.aporte }}</p>
      </article>
    </div>

    <!-- Slot abierto -->
    <div
      class="flex flex-col gap-6 border-t-[3px] border-ink bg-ink p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10"
    >
      <div>
        <h3 class="titular text-[clamp(1.4rem,3vw,2rem)]">Hay más partners en camino.</h3>
        <p class="mt-2.5 max-w-[54ch] text-[0.95rem] leading-[1.55] text-white/60">
          Stands, activaciones y beneficios que se suman semana a semana. ¿Querés que tu marca esté
          en la sala?
        </p>
      </div>
      <a
        :href="whatsappPartners"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-cartel shrink-0 self-start text-[0.85rem]"
      >
        Quiero ser partner
      </a>
    </div>

    <!-- Prueba social -->
    <div class="border-t-[3px] border-ink bg-hueso px-5 py-14 sm:px-8">
      <div class="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <span class="titular text-[clamp(2.6rem,6vw,4rem)] text-fuego-tinta">+350</span>
        <p class="kicker max-w-[36ch] leading-[1.5] opacity-60">
          marcas ya trabajan con Deenex.<br />Estas son algunas.
        </p>
      </div>

      <div class="mt-10 flex flex-wrap items-center gap-x-10 gap-y-8 sm:gap-x-14">
        <img
          v-for="logo in logos"
          :key="logo.src"
          :src="logo.src"
          :alt="logo.alt"
          class="h-8 w-auto max-w-[130px] object-contain opacity-40 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0 sm:h-10"
          loading="lazy"
        />
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
